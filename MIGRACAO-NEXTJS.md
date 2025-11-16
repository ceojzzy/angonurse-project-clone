# Migração para Next.js 15 - Status

## ✅ Concluído

### Estrutura Base
- ✅ Instalado Next.js 15 com App Router
- ✅ Criado `next.config.mjs` com configurações otimizadas
- ✅ Criado `app/layout.tsx` com providers e metadata base
- ✅ Criado `app/globals.css` importando estilos do src

### Páginas Migradas
- ✅ `app/page.tsx` - Página inicial
- ✅ `app/artigo/[slug]/page.tsx` - Página de artigo com **metadata dinâmica**
- ✅ `app/categoria/[category]/page.tsx` - Página de categoria
- ✅ `app/admin/page.tsx` - Dashboard admin
- ✅ `app/auth/page.tsx` - Login
- ✅ `app/quem-somos/page.tsx` - Quem Somos
- ✅ `app/not-found.tsx` - 404

### Componentes Atualizados
- ✅ `components/NavLink.tsx` - Adaptado para Next.js (usePathname)
- ✅ `components/Header.tsx` - Usando Next.js Link e Image
- ✅ `components/Hero.tsx` - Usando Next.js Link e OptimizedImage
- ✅ `components/OptimizedImage.tsx` - Usando Next.js Image API

### Configurações
- ✅ `middleware.ts` - Middleware básico
- ✅ `vercel.json` - Removido rewrites (Next.js gerencia automaticamente)

## 🔄 Ainda Falta Migrar

### Páginas Restantes
- ⏳ Contato
- ⏳ Cookies
- ⏳ Disclaimer
- ⏳ Equipe
- ⏳ FAQ
- ⏳ Newsletter
- ⏳ Nossa Missão
- ⏳ Parceiros
- ⏳ Política de Privacidade
- ⏳ Quiz
- ⏳ Sitemap
- ⏳ Termos de Uso

### Componentes a Atualizar
- ⏳ Atualizar todos os componentes que usam `<a>` para `<Link>`
- ⏳ Atualizar todos os `<img>` para `<Image>` do Next.js
- ⏳ Adicionar `'use client'` nos componentes que usam hooks/estado
- ⏳ Categories, FeaturedArticles, RecentArticles, etc.

## 🎯 Benefícios da Migração

### SSR Real (Server-Side Rendering)
✅ **OG Tags Dinâmicas**: Agora as meta tags são geradas no servidor e funcionam perfeitamente com crawlers de redes sociais (Facebook, Twitter, LinkedIn, WhatsApp)

✅ **SEO Melhorado**: Todo conteúdo é renderizado no servidor, melhorando indexação

✅ **Performance**: Next.js otimiza automaticamente imagens, código e carregamento

### Metadata API
```typescript
// Exemplo de metadata dinâmica em app/artigo/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  
  return {
    title: article.title_pt,
    description: article.excerpt_pt,
    openGraph: {
      title: article.title_pt,
      description: article.excerpt_pt,
      images: [article.featured_image],
      type: 'article',
    },
  };
}
```

## 📝 Próximos Passos

1. **Migrar páginas restantes** para `app/` seguindo o padrão das já migradas
2. **Atualizar componentes** para usar Next.js APIs (Link, Image)
3. **Testar rotas** e funcionalidades
4. **Deploy no Vercel** (Next.js é otimizado para Vercel)
5. **Testar OG tags** com Facebook Debugger e outros validadores

## 🧪 Testar OG Tags

Após o deploy, teste com:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
