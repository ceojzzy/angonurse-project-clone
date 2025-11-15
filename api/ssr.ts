import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userAgent = req.headers['user-agent'] || '';
  const path = req.url || '/';
  
  // Detectar crawlers das redes sociais
  const isCrawler = /facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot/i.test(userAgent);
  
  // Se não for crawler, servir index.html normal
  if (!isCrawler) {
    return res.status(200).send(`
<!doctype html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <title>Angonurse - Saúde, Bem-estar e Beleza</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis. Cuide do seu corpo e mente com Angonurse.">
    <meta property="og:title" content="Angonurse - Saúde, Bem-estar e Beleza">
    <meta property="og:description" content="Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://angonurse.vercel.app">
    <meta property="og:image" content="https://angonurse.vercel.app/angonurse-site.png">
    <link rel="icon" href="https://angonurse.vercel.app/favicon.ico">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
    `);
  }
  
  // Se for crawler, chamar Edge Function do Supabase
  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fudkxjayttzpgizgtram.supabase.co';
    const response = await fetch(`${supabaseUrl}/functions/v1/render-meta?path=${encodeURIComponent(path)}`, {
      headers: {
        'user-agent': userAgent,
      },
    });
    
    const html = await response.text();
    return res.status(200).setHeader('Content-Type', 'text/html').send(html);
  } catch (error) {
    console.error('Error calling render-meta:', error);
    // Fallback para index.html básico
    return res.status(200).send(`
<!doctype html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <title>Angonurse - Saúde, Bem-estar e Beleza</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="https://angonurse.vercel.app/favicon.ico">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
    `);
  }
}
