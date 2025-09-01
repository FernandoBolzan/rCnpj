import { describe, it, expect } from 'vitest';
import { rankByQuery } from '../lib/rank';

interface TestItem {
  id: string;
  descricao: string;
}

describe('rankByQuery', () => {
  const testItems: TestItem[] = [
    { id: '1', descricao: 'UTI móvel' },
    { id: '2', descricao: 'Unidades móveis de atendimento a urgências' },
    { id: '3', descricao: 'Comércio varejista de alimentos' },
    { id: '4', descricao: 'Atendimento médico domiciliar' },
    { id: '5', descricao: 'Serviços de urgência médica' }
  ];

  it('should return empty array for empty query', () => {
    const result = rankByQuery(testItems, item => item.descricao, '');
    expect(result).toEqual([]);
  });

  it('should return empty array for whitespace-only query', () => {
    const result = rankByQuery(testItems, item => item.descricao, '   ');
    expect(result).toEqual([]);
  });

  it('should find exact matches first', () => {
    const result = rankByQuery(testItems, item => item.descricao, 'UTI móvel');
    expect(result[0].descricao).toBe('UTI móvel');
  });

  it('should find partial matches', () => {
    const result = rankByQuery(testItems, item => item.descricao, 'móvel');
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(item => item.descricao.includes('móvel'))).toBe(true);
  });

  it('should handle case-insensitive search', () => {
    const result = rankByQuery(testItems, item => item.descricao, 'uti');
    expect(result.some(item => item.descricao.toLowerCase().includes('uti'))).toBe(true);
  });

  it('should handle accented characters', () => {
    const result = rankByQuery(testItems, item => item.descricao, 'movel');
    expect(result.some(item => item.descricao.includes('móvel'))).toBe(true);
  });

  it('should prioritize exact matches over partial matches', () => {
    const items = [
      { id: '1', descricao: 'UTI móvel' },
      { id: '2', descricao: 'Unidades móveis de atendimento' }
    ];
    
    const result = rankByQuery(items, item => item.descricao, 'UTI móvel');
    expect(result[0].descricao).toBe('UTI móvel');
  });

  it('should prefer shorter descriptions when scores are equal', () => {
    const items = [
      { id: '1', descricao: 'UTI móvel muito longo' },
      { id: '2', descricao: 'UTI móvel' }
    ];
    
    const result = rankByQuery(items, item => item.descricao, 'UTI móvel');
    expect(result[0].descricao).toBe('UTI móvel');
  });

  it('should filter out items with no matches', () => {
    const result = rankByQuery(testItems, item => item.descricao, 'xyz');
    expect(result).toEqual([]);
  });
});
