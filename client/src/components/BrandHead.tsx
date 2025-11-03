import { Helmet } from 'react-helmet-async';
import { getBrandConfig } from '../config/brand';

export function BrandHead() {
  const brand = getBrandConfig();
  
  return (
    <Helmet>
      <title>{brand.name} - Consulta CNPJ e CNAE</title>
      <meta name="description" content={`Consulte informações de CNPJ e CNAE de forma rápida e gratuita com ${brand.name}`} />
      <meta property="og:title" content={`${brand.name} - Consulta CNPJ e CNAE`} />
      <meta property="og:description" content={`Consulte informações de CNPJ e CNAE de forma rápida e gratuita com ${brand.name}`} />
      <meta property="og:site_name" content={brand.name} />
      <meta name="twitter:title" content={`${brand.name} - Consulta CNPJ e CNAE`} />
      <meta name="twitter:description" content={`Consulte informações de CNPJ e CNAE de forma rápida e gratuita com ${brand.name}`} />
    </Helmet>
  );
}

