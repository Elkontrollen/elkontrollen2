// Redaksjonell intern lenking — hvilke sider som skal peke på hverandre.
//
// Kravet i fase 4: hver bloggartikkel lenker til minst én tjenesteside, og hver
// tjenesteside lenker til minst to artikler. Header og footer teller ikke —
// de er like overalt og sier ingenting om hva siden handler om.

module.exports = {

  // Artikkel -> tjenestesider den hører sammen med.
  artikkelTilTjeneste: {
    '10-tegn-pa-at-det-elektriske-anlegget-bor-kontrolleres.html': [
      ['elkontroll-bolig.html', 'Elkontroll bolig — fastpris 5 000 kr'],
      ['priser.html', 'Se alle priser']
    ],
    'el-sjekk-vs-elkontroll-hva-er-egentlig-forskjellen.html': [
      ['elkontroll-bolig.html', 'Elkontroll bolig etter NEK 405-2'],
      ['forsikringsrabatt.html', 'Hva forsikringen krever av kontrollen']
    ],
    'elektriker-eller-kontrollor.html': [
      ['elkontroll-bolig.html', 'Elkontroll bolig — uavhengig kontroll'],
      ['fatt-avvik.html', 'Fått avvik i en rapport?']
    ],
    'elektrisk-due-diligence-ved-kjop-av-naeringseiendom-dette-bor-du-vite.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['kontrollavtale.html', 'Kontrollavtale for hele bygget']
    ],
    'elkontroll-for-avfallshandtering-og-gjenvinningsanlegg-arlig-kontroll-er-kravet.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['internkontroll.html', 'Internkontroll for elsikkerhet']
    ],
    'elkontroll-for-bathavner-og-marinaer-ofte-oversett-men-reelt-palagt.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['internkontroll.html', 'Internkontroll for elsikkerhet']
    ],
    'elkontroll-for-bensinstasjoner-og-vaskehaller-dette-sier-forsikringsbransjen.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['forsikringsrabatt.html', 'Hva forsikringen krever av kontrollen']
    ],
    'elkontroll-for-butikklokaler.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['internkontroll.html', 'Internkontroll for elsikkerhet']
    ],
    'elkontroll-for-campingplasser.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['elbillading-kontroll.html', 'Kontroll av ladeanlegg']
    ],
    'elkontroll-for-dagligvarebutikker-nar-strombrudd-betyr-tapt-vareverdi-i-sanntid.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['kontrollavtale.html', 'Kontrollavtale for hele bygget']
    ],
    'elkontroll-for-fredede-og-verneverdige-bygninger-strengere-krav-enn-de-fleste-tror.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['elkontroll-fredrikstad.html', 'Elkontroll i Fredrikstad — vernet bebyggelse i Gamlebyen']
    ],
    'elkontroll-for-hoteller-den-strengeste-risikoklassen-som-finnes.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['brannalarm-nodlys.html', 'Kontroll av brannalarm og nødlys']
    ],
    'elkontroll-for-internat-folkehoyskoler-skoler-og-andre-bygg-med-overnatting.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['brannalarm-nodlys.html', 'Kontroll av brannalarm og nødlys']
    ],
    'elkontroll-for-kirker-og-menighetshus.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['brannalarm-nodlys.html', 'Kontroll av brannalarm og nødlys']
    ],
    'elkontroll-for-lagerbygg-ofte-lite-bemannet-men-hoy-verdi-a-beskytte.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['kontrollavtale.html', 'Kontrollavtale for hele bygget']
    ],
    'elkontroll-for-parkeringshus-og-hvorfor-elbillading-gjor-det-enda-viktigere-1.html': [
      ['elbillading-kontroll.html', 'Kontroll av ladeanlegg for elbil'],
      ['naering.html', 'Elkontroll næring etter NEK 405-3']
    ],
    'elkontroll-for-pumpestasjoner-kritisk-infrastruktur-som-lett-blir-glemt.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['internkontroll.html', 'Internkontroll for elsikkerhet']
    ],
    'elkontroll-for-svommehaller-idrettshaller-og-treningssentre.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['internkontroll.html', 'Internkontroll for elsikkerhet']
    ],
    'elkontroll-for-veterinaerklinikker.html': [
      ['naering.html', 'Elkontroll næring etter NEK 405-3'],
      ['internkontroll.html', 'Internkontroll for elsikkerhet']
    ],
    'elkontroll-landbruk-slik-kan-du-fa-rabatt-pa-forsikringen.html': [
      ['landbruk.html', 'Elkontroll landbruk — godkjent av forsikringen'],
      ['forsikringsrabatt.html', 'Slik dokumenterer du kontrollen for forsikringen']
    ],
    'hva-er-samsvarserklaering-og-hvorfor-trenger-du-den.html': [
      ['elkontroll-boligsalg.html', 'Elkontroll ved kjøp og salg'],
      ['garantikontroll.html', 'Garantikontroll før reklamasjonsfristen']
    ],
    'hvordan-oppstar-boligbranner-forebygg-med-elkontroll.html': [
      ['elkontroll-bolig.html', 'Elkontroll bolig — fastpris 5 000 kr'],
      ['priser.html', 'Se alle priser']
    ]
  },

  // Tjenesteside -> artikler som utdyper den.
  tjenesteTilArtikkel: {
    'elkontroll-bolig.html': [
      ['blogg/10-tegn-pa-at-det-elektriske-anlegget-bor-kontrolleres.html', '10 tegn på at det elektriske anlegget bør kontrolleres'],
      ['blogg/hvordan-oppstar-boligbranner-forebygg-med-elkontroll.html', 'Hvordan oppstår boligbranner?'],
      ['blogg/el-sjekk-vs-elkontroll-hva-er-egentlig-forskjellen.html', 'El-sjekk vs. elkontroll — hva er forskjellen?']
    ],
    'elkontroll-boligsalg.html': [
      ['blogg/hva-er-samsvarserklaering-og-hvorfor-trenger-du-den.html', 'Hva er samsvarserklæring, og hvorfor trenger du den?'],
      ['blogg/el-sjekk-vs-elkontroll-hva-er-egentlig-forskjellen.html', 'El-sjekk vs. elkontroll — hva er forskjellen?']
    ],
    'naering.html': [
      ['blogg/dle-tilsyn-bedrift.html', 'Hva skjer på et DLE-tilsyn i en bedrift?'],
      ['blogg/elkontroll-for-hoteller-den-strengeste-risikoklassen-som-finnes.html', 'Elkontroll for hoteller — strengeste risikoklasse'],
      ['blogg/elkontroll-for-lagerbygg-ofte-lite-bemannet-men-hoy-verdi-a-beskytte.html', 'Elkontroll for lagerbygg']
    ],
    'internkontroll.html': [
      ['blogg/internkontroll-elektro-sma-bedrifter.html', 'Internkontroll elektro — må små bedrifter ha det?'],
      ['blogg/dle-tilsyn-bedrift.html', 'Hva skjer på et DLE-tilsyn i en bedrift?']
    ],
    'kontrollavtale.html': [
      ['blogg/hva-sjekker-en-termografor.html', 'Hva sjekker en termografør?'],
      ['blogg/dle-tilsyn-bedrift.html', 'Hva skjer på et DLE-tilsyn i en bedrift?']
    ],
    'garantikontroll.html': [
      ['blogg/hva-er-samsvarserklaering-og-hvorfor-trenger-du-den.html', 'Hva er samsvarserklæring, og hvorfor trenger du den?'],
      ['blogg/elektriker-eller-kontrollor.html', 'Elektriker eller kontrollør — hva er forskjellen?']
    ],
    'brannalarm-nodlys.html': [
      ['blogg/arlig-kontroll-av-brannalarm-og-nodlys-i-sameier-dette-er-lovpalagt.html', 'Brannalarm og nødlys i sameier — lovpålagt årlig kontroll'],
      ['blogg/styrets-ansvar-for-det-elektriske-anlegget-dette-bor-dere-vite.html', 'Styrets ansvar for det elektriske anlegget']
    ],
    'elbillading-kontroll.html': [
      ['blogg/ladeanlegg-borettslag-kontroll.html', 'Må ladeanlegget i borettslaget kontrolleres?'],
      ['blogg/elkontroll-for-parkeringshus-og-hvorfor-elbillading-gjor-det-enda-viktigere-1.html', 'Elkontroll for parkeringshus med elbillading']
    ],
    'fatt-avvik.html': [
      ['blogg/fatt-palegg-fra-eltilsynet.html', 'Fått pålegg fra eltilsynet? Slik går du fram'],
      ['blogg/dle-tilsyn-bedrift.html', 'Hva skjer på et DLE-tilsyn i en bedrift?']
    ],
    'tjenester.html': [
      ['blogg/el-sjekk-vs-elkontroll-hva-er-egentlig-forskjellen.html', 'El-sjekk vs. elkontroll — hva er forskjellen?'],
      ['blogg/hva-koster-elkontroll-full-prisguide.html', 'Hva koster elkontroll? Full prisguide']
    ],
    'omrader.html': [
      ['blogg/hva-koster-elkontroll-full-prisguide.html', 'Hva koster elkontroll? Full prisguide'],
      ['blogg/10-tegn-pa-at-det-elektriske-anlegget-bor-kontrolleres.html', '10 tegn på at anlegget bør kontrolleres']
    ],
    'borettslag/index.html': [
      ['blogg/hvor-ofte-elkontroll-borettslag.html', 'Hvor ofte må borettslag ha elkontroll?'],
      ['blogg/styrets-ansvar-for-det-elektriske-anlegget-dette-bor-dere-vite.html', 'Styrets ansvar for det elektriske anlegget'],
      ['blogg/ladeanlegg-borettslag-kontroll.html', 'Må ladeanlegget i borettslaget kontrolleres?']
    ],
    'borettslag/elkontroll/index.html': [
      ['blogg/hvor-ofte-elkontroll-borettslag.html', 'Hvor ofte må borettslag ha elkontroll?'],
      ['blogg/styrets-ansvar-for-det-elektriske-anlegget-dette-bor-dere-vite.html', 'Styrets ansvar for det elektriske anlegget']
    ],
    'borettslag/ladeanlegg/index.html': [
      ['blogg/ladeanlegg-borettslag-kontroll.html', 'Må ladeanlegget i borettslaget kontrolleres?'],
      ['blogg/elkontroll-for-parkeringshus-og-hvorfor-elbillading-gjor-det-enda-viktigere-1.html', 'Elkontroll for parkeringshus med elbillading']
    ],
    'borettslag/brannvern/index.html': [
      ['blogg/arlig-kontroll-av-brannalarm-og-nodlys-i-sameier-dette-er-lovpalagt.html', 'Brannalarm og nødlys i sameier — lovpålagt årlig kontroll'],
      ['blogg/styrets-ansvar-for-det-elektriske-anlegget-dette-bor-dere-vite.html', 'Styrets ansvar for det elektriske anlegget']
    ],
    'borettslag/leiligheter/index.html': [
      ['blogg/hvor-ofte-elkontroll-borettslag.html', 'Hvor ofte må borettslag ha elkontroll?'],
      ['blogg/10-tegn-pa-at-det-elektriske-anlegget-bor-kontrolleres.html', '10 tegn på at anlegget bør kontrolleres']
    ],
    'borettslag/pris/index.html': [
      ['blogg/hvor-ofte-elkontroll-borettslag.html', 'Hvor ofte må borettslag ha elkontroll?'],
      ['blogg/hva-koster-elkontroll-full-prisguide.html', 'Hva koster elkontroll? Full prisguide']
    ],
    'borettslag/kartlegging/index.html': [
      ['blogg/styrets-ansvar-for-det-elektriske-anlegget-dette-bor-dere-vite.html', 'Styrets ansvar for det elektriske anlegget'],
      ['blogg/hvor-ofte-elkontroll-borettslag.html', 'Hvor ofte må borettslag ha elkontroll?']
    ]
  }
};
