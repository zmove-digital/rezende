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
│   ├── monograma-rr.webp      logo do cabeçalho e rodapé (21 KB, com transparência)
│   ├── monograma-rr.png       mesmo logo em PNG (fallback, 71 KB)
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
   `hero-bio` e a seção "Sobre mim" (`about-body`) e os links de contato
   (`linkedin.com/in/rodrigorezende29343531` e `seuemail@exemplo.com`).
2. **Seu logo** — em `assets/monograma-rr.webp` e `assets/monograma-rr.png` (fundo transparente).
3. **Sua foto** — a imagem está em `assets/rodrigo-rezende.webp` e
   `assets/rodrigo-rezende.jpg` (600×600). Para trocar, gere as duas versões com o
   mesmo nome ou ajuste os caminhos no `<picture>` do `index.html`.
4. **Cores** — tudo está tokenizado no topo de `styles.css`, em dois blocos: `:root`
   (tema claro) e `[data-theme="dark"]` (tema escuro). O esquema atual é editorial:
   tinta sépia sobre papel, com **oxblood** (`--accent`) e **latão envelhecido**
   (`--accent-2`).

   | Token | Claro | Escuro | Uso |
   |---|---|---|---|
   | `--bg` | `#f8f5ef` | `#131110` | fundo da página |
   | `--bg-soft` | `#f0ebe1` | `#1a1715` | faixas alternadas |
   | `--surface` | `#ffffff` | `#1e1b18` | cartões |
   | `--text` | `#1b1916` | `#f3ede3` | texto principal |
   | `--text-soft` | `#4b463e` | `#d2c9bd` | texto corrido |
   | `--muted` | `#6f6659` | `#9e958a` | metadados |
   | `--accent` | `#8c3a2b` | `#d18a75` | destaque principal |
   | `--accent-2` | `#9a7428` | `#c6a05c` | destaque secundário |
   | `--live` | `#4f7a45` | `#86ac74` | ponto pulsante |

   Se trocar as cores, atualize também `<meta name="theme-color">` (nos 5 arquivos HTML) e
   o degradê de `assets/favicon.svg`. Todos os gradientes do site leem `--accent` e
   `--accent-2`, então mudam sozinhos.
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

O site já está no ar em **https://zmove-digital.github.io/rezende/**. Para republicar
uma alteração:

```bash
cd meu_blog
git add -A
git commit -m "Publica o blog"
git push
```

Para começar do zero em outro repositório:

```bash
git init -b main
git remote add origin https://github.com/zmove-digital/rezende.git
git push -u origin main
```

Depois, no repositório: **Settings → Pages → Source: Deploy from a branch**,
branch `main`, pasta `/(root)`. O arquivo `.nojekyll` na raiz impede que o Jekyll
interfira no processamento. Em até um minuto o site fica no ar em:

```
https://zmove-digital.github.io/rezende/
```

## Usar um domínio próprio

1. Crie um arquivo chamado `CNAME` na raiz com o seu domínio (ex.: `meublog.com.br`).
2. No provedor do domínio, configure:
   - `A` → `185.199.108.153`
   - `A` → `185.199.109.153`
   - `A` → `185.199.110.153`
   - `A` → `185.199.111.153`
   - `CNAME` → `zmove-digital.github.io`
3. No repositório, em **Settings → Pages**, marque **Enforce HTTPS**.

## Acessibilidade e SEO

- HTML semântico, `skip link`, `aria-label` nos controles e foco visível.
- Respeita `prefers-reduced-motion` e `prefers-color-scheme`.
- `meta` de Open Graph e Twitter Card em todas as páginas.
- Barra de progresso de leitura e botão de compartilhar nas páginas de post.