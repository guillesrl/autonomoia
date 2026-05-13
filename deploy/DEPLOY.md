# Deploy — guillers.es

## 1. Build local

```bash
npm install
npm run build
# Output: ./dist/
```

## 2. Subir al VPS

```bash
# Desde local, sustituye USER y HOST:
rsync -avz --delete ./dist/ USER@HOST:/var/www/guillers.es/dist/
```

## 3. Configurar nginx (primera vez)

```bash
# En el VPS:
sudo mkdir -p /var/www/guillers.es /var/www/letsencrypt
sudo cp deploy/nginx.conf /etc/nginx/sites-available/guillers.es
sudo ln -s /etc/nginx/sites-available/guillers.es /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 4. SSL con Let's Encrypt (primera vez)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d guillers.es -d www.guillers.es \
  --agree-tos --email guillesrl@gmail.com --redirect
# Renovación automática vía systemd timer (certbot ya lo configura)
sudo systemctl list-timers | grep certbot
```

## 5. Post-deploy checks

- `curl -I https://guillers.es/` → 200, headers de seguridad presentes
- `curl https://guillers.es/robots.txt` → contenido correcto
- `curl https://guillers.es/sitemap.xml` → XML válido
- `curl https://guillers.es/llms.txt` → Markdown legible
- https://www.ssllabs.com/ssltest/?d=guillers.es → A o A+
- https://pagespeed.web.dev/ → LCP < 2.5s, CLS < 0.1
- https://search.google.com/test/rich-results → JSON-LD detectado (Organization, FAQPage, Service)
- https://www.opengraph.xyz/?url=guillers.es → preview OG correcto

## 6. Google Search Console

1. Añadir propiedad `https://guillers.es` (verificar por DNS TXT o archivo HTML)
2. Subir sitemap: `https://guillers.es/sitemap.xml`
3. Solicitar indexación de la URL principal

## 7. Despliegues siguientes

```bash
npm run build && rsync -avz --delete ./dist/ USER@HOST:/var/www/guillers.es/dist/
```

No requiere reload de nginx (los hashes en filename invalidan cache automáticamente).
