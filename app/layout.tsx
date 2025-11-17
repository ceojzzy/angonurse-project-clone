import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Angonurse - Saúde, Bem-estar e Beleza",
  description:
    "Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis.",
  metadataBase: new URL("https://angonurse.vercel.app"),
  openGraph: {
    title: "Angonurse - Saúde, Bem-estar e Beleza",
    description:
      "Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis.",
    url: "https://angonurse.vercel.app",
    siteName: "Angonurse",
    images: [
      {
        url: "/angonurse-site.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angonurse - Saúde, Bem-estar e Beleza",
    description:
      "Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis.",
    images: ["/angonurse-site.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
