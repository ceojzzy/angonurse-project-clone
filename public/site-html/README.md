# Angonurse - Versão HTML Puro

Este é um guia completo para criar a versão HTML pura do site Angonurse, conectado ao Supabase, com meta tags OG dinâmicas.

## 📁 Estrutura de Pastas

```
site-html/
├── index.html
├── artigo.html
├── categoria.html
├── css/
│   └── styles.css
├── js/
│   ├── config.js
│   ├── supabase-client.js
│   ├── meta-tags.js
│   ├── home.js
│   ├── artigo.js
│   └── categoria.js
├── assets/
│   ├── angonurse-logo.png
│   └── angonurse-text-logo.png
└── README.md
```

## ⚙️ Configuração do Supabase

### 1. config.js
```javascript
// js/config.js
const SUPABASE_CONFIG = {
  url: 'https://fudkxjayttzpgizgtram.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1ZGt4amF5dHR6cGdpemd0cmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MzkxNjgsImV4cCI6MjA3ODExNTE2OH0.3V1NGt0gAGS4l1tGnFPB1E7TCh6LeNpvUI4mWLRQ3Bg'
};

const SITE_CONFIG = {
  url: 'https://angonurse.vercel.app',
  name: 'Angonurse',
  description: 'Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis.',
  defaultImage: '/angonurse-site.png'
};
```

### 2. supabase-client.js
```javascript
// js/supabase-client.js
class SupabaseClient {
  constructor(url, key) {
    this.url = url;
    this.key = key;
    this.headers = {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json'
    };
  }

  async query(table, options = {}) {
    const { select = '*', eq, order, limit, single } = options;
    
    let url = `${this.url}/rest/v1/${table}?select=${select}`;
    
    if (eq) {
      Object.keys(eq).forEach(key => {
        url += `&${key}=eq.${eq[key]}`;
      });
    }
    
    if (order) {
      url += `&order=${order.column}.${order.ascending ? 'asc' : 'desc'}`;
    }
    
    if (limit) {
      url += `&limit=${limit}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers
    });

    const data = await response.json();
    
    if (single) {
      return { data: data[0] || null, error: null };
    }
    
    return { data, error: null };
  }
}

const supabase = new SupabaseClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
```

### 3. meta-tags.js
```javascript
// js/meta-tags.js
class MetaTags {
  static update(data) {
    const {
      title,
      description,
      image = SITE_CONFIG.defaultImage,
      type = 'website',
      url = window.location.href
    } = data;

    // Atualizar title
    document.title = title;

    // Atualizar ou criar meta tags
    this.setMetaTag('name', 'description', description);
    this.setMetaTag('property', 'og:title', title);
    this.setMetaTag('property', 'og:description', description);
    this.setMetaTag('property', 'og:type', type);
    this.setMetaTag('property', 'og:url', url);
    this.setMetaTag('property', 'og:image', image);
    this.setMetaTag('property', 'og:image:secure_url', image);
    this.setMetaTag('property', 'og:image:width', '1200');
    this.setMetaTag('property', 'og:image:height', '630');
    this.setMetaTag('property', 'og:site_name', SITE_CONFIG.name);
    this.setMetaTag('name', 'twitter:card', 'summary_large_image');
    this.setMetaTag('name', 'twitter:title', title);
    this.setMetaTag('name', 'twitter:description', description);
    this.setMetaTag('name', 'twitter:image', image);
    
    // Atualizar canonical
    this.setLinkTag('canonical', url);
  }

  static setMetaTag(attr, key, content) {
    let element = document.querySelector(`meta[${attr}="${key}"]`);
    
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, key);
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', content);
  }

  static setLinkTag(rel, href) {
    let element = document.querySelector(`link[rel="${rel}"]`);
    
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      document.head.appendChild(element);
    }
    
    element.setAttribute('href', href);
  }
}
```

## 📄 Páginas HTML

### 1. index.html (Página Inicial)
```html
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Angonurse - Saúde, Bem-estar e Beleza</title>
  <meta name="description" content="Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis.">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Angonurse - Saúde, Bem-estar e Beleza">
  <meta property="og:description" content="Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://angonurse.vercel.app">
  <meta property="og:image" content="https://angonurse.vercel.app/angonurse-site.png">
  <meta property="og:site_name" content="Angonurse">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Angonurse - Saúde, Bem-estar e Beleza">
  <meta name="twitter:description" content="Portal de conteúdos sobre saúde, bem-estar, beleza, tratamentos, autocuidado e receitas saudáveis.">
  <meta name="twitter:image" content="https://angonurse.vercel.app/angonurse-site.png">
  
  <link rel="canonical" href="https://angonurse.vercel.app">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>
    <nav class="navbar">
      <div class="container">
        <a href="index.html" class="logo">
          <img src="assets/angonurse-logo.png" alt="Angonurse Logo">
        </a>
        <ul class="nav-links">
          <li><a href="index.html">Início</a></li>
          <li><a href="categoria.html?cat=saude">Saúde</a></li>
          <li><a href="categoria.html?cat=bem-estar">Bem-estar</a></li>
          <li><a href="categoria.html?cat=beleza">Beleza</a></li>
          <li><a href="categoria.html?cat=receitas">Receitas</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <main>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>Bem-vindo ao Angonurse</h1>
        <p>Seu portal de saúde, bem-estar e beleza</p>
      </div>
    </section>

    <!-- Featured Articles -->
    <section class="featured-articles">
      <div class="container">
        <h2>Artigos em Destaque</h2>
        <div id="featured-grid" class="articles-grid">
          <!-- Carregado via JavaScript -->
        </div>
      </div>
    </section>

    <!-- Recent Articles -->
    <section class="recent-articles">
      <div class="container">
        <h2>Artigos Recentes</h2>
        <div id="recent-grid" class="articles-grid">
          <!-- Carregado via JavaScript -->
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <p>&copy; 2025 Angonurse. Todos os direitos reservados.</p>
    </div>
  </footer>

  <script src="js/config.js"></script>
  <script src="js/supabase-client.js"></script>
  <script src="js/meta-tags.js"></script>
  <script src="js/home.js"></script>
</body>
</html>
```

### 2. artigo.html (Página de Artigo)
```html
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carregando...</title>
  <meta name="description" content="Carregando artigo...">
  
  <!-- Meta tags serão atualizadas dinamicamente -->
  <meta property="og:title" content="Angonurse">
  <meta property="og:description" content="Portal de saúde, bem-estar e beleza">
  <meta property="og:type" content="article">
  <meta property="og:url" content="">
  <meta property="og:image" content="">
  <meta property="og:site_name" content="Angonurse">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Angonurse">
  <meta name="twitter:description" content="Portal de saúde, bem-estar e beleza">
  <meta name="twitter:image" content="">
  
  <link rel="canonical" href="">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>
    <nav class="navbar">
      <div class="container">
        <a href="index.html" class="logo">
          <img src="assets/angonurse-logo.png" alt="Angonurse Logo">
        </a>
        <ul class="nav-links">
          <li><a href="index.html">Início</a></li>
          <li><a href="categoria.html?cat=saude">Saúde</a></li>
          <li><a href="categoria.html?cat=bem-estar">Bem-estar</a></li>
          <li><a href="categoria.html?cat=beleza">Beleza</a></li>
          <li><a href="categoria.html?cat=receitas">Receitas</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <main>
    <article class="article-page">
      <div class="container">
        <!-- Loading State -->
        <div id="loading" class="loading">
          <p>Carregando artigo...</p>
        </div>

        <!-- Article Content -->
        <div id="article-content" style="display: none;">
          <img id="article-image" class="article-featured-image" src="" alt="">
          <div class="article-meta">
            <span id="article-category" class="category-badge"></span>
            <time id="article-date"></time>
          </div>
          <h1 id="article-title"></h1>
          <div id="article-excerpt" class="article-excerpt"></div>
          <div id="article-body" class="article-body"></div>
        </div>

        <!-- Not Found -->
        <div id="not-found" class="not-found" style="display: none;">
          <h1>Artigo não encontrado</h1>
          <p>O artigo que você procura não existe ou foi removido.</p>
          <a href="index.html" class="btn">Voltar para o início</a>
        </div>
      </div>
    </article>

    <!-- Related Articles -->
    <section class="related-articles">
      <div class="container">
        <h2>Artigos Relacionados</h2>
        <div id="related-grid" class="articles-grid">
          <!-- Carregado via JavaScript -->
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <p>&copy; 2025 Angonurse. Todos os direitos reservados.</p>
    </div>
  </footer>

  <script src="js/config.js"></script>
  <script src="js/supabase-client.js"></script>
  <script src="js/meta-tags.js"></script>
  <script src="js/artigo.js"></script>
</body>
</html>
```

### 3. categoria.html (Página de Categoria)
```html
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Categoria - Angonurse</title>
  <meta name="description" content="Explore artigos sobre saúde, bem-estar e beleza">
  
  <meta property="og:title" content="Categoria - Angonurse">
  <meta property="og:description" content="Explore artigos sobre saúde, bem-estar e beleza">
  <meta property="og:type" content="website">
  <meta property="og:url" content="">
  <meta property="og:image" content="https://angonurse.vercel.app/angonurse-site.png">
  <meta property="og:site_name" content="Angonurse">
  
  <link rel="canonical" href="">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>
    <nav class="navbar">
      <div class="container">
        <a href="index.html" class="logo">
          <img src="assets/angonurse-logo.png" alt="Angonurse Logo">
        </a>
        <ul class="nav-links">
          <li><a href="index.html">Início</a></li>
          <li><a href="categoria.html?cat=saude">Saúde</a></li>
          <li><a href="categoria.html?cat=bem-estar">Bem-estar</a></li>
          <li><a href="categoria.html?cat=beleza">Beleza</a></li>
          <li><a href="categoria.html?cat=receitas">Receitas</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <main>
    <section class="category-page">
      <div class="container">
        <h1 id="category-title">Categoria</h1>
        
        <div id="loading" class="loading">
          <p>Carregando artigos...</p>
        </div>

        <div id="articles-grid" class="articles-grid">
          <!-- Carregado via JavaScript -->
        </div>

        <div id="no-articles" class="no-articles" style="display: none;">
          <p>Nenhum artigo encontrado nesta categoria.</p>
          <a href="index.html" class="btn">Voltar para o início</a>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <p>&copy; 2025 Angonurse. Todos os direitos reservados.</p>
    </div>
  </footer>

  <script src="js/config.js"></script>
  <script src="js/supabase-client.js"></script>
  <script src="js/meta-tags.js"></script>
  <script src="js/categoria.js"></script>
</body>
</html>
```

## 🎨 CSS

### styles.css
```css
/* css/styles.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #10b981;
  --secondary-color: #3b82f6;
  --text-color: #1f2937;
  --text-light: #6b7280;
  --bg-color: #ffffff;
  --bg-light: #f9fafb;
  --border-color: #e5e7eb;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--text-color);
  line-height: 1.6;
  background-color: var(--bg-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header & Navigation */
.navbar {
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  height: 40px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--primary-color);
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

/* Articles Grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.article-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.article-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.article-card-content {
  padding: 1.5rem;
}

.category-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--primary-color);
  color: white;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.article-card h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

.article-card p {
  color: var(--text-light);
  font-size: 0.95rem;
}

.article-date {
  color: var(--text-light);
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
}

/* Article Page */
.article-page {
  padding: 2rem 0;
}

.article-featured-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.article-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.article-page h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.article-excerpt {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.article-body {
  font-size: 1.1rem;
  line-height: 1.8;
}

.article-body h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-body p {
  margin-bottom: 1rem;
}

.article-body img {
  max-width: 100%;
  border-radius: 8px;
  margin: 1.5rem 0;
}

/* Loading & Error States */
.loading,
.not-found,
.no-articles {
  text-align: center;
  padding: 4rem 2rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 1rem;
  transition: background 0.3s;
}

.btn:hover {
  background: #059669;
}

/* Footer */
footer {
  background: var(--bg-light);
  border-top: 1px solid var(--border-color);
  padding: 2rem 0;
  margin-top: 4rem;
  text-align: center;
}

/* Sections */
section {
  padding: 3rem 0;
}

section h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links {
    gap: 1rem;
    font-size: 0.9rem;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .article-page h1 {
    font-size: 2rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }
}
```

## 📜 Scripts JavaScript

### 1. home.js
```javascript
// js/home.js
async function loadHomePage() {
  try {
    // Carregar artigos em destaque
    const { data: featured } = await supabase.query('articles', {
      select: 'id, title_pt, excerpt_pt, featured_image, slug, category_pt, created_at',
      eq: { published: true, featured: true },
      order: { column: 'created_at', ascending: false },
      limit: 3
    });

    if (featured && featured.length > 0) {
      renderArticles(featured, 'featured-grid');
    }

    // Carregar artigos recentes
    const { data: recent } = await supabase.query('articles', {
      select: 'id, title_pt, excerpt_pt, featured_image, slug, category_pt, created_at',
      eq: { published: true },
      order: { column: 'created_at', ascending: false },
      limit: 6
    });

    if (recent && recent.length > 0) {
      renderArticles(recent, 'recent-grid');
    }
  } catch (error) {
    console.error('Erro ao carregar página inicial:', error);
  }
}

function renderArticles(articles, containerId) {
  const container = document.getElementById(containerId);
  
  container.innerHTML = articles.map(article => `
    <a href="artigo.html?slug=${article.slug}" class="article-card">
      <img src="${article.featured_image}" alt="${article.title_pt}">
      <div class="article-card-content">
        <span class="category-badge">${article.category_pt}</span>
        <h3>${article.title_pt}</h3>
        <p>${article.excerpt_pt || ''}</p>
        <span class="article-date">${formatDate(article.created_at)}</span>
      </div>
    </a>
  `).join('');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-PT', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Carregar ao carregar a página
document.addEventListener('DOMContentLoaded', loadHomePage);
```

### 2. artigo.js
```javascript
// js/artigo.js
async function loadArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  if (!slug) {
    showNotFound();
    return;
  }

  try {
    const { data: article } = await supabase.query('articles', {
      select: '*',
      eq: { slug: slug, published: true },
      single: true
    });

    if (!article) {
      showNotFound();
      return;
    }

    // Atualizar meta tags dinamicamente
    MetaTags.update({
      title: article.title_pt,
      description: article.excerpt_pt || article.content_pt?.substring(0, 160),
      image: article.featured_image,
      type: 'article',
      url: `${SITE_CONFIG.url}/site-html/artigo.html?slug=${slug}`
    });

    // Renderizar artigo
    document.getElementById('loading').style.display = 'none';
    document.getElementById('article-content').style.display = 'block';
    
    document.getElementById('article-image').src = article.featured_image;
    document.getElementById('article-image').alt = article.title_pt;
    document.getElementById('article-category').textContent = article.category_pt;
    document.getElementById('article-date').textContent = formatDate(article.created_at);
    document.getElementById('article-title').textContent = article.title_pt;
    document.getElementById('article-excerpt').textContent = article.excerpt_pt || '';
    document.getElementById('article-body').innerHTML = article.content_pt || '';

    // Carregar artigos relacionados
    loadRelatedArticles(article.category_pt, article.id);

  } catch (error) {
    console.error('Erro ao carregar artigo:', error);
    showNotFound();
  }
}

async function loadRelatedArticles(category, excludeId) {
  try {
    const { data: related } = await supabase.query('articles', {
      select: 'id, title_pt, excerpt_pt, featured_image, slug, category_pt, created_at',
      eq: { published: true, category_pt: category },
      order: { column: 'created_at', ascending: false },
      limit: 3
    });

    if (related && related.length > 0) {
      const filtered = related.filter(article => article.id !== excludeId);
      renderArticles(filtered, 'related-grid');
    }
  } catch (error) {
    console.error('Erro ao carregar artigos relacionados:', error);
  }
}

function renderArticles(articles, containerId) {
  const container = document.getElementById(containerId);
  
  container.innerHTML = articles.map(article => `
    <a href="artigo.html?slug=${article.slug}" class="article-card">
      <img src="${article.featured_image}" alt="${article.title_pt}">
      <div class="article-card-content">
        <span class="category-badge">${article.category_pt}</span>
        <h3>${article.title_pt}</h3>
        <p>${article.excerpt_pt || ''}</p>
        <span class="article-date">${formatDate(article.created_at)}</span>
      </div>
    </a>
  `).join('');
}

function showNotFound() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('not-found').style.display = 'block';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-PT', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

document.addEventListener('DOMContentLoaded', loadArticle);
```

### 3. categoria.js
```javascript
// js/categoria.js
async function loadCategory() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('cat');

  if (!category) {
    window.location.href = 'index.html';
    return;
  }

  // Mapear categorias
  const categoryMap = {
    'saude': 'Saúde',
    'bem-estar': 'Bem-estar',
    'beleza': 'Beleza',
    'receitas': 'Receitas'
  };

  const categoryName = categoryMap[category] || category;
  document.getElementById('category-title').textContent = categoryName;

  // Atualizar meta tags
  MetaTags.update({
    title: `${categoryName} - Angonurse`,
    description: `Explore artigos sobre ${categoryName.toLowerCase()} no Angonurse`,
    url: `${SITE_CONFIG.url}/site-html/categoria.html?cat=${category}`
  });

  try {
    const { data: articles } = await supabase.query('articles', {
      select: 'id, title_pt, excerpt_pt, featured_image, slug, category_pt, created_at',
      eq: { published: true, category_pt: categoryName },
      order: { column: 'created_at', ascending: false }
    });

    document.getElementById('loading').style.display = 'none';

    if (articles && articles.length > 0) {
      renderArticles(articles, 'articles-grid');
    } else {
      document.getElementById('no-articles').style.display = 'block';
    }
  } catch (error) {
    console.error('Erro ao carregar categoria:', error);
    document.getElementById('loading').style.display = 'none';
    document.getElementById('no-articles').style.display = 'block';
  }
}

function renderArticles(articles, containerId) {
  const container = document.getElementById(containerId);
  
  container.innerHTML = articles.map(article => `
    <a href="artigo.html?slug=${article.slug}" class="article-card">
      <img src="${article.featured_image}" alt="${article.title_pt}">
      <div class="article-card-content">
        <span class="category-badge">${article.category_pt}</span>
        <h3>${article.title_pt}</h3>
        <p>${article.excerpt_pt || ''}</p>
        <span class="article-date">${formatDate(article.created_at)}</span>
      </div>
    </a>
  `).join('');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-PT', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

document.addEventListener('DOMContentLoaded', loadCategory);
```

## ⚠️ IMPORTANTE: Limitações das OG Tags Dinâmicas

### O Problema
Crawlers de redes sociais (Facebook, Twitter, LinkedIn, WhatsApp) **NÃO executam JavaScript**. Eles apenas leem o HTML inicial da página.

Nesta implementação:
- ✅ As meta tags são atualizadas dinamicamente via JavaScript
- ✅ Usuários normais veem o conteúdo correto
- ❌ **Crawlers NÃO veem as meta tags atualizadas**

### Soluções Possíveis

#### Solução 1: Usar a Edge Function (RECOMENDADA)
A edge function `render-meta` já existe no projeto e detecta crawlers, gerando HTML com meta tags corretas.

**Como usar:**
1. Manter esta versão HTML em `public/site-html/`
2. Crawlers continuam usando a edge function via `api/ssr.ts`
3. Usuários podem acessar diretamente `/site-html/` se quiserem

#### Solução 2: Pré-renderização no Build
Gerar arquivos HTML estáticos para cada artigo durante o build.

#### Solução 3: Serviço de Pré-renderização
Usar serviços como Prerender.io que renderizam páginas JavaScript para crawlers.

## 🚀 Como Usar

1. Copie todos os arquivos para a pasta `public/site-html/`
2. Acesse via: `https://seusite.com/site-html/index.html`
3. Para usuários normais: funcionará perfeitamente
4. Para crawlers: as OG tags não serão dinâmicas (use uma das soluções acima)

## 📝 Estrutura do Banco de Dados

A estrutura esperada da tabela `articles`:
```sql
- id (uuid)
- title_pt (text)
- title_en (text)
- excerpt_pt (text)
- excerpt_en (text)
- content_pt (text)
- content_en (text)
- featured_image (text)
- slug (text, unique)
- category_pt (text)
- category_en (text)
- published (boolean)
- featured (boolean)
- created_at (timestamp)
```

## 🔒 Segurança

As credenciais do Supabase (anon key) são públicas por design e devem ser usadas no frontend. A segurança real vem das políticas RLS (Row Level Security) configuradas no Supabase.

Certifique-se de que:
- ✅ RLS está ativado na tabela `articles`
- ✅ Existe política para SELECT em artigos publicados
- ✅ Apenas admins podem INSERT/UPDATE/DELETE
