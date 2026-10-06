/*
  POPPY: prevodi UI tekstova, SRPSKI (latinica).

  Novi jezik: kopiraj ovaj fajl kao i18n/<kod>.js (npr. en.js), promeni "sr" u poslednjem redu
  prvog bloka (window.POPPY_I18N.en = {...}), prevedi vrednosti (ključeve NE menjaj),
  pa prati uputstvo iz README.md.

  {n}, {value}, {size}... su mesta na koja se ubacuju vrednosti; ostavi ih u prevodu.
*/
window.POPPY_I18N = window.POPPY_I18N || {};
window.POPPY_I18N.sr = {
  // Opšte
  "meta.locale": "sr-Latn-RS",      // format brojeva (decimalni zarez)
  "meta.languageName": "Srpski",    // naziv u prekidaču jezika

  "a11y.skipToContent": "Preskoči na sadržaj",
  "a11y.menuOpen": "Otvori meni",
  "a11y.menuClose": "Zatvori meni",
  "a11y.mainNav": "Glavna navigacija",
  "a11y.home": "Poppy, početna",
  "a11y.language": "Izbor jezika",
  "a11y.newTab": "(otvara se u novom prozoru)",
  "noscript": "Za prikaz sadržaja potrebno je da JavaScript bude uključen u pretraživaču.",

  // Navigacija
  "nav.about": "O nama",
  "nav.products": "Proizvodi",
  "nav.locations": "Gde nas naći",
  "nav.testimonials": "Utisci",

  // Hero
  "hero.eyebrow": "Zdravo, ja sam Poppy!",
  "hero.cta": "Pogledaj proizvode",

  // O nama
  "about.title": "O nama",
  "about.foundersTitle": "Osnivačice",

  // Proizvodi
  "products.title": "Naši proizvodi",
  "products.intro": "Slani obroci, slatki doručci i šejkovi, spremljeni u malim serijama.",
  "products.filterLabel": "Filtriraj po kategoriji",
  "products.filterAll": "Svi",
  "products.count.one": "Prikazan je {n} proizvod",
  "products.count.few": "Prikazana su {n} proizvoda",
  "products.count.other": "Prikazano je {n} proizvoda",
  "products.empty": "Ovde još nema proizvoda. Poppy ih upravo sprema!",
  "products.serving": "Porcija: {size}",
  "products.price": "Cena: {price}",
  "products.detailsSummary": "Sastojci i alergeni",
  "products.ingredients": "Sastojci",
  "products.allergens": "Alergeni",
  "products.toppings": "Dodaci po izboru",

  // Kategorije (ključ = id kategorije iz config/products.js)
  "categories.slano": "Slano",
  "categories.slatko": "Slatko",
  "categories.sejk": "Šejkovi",

  // Nutritivna tabela
  "nutrition.caption": "Nutritivne vrednosti",
  "nutrition.colNutrient": "Nutritivna vrednost",
  "nutrition.colPer100": "na 100 {unit}",
  "nutrition.colPerServing": "po porciji ({size})",
  "nutrition.energy": "Energetska vrednost",
  "nutrition.fat": "Masti",
  "nutrition.saturatedFat": "od kojih zasićene masne kiseline",
  "nutrition.carbs": "Ugljeni hidrati",
  "nutrition.sugars": "od kojih šećeri",
  "nutrition.fiber": "Vlakna",
  "nutrition.protein": "Proteini",
  "nutrition.salt": "So",
  "nutrition.unverified": "Vrednosti su okvirne.",

  // Lokacije
  "locations.title": "Gde nas možete naći?",
  "locations.intro": "Poppy proizvodi su dostupni u ovim objektima.",
  "locations.hours": "Radno vreme",
  "locations.openMaps": "Otvori u mapama",
  "locations.empty": "Uskoro objavljujemo prva prodajna mesta.",

  // Utisci
  "testimonials.title": "Utisci",
  "testimonials.intro": "Šta kažu oni koji su već probali.",
  "testimonials.rating": "Ocena {value} od 5",

  // Footer
  "footer.followUs": "Pratite nas",
  "footer.contact": "Kontakt",
  "footer.company": "Podaci o firmi",
  "footer.pib": "PIB",
  "footer.maticniBroj": "Matični broj",
  "footer.rights": "© {year} {brand}. Sva prava zadržana.",
  "footer.phone": "Telefon",
  "footer.email": "Email",
  "footer.address": "Adresa",

  // 404
  "notFound.title": "Ups, ova stranica ne postoji",
  "notFound.text": "Poppy je svuda tražila, ali ovde nema ničega. Možda je link pogrešan ili je stranica premeštena.",
  "notFound.cta": "Nazad na početnu"
};
