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

    // Detectar se é uma página de artigo
    const articleMatch = path.match(/^\/artigo\/([^\/]+)/);
    if (articleMatch) {
      const slug = articleMatch[1];
      
      const { data: article } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (article) {
        const typedArticle = article as Article;
        title = `${typedArticle.title_pt} | Angonurse`;
        description = typedArticle.excerpt_pt || typedArticle.content_pt?.substring(0, 160) || description;
        image = typedArticle.featured_image || image;
      }
    }

    // Gerar HTML estático com meta tags
    const html = `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${image}">
  <meta property="og:site_name" content="Angonurse">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${image}">
  
  <!-- Robots -->
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  
  <meta http-equiv="refresh" content="0;url=${canonical}">
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <p>Redirecionando para <a href="${canonical}">${canonical}</a></p>
</body>
</html>
    `;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
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
