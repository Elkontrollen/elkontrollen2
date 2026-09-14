# FJERNET.md

Plassholderinnhold som er tatt ut av siden, med full markup så det kan settes inn
igjen når det finnes ekte innhold å fylle det med.

Regelen fra tilleggsordren: **ingen seksjon publiseres uten ekte innhold. Bedre med
kortere side enn side med hull.**

Dato: 2026-09-14

---

## 1. Bilde- og referanseplassholder i seksjonen «Hvorfor Elkontrollen»

| | |
|---|---|
| **Fil** | `borettslag/index.html` |
| **Linje** | 178–186 |
| **Plassholdertekst** | Bilde kommer · Referanse kommer · — Styreleder, [lag kommer] |
| **Hvorfor fjernet** | Sto synlig i produksjon. En styreleder som ser «Referanse kommer» leser det som at foretaket ikke har kunder. |
| **Seksjonen rundt** | Seksjonen «Hvorfor Elkontrollen» beholdes — de tre punktene over blokken er ekte innhold. |

<details>
<summary>Markup som ble fjernet</summary>

```html
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:32px;">
      <div style="aspect-ratio:4/3; border:1.5px dashed var(--line); border-radius:6px; display:flex; align-items:center; justify-content:center; background:var(--paper-2);">
        <span style="color:var(--muted); font-size:13.5px;">Bilde kommer</span>
      </div>
      <div style="border:1px solid var(--line); border-radius:6px; padding:24px; display:flex; flex-direction:column; justify-content:center;">
        <p style="font-family:'Space Grotesk'; font-size:16px; color:var(--muted); font-style:italic; margin-bottom:12px;">Referanse kommer</p>
        <p style="font-size:13px; color:var(--muted);">— Styreleder, [lag kommer]</p>
      </div>
    </div>
```

</details>

### Slik setter du den inn igjen

Skaff et ekte bilde og en ekte referanse fra et borettslag som har sagt ja til å bli sitert med navn. Lim blokken inn igjen rett etter `</div>` som lukker `.why-list` i seksjonen «Hvorfor Elkontrollen». Bytt ut begge plassholderne — en halvfylt blokk er verre enn ingen.

---

## 2. Utkommentert seksjon «Hvem kommer hjem til deg?» med tre kort

| | |
|---|---|
| **Fil** | `index.html` |
| **Linje** | 217–243 |
| **Plassholdertekst** | Navn · Sertifisert kontrollør / Navn · Sertifisert kontrollør / Navn · Daglig leder |
| **Hvorfor fjernet** | Lå som HTML-kommentar og var ikke synlig, men er plassholderinnhold i kodebasen. Kommentaren sa selv: «klar, men skjult til vi har ekte bilder og navn». |
| **Seksjonen rundt** | Ingen synlig seksjon ble borte — blokken var allerede skjult. |

<details>
<summary>Markup som ble fjernet</summary>

```html
<!-- "Hvem kommer hjem til deg" er klar, men skjult til vi har ekte bilder og navn.
<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head">
      <h2>Hvem kommer hjem til deg?</h2>
      <p>Ingen anonyme montører. Du får navnet på kontrolløren din når du bestiller, og det er samme person som skriver rapporten.</p>
    </div>
    <div class="team-grid">
      <div class="team-card">
        <div class="team-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></div>
        <div class="team-name">Navn</div>
        <div class="team-role">Sertifisert kontrollør</div>
      </div>
      <div class="team-card">
        <div class="team-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></div>
        <div class="team-name">Navn</div>
        <div class="team-role">Sertifisert kontrollør</div>
      </div>
      <div class="team-card">
        <div class="team-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></div>
        <div class="team-name">Navn</div>
        <div class="team-role">Daglig leder</div>
      </div>
    </div>
  </div>
</section>
-->
```

</details>

### Slik setter du den inn igjen

Ta bilder av kontrollørene, fyll inn navn og stilling i de tre kortene, og lim seksjonen inn igjen uten kommentartegnene, rett før `<section class="cta-final centered"...>` nederst på forsiden. Ett av navnene er kjent: Niklas Grønvik, sertifisert kontrollør.

---

## Hva som IKKE ble fjernet, og hvorfor

Søket dekket «kommer», «TODO», «lorem», «placeholder», «[lag», «[navn», «Bilde kommer»,
«Referanse kommer», «xxx» og «TBD» i hele kodebasen. Disse traff, men er ikke
plassholdere:

| Treff | Hvor | Vurdering |
|---|---|---|
| `placeholder="..."` | 42 steder, mest i `skjema/` | HTML-attributt på skjemafelt. Hjelpetekst i inputfelt, ikke manglende innhold |
| `<!-- Foto: … Wikimedia Commons, CC BY -->` | 14 sider | Fotokreditering. Skal stå |
| `<!-- PRIS: endre her -->` | `elkontroll-boligsalg.html:103` | Vedlikeholdsnotat ved siden av en ekte pris (5 000 kr) |
| `<!-- Kontrolltype -->`, `<!-- Signatur -->` m.fl. | `skjema/` | Seksjonsmarkører i det interne montørverktøyet |
| «kommer» i brødtekst | 8 sider | Vanlige setninger: «Samme person kommer», «hvis eltilsynet kommer», «Hvor ofte kommer de?» |
| `navn@firma.no` | `skjema/index.html:382` | Eksempeltekst i et e-postfelt |
| `Fra xxx kr/år` | `borettslag/` og `borettslag/pris/` | **Allerede fjernet** tidligere i dag. Se `REVISJON.md` seksjon 18c |

Ingen tomme seksjoner ble funnet etter fjerningen — kontrollert med et skript som ser
etter `<section>` med under 25 tegn synlig tekst.
