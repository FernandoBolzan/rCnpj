import { describe, it, expect } from 'vitest';
import { formatCNPJ, formatCNAE, isDigits, normalizeText, stripNonDigits } from '../lib/format';

describe('formatCNPJ', () => {
  it('should format CNPJ correctly', () => {
    expect(formatCNPJ('00000000000000')).toBe('00.000.000/0000-00');
    expect(formatCNPJ('11111111111111')).toBe('11.111.111/1111-11');
  });

  it('should return original string if not 14 digits', () => {
    expect(formatCNPJ('123')).toBe('123');
    expect(formatCNPJ('0000000000000')).toBe('0000000000000');
  });

  it('should handle already formatted CNPJ', () => {
    expect(formatCNPJ('00.000.000/0000-00')).toBe('00.000.000/0000-00');
  });
});

describe('formatCNAE', () => {
  it('should format 7-digit CNAE correctly', () => {
    expect(formatCNAE('8621601')).toBe('8621-6/01');
    expect(formatCNAE('4711301')).toBe('4711-3/01');
  });

  it('should format 5-digit CNAE correctly', () => {
    expect(formatCNAE('86216')).toBe('8621-6');
    expect(formatCNAE('47113')).toBe('4711-3');
  });

  it('should return original string for other lengths', () => {
    expect(formatCNAE('123')).toBe('123');
    expect(formatCNAE('123456')).toBe('123456');
  });
});

describe('isDigits', () => {
  it('should return true for digit-only strings', () => {
    expect(isDigits('123')).toBe(true);
    expect(isDigits('00000000000000')).toBe(true);
  });

  it('should return false for strings with non-digits', () => {
    expect(isDigits('123a')).toBe(false);
    expect(isDigits('abc')).toBe(false);
    expect(isDigits('12.34')).toBe(false);
  });
});

describe('normalizeText', () => {
  it('should remove accents and convert to lowercase', () => {
    expect(normalizeText('São Paulo')).toBe('sao paulo');
    expect(normalizeText('UTI Móvel')).toBe('uti movel');
    expect(normalizeText('Comércio')).toBe('comercio');
  });

  it('should trim whitespace', () => {
    expect(normalizeText('  teste  ')).toBe('teste');
  });
});

describe('stripNonDigits', () => {
  it('should remove all non-digit characters', () => {
    expect(stripNonDigits('00.000.000/0000-00')).toBe('00000000000000');
    expect(stripNonDigits('8621-6/01')).toBe('8621601');
    expect(stripNonDigits('abc123def')).toBe('123');
  });

  it('should return empty string for no digits', () => {
    expect(stripNonDigits('abc')).toBe('');
    expect(stripNonDigits('')).toBe('');
  });
});
