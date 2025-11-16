import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/integrations/supabase/client";
import ArticleClient from "./ArticleClient";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

interface Article {
  title_pt: string;
  title_en: string;
  excerpt_pt?: string;
  excerpt_en?: string;
  content_pt?: string;
  content_en?: string;
  featured_image: string;
  slug: string;
  category_pt: string;
  created_at: string;
}

async function getArticle(slug: string) {
  const supabase = createClient();
  
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error || !article) {
    return null;
  }

  return article as Article;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: "Artigo não encontrado",
    };
  }

  const title = article.title_pt;
  const description = article.excerpt_pt || article.content_pt?.substring(0, 160) || "";
  const image = article.featured_image || "/angonurse-site.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://angonurse.vercel.app/artigo/${params.slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: "Angonurse",
      locale: "pt_PT",
      publishedTime: article.created_at,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return <ArticleClient initialArticle={article} />;
}
