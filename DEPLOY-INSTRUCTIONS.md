# 🚀 Instruções de Deploy - Next.js na Vercel

## 📋 Pré-requisitos

- Código commitado no GitHub
- Conta na Vercel ([criar grátis](https://vercel.com/signup))
- Chave do Supabase (SUPABASE_ANON_KEY)

## 🔨 Passo a Passo

### 1. Preparar o Repositório

```bash
# Certifique-se de que tudo está commitado
git status

# Se houver mudanças pendentes:
git add .
git commit -m "Next.js migration complete - ready for deploy"
git push origin main
```

### 2. Importar na Vercel

1. Acesse https://vercel.com
2. Clique em **"Add New..."** → **"Project"**
3. Selecione seu repositório do GitHub
4. Aguarde a detecção automática do Next.js

### 3. Configurar o Projeto

**Framework Preset**: Next.js (auto-detectado)  
**Root Directory**: `./` (padrão)  
**Build Command**: `next build` (padrão)  
**Output Directory**: `.next` (padrão)

### 4. Adicionar Variáveis de Ambiente

Clique em **"Environment Variables"** e adicione:

```
NEXT_PUBLIC_SUPABASE_URL=https://fudkxjayttzpgizgtram.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua-chave-aqui>
```

**Onde encontrar a ANON_KEY:**
- Acesse seu projeto no Supabase
- Settings → API → `anon` `public`
- Copie a chave

### 5. Deploy! 🎉

1. Clique em **"Deploy"**
2. Aguarde ~2-3 minutos
3. Seu site estará no ar em uma URL como:
   ```
   https://angonurse.vercel.app
   ```

## ✅ Verificar OG Tags

Após o deploy, teste se as meta tags dinâmicas estão funcionando:

### Facebook Debugger
1. Acesse: https://developers.facebook.com/tools/debug/
2. Cole a URL de um artigo: `https://seu-dominio.vercel.app/artigo/slug-do-artigo`
3. Clique em "Fetch new information"
4. Verifique se aparece:
   - ✅ Título do artigo
   - ✅ Descrição do artigo
   - ✅ Imagem destacada
   - ✅ URL correta

### Twitter Card Validator
1. Acesse: https://cards-dev.twitter.com/validator
2. Cole a URL do artigo
3. Verifique o preview

### LinkedIn Post Inspector
1. Acesse: https://www.linkedin.com/post-inspector/
2. Cole a URL
3. Verifique o preview

### WhatsApp
1. Envie o link em uma conversa
2. Aguarde o preview carregar
3. Deve mostrar imagem, título e descrição

## 🎯 Checklist de Sucesso

- [ ] Deploy concluído sem erros
- [ ] Site acessível pela URL da Vercel
- [ ] Homepage carrega corretamente
- [ ] Artigos individuais abrem
- [ ] OG tags aparecem no Facebook Debugger
- [ ] Preview bonito no WhatsApp/Twitter
- [ ] Navegação entre páginas funciona
- [ ] Imagens carregam

## 🔧 Troubleshooting

### Build falha na Vercel

**Erro comum**: Dependências faltando
```
npm install
npm run build
```
Se funcionar localmente, deve funcionar na Vercel.

### OG tags não aparecem

1. Aguarde alguns minutos (cache)
2. Use "Fetch new information" nos debuggers
3. Verifique se a página tem `generateMetadata`:
   ```typescript
   export async function generateMetadata({ params })
   ```

### Imagens não carregam

Verifique `next.config.mjs`:
```javascript
images: {
  domains: ['fudkxjayttzpgizgtram.supabase.co'],
}
```

### Erro 404 em rotas

- Verifique se os arquivos estão em `app/`
- Confirme a estrutura: `app/artigo/[slug]/page.tsx`

## 🌐 Domínio Customizado

Depois do deploy:

1. Na Vercel, vá em **Settings** → **Domains**
2. Clique em **"Add"**
3. Digite seu domínio (ex: angonurse.com)
4. Configure DNS conforme instruções:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

## 📊 Monitoramento

A Vercel fornece automaticamente:
- 📈 Analytics de visitas
- ⚡ Performance metrics
- 🐛 Error tracking
- 📱 Real User Monitoring

Acesse em: **Analytics** no dashboard do projeto

## 🔄 Deploys Automáticos

Configurado automaticamente:
- ✅ Push para `main` → Deploy em produção
- ✅ Pull Request → Preview deploy
- ✅ Rollback com 1 clique

## 🎊 Pronto!

Seu site Next.js com SSR está no ar! 

As OG tags dinâmicas agora funcionam perfeitamente em:
- ✅ Facebook
- ✅ Twitter
- ✅ LinkedIn
- ✅ WhatsApp
- ✅ Telegram
- ✅ Discord

**Exatamente como funciona no Blogger!** 🚀

---

## 📞 Suporte

Problemas? Verifique:
- Logs de build na Vercel
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
