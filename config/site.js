/*
  POPPY: opšti podaci o sajtu.
  Tekstovi koji se razlikuju po jeziku su objekti oblika { sr: "...", en: "..." }.
  Ako prevod za neki jezik nedostaje, prikazuje se tekst na podrazumevanom jeziku (defaultLanguage).

  NAPOMENA: <title>, meta opis i Open Graph tagovi su u <head> delu fajla index.html,
  jer ih Facebook, Instagram i Google čitaju bez pokretanja JavaScript-a. Vidi README.
*/
window.POPPY_SITE = {
  brandName: "Poppy",

  tagline: {
    sr: "Proteinski obroci i deserti, spremljeni sa ljubavlju."
  },

  // Adresa sajta (PLACEHOLDER dok ne postoji pravi domen)
  siteUrl: "https://www.poppy.rs",

  // Jezici. Prvi koji se koristi je defaultLanguage.
  // Za novi jezik: dodaj fajl i18n/<kod>.js, njegov <script> tag u index.html i kod ovde.
  // Prekidač jezika se prikazuje tek kad ovde ima više od jednog jezika.
  defaultLanguage: "sr",
  languages: ["sr"],

  // Kontakt predstavništva (PLACEHOLDER)
  contact: {
    address: "Bulevar oslobođenja 123, 21000 Novi Sad",
    phone: "+381 60 123 4567",
    email: "zdravo@poppy.rs"
  },

  // Društvene mreže. Prazan string ("") znači da se ikonica ne prikazuje.
  social: {
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    facebook: "https://www.facebook.com/"
  },

  // Podaci o firmi (opciono). Prazna polja se ne prikazuju u footeru.
  company: {
    name: "Poppy Food d.o.o.",   // PLACEHOLDER
    pib: "",                      // npr. "112233445"
    maticniBroj: ""               // npr. "21234567"
  },

  // Hero: tri fotografije odozgo koje zajedno čine "flat lay" kompoziciju.
  // Preporuka: kvadratne slike, 720 × 720 px, WebP.
  hero: {
    images: [
      {
        src: "assets/images/hero/hero-bagel.webp",
        alt: { sr: "Bagel sa zelenom salatom na tanjiru, snimljen odozgo" }
      },
      {
        src: "assets/images/hero/hero-kasa.webp",
        alt: { sr: "Činija ovsene kaše sa jagodama, snimljena odozgo" }
      },
      {
        src: "assets/images/hero/hero-sejk.webp",
        alt: { sr: "Roze šejk sa bobičastim voćem, snimljen odozgo" }
      }
    ]
  },

  // Sekcija "O nama" (PLACEHOLDER tekst i slike)
  about: {
    text: {
      sr: [
        "Poppy je nastao u maloj kuhinji, iz jednostavne želje: da obrok posle treninga ili užina u pola radnog dana bude i ukusan i zasitan, bez kompromisa.",
        "Recepte koje znamo iz detinjstva, poput proje i gibanice, pravimo iznova, sa više proteina i pažljivo biranim sastojcima. Sve kuvamo i pečemo u malim serijama, svakog dana."
      ]
    },
    founders: {
      sr: "Iza Poppy-ja stoje Ana i Marija, dve drugarice iz Novog Sada, nutricionistkinja i poslastičarka, koje veruju da zdrava hrana sme da bude i malo razmažena."
    },
    // Slike procesa proizvodnje. Preporuka: 800 × 600 px (4:3), WebP.
    images: [
      {
        src: "assets/images/about/sastojci.webp",
        alt: { sr: "Brašno, jaja i puter pripremljeni na kuhinjskoj krpi" },
        caption: { sr: "Biramo sastojke" }
      },
      {
        src: "assets/images/about/mesenje.webp",
        alt: { sr: "Ruke mese testo na pobrašnjenoj površini" },
        caption: { sr: "Mesimo ručno" }
      },
      {
        src: "assets/images/about/pakovanje.webp",
        alt: { sr: "Tri staklene posude sa spremljenim obrocima" },
        caption: { sr: "Pakujemo sveže" }
      }
    ]
  }
};
