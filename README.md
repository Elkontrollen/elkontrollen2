# Elkontrollen

Ny nettside for elkontrollen.no. Statisk HTML/CSS/JS, hostet på GitHub Pages med elkontrollen.no som custom domain (DNS hos Domeneshop).

Erstatter den tidligere Shopify-butikken. Skjemaet (`/skjema/`) er bygget inn direkte i siden — ikke lenger en iframe mot Netlify.

## Struktur
- `index.html` — forside
- `skjema/` — el-kontroll-skjema (EmailJS + PDF-generering)
- `blogg/` — blogginnlegg
- `assets/` — CSS/JS/bilder

## Deploy
Push til `main` på GitHub. GitHub Pages er satt opp til å publisere fra `main`, med `CNAME` = `elkontrollen.no`.
