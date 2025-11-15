import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Lista de user-agents de crawlers conhecidos
const BOT_USER_AGENTS = [
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'TelegramBot',
  'Slackbot',
  'Googlebot',
  'bingbot',
  'Discordbot',
];

const isCrawler = (userAgent: string): boolean => {
  return BOT_USER_AGENTS.some(bot => 
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.searchParams.get('path') || '/';
    const userAgent = req.headers.get('user-agent') || '';

    console.log(`Request for path: ${path}, User-Agent: ${userAgent}`);

    // Se não for crawler, retorna vazio (app vai renderizar normalmente)
    if (!isCrawler(userAgent)) {
      return new Response(JSON.stringify({ isCrawler: false }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Meta tags padrão baseadas na rota
    let title = 'Angonurse - Saúde, Bem-estar e Beleza';
    let description = 'Portal completo de saúde, bem-estar, beleza e receitas saudáveis.';
    let image = '/og-image.jpg';

    // Customizar meta tags baseado na rota
    if (path.includes('/saude')) {
      title = 'Saúde | Angonurse';
      description = 'Artigos e dicas sobre saúde, prevenção e cuidados médicos.';
    } else if (path.includes('/bem-estar')) {
      title = 'Bem-estar | Angonurse';
      description = 'Dicas de bem-estar, qualidade de vida e saúde mental.';
    } else if (path.includes('/beleza')) {
      title = 'Beleza | Angonurse';
      description = 'Cuidados com a pele, cabelo e dicas de beleza natural.';
    } else if (path.includes('/receitas')) {
      title = 'Receitas Saudáveis | Angonurse';
      description = 'Receitas nutritivas e deliciosas para uma alimentação saudável.';
    }

    // HTML estático para crawlers
    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Angonurse">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
</head>
<body>
    <h1>${title}</h1>
    <p>${description}</p>
</body>
</html>
    `.trim();

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error in render-meta:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});