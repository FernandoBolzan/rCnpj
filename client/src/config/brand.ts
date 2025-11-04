// Configuração de marca do sistema
// Pode ser controlado por variável de ambiente

export type BrandType = 'rcont' | 'sistematizo';

interface BrandConfig {
  name: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  website: string;
  bannerText: string;
  bannerCTA: string;
}

const brands: Record<BrandType, BrandConfig> = {
  rcont: {
    name: 'RCont',
    logo: '/logo-rcont.png',
    favicon: '/rcont-icon.png',
    primaryColor: '#3b82f6', // blue-600
    website: 'https://rcont.org',
    bannerText: 'Fale com um contador especializado da RCont',
    bannerCTA: 'Saiba mais'
  },
  sistematizo: {
    name: 'Sistematizo',
    logo: '/logo-sistematizo.png',
    favicon: '/sistematizo-icon.png',
    primaryColor: '#8b5cf6', // violet-600
    website: 'https://sistematizo.com.br',
    bannerText: 'Fale com um contador especializado da Sistematizo',
    bannerCTA: 'Saiba mais'
  }
};

// Cache da marca detectada
let cachedBrand: BrandType | null = null;

// Detectar marca pela variável de ambiente ou domínio
function detectBrand(): BrandType {
  // Se já detectamos antes, usar o cache
  if (cachedBrand) {
    return cachedBrand;
  }
  
  // 1. Tentar pela variável de ambiente (definida no build)
  const envBrand = import.meta.env.VITE_BRAND as BrandType;
  
  console.log('🔍 Detecção de Marca:', {
    VITE_BRAND: envBrand,
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'undefined',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'undefined'
  });
  
  if (envBrand && brands[envBrand]) {
    console.log('✅ Marca detectada por ENV:', envBrand);
    cachedBrand = envBrand;
    return envBrand;
  }
  
  // 2. Tentar pelo domínio
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('sistematizo')) {
      console.log('✅ Marca detectada por DOMÍNIO: sistematizo');
      cachedBrand = 'sistematizo';
      return 'sistematizo';
    }
  }
  
  // 3. Padrão: rcont
  console.log('✅ Marca detectada por PADRÃO: rcont');
  cachedBrand = 'rcont';
  return 'rcont';
}

export function getBrandConfig(): BrandConfig {
  const brand = detectBrand();
  return brands[brand];
}

export function getCurrentBrand(): BrandType {
  return detectBrand();
}

