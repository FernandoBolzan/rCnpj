export function stripNonDigits(str: string): string {
  return str.replace(/\D/g, '');
}

export function formatCNPJ(cnpj: string): string {
  const clean = stripNonDigits(cnpj);
  if (clean.length !== 14) return cnpj;
  
  return clean.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

export function formatCNAE(code: string): string {
  const c = stripNonDigits(code);
  if (c.length === 7) return `${c.slice(0,4)}-${c.slice(4,5)}/${c.slice(5)}`;
  if (c.length === 5) return `${c.slice(0,4)}-${c.slice(4)}`;
  return code;
}

export function isDigits(str: string): boolean {
  return /^\d+$/.test(str);
}

export function normalizeText(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
