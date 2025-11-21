# Guia Completo: Migração de Vite (SPA) para Next.js 15 (SSR)

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Por Que Migrar?](#por-que-migrar)
3. [Pré-requisitos](#pré-requisitos)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Passo a Passo da Migração](#passo-a-passo-da-migração)
6. [Problemas Comuns e Soluções](#problemas-comuns-e-soluções)
7. [Checklist Final](#checklist-final)

---

## 🎯 Visão Geral

Esta é uma migração de uma aplicação **React + Vite (SPA)** para **Next.js 15 com App Router (SSR/SSG)**. 

### O que mudou:
- **Antes**: Client-Side Rendering (CSR) - todo o conteúdo renderizado no navegador
- **Depois**: Server-Side Rendering (SSR) - conteúdo renderizado no servidor

### Benefícios principais:
✅ **OG Tags Dinâmicas** funcionam em redes sociais (Facebook, Twitter, WhatsApp)  
✅ **SEO Melhorado** - crawlers veem o conteúdo completo  
✅ **Performance** - Otimizações automáticas do Next.js  
✅ **Image Optimization** - Next.js Image API  

---

## 🤔 Por Que Migrar?

### Problema com Vite (SPA):
```html
<!-- O que redes sociais veem em SPAs: -->
<html>
  <head>
    <meta property="og:title" content="Título Estático Genérico">
    <meta property="og:image" content="/logo.png">
  </head>
  <body>
    <div id="root"></div> <!-- Vazio! -->
    <script src="/bundle.js"></script>
  </body>
</html>
```
❌ Crawlers de redes sociais **não executam JavaScript**  
❌ Sempre mostram meta tags genéricas  
❌ Não conseguem pré-visualizar artigos específicos  

### Solução com Next.js (SSR):
```html
<!-- O que redes sociais veem com SSR: -->
<html>
  <head>
    <meta property="og:title" content="Como a IA Está Transformando a Saúde">
    <meta property="og:image" content="https://cdn.com/artigo-ia-saude.jpg">
    <meta property="og:description" content="Descubra como...">
  </head>
  <body>
    <article>
      <h1>Como a IA Está Transformando a Saúde</h1>
      <p>Todo o conteúdo já renderizado aqui...</p>
    </article>
  </body>
</html>
```
✅ Crawlers veem conteúdo completo  
✅ Meta tags dinâmicas por página  
✅ Previews perfeitas em redes sociais  

---

## 📦 Pré-requisitos

```bash
# Versões necessárias
Node.js >= 18.17
npm ou bun

# Instalar Next.js 15
npm install next@latest react@latest react-dom@latest
```

---

## 📁 Estrutura de Pastas

### Antes (Vite):
```
projeto-vite/
├── src/
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Entry point
│   ├── components/
│   ├── pages/           # Páginas com React Router
│   └── index.css
├── public/
├── index.html           # HTML base
└── vite.config.ts
```

### Depois (Next.js):
```
projeto-nextjs/
├── app/                 # 🆕 App Router (Next.js 15)
│   ├── layout.tsx       # Layout raiz
│   ├── page.tsx         # Página inicial (/)
│   ├── globals.css      # Estilos globais
│   ├── artigo/
│   │   └── [slug]/
│   │       └── page.tsx # Rota dinâmica (/artigo/meu-artigo)
│   └── categoria/
│       └── [category]/
│           └── page.tsx # (/categoria/saude)
├── components/          # Componentes reutilizáveis
├── src/                 # Mantém código legado durante migração
├── public/              # Assets estáticos
└── next.config.mjs      # Configuração Next.js
```

---

## 🚀 Passo a Passo da Migração

### **1. Instalar Next.js e Dependências**

```bash
npm install next@latest react@latest react-dom@latest

# Se usar Supabase
npm install @supabase/ssr

# Manter dependências do Vite temporariamente para referência
```

---

### **2. Criar Arquivos de Configuração**

#### `next.config.mjs`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Otimização de imagens
  images: {
    domains: ['fudkxjayttzpgizgtram.supabase.co'], // Seu domínio Supabase
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  
  // Transpile pacotes que não são ESM
  transpilePackages: ['lucide-react'],
  
  // Durante migração (remover após concluir)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

---

### **3. Criar Layout Raiz (`app/layout.tsx`)**

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Angonurse - Portal de Saúde, Bem-estar e Beleza",
  description: "Explore artigos sobre saúde, bem-estar e beleza em Angola",
  openGraph: {
    title: "Angonurse",
    description: "Portal de Saúde, Bem-estar e Beleza",
    type: "website",
    locale: "pt_PT",
    siteName: "Angonurse",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

### **4. Criar Providers (`app/providers.tsx`)**

```typescript
"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

---

### **5. Converter Páginas para App Router**

#### ❌ Antes (Vite com React Router):
```typescript
// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase.from('articles').select('*');
      setArticles(data);
    };
    fetchArticles();
  }, []);
  
  return <div>{/* Renderizar artigos */}</div>;
}
```

#### ✅ Depois (Next.js App Router):
```typescript
// app/page.tsx (Server Component por padrão)
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedArticles from "@/components/FeaturedArticles";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedArticles />
      </main>
    </div>
  );
}
```

---

### **6. Criar Rotas Dinâmicas com Metadata**

#### Rota de Artigo (`app/artigo/[slug]/page.tsx`):
```typescript
import { Metadata } from "next";
import { createClient } from "@/integrations/supabase/server";
import ArticleClient from "./ArticleClient";

// Gerar metadata dinâmica (OG tags)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!article) {
    return {
      title: "Artigo não encontrado",
    };
  }

  return {
    title: article.title_pt,
    description: article.excerpt_pt,
    openGraph: {
      title: article.title_pt,
      description: article.excerpt_pt,
      images: [
        {
          url: article.featured_image,
          width: 1200,
          height: 630,
          alt: article.title_pt,
        },
      ],
      type: "article",
      publishedTime: article.created_at,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title_pt,
      description: article.excerpt_pt,
      images: [article.featured_image],
    },
  };
}

// Server Component que busca dados
export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!article) {
    return <div>Artigo não encontrado</div>;
  }

  // Passar dados para Client Component
  return <ArticleClient article={article} />;
}
```

#### Client Component (`app/artigo/[slug]/ArticleClient.tsx`):
```typescript
"use client"; // Marca como Client Component

import { useLanguage } from "@/contexts/LanguageContext";
import RichContent from "@/components/RichContent";

export default function ArticleClient({ article }: { article: any }) {
  const { language } = useLanguage();
  
  const title = language === "pt" ? article.title_pt : article.title_en;
  const content = language === "pt" ? article.content_pt : article.content_en;

  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      <RichContent content={content} isHtml={true} />
    </article>
  );
}
```

---

### **7. Adaptar Componentes para Next.js**

#### ✅ Componentes que usam hooks → `"use client"`

```typescript
"use client"; // 🔴 OBRIGATÓRIO para hooks

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  
  return (
    <header>
      {/* ... */}
    </header>
  );
}
```

#### ✅ Substituir `<img>` por `<Image>` do Next.js

```typescript
// ❌ Antes
<img src="/logo.png" alt="Logo" />

// ✅ Depois
import Image from "next/image";

<Image
  src="/logo.png"
  alt="Logo"
  width={120}
  height={40}
  priority // Para imagens above-the-fold
/>
```

#### ✅ Substituir `<a>` e `react-router-dom` por `<Link>` do Next.js

```typescript
// ❌ Antes (React Router)
import { Link } from "react-router-dom";
<Link to="/artigo/meu-artigo">Ler mais</Link>

// ✅ Depois (Next.js)
import Link from "next/link";
<Link href="/artigo/meu-artigo">Ler mais</Link>
```

---

### **8. Configurar Supabase para SSR**

#### Criar cliente para Server Components (`src/integrations/supabase/server.ts`):
```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignorar se chamado de Server Component
          }
        },
      },
    }
  );
}
```

#### Cliente para Client Components (`src/integrations/supabase/client.ts`):
```typescript
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createClient = () => createSupabaseClient(supabaseUrl, supabaseAnonKey);
export const supabase = createClient();
```

---

### **9. Middleware para Autenticação**

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Proteger rotas admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Verificar autenticação
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

---

### **10. Assets: Public vs src/assets**

#### Regra:
- **`public/`**: Para assets referenciados diretamente em HTML/CSS ou Next.js Image
- **`src/assets/`**: Para assets importados como módulos ES6

```typescript
// ✅ public/ - Acesso direto
<Image src="/logo.png" alt="Logo" width={100} height={50} />

// ✅ src/assets/ - Import ES6
import heroImage from "@/assets/hero.jpg";
<Image src={heroImage} alt="Hero" />
```

---

## ⚠️ Problemas Comuns e Soluções

### 1. **"use client" é necessário?**
✅ **SIM** para componentes que usam:
- `useState`, `useEffect`, `useContext`
- Event handlers (`onClick`, `onChange`)
- Hooks personalizados que usam hooks do React

❌ **NÃO** para componentes que:
- Apenas renderizam UI estática
- Buscam dados no servidor (Server Components)

---

### 2. **Imagens não carregam**

#### Problema:
```bash
Error: Invalid src prop (https://supabase.co/storage/image.jpg) on `next/image`
```

#### Solução:
Adicionar domínio em `next.config.mjs`:
```javascript
images: {
  domains: ['seu-dominio.supabase.co'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**.supabase.co',
    },
  ],
},
```

---

### 3. **Hydration Mismatch**

#### Problema:
```bash
Error: Hydration failed because the initial UI does not match what was rendered on the server
```

#### Causa comum:
Renderizar conteúdo diferente no servidor e cliente (ex: `Date.now()`, `Math.random()`).

#### Solução:
```typescript
"use client";
import { useEffect, useState } from "react";

export default function Component() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <div>{/* Conteúdo que depende do cliente */}</div>;
}
```

---

### 4. **Supabase Auth não funciona**

Use o cliente correto:
- **Server Components**: `createClient()` de `@/integrations/supabase/server`
- **Client Components**: `createClient()` de `@/integrations/supabase/client`

---

### 5. **Rotas antigas do React Router**

#### Antes (React Router):
```typescript
<Route path="/artigo/:slug" element={<ArticlePage />} />
```

#### Depois (Next.js):
Criar pasta `app/artigo/[slug]/page.tsx`

---

## ✅ Checklist Final

### Antes do Deploy:
- [ ] Todas as páginas migradas para `app/`
- [ ] Componentes com hooks marcados como `"use client"`
- [ ] `<img>` substituídos por `<Image>`
- [ ] Links usando `next/link` em vez de `react-router-dom`
- [ ] Metadata dinâmica configurada para SEO
- [ ] Domínios de imagem configurados em `next.config.mjs`
- [ ] Variáveis de ambiente configuradas (`.env.local`)
- [ ] Build sem erros: `npm run build`

### Testar em Produção:
- [ ] OG tags funcionando (testar com [Facebook Debugger](https://developers.facebook.com/tools/debug/))
- [ ] Todas as rotas acessíveis
- [ ] Imagens carregando corretamente
- [ ] Autenticação funcionando
- [ ] Performance no [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 🚀 Deploy

### Vercel (Recomendado):
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Produção
vercel --prod
```

### Variáveis de Ambiente:
No painel da Vercel, adicionar:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui
```

---

## 📚 Recursos

- [Next.js 15 Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Supabase SSR Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)

---

## 🎉 Conclusão

Após esta migração, sua aplicação terá:
✅ SEO perfeito  
✅ OG tags dinâmicas  
✅ Performance superior  
✅ Escalabilidade melhorada  

**Boa sorte com suas próximas migrações!** 🚀
