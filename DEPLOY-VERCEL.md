# Deploy Next.js no Vercel

## 🚀 Passos para Deploy

### 1. Conectar ao GitHub
1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Import Project"
4. Selecione seu repositório

### 2. Configurar Variáveis de Ambiente
No painel da Vercel, adicione as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=https://fudkxjayttzpgizgtram.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu-supabase-anon-key
```

### 3. Deploy
- Framework Preset: **Next.js** (detectado automaticamente)
- Build Command: `next build` (padrão)
- Output Directory: `.next` (padrão)

Clique em **Deploy** e aguarde!

## ✅ Verificar OG Tags

Após o deploy, teste as meta tags dinâmicas:

### Facebook Debugger
https://developers.facebook.com/tools/debug/

Cole a URL de um artigo: `https://seu-dominio.vercel.app/artigo/slug-do-artigo`

### Twitter Card Validator
https://cards-dev.twitter.com/validator

### LinkedIn Post Inspector
https://www.linkedin.com/post-inspector/

### WhatsApp
Envie o link em uma conversa e veja o preview

## 🎯 Resultado Esperado

Com SSR do Next.js, as OG tags agora são:
- ✅ Geradas no servidor
- ✅ Visíveis para todos os crawlers
- ✅ Dinâmicas para cada artigo
- ✅ Carregadas antes do JavaScript

**Exatamente como funciona no Blogger!**

## 📝 Diferenças do Projeto Anterior

### Antes (SPA com Vite)
- ❌ OG tags só apareciam depois do JS carregar
- ❌ Crawlers não viam as meta tags dinâmicas
- ❌ Preview quebrado em redes sociais

### Agora (Next.js com SSR)
- ✅ HTML completo gerado no servidor
- ✅ OG tags presentes desde o primeiro byte
- ✅ Crawlers veem tudo perfeitamente
- ✅ Preview bonito em todas as redes sociais

## 🔧 Customização

Para customizar o domínio:
1. Vá em Settings → Domains
2. Adicione seu domínio customizado
3. Configure DNS conforme instruções

## 📊 Performance

Next.js otimiza automaticamente:
- Imagens (Next/Image)
- Código (code splitting)
- Fontes (next/font)
- CSS (CSS modules)

## 🐛 Troubleshooting

### Build falha
- Verifique se todas as dependências estão instaladas
- Confirme que `next`, `react` e `react-dom` estão no package.json

### OG tags não aparecem
- Aguarde alguns minutos (cache)
- Use "Fetch new information" nos debuggers
- Verifique se a função `generateMetadata` está exportada

### Imagens não carregam
- Adicione domínios em `next.config.mjs`:
```js
images: {
  domains: ['seu-dominio.supabase.co'],
}
```

## 📚 Recursos

- [Next.js Deploy](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
