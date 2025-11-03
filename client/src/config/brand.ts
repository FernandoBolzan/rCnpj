// Configuração de marca do sistema
// Pode ser controlado por variável de ambiente

export type BrandType = 'rcont' | 'sistematizo';

interface BrandConfig {
  name: string;
  logo: string;
  primaryColor: string;
  website: string;
  bannerText: string;
  bannerCTA: string;
}

const brands: Record<BrandType, BrandConfig> = {
  rcont: {
    name: 'RCont',
    logo: '/logo-rcont.png',
    primaryColor: '#3b82f6', // blue-600
    website: 'https://www.rcont.org',
    bannerText: 'Fale com um contador especializado da RCont',
    bannerCTA: 'Saiba mais'
  },
  sistematizo: {
    name: 'Sistematizo',
    logo: '/logo-sistematizo.png',
    primaryColor: '#8b5cf6', // violet-600
    website: 'https://www.sistematizo.com.br',
    bannerText: 'Automatize sua contabilidade com Sistematizo',
    bannerCTA: 'Conhecer'
  }
};

// Detectar marca pela variável de ambiente ou domínio
function detectBrand(): BrandType {
  // 1. Tentar pela variável de ambiente (definida no build)
  const envBrand = import.meta.env.VITE_BRAND as BrandType;
  if (envBrand && brands[envBrand]) {
    return envBrand;
  }
  
  // 2. Tentar pelo domínio
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('sistematizo')) {
      return 'sistematizo';
    }
  }
  
  // 3. Padrão: rcont
  return 'rcont';
}

export const currentBrand = detectBrand();
export const brandConfig = brands[currentBrand];

export function getBrandConfig(): BrandConfig {
  return brandConfig;
}

