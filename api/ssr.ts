import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import { join } from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userAgent = req.headers['user-agent'] || '';
  const path = req.url || '/';
  
  // Detectar crawlers das redes sociais
  const isCrawler = /facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot|pinterest|reddit/i.test(userAgent);
  
  console.log(`[SSR] Path: ${path}, User-Agent: ${userAgent}, isCrawler: ${isCrawler}`);
  
  // Se NÃO for crawler, servir a SPA normalmente
  if (!isCrawler) {
    try {
      // Ler o index.html compilado
      const htmlPath = join(process.cwd(), 'dist', 'index.html');
      const html = readFileSync(htmlPath, 'utf-8');
      
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
      return res.status(200).send(html);
    } catch (error) {
      console.error('[SSR] Erro ao ler index.html:', error);
      // Fallback para HTML básico
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(`<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Angonurse</title>
  <script type="module" crossorigin src="/assets/index.js"></script>
  <link rel="stylesheet" href="/assets/index.css">
</head>
<body>
  <div id="root"></div>
</body>
</html>`);
    }
  }
  
  // Se FOR crawler, chamar Edge Function do Supabase para gerar HTML com OG tags
  const supabaseUrl = 'https://fudkxjayttzpgizgtram.supabase.co';
  
  try {
    console.log(`[SSR] Chamando render-meta para crawler: ${path}`);
    
    const response = await fetch(`${supabaseUrl}/functions/v1/render-meta?path=${encodeURIComponent(path)}`, {
      headers: {
        'User-Agent': userAgent
      }
    });
    
    if (!response.ok) {
      throw new Error(`render-meta retornou ${response.status}`);
    }
    
    const html = await response.text();
    
    console.log(`[SSR] HTML gerado com sucesso para crawler`);
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(html);
  } catch (error) {
    console.error('[SSR] Erro ao chamar render-meta:', error);
    
    // Fallback: retornar HTML básico com meta tags padrão
    const fallbackHtml = `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Angonurse - Saúde, Bem-estar e Beleza</title>
  <meta name="description" content="Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis.">
  <meta property="og:title" content="Angonurse - Saúde, Bem-estar e Beleza">
  <meta property="og:description" content="Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://angonurse.vercel.app${path}">
  <meta property="og:image" content="https://angonurse.vercel.app/angonurse-site.png">
  <meta property="og:site_name" content="Angonurse">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Angonurse - Saúde, Bem-estar e Beleza">
  <meta name="twitter:description" content="Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis.">
  <meta name="twitter:image" content="https://angonurse.vercel.app/angonurse-site.png">
</head>
<body>
  <h1>Angonurse - Saúde, Bem-estar e Beleza</h1>
  <p>Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis.</p>
  <p>Visite <a href="https://angonurse.vercel.app${path}">https://angonurse.vercel.app${path}</a></p>
</body>
</html>`;
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(fallbackHtml);
  }
}
