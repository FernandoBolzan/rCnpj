import { normalizeText } from './format';

export interface RankedItem<T> {
  item: T;
  score: number;
}

export function rankByQuery<T>(
  list: T[],
  pick: (x: T) => string,
  q: string
): T[] {
  if (!q.trim()) return list;
  
  const normalizedQuery = normalizeText(q);
  const words = normalizedQuery.split(/\s+/);
  
  const ranked: RankedItem<T>[] = list.map(item => {
    const text = normalizeText(pick(item));
    let score = 0;
    
    // Score 3: começa com a query
    if (text.startsWith(normalizedQuery)) {
      score += 3;
    }
    
    // Score 2: contém a query
    if (text.includes(normalizedQuery)) {
      score += 2;
    }
    
    // Score 1: cada palavra inteira encontrada
    for (const word of words) {
      if (word.length > 2) { // Ignorar palavras muito curtas
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(text)) {
          score += 1;
        }
      }
    }
    
    return { item, score };
  });
  
  // Filtrar itens com score > 0 e ordenar
  return ranked
    .filter(r => r.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Em caso de empate, preferir descrição mais curta
      return pick(a.item).length - pick(b.item).length;
    })
    .map(r => r.item);
}
