# Elkontroll-skjema — status

**Kilde:** `elkontroll-skjema-v2 ny.html` (14.08.2026, nyeste og mest komplette versjon —
verifisert mot alle andre iterasjoner i Downloads). Støtter periodisk elkontroll,
brannforebyggende elkontroll (NEK 405-2-2), elkontroll næring (NEK 405-3) og landbruk
(NEK 405-3 Tillegg B), med bilder i PDF, autolagring av kladd og egen e-postkopi til
kontrolløren. Ingen sammenslåing var nødvendig — denne filen var allerede supersettet
av alle tidligere versjoner.

**Endringer gjort:** Kun innpakket i en frittstående `<html>`-side med enkel header
(logo → "/", telefonnummer) og fargepalett/fonter hentet fra `elkontrollen-redesign_2.html`
(IBM Plex Sans / Space Grotesk, grønn `#2E7D46`). Selve skjema-koden, EmailJS-konfig og
all funksjonalitet er **uendret og bit-for-bit bevart**.

## Viktig manuelt steg (må gjøres av deg)
Skjemaet kjørte tidligere fra Netlify/Shopify-domener. Gå til **emailjs.com → Account →
Security** og sjekk/oppdater **"Allowed origins"** (domain whitelist) slik at det nye
domenet er tillatt:
- `https://elkontrollen.no`
- ev. `https://<bruker>.github.io` (for testing før DNS peker til GitHub Pages)

Uten dette vil innsending feile med en CORS/origin-feil fra EmailJS.
