# Autonomo IA — Landing

Landing page de [guillers.es](https://guillers.es): servicio de automatizaciones IA y asistentes conversacionales por WhatsApp para PYMES.

## Stack

- React 18 + Vite 6
- ES modules, sin framework CSS (CSS custom properties + inline styles)
- Tipografías: Plus Jakarta Sans, DM Mono (Google Fonts)
- Analytics: Google Analytics 4 cookieless
- Formulario: webhook a n8n self-hosted
- Deploy: Easypanel (auto-deploy desde GitHub) + alternativa Nginx en VPS

## Estructura

```
.
├── src/
│   ├── components/   # Hero, Features, Stats, FAQ, ContactForm, Footer
│   ├── App.jsx       # Navbar + WhatsAppButton + layout
│   ├── main.jsx      # Entry point
│   └── styles.css    # Design tokens + responsive
├── public/           # Assets servidos tal cual: og-image, logo, favicons,
│                     # robots.txt, sitemap.xml, llms.txt
├── deploy/           # nginx.conf + DEPLOY.md
├── index.html        # SEO meta + JSON-LD + GA4
├── vite.config.js
└── package.json
```

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # output → dist/
npm run preview    # sirve el build en local
```

El proxy de Vite redirige `/api/contact` al webhook de n8n para evitar CORS en desarrollo. En producción el formulario hace POST directo a `https://n8n.guillers.es/webhook/contacto-landing` (CORS debe estar configurado en el nodo Webhook).

### Variables de entorno

Crea un `.env.local` opcional para sobreescribir defaults:

```
VITE_N8N_WEBHOOK_URL=https://n8n.guillers.es/webhook/contacto-landing
```

## SEO

- Meta tags primarios (title, description, canonical, robots, theme-color)
- Open Graph + Twitter Cards con imagen 1200×630
- JSON-LD: `ProfessionalService`, `WebSite`, `Service` (con `OfferCatalog`), `FAQPage`
- `sitemap.xml` y `robots.txt` con allowlist de crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, etc.)
- `llms.txt` en formato Markdown para Answer Engine Optimization

## Analytics

Google Analytics 4 configurado en modo cookieless: `client_storage: 'none'`, `consent default denied`, IP anonimizada. No requiere banner de cookies.

Eventos custom trackados:
- `generate_lead` al recibir respuesta 2xx del webhook
- `whatsapp_click` al pulsar el botón flotante

## Deploy

### Easypanel (actual)

Configurado como servicio tipo App con auto-deploy desde la rama `main`:

- Repositorio: `guillesrl/autonomoia` · Rama `main`
- Install Command: `npm install`
- Build Command: `npm run build`
- Start Command: `npm start` (ejecuta `serve -s dist -l $PORT`)
- Node fijado a 20 vía `.nvmrc`

Cada push a `main` dispara un build + redeploy automático.

CORS del webhook de n8n: el nodo Webhook tiene configurado el origen `https://guillers.es` en "Allowed Origins (CORS)". En desarrollo local Vite hace de proxy para evitar CORS.

### Alternativa: Nginx en VPS

Ver [`deploy/DEPLOY.md`](./deploy/DEPLOY.md). Resumen:

```bash
npm run build
rsync -avz --delete ./dist/ USER@HOST:/var/www/guillers.es/dist/
```

Nginx sirve `dist/` con HTTPS (Let's Encrypt), HSTS, CSP, gzip y cache headers optimizados (1 año immutable para assets con hash, HTML siempre fresco).

## Licencia

Propietario — uso interno de Autonomo IA.
