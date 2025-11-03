import { CNAEClasse, CNAESubclasse } from '../types';
import { simplesNacionalData } from '../mock/simplesNacional';
import { normalizeText } from './format';

interface CNAEComAtividade extends CNAESubclasse {
  atividadeEncontrada?: string;
  pontuacao?: number;
}

// Buscar CNAEs por atividade na base do Simples Nacional
export function buscarCNAEPorAtividade(
  query: string,
  subclasses: CNAESubclasse[]
): CNAEComAtividade[] {
  const queryNormalizada = normalizeText(query);
  const resultados: CNAEComAtividade[] = [];
  
  // Percorrer todos os CNAEs da base do Simples Nacional
  Object.entries(simplesNacionalData).forEach(([cnaeId, info]) => {
    if (!info.atividades || info.atividades.length === 0) return;
    
    // Verificar se alguma atividade contém a query
    info.atividades.forEach(atividade => {
      const atividadeNormalizada = normalizeText(atividade);
      
      if (atividadeNormalizada.includes(queryNormalizada)) {
        // Encontrar a subclasse correspondente
        const subclasse = subclasses.find(s => {
          const sIdClean = s.id.replace(/\D/g, '');
          const cnaeIdClean = cnaeId.replace(/\D/g, '');
          return sIdClean === cnaeIdClean;
        });
        
        if (subclasse) {
          // Calcular pontuação (quanto mais próximo do início, maior a pontuação)
          const posicao = atividadeNormalizada.indexOf(queryNormalizada);
          const pontuacao = 1000 - posicao - (atividade.length - query.length);
          
          resultados.push({
            ...subclasse,
            atividadeEncontrada: atividade,
            pontuacao
          });
        }
      }
    });
  });
  
  // Ordenar por pontuação (mais relevante primeiro)
  return resultados.sort((a, b) => (b.pontuacao || 0) - (a.pontuacao || 0));
}

// Verificar se a query parece ser uma busca por atividade
export function isPossibleAtividadeSearch(query: string): boolean {
  // Se tem mais de 3 letras e não é só números, provavelmente é atividade
  const queryNormalizada = normalizeText(query);
  
  // Se é só números, não é atividade
  if (/^\d+$/.test(query)) return false;
  
  // Se tem pelo menos 3 caracteres e tem letras, pode ser atividade
  if (queryNormalizada.length >= 3 && /[a-z]/.test(queryNormalizada)) return true;
  
  return false;
}

