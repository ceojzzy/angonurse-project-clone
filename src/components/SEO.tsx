import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string;
}

const SEO = ({
  title,
  description,
  canonical,
  image = "/angonurse-site.png",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "AngoNurse TV",
  keywords,
}: SEOProps) => {
  const siteUrl = "https://angonurse.vercel.app";
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const canonicalUrl = canonical || siteUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Angonurse" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
    </Helmet>
  );
};

export default SEO;
