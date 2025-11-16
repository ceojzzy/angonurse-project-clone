# Angonurse - Portal de Saúde, Bem-estar e Beleza

Portal de conteúdos sobre saúde, bem-estar e beleza, construído com **Next.js 15**, **Supabase** e **Tailwind CSS**.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com SSR (Server-Side Rendering)
- **Supabase** - Backend completo (Database, Auth, Storage)
- **Tailwind CSS** - Estilização
- **TypeScript** - Tipagem estática
- **Shadcn/ui** - Componentes UI modernos

## ✨ Funcionalidades

- ✅ **SSR nativo** para OG tags dinâmicas (funciona perfeitamente em redes sociais)
- ✅ Sistema de artigos com CMS admin
- ✅ Categorias (Saúde, Bem-estar, Beleza)
- ✅ Hero carousel customizável
- ✅ Newsletter
- ✅ Busca de artigos
- ✅ Autenticação de admin
- ✅ Multilíngue (Português/Inglês)
- ✅ SEO otimizado
- ✅ Design responsivo

## 🎯 OG Tags Dinâmicas (Diferencial!)

Este projeto usa **Next.js com SSR** para gerar HTML completo no servidor. Isso significa que crawlers de redes sociais (Facebook, WhatsApp, Twitter, LinkedIn) conseguem ver as meta tags corretamente - **exatamente como funciona no Blogger**!

### Como funciona:
```typescript
// app/artigo/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  
  return {
    title: article.title_pt,
    description: article.excerpt_pt,
    openGraph: {
      title: article.title_pt,
      images: [article.featured_image],
      type: 'article',
    },
  };
}
```

## 📦 Instalação Local

```bash
# 1. Clonar repositório
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local

# Edite .env.local com suas credenciais do Supabase:
# NEXT_PUBLIC_SUPABASE_URL=sua-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-key

# 4. Rodar em desenvolvimento
npm run dev
```

Acesse http://localhost:3000

## 🚀 Deploy na Vercel

### Opção 1: Via Lovable (Mais Fácil)
1. Abra o projeto no [Lovable](https://lovable.dev/projects/f6d80e70-fd36-43ee-a377-a2f2dba67519)
2. Clique em Share → Publish
3. Pronto!

### Opção 2: Deploy Manual na Vercel
1. Push do código para GitHub
2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em "Import Project"
4. Selecione seu repositório
5. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Deploy!

📖 **Veja instruções detalhadas em:** [`DEPLOY-VERCEL.md`](./DEPLOY-VERCEL.md)

## 📁 Estrutura do Projeto

```
angonurse/
├── app/                      # Next.js App Router (SSR)
│   ├── artigo/[slug]/       # Páginas de artigo com metadata dinâmica
│   ├── categoria/[cat]/     # Páginas de categoria
│   ├── admin/               # Dashboard admin
│   ├── auth/                # Login
│   ├── layout.tsx           # Layout principal
│   └── ...                  # Outras páginas
├── components/              # Componentes React
│   ├── ui/                  # Shadcn UI components
│   └── admin/               # Componentes do CMS
├── contexts/                # React Contexts (Auth, Language)
├── integrations/            # Supabase client
├── hooks/                   # Custom hooks
├── lib/                     # Funções utilitárias
├── src/                     # Assets e estilos
└── public/                  # Imagens e assets estáticos
```

## 🧪 Testar OG Tags Após Deploy

Depois do deploy, teste as meta tags dinâmicas:

- **Facebook:** [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter:** [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn:** [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- **WhatsApp:** Envie um link e veja o preview

## 🎨 Customização

### Design System
Edite `src/index.css` para customizar cores:
```css
:root {
  --primary: 142 76% 36%;    /* Verde principal */
  --secondary: 350 89% 60%;  /* Rosa secundário */
  /* ... */
}
```

### Componentes
Todos os componentes usam o design system e Shadcn/ui. Customize em `components/`

## 📝 Painel Admin

Acesse `/admin` para gerenciar:
- **Artigos**: Criar, editar, publicar artigos
- **Hero Slides**: Gerenciar carousel da homepage
- **Páginas**: Editar conteúdo de páginas estáticas

**Login:** `/auth`

## 🆚 Antes vs Depois (SPA → SSR)

### ❌ Antes (Vite SPA)
- OG tags só carregavam depois do JavaScript
- Crawlers não viam meta tags dinâmicas
- Preview quebrado em redes sociais

### ✅ Agora (Next.js SSR)
- HTML completo gerado no servidor
- OG tags presentes desde o primeiro byte
- Crawlers veem tudo perfeitamente
- Preview bonito em todas as redes sociais

## 📚 Documentação

- [Migração Next.js](./MIGRACAO-NEXTJS.md) - Detalhes da migração
- [Deploy Vercel](./DEPLOY-VERCEL.md) - Guia completo de deploy
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Lovable Docs](https://docs.lovable.dev)

## 🔗 Links Úteis

- **Projeto Lovable:** https://lovable.dev/projects/f6d80e70-fd36-43ee-a377-a2f2dba67519
- **Site:** https://angonurse.vercel.app

## 📄 Licença

© 2025 Angonurse. Todos os direitos reservados.
