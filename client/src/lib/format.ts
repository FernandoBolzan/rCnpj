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
  
  // Celular com DDD (11 dígitos): (XX) 9XXXX-XXXX
  // Padrão: 9 como primeiro dígito após DDD indica celular
  if (clean.length === 11) {
    const primeiroDigito = clean.charAt(2);
    if (primeiroDigito === '9') {
      return '📱 ' + clean.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
    }
    // Se não começa com 9, pode ser fixo com erro ou número especial
    return '📞 ' + clean.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3') + ' ⚠️';
  }
  
  // CORREÇÃO AUTOMÁTICA: Telefone com 10 dígitos que parece celular
  // Se o primeiro dígito após DDD é 9, 8 ou 7, falta o 9º dígito
  // Regra nacional: 9º dígito foi implementado em TODO o Brasil
  if (clean.length === 10) {
    const ddd = clean.substring(0, 2);
    const primeiroDigitoLocal = clean.charAt(2);
    
    // Se começa com 9, 8 ou 7 = É celular antigo SEM o 9º dígito
    if (['9', '8', '7'].includes(primeiroDigitoLocal)) {
      // ADICIONAR o 9º dígito no início do número local
      // Exemplo: 9991951112 → DDD:99 + 9(adicionar) + 91951112(8 dígitos locais) → (99) 9 9195-1112
      const numeroLocal = clean.substring(2); // Pega os 8 dígitos locais
      const numeroCorrigido = ddd + '9' + numeroLocal; // DDD + 9º dígito + número = 11 dígitos
      return '📱 ' + numeroCorrigido.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
    }
    
    // Se começa com 2-5 = É fixo
    if (['2', '3', '4', '5'].includes(primeiroDigitoLocal)) {
      return '☎️ ' + clean.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
    
    // Outros casos
    return '📞 ' + clean.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }
  
  // Celular sem DDD (9 dígitos): 9XXXX-XXXX
  // Já tem o 9º dígito
  if (clean.length === 9) {
    const primeiroDigito = clean.charAt(0);
    if (primeiroDigito === '9') {
      return '📱 ' + clean.replace(/^(\d{1})(\d{4})(\d{4})$/, '$1 $2-$3');
    }
    // Se começa com 8 ou 7, pode ser celular antigo sem DDD e sem 9º dígito
    if (['8', '7'].includes(primeiroDigito)) {
      return '📱 ' + clean.replace(/^(\d{1})(\d{4})(\d{4})$/, '$1 $2-$3') + ' (sem DDD)';
    }
    // Outros casos - fixo sem DDD provável
    return '☎️ ' + clean.replace(/^(\d{4})(\d{4})$/, '$1-$2');
  }
  
  // Telefone sem DDD (8 dígitos): XXXX-XXXX
  // Pode ser fixo OU celular antigo sem o 9º dígito
  if (clean.length === 8) {
    const primeiroDigito = clean.charAt(0);
    
    // Se começa com 9, 8 ou 7 = Celular antigo SEM 9º dígito
    // CORRIGIR adicionando o 9
    if (['9', '8', '7'].includes(primeiroDigito)) {
      const numeroCorrigido = '9' + clean;
      return '📱 ' + numeroCorrigido.replace(/^(\d{1})(\d{4})(\d{4})$/, '$1 $2-$3') + ' (corrigido)';
    }
    
    // Se começa com 2, 3, 4, 5 = Fixo
    if (['2', '3', '4', '5'].includes(primeiroDigito)) {
      return '☎️ ' + clean.replace(/^(\d{4})(\d{4})$/, '$1-$2');
    }
    
    // Outros casos
    return '📞 ' + clean.replace(/^(\d{4})(\d{4})$/, '$1-$2');
  }
  
  // Números com 7 dígitos ou menos (provavelmente sem DDD)
  if (clean.length === 7) {
    return '📞 ' + clean.replace(/^(\d{3})(\d{4})$/, '$1-$2');
  }
  
  // Números muito longos ou curtos - mostrar com aviso
  if (clean.length > 11) {
    return '📞 ' + clean + ' ⚠️';
  }
  
  // Fallback: retorna original com emoji
  return '📞 ' + telefone;
}