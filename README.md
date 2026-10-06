# Poppy: marketinški sajt

Prezentacioni sajt brenda Poppy, napravljen u čistom HTML-u, CSS-u i JavaScript-u. Nema frameworka, build koraka ni instalacije.

**Pokretanje:** dvoklik na `index.html`. Sajt radi direktno sa diska, bez servera i bez interneta.

Sav sadržaj (proizvodi, lokacije, utisci, tekstovi, kontakt) nalazi se u fajlovima u folderima `config/` i `i18n/`. Za izmene sadržaja **nikad ne treba menjati HTML, CSS ni fajlove u `js/`**.

---

## Sadržaj

1. [Struktura foldera](#1-struktura-foldera)
2. [Kako se menjaju config fajlovi (osnovna pravila)](#2-kako-se-menjaju-config-fajlovi-osnovna-pravila)
3. [Proizvodi](#3-proizvodi)
4. [Lokacije](#4-lokacije)
5. [Utisci kupaca](#5-utisci-kupaca)
6. [Opšti podaci: slogan, kontakt, mreže, firma, O nama](#6-opšti-podaci-slogan-kontakt-mreže-firma-o-nama)
7. [Maskota Poppy](#7-maskota-poppy)
8. [Slike](#8-slike)
9. [Novi jezik](#9-novi-jezik)
10. [Boje i fontovi](#10-boje-i-fontovi)
11. [SEO, deljenje i domen](#11-seo-deljenje-i-domen)
12. [Objavljivanje na hostingu i 404 stranica](#12-objavljivanje-na-hostingu-i-404-stranica)
13. [Spisak placeholdera](#13-spisak-placeholdera)
14. [Korišćeni resursi i licence](#14-korišćeni-resursi-i-licence)

---

## 1. Struktura foldera

```
Poppy/
├── index.html          početna stranica (samo "kostur"; sadržaj se generiše iz config-a)
├── 404.html            stranica "nije pronađeno"
├── config/
│   ├── site.js         naziv, slogan, kontakt, mreže, podaci o firmi, hero, "O nama", jezici
│   ├── products.js     kategorije i proizvodi
│   ├── locations.js    prodajna mesta
│   └── testimonials.js utisci kupaca
├── i18n/
│   └── sr.js           tekstovi interfejsa (dugmad, naslovi sekcija, tabela) na srpskom
├── css/
│   ├── fonts.css       lokalni fontovi
│   ├── variables.css   boje, fontovi, razmaci (jedino mesto za paletu)
│   └── main.css        izgled komponenti
├── js/                 logika (ne treba je menjati zbog sadržaja)
│   ├── i18n.js         prevodi
│   ├── nutrition.js    EU format nutritivne tabele
│   ├── render.js       pravljenje sekcija iz config-a
│   └── main.js         meni, filter, animacije
└── assets/
    ├── mascot/poppy.svg        maskota (jedan fajl za ceo sajt)
    ├── fonts/                  fontovi (woff2)
    └── images/
        ├── hero/               3 fotografije za hero "flat lay"
        ├── about/              3 fotografije za "O nama"
        ├── products/           fotografije proizvoda
        └── og-image.jpg        slika za deljenje na mrežama (1200 × 630)
```

Skripte se učitavaju na kraju `index.html` ovim redom: **config → prevodi → logika**. Redosled ne treba menjati.

---

## 2. Kako se menjaju config fajlovi (osnovna pravila)

Config fajlovi su obični tekstualni fajlovi. Otvaraju se u bilo kom editoru (VS Code, Notepad++, TextEdit u režimu običnog teksta). Pravila:

- Tekst ide između navodnika: `"ovako"`. Ako sam tekst sadrži navodnik, piši `\"` ili koristi „srpske“ navodnike.
- Posle svake stavke u listi ide **zarez**. Posle poslednje stavke zarez nije obavezan.
- Tekstovi koji zavise od jezika pišu se kao `{ sr: "Tekst na srpskom" }`. Kasnije se dodaje npr. `en: "English text"`.
- Brojevi se pišu **bez navodnika** i sa **tačkom** kao decimalnim znakom (`4.5`, ne `4,5`). Sajt ih sam prikazuje sa zarezom.
- Posle izmene sačuvaj fajl i osveži stranicu u pretraživaču (F5, na Macu Cmd+R).

**Ako se posle izmene stranica prikaže prazna**, verovatno nedostaje zarez, zagrada ili navodnik. Otvori konzolu pretraživača (F12 → Console), gde piše fajl i broj reda sa greškom.

---

## 3. Proizvodi

Fajl: `config/products.js`

### Dodavanje proizvoda

1. Kopiraj ceo blok jednog postojećeg proizvoda, od `{` do `},`.
2. Nalepi ga u listu `window.POPPY_PRODUCTS`, na mesto gde želiš da se proizvod pojavi (redosled u fajlu je redosled na sajtu).
3. Promeni `id` u nešto jedinstveno, samo mala slova, brojevi i crtice (npr. `"proteinski-mafin"`).
4. Izmeni ostala polja (vidi tabelu ispod).
5. Sliku stavi u `assets/images/products/` i upiši putanju u polje `image`.
6. Sačuvaj i osveži stranicu. Proizvod se pojavljuje u svojoj kategoriji i u filteru.

### Izmena proizvoda

Promeni željeno polje u bloku tog proizvoda i sačuvaj.

### Sakrivanje bez brisanja

Postavi `visible: false`. Proizvod ostaje u fajlu, ali se ne prikazuje. Vraćanje je `visible: true`.

### Brisanje proizvoda

Obriši ceo blok proizvoda, od `{` do `},` uključujući i zarez.

### Polja proizvoda

| Polje | Obavezno | Opis |
|---|---|---|
| `id` | da | jedinstvena oznaka (mala slova, brojevi, crtice) |
| `category` | da | `"slano"`, `"slatko"` ili `"sejk"` |
| `visible` | da | `true` prikazano, `false` sakriveno |
| `name` | da | naziv, npr. `{ sr: "Proteinski bagel" }` |
| `description` | da | kratak opis |
| `image` | da | putanja do slike, npr. `"assets/images/products/bagel.webp"` |
| `imageAlt` | da | opis slike za slabovide i pretraživače (šta se vidi na slici) |
| `servingSize` | da | veličina porcije: `{ value: 90, unit: "g" }` ili `{ value: 330, unit: "ml" }` |
| `ingredients` | ne | lista sastojaka: `{ sr: ["brašno", "jaja"] }` |
| `allergens` | ne | lista alergena: `{ sr: ["gluten", "jaja"] }` |
| `toppings` | ne | dodaci po izboru (koristi se kod palačinki), prikazuju se kao oznake |
| `price` | ne | `null` znači da se cena ne prikazuje (vidi ispod) |
| `nutrition` | da | nutritivne vrednosti (vidi ispod) |
| `nutritionVerified` | da | `false` dok vrednosti nisu potvrđene |

### Cena

Dok je `price: null`, cena se ne prikazuje. Za prikaz cene upiši:

```js
price: { value: 390, currency: "RSD" },
```

### Nutritivne vrednosti

```js
nutrition: {
  per100: { energyKj: 1159, energyKcal: 275, fat: 4.5, saturatedFat: 1.2, carbs: 38, sugars: 3.5, fiber: 5, protein: 18, salt: 1.0 },
  perServing: null
},
nutritionVerified: false
```

- `per100` sadrži vrednosti na 100 g (ili 100 ml kod šejkova). Energija je u kJ i kcal, sve ostalo u gramima.
- `perServing: null` znači da sajt sam računa vrednosti po porciji iz `per100` i `servingSize`. Ako laboratorija da tačne vrednosti po porciji, upiši ih istim poljima kao `per100`, pa se koriste one.
- Tabela se automatski zaokružuje po smernicama EU (npr. `<0,5 g` za male količine) i prikazuje sa decimalnim zarezom.
- **`nutritionVerified`**: dok je `false`, ispod tabele stoji napomena „Vrednosti su okvirne.“ Kad upišeš potvrđene vrednosti, postavi `true` i napomena nestaje.

> ⚠️ **Trenutne nutritivne vrednosti su izmišljeni placeholderi** (u config-u su označene komentarom `// PLACEHOLDER`). Pre objave ih zameni vrednostima iz laboratorijske analize ili proračuna tehnologa.
>
> Tvrdnje kao „visokoproteinski“, „izvor proteina“ ili „niskokalorični“ su regulisane (EU Uredba 1924/2006 i propisi Republike Srbije) i imaju tačne pragove. Sajt ih zato namerno **ne prikazuje** kao oznake. Dodaj ih u tekstove tek kada vrednosti budu potvrđene i kada proveriš da ispunjavaju pragove.

### Kategorije

Redosled kategorija je u `window.POPPY_CATEGORIES` na vrhu `config/products.js`. Nazivi kategorija su u `i18n/sr.js` (ključevi `categories.slano`, `categories.slatko`, `categories.sejk`).

**Nova kategorija** (npr. „Supe“):
1. U `config/products.js` dodaj id u listu: `window.POPPY_CATEGORIES = ["slano", "slatko", "sejk", "supe"];`
2. U `i18n/sr.js` dodaj naziv: `"categories.supe": "Supe",`
3. Proizvodima postavi `category: "supe"`.

Filter dugme se pojavljuje samo za kategorije koje imaju bar jedan vidljiv proizvod.

### Ukusi šejkova

Svaki ukus je poseban proizvod u kategoriji `"sejk"`. Promena ukusa znači izmenu polja `name`, `description`, `image`, `imageAlt`, `ingredients` i `nutrition`. Novi ukus dodaje se kao novi proizvod (vidi [Dodavanje proizvoda](#dodavanje-proizvoda)).

---

## 4. Lokacije

Fajl: `config/locations.js`

**Dodavanje:** kopiraj jedan blok `{ ... },` iz liste `window.POPPY_LOCATIONS`, promeni `id` i ostala polja.

```js
{
  id: "beograd-dorcol",
  visible: true,
  name: "Zdrava Kutija Dorćol",
  city: "Beograd",
  address: "Cara Dušana 42",
  hours: [
    { days: { sr: "Ponedeljak – petak" }, time: "08:00 – 20:00" },
    { days: { sr: "Subota" }, time: "09:00 – 16:00" }
  ],
  mapsUrl: ""
},
```

- **Izmena:** promeni polje i sačuvaj.
- **Sakrivanje:** `visible: false`.
- **Brisanje:** obriši ceo blok.
- **Radno vreme:** svaki red je jedan `{ days: ..., time: ... }`. Ako lista `hours: []` ostane prazna, radno vreme se ne prikazuje.
- **Link „Otvori u mapama“:** ako je `mapsUrl` prazan, link se pravi automatski iz naziva, adrese i grada. Za tačnu lokaciju otvori mesto u Google Maps, izaberi **Share → Copy link** i nalepi link u `mapsUrl`.

Ako nijedna lokacija nije vidljiva, sekcija prikazuje poruku „Uskoro objavljujemo prva prodajna mesta.“

---

## 5. Utisci kupaca

Fajl: `config/testimonials.js`

```js
{
  id: "jelena",
  visible: true,
  name: "Jelena M.",
  city: "Beograd",
  rating: 5,
  text: { sr: "Kaša sa malinama mi je postala ritual posle jutarnjeg treninga." }
},
```

- **Dodavanje:** kopiraj blok, promeni `id` i ostala polja.
- **Izmena:** promeni polje. `rating` je ceo broj od 1 do 5, a `city` je opcion.
- **Sakrivanje:** `visible: false`.
- **Brisanje:** obriši ceo blok.

Na telefonu su utisci horizontalni slajder (prevlačenje prstom), a na računaru mreža. Ako nijedan utisak nije vidljiv, sekcija i link „Utisci“ u meniju se automatski sakrivaju.

> Pre objave pravih utisaka pribavi saglasnost kupaca za objavu imena.

---

## 6. Opšti podaci: slogan, kontakt, mreže, firma, O nama

Fajl: `config/site.js`

| Polje | Šta menja |
|---|---|
| `brandName` | naziv brenda (footer, copyright) |
| `tagline` | slogan: glavni naslov u hero sekciji i tekst u footeru |
| `contact.address`, `contact.phone`, `contact.email` | kontakt u footeru (telefon i email su klikabilni) |
| `social.instagram`, `social.tiktok`, `social.facebook` | linkovi ka profilima; prazan string `""` sakriva ikonicu |
| `company.name`, `company.pib`, `company.maticniBroj` | podaci o firmi u footeru; prazna polja se ne prikazuju |
| `hero.images` | tri fotografije za hero (vidi [Slike](#8-slike)) |
| `about.text` | pasusi teksta o brendu (lista, svaki pasus u svojim navodnicima) |
| `about.founders` | tekst o osnivačima |
| `about.images` | slike procesa proizvodnje, sa `alt` opisom i kratkim natpisom `caption` |

Ostali tekstovi interfejsa (natpisi dugmadi, naslovi sekcija, nazivi u tabeli, tekst 404 stranice) su u `i18n/sr.js`. Menja se samo tekst **desno** od dvotačke; ključ levo ostaje isti.

---

## 7. Maskota Poppy

Maskota je **jedan fajl**: `assets/mascot/poppy.svg`. Koristi se u headeru (logo), hero sekciji, footeru, na 404 stranici, u praznom stanju liste proizvoda i kao **favicon** (ikonica u tabu pretraživača).

**Zamena maskote:**
1. Pripremi novu ilustraciju kao **SVG**, kvadratnog formata (npr. `viewBox="0 0 200 200"`), sa providnom pozadinom.
2. Nazovi je tačno `poppy.svg` i njome zameni postojeći fajl u `assets/mascot/`.
3. Osveži stranicu (ako favicon ostane stari, obriši keš pretraživača).

Ništa drugo ne treba menjati: svi delovi sajta pokazuju na taj jedan fajl.

**Animacije:**
- *Klimanje glavom* (na hover, pri fokusu tastaturom i jednom kada maskota uđe u ekran) i *lebdenje* u hero sekciji definisani su u `css/main.css`. Rade i sa novom ilustracijom.
- *Treptanje* je unutar trenutnog SVG-a (klasa `.eye`). Ako želiš treptanje i u novoj ilustraciji, oči u SVG-u grupiši u `<g class="eye">` i prekopiraj `<style>` blok iz trenutnog fajla.
- Sve animacije se isključuju kada korisnik u sistemu uključi „smanji pokrete“ (`prefers-reduced-motion`).

> Ako ilustrator isporuči PNG umesto SVG-a: sačuvaj ga kao `assets/mascot/poppy.png`, pa u svim fajlovima zameni `poppy.svg` sa `poppy.png` (pretraga i zamena u `index.html`, `404.html` i `js/render.js`) i u `<link rel="icon">` promeni `type="image/svg+xml"` u `type="image/png"`. SVG je bolji izbor jer je oštar na svim veličinama.

---

## 8. Slike

Zamena bilo koje slike ide u dva koraka: **dodaj fajl** u odgovarajući folder i **izmeni jednu liniju** sa putanjom u config-u. Ako novi fajl nazoveš isto kao stari, nije potrebna ni ta izmena.

| Slika | Folder | Gde se menja putanja | Preporučena veličina |
|---|---|---|---|
| Proizvodi | `assets/images/products/` | `image` u `config/products.js` | 800 × 600 px (4:3) |
| Hero (3 slike) | `assets/images/hero/` | `hero.images` u `config/site.js` | 720 × 720 px (kvadrat), snimljeno **odozgo** |
| O nama | `assets/images/about/` | `about.images` u `config/site.js` | 800 × 600 px (4:3) |
| Deljenje na mrežama | `assets/images/` | `og:image` i `twitter:image` u `index.html` | 1200 × 630 px, JPG |

Saveti:
- Koristi format **WebP** (manji fajlovi, brže učitavanje sa telefona). Konverzija je moguća npr. na [squoosh.app](https://squoosh.app). Ciljaj 50–150 KB po slici.
- Slike drugačijeg formata se automatski seku na isti odnos stranica, pa se raspored ne pomera.
- Uvek ažuriraj i `imageAlt` / `alt`, tj. kratak opis onoga što se vidi na slici.
- Slike ispod prvog ekrana se učitavaju tek kada korisnik skroluje do njih (lazy loading), a dok se učitavaju, prikazuje se nežno roze polje.

---

## 9. Novi jezik

Primer za engleski (`en`):

1. **Prevodi interfejsa:** kopiraj `i18n/sr.js` kao `i18n/en.js`. U novom fajlu:
   - promeni red `window.POPPY_I18N.sr = {` u `window.POPPY_I18N.en = {`
   - promeni `"meta.locale": "sr-Latn-RS"` u `"meta.locale": "en-GB"` (format brojeva)
   - promeni `"meta.languageName": "Srpski"` u `"meta.languageName": "English"`
   - prevedi sve tekstove **desno** od dvotačke; ključeve levo ne menjaj
2. **Učitavanje fajla:** u `index.html` i `404.html`, odmah ispod reda `<script src="i18n/sr.js"></script>`, dodaj:
   ```html
   <script src="i18n/en.js"></script>
   ```
3. **Uključivanje jezika:** u `config/site.js` promeni `languages: ["sr"]` u `languages: ["sr", "en"]`.
4. **Prevodi sadržaja:** u config fajlovima dodaj `en` pored `sr`, npr.:
   ```js
   name: { sr: "Proteinski bagel", en: "Protein bagel" },
   ```
   Tekstovi koji nisu prevedeni automatski se prikazuju na srpskom, pa se prevodi mogu dodavati postepeno.

Kada postoji više od jednog jezika, u meniju se automatski pojavljuje prekidač (SR / EN). Izbor se pamti u pretraživaču, a jezik se može izabrati i linkom: `index.html?lang=en`.

> Meta tagovi za deljenje (`<title>`, opis, Open Graph) ostaju na srpskom, jer ih mreže čitaju bez JavaScript-a. Za potpuno odvojenu englesku verziju za pretraživače bila bi potrebna posebna stranica (npr. `en/index.html`).

---

## 10. Boje i fontovi

### Paleta

Sve boje su u `css/variables.css`, u prvom bloku:

| Promenljiva | Boja | Upotreba |
|---|---|---|
| `--color-cream` | `#FFF8F3` | pozadina stranice |
| `--color-blush` | `#FBE3E8` | kartice, pozadine sekcija |
| `--color-rose` | `#F2A7BB` | dekoracije, mašna, ivice (**ne za tekst**) |
| `--color-raspberry` | `#8E2C4F` | naslovi, linkovi, dugmad, footer, fokus |
| `--color-cocoa` | `#3D2A33` | osnovni tekst |

Kontrast (WCAG AA traži najmanje 4,5:1 za tekst): cocoa na kremi 12,7:1, raspberry na kremi 7,6:1, raspberry na blush 6,6:1, bela na raspberry 8:1, sekundarni tekst `#6B5560` na blush 5,6:1. Svetlo roze `--color-rose` ima samo 1,8:1 na kremi, pa se koristi isključivo za dekoraciju.

Pri promeni boja proveri kontrast, npr. na [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/).

### Fontovi

| Font | Upotreba | Fajlovi |
|---|---|---|
| **Dancing Script** (600–700) | naslovi, logo, akcenti | `assets/fonts/dancing-script-*.woff2` |
| **Nunito** (400–700) | tekst, dugmad, nutritivne tabele | `assets/fonts/nunito-*.woff2` |

Oba fonta su sačuvana lokalno u dva dela: `latin` i `latin-ext`. Deo `latin-ext` sadrži **š, đ, č, ć, ž** (i velika slova), a pretraživač ga učitava automatski kad naiđe na ta slova. Prikaz je proveren za oba fonta.

**Zamena fonta:** preuzmi woff2 fajlove sa podskupovima latin i latin-ext (npr. preko [gwfh.mranftl.com](https://gwfh.mranftl.com/fonts)), stavi ih u `assets/fonts/`, izmeni `css/fonts.css` i promeni `--font-script` ili `--font-sans` u `css/variables.css`. **Pre izbora proveri da font ima latin-ext.**

---

## 11. SEO, deljenje i domen

`<title>`, meta opis, Open Graph i Twitter tagovi stoje u `<head>` delu `index.html`, a ne u config-u. Razlog: Facebook, Instagram, TikTok, Viber i Google čitaju ih **bez pokretanja JavaScript-a**, pa bi tagovi generisani iz config-a bili nevidljivi pri deljenju linka.

**Zamena domena:** trenutno je upisan placeholder `https://www.poppy.rs`. Kad dobiješ pravi domen:
1. U `index.html` pronađi blok između `<!-- ZAMENI DOMEN -->` i `<!-- /ZAMENI DOMEN -->` i zameni `https://www.poppy.rs` pravim domenom (4 mesta).
2. U `config/site.js` promeni `siteUrl`.

OG slika mora imati **apsolutnu adresu** (sa `https://`), inače je mreže ne prikazuju. Posle objave proveri izgled pri deljenju na [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/).

Sajt ne koristi analitiku ni kolačiće, pa nije potreban cookie banner.

---

## 12. Objavljivanje na hostingu i 404 stranica

Sajt je statičan, pa ga može hostovati bilo koji statički hosting (Netlify, Cloudflare Pages, GitHub Pages ili klasičan hosting). Postavlja se ceo folder, bez ikakvog build koraka.

`404.html` je stranica za nepostojeće adrese:
- **Netlify, Cloudflare Pages, GitHub Pages:** koriste `404.html` iz korena automatski.
- **Apache hosting (cPanel):** u koren dodaj fajl `.htaccess` sa redom `ErrorDocument 404 /404.html`.
- **Nginx:** `error_page 404 /404.html;`

Sajt je predviđen za koren domena (`https://www.domen.rs/`). Stranica 404 na serveru automatski računa putanje od korena, a sa diska (dvoklik) radi normalno.

---

## 13. Spisak placeholdera

Sve navedeno je privremeno i treba ga zameniti pre objave.

### Slike

Fotografije su preuzete sa [Unsplash](https://unsplash.com) (besplatne za komercijalnu upotrebu, navođenje autora nije obavezno) i sačuvane lokalno. Izabrane su tako da što bolje liče na proizvode, ali **ne prikazuju Poppy proizvode**, pa ih treba zameniti sopstvenim fotografijama.

| Fajl | Gde se koristi | Šta prikazuje | Autor (Unsplash) |
|---|---|---|---|
| `products/proteinski-bagel.webp` | Proteinski bagel | bageli sa susamom | [Robert Gareth](https://unsplash.com/photos/yKoOxhQ4ook) |
| `products/proteinska-proja.webp` | Proteinska proja | kukuruzni hleb u plehu (*najbliže proji*) | [David Trinks](https://unsplash.com/photos/Xu6FyM9ZwQM) |
| `products/proteinska-gibanica.webp` | Proteinska gibanica | slojevita pita sa sirom (*najbliže gibanici*) | [Murat Demir](https://unsplash.com/photos/d-8fqEUZ7Eg) |
| `products/kasa-hurme-cimet.webp` | Kaša sa hurmama i cimetom | kaša sa cimetom (*hurme se ne vide*) | [Wil Carranza](https://unsplash.com/photos/uW6ivAo22E0) |
| `products/proteinske-palacinke.webp` | Proteinske palačinke | palačinke sa voćem i čokoladom | [Portuguese Gravity](https://unsplash.com/photos/qq3hT-CYD1I) |
| `products/kasa-maline.webp` | Kaša sa malinama | ovsena kaša sa malinama | [Christian Wiediger](https://unsplash.com/photos/r1VY6AeI7bY) |
| `products/sejk-cokolada.webp` | Šejk: čokolada | čokoladni šejk | [Yi Mun Loo](https://unsplash.com/photos/X3VbbKNDMSo) |
| `products/sejk-vanila.webp` | Šejk: vanila | vanila šejk | [Content Pixie](https://unsplash.com/photos/uttpvPp-Zlo) |
| `products/sejk-jagoda.webp` | Šejk: jagoda | šejk od jagode | [Sebastian Coman Photography](https://unsplash.com/photos/rwBJaJdesGg) |
| `hero/hero-bagel.webp` | Hero (flat lay) | bagel sendvič odozgo | [Iana Klimenko](https://unsplash.com/photos/UW-q3A7Nw0g) |
| `hero/hero-kasa.webp` | Hero (flat lay) | kaša sa jagodama odozgo | [Torbjørn Helgesen](https://unsplash.com/photos/Azxk_AD3JAk) |
| `hero/hero-sejk.webp` | Hero (flat lay) | roze smoothie odozgo | [Brigitte Tohm](https://unsplash.com/photos/iIupxcq-yH4) |
| `about/sastojci.webp` | O nama | brašno, jaja, puter | [Lauren Gray](https://unsplash.com/photos/Zqh5l1JWs5M) |
| `about/mesenje.webp` | O nama | mešenje testa | [Skyler Ewing](https://unsplash.com/photos/2uiZDQYTHBM) |
| `about/pakovanje.webp` | O nama | obroci u staklenim posudama | [Ella Olsson](https://unsplash.com/photos/lMcRyBx4G50) |
| `og-image.jpg` | deljenje na mrežama | kompozicija od hero slika, maskote i slogana | izvedeno iz slika iznad |

Kada budu gotove prave fotografije, prave i novu `og-image.jpg` (1200 × 630), najbolje sa logom ili maskotom i proizvodima.

### Ostali placeholderi

- **Maskota** `assets/mascot/poppy.svg`: jednostavna privremena ilustracija.
- **Nutritivne vrednosti** svih 9 proizvoda: izmišljene (`// PLACEHOLDER` u `config/products.js`, `nutritionVerified: false`).
- **Sastojci i alergeni**: primeri; zameni tačnim recepturama.
- **Lokacije**: svih 5 objekata je izmišljeno.
- **Utisci**: svi su izmišljeni.
- **Tekst „O nama“ i osnivači** (imena Ana i Marija su primer): `config/site.js`.
- **Kontakt, adresa, telefon, email, naziv firme**: `config/site.js`.
- **Linkovi ka mrežama** vode na početne stranice Instagrama, TikToka i Facebooka: `config/site.js`.
- **Domen** `https://www.poppy.rs`: `index.html` i `config/site.js`.

---

## 14. Korišćeni resursi i licence

Sajt **ne koristi nijednu JavaScript biblioteku**. Sve je napisano od nule, a svi resursi su lokalni (nema CDN-a ni spoljnih zahteva).

| Resurs | Licenca | Izvor |
|---|---|---|
| Dancing Script (font) | SIL Open Font License 1.1 | [Google Fonts](https://fonts.google.com/specimen/Dancing+Script) |
| Nunito (font) | SIL Open Font License 1.1 | [Google Fonts](https://fonts.google.com/specimen/Nunito) |
| Ikonice Instagram, TikTok, Facebook | CC0 1.0 (Simple Icons) | [simpleicons.org](https://simpleicons.org) |
| Fotografije | Unsplash License | [unsplash.com/license](https://unsplash.com/license) |

Logotipi društvenih mreža su zaštićeni žigovi svojih vlasnika i koriste se samo kao linkovi ka profilima.
