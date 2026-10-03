# Meu Blog

Blog pessoal estático: página inicial com perfil e links de redes sociais, mais uma
página por texto semanal. Sem framework, sem backend, sem login, sem build.

Feito apenas com HTML, CSS e JavaScript.

## Estrutura

```
meu_blog/
├── index.html          página inicial (perfil + posts em destaque)
├── styles.css          design system, temas claro/escuro, responsivo
├── script.js           tema, menu, animações, filtro, barra de progresso
├── assets/
│   ├── rodrigo-rezende.webp   foto de perfil (34 KB, formato moderno)
│   ├── rodrigo-rezende.jpg    mesma foto em JPG (fallback, 49 KB)
│   └── favicon.svg            ícone do site
├── posts/              uma página HTML por texto
│   ├── comecar-e-o-que-importa.html
│   ├── habitos-que-fazem-texto.html
│   ├── ia-no-trabalho-do-cria.html
│   └── ler-lento-e-viver-mais.html
├── .nojekyll           desliga o Jekyll do GitHub Pages
└── README.md
```

## Personalizar

1. **Seu nome e perfil** — em `index.html`, troque `Rodrigo Rezende`, o texto de
   `hero-bio` e os links das redes sociais (`github.com/seuusuario`, `linkedin.com/in/seuusuario`,
   `instagram.com/seuusuario`, `seuemail@exemplo.com`).
2. **Sua foto** — a imagem está em `assets/rodrigo-rezende.webp` e
   `assets/rodrigo-rezende.jpg` (600×600). Para trocar, gere as duas versões com o
   mesmo nome ou ajuste os caminhos no `<picture>` do `index.html`.
3. **Cores** — no topo de `styles.css`, troque `--accent` e `--accent-2`. Todo o resto
   acompanha.
4. **Fontes** — os pares usados são:
   - `Fraunces` (títulos, headlines)
   - `Newsreader` (texto corrido dos posts)
   - `system-ui` (menus, botões, metadados)
   Troque no `<link>` do Google Fonts e nas variáveis `--font-display` / `--font-read`.

## Publicar um texto novo

1. Copie um arquivo de `posts/` como modelo, por exemplo
   `posts/ler-lento-e-viver-mais.html` → `posts/meu-texto.html`.
2. Troque o `<title>`, o `<meta name="description">`, o `<h1>`, o `article-dek`, a data no
   `<time datetime="...">` e o conteúdo dentro de `<div class="shell prose">`.
3. Crie o card correspondente em `index.html`, dentro de `#postsGrid`, com o atributo
   `data-tags` para o filtro funcionar (`criatividade`, `tecnologia` ou `vida`).
4. Se quiser que apareça como "Mais recente", troque o conteúdo do bloco `.featured` e
   apague o card do post anterior.

## Rodar localmente

Abra `index.html` direto no navegador — não precisa de servidor.

Se preferir um servidor local:

```bash
python -m http.server 8000
```

e acesse `http://localhost:8000`.

## Publicar no GitHub Pages

```bash
cd meu_blog
git init
git add .
git commit -m "Publica o blog"
git branch -M main
git remote add origin https://github.com/SEUUSUARIO/SEUREPO.git
git push -u origin main
```

Depois, no repositório: **Settings → Pages → Source: Deploy from a branch**,
branch `main`, pasta `/(root)`. Em até um minuto o site fica no ar em:

```
https://SEUUSUARIO.github.io/SEUREPO/
```

## Usar um domínio próprio

1. Crie um arquivo chamado `CNAME` na raiz com o seu domínio (ex.: `meublog.com.br`).
2. No provedor do domínio, configure:
   - `A` → `185.199.108.153`
   - `A` → `185.199.109.153`
   - `A` → `185.199.110.153`
   - `A` → `185.199.111.153`
   - `CNAME` → `SEUUSUARIO.github.io`
3. No repositório, em **Settings → Pages**, marque **Enforce HTTPS**.

## Acessibilidade e SEO

- HTML semântico, `skip link`, `aria-label` nos controles e foco visível.
- Respeita `prefers-reduced-motion` e `prefers-color-scheme`.
- `meta` de Open Graph e Twitter Card em todas as páginas.
- Barra de progresso de leitura e botão de compartilhar nas páginas de post.