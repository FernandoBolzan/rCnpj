export function stripNonDigits(str: string | null | undefined): string {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/\D/g, '');
}

export function formatCNPJ(cnpj: string | null | undefined): string {
  if (!cnpj) return '';
  const clean = stripNonDigits(cnpj);
  if (clean.length !== 14) return cnpj;
  
  return clean.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

export function formatCNAE(code: string | number | null | undefined): string {
  if (!code) return '';
  const codeStr = String(code);
  const c = stripNonDigits(codeStr);
  if (c.length === 7) return `${c.slice(0,4)}-${c.slice(4,5)}/${c.slice(5)}`;
  if (c.length === 5) return `${c.slice(0,4)}-${c.slice(4)}`;
  return codeStr;
}

export function isDigits(str: string | null | undefined): boolean {
  if (!str || typeof str !== 'string') return false;
  return /^\d+$/.test(str);
}

export function normalizeText(str: string | null | undefined): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function formatCEP(cep: string | null | undefined): string {
  if (!cep) return '';
  const clean = stripNonDigits(cep);
  if (clean.length !== 8) return cep;
  
  return clean.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}

export function formatTelefone(telefone: string | null | undefined): string {
  if (!telefone) return '';
  const clean = stripNonDigits(telefone);
  
  // Celular com DDD (11 dígitos): (XX) X XXXX-XXXX
  if (clean.length === 11) {
    return clean.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
  }
  
  // Celular sem DDD (9 dígitos): X XXXX-XXXX
  if (clean.length === 9) {
    return clean.replace(/^(\d{1})(\d{4})(\d{4})$/, '$1 $2-$3');
  }
  
  // Telefone fixo com DDD (10 dígitos): (XX) XXXX-XXXX
  if (clean.length === 10) {
    return clean.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }
  
  // Telefone fixo sem DDD (8 dígitos): XXXX-XXXX
  if (clean.length === 8) {
    return clean.replace(/^(\d{4})(\d{4})$/, '$1-$2');
  }
  
  // Se não se encaixa em nenhum padrão, retorna original
  return telefone;
}