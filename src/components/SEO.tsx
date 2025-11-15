import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

export const SEO = ({
  title = 'Angonurse - Saúde, Bem-estar e Beleza',
  description = 'Portal completo de saúde, bem-estar, beleza e receitas saudáveis. Informações confiáveis para cuidar de você.',
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  keywords = 'saúde, bem-estar, beleza, receitas saudáveis, cuidados, nutrição'
}: SEOProps) => {
  const siteTitle = title.includes('Angonurse') ? title : `${title} | Angonurse`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Angonurse" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Angonurse" />
    </Helmet>
  );
};