import { Helmet } from 'react-helmet-async';
import { getBrandConfig } from '../config/brand';

export function BrandHead() {
  const brand = getBrandConfig();
  
  // URL base dinâmica (usa o domínio atual ou fallback)
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : brand.website;
  
  const ogImage = `${baseUrl}/og-image-${brand.name.toLowerCase()}.png`;
  const description = `Consulte CNPJ e CNAE gratuitamente. Informações completas de empresas brasileiras: endereço, telefone, situação cadastral, CNAEs e análise do Simples Nacional. Rápido, fácil e gratuito.`;
  
  return (
    <Helmet>
      {/* Favicon */}
      <link rel="icon" type="image/png" href={brand.favicon} />
      <link rel="shortcut icon" type="image/png" href={brand.favicon} />
      <link rel="apple-touch-icon" href={brand.favicon} />
      
      {/* Título */}
      <title>{brand.name} - Consulta CNPJ e CNAE Gratuita</title>
      
      {/* Meta Tags Básicas */}
      <meta name="description" content={description} />
      <meta name="keywords" content="consulta cnpj, consulta cnae, empresa brasileira, receita federal, simples nacional, cnpj gratis, atividade economica, cadastro nacional" />
      <meta name="author" content={brand.name} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:title" content={`${brand.name} - Consulta CNPJ e CNAE Gratuita`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${brand.name} - Consulta CNPJ e CNAE`} />
      <meta property="og:site_name" content={brand.name} />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={baseUrl} />
      <meta name="twitter:title" content={`${brand.name} - Consulta CNPJ e CNAE Gratuita`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${brand.name} - Consulta CNPJ e CNAE`} />
      
      {/* WhatsApp (usa Open Graph) */}
      <meta property="og:image:type" content="image/png" />
      
      {/* Telegram (usa Open Graph) */}
      <meta property="telegram:card" content="summary_large_image" />
      
      {/* Theme Color */}
      <meta name="theme-color" content={brand.primaryColor} />
      <meta name="msapplication-TileColor" content={brand.primaryColor} />
    </Helmet>
  );
}

