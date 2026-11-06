# Achados Tekvo — Landing Page

Landing page de captação para o grupo VIP do **Achados Tekvo** no WhatsApp.

**Público:** masculino amplo — tech e games, tênis e estilo, ferramentas, suplementos, churrasco.
A copy, as categorias e os exemplos de oferta são todos direcionados a esse público.

Uma única página HTML com CSS embutido, sem fontes externas e sem JS próprio (só o Meta Pixel, carregado depois da página abrir). Deploy estático direto na Vercel.

## Estrutura

```
.
├── index.html          # página única
├── vercel.json         # cache dos assets + headers de segurança
├── robots.txt
└── assets/
    ├── logo.jpg            # logo original (640px)
    ├── logo-512.jpg        # logo do hero
    ├── og-image.jpg        # preview no WhatsApp / redes (1200x630)
    ├── apple-touch-icon.png
    └── favicon.png
```

## Rodar localmente

```bash
python3 -m http.server 3000
# abre http://localhost:3000
```

## Paleta

Cores extraídas da logo oficial:

| Token | Hex | Uso |
|---|---|---|
| `--purple` | `#8424F0` | roxo neon principal |
| `--purple-light` | `#A855F7` | gradientes e realces |
| `--purple-glow` | `#B57DFF` | brilhos e halos |
| `--purple-dark` | `#7824E4` | base dos gradientes |
| `--purple-deep` | `#3C0C78` | roxo profundo do fundo |
| `--bg` | `#06010E` | fundo da página |
| `--green` | `#2BE86A` | preços e status online |
| `--red` | `#FF3D6E` | selos de desconto |

## O que ajustar

| O quê | Onde |
|---|---|
| Link do grupo | `index.html` → os 2 `href` de `chat.whatsapp.com` |
| Número de membros | `index.html` → texto `+12 mil membros` |
| Prints do grupo | `assets/grupo-*.webp` |

## Deploy na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. **Import Git Repository** → selecione `dhqdev/tekvoachados`
3. Framework Preset: **Other** — deixe Build Command e Output Directory vazios
4. **Deploy**

Cada `git push` na `main` gera um novo deploy automático.
