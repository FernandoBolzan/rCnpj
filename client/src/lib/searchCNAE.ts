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
  const resultadosMap = new Map<string, CNAEComAtividade>();
  
  console.log('🔍 Buscando por atividade:', query, '(normalizada:', queryNormalizada + ')');
  
  // Percorrer todos os CNAEs da base do Simples Nacional
  Object.entries(simplesNacionalData).forEach(([cnaeId, info]) => {
    if (!info.atividades || info.atividades.length === 0) return;
    
    // Buscar a melhor atividade que contém a query
    let melhorAtividade: string | null = null;
    let melhorPontuacao = -1;
    
    info.atividades.forEach(atividade => {
      const atividadeNormalizada = normalizeText(atividade);
      
      if (atividadeNormalizada.includes(queryNormalizada)) {
        // Calcular pontuação (quanto mais próximo do início e mais exato, melhor)
        const posicao = atividadeNormalizada.indexOf(queryNormalizada);
        const pontuacao = 1000 - posicao - (atividade.length - query.length);
        
        if (pontuacao > melhorPontuacao) {
          melhorPontuacao = pontuacao;
          melhorAtividade = atividade;
        }
      }
    });
    
    // Se encontrou atividade correspondente, adicionar aos resultados
    if (melhorAtividade && melhorPontuacao > 0) {
      // Encontrar a subclasse correspondente
      const subclasse = subclasses.find(s => {
        const sIdClean = s.id.replace(/\D/g, '');
        const cnaeIdClean = cnaeId.replace(/\D/g, '');
        return sIdClean === cnaeIdClean;
      });
      
      if (subclasse) {
        console.log('✓ Encontrado:', cnaeId, '-', melhorAtividade);
        
        // Usar Map para evitar duplicatas (apenas o melhor resultado por CNAE)
        resultadosMap.set(subclasse.id, {
          ...subclasse,
          atividadeEncontrada: melhorAtividade,
          pontuacao: melhorPontuacao
        });
      }
    }
  });
  
  // Converter Map para array e ordenar por pontuação
  const resultados = Array.from(resultadosMap.values());
  console.log('📊 Total de resultados encontrados:', resultados.length);
  
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

