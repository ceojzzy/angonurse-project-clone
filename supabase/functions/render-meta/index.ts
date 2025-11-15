import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Article {
  title_pt: string;
  title_en: string;
  excerpt_pt?: string;
  excerpt_en?: string;
  content_pt?: string;
  content_en?: string;
  featured_image: string;
  slug: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.searchParams.get('path') || '/';
    const userAgent = req.headers.get('user-agent') || '';

    // Detectar crawlers (Facebook, Twitter, LinkedIn, WhatsApp, etc.)
    const isCrawler = /facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot/i.test(userAgent);

    if (!isCrawler) {
      return new Response(JSON.stringify({ isCrawler: false }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Crawler detected: ${userAgent} accessing ${path}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let title = 'Angonurse - Saúde, Bem-estar e Beleza';
    let description = 'Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis. Cuide do seu corpo e mente com Angonurse.';
    let image = 'https://angonurse.vercel.app/angonurse-site.png';
    let canonical = `https://angonurse.vercel.app${path}`;
    let imageAlt = 'Imagem do artigo - Angonurse';

    // Detectar se é uma página de artigo
    const articleMatch = path.match(/^\/artigo\/([^\/]+)/);
    if (articleMatch) {
      const slug = articleMatch[1];
      
      const { data: article, error: articleError } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (articleError) {
        console.error('render-meta: error fetching article', articleError.message);
      }

      if (article) {
        const typedArticle = article as Article;
        title = `${typedArticle.title_pt}`;
        description = typedArticle.excerpt_pt || typedArticle.content_pt?.substring(0, 160) || description;
        image = typedArticle.featured_image || image;
        imageAlt = typedArticle.title_pt || imageAlt;
      }
    }

    // Escapar strings para HTML
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const safeTitle = escapeHtml(title);
    const safeDescription = escapeHtml(description);

    // Gerar HTML estático com meta tags
    const html = `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDescription}">
  <link rel="canonical" href="${canonical}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDescription}">
  <meta property="og:type" content="${articleMatch ? 'article' : 'website'}">
  <meta property="og:url" content="${canonical}">
   <meta property="og:image" content="${image}">
   <meta property="og:image:secure_url" content="${image}">
   <meta property="og:image:width" content="1200">
   <meta property="og:image:height" content="630">
   <meta property="og:image:alt" content="${escapeHtml(imageAlt)}">
   <meta property="og:site_name" content="Angonurse">
   <meta property="og:locale" content="pt_PT">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDescription}">
  <meta name="twitter:image" content="${image}">
  <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}">
  
  <!-- Robots -->
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  
  
</head>
<body>
  <h1>${safeTitle}</h1>
  <p>${safeDescription}</p>
  <p>Redirecionando para <a href="${canonical}">${canonical}</a></p>
</body>
</html>`;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error in render-meta:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
