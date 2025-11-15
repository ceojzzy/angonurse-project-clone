import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userAgent = req.headers['user-agent'] || '';
  const path = req.url || '/';
  
  // Detectar crawlers das redes sociais
  const isCrawler = /facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot/i.test(userAgent);
  
  // Se não for crawler, servir a SPA (index.html será servido pelo Vercel)
  if (!isCrawler) {
    // Reescrever para index.html internamente
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Angonurse</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`);
  }
  
  // Se for crawler, chamar Edge Function do Supabase
  try {
    const supabaseUrl = 'https://fudkxjayttzpgizgtram.supabase.co';
    const response = await fetch(`${supabaseUrl}/functions/v1/render-meta?path=${encodeURIComponent(path)}`, {
      headers: {
        'user-agent': userAgent,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Edge function returned ${response.status}`);
    }
    
    const html = await response.text();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.status(200).send(html);
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
