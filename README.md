# Elkontrollen

Ny nettside for elkontrollen.no. Statisk HTML/CSS/JS.

**Hosting migreres fra GitHub Pages til Netlify (2026-09)** for å kunne bruke Netlify
Forms på kontaktskjemaene i stedet for EmailJS. Se "Manuelt steg" under.

Erstatter den tidligere Shopify-butikken. Skjemaet (`/skjema/`) er bygget inn direkte i siden — ikke lenger en iframe mot Netlify.

## Struktur
- `index.html` — forside
- `skjema/` — el-kontroll-skjema (EmailJS + PDF-generering, uendret — se `skjema/README-skjema.md`)
- `blogg/` — blogginnlegg
- `assets/` — CSS/JS/bilder
- `netlify.toml` — publish-konfig for Netlify

## Kontaktskjemaer
De 7 kontakt-/bestillingsskjemaene (`naering.html`, `landbruk.html`, `elkontroll-bolig.html`,
`elkontroll-boligsalg.html`, `fatt-avvik.html`, `borettslag/index.html`,
`borettslag/kartlegging/index.html`) bruker **Netlify Forms** (`data-netlify="true"` +
AJAX-innsending via `fetch("/", …)`), ikke lenger EmailJS. Dette krever at siden faktisk
er deployet via Netlify sitt build-system — Netlify Forms fungerer ikke på GitHub Pages.

`kontakt.html` bruker også Netlify Forms (skjemanavn `kontakt`), men uten AJAX — vanlig
POST med `action="/takk"`, som lander på takkesiden `takk.html`. Skjemaet må legges til i
listen over e-postvarslinger på lik linje med de seks andre.

## Manuelt steg — migrer til Netlify
1. Opprett en ny Netlify-site koblet til GitHub-repoet `Elkontrollen/elkontrollen2` (branch `main`).
   Ingen build command nødvendig, publish directory er repo-roten (se `netlify.toml`).
2. Legg til `elkontrollen.no` som custom domain på Netlify-siten, og pek DNS hos Domeneshop
   dit Netlify ber om (enten Netlify DNS eller A/CNAME-oppdatering) — la MX-poster (e-post)
   stå urørt.
3. Vent på SSL-sertifikat (Netlify ordner Let's Encrypt automatisk).
4. Gå til **Site settings → Forms → Form notifications → Add notification → Email
   notification** for hvert av de 7 skjemaene over, og sett mottaker til `post@elkontrollen.no`.
5. Når DNS peker til Netlify og innsendinger er bekreftet å fungere, kan GitHub Pages-
   publiseringen (Settings → Pages) skrus av.

## Deploy (etter migrering)
Push til `main` på GitHub → Netlify bygger og publiserer automatisk.
