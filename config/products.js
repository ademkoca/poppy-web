/*
  POPPY: proizvodi.

  Kako se koristi (detaljno u README.md):
  - Novi proizvod: kopiraj jedan ceo blok { ... } u listu POPPY_PRODUCTS i izmeni vrednosti.
    Pojaviće se na sajtu bez ikakve izmene HTML-a, CSS-a ili JS-a.
  - Sakrivanje bez brisanja: visible: false
  - Redosled na sajtu = redosled u ovoj listi (unutar svake kategorije).

  Polja:
  - id               jedinstven, samo mala slova, brojevi i crtice
  - category         "slano" | "slatko" | "sejk" (vidi POPPY_CATEGORIES)
  - name, description, imageAlt, ingredients, allergens, toppings: po jezicima { sr: ... }
  - image            putanja do slike (preporuka 800 × 600 px, WebP)
  - servingSize      { value, unit }, unit je "g" (hrana) ili "ml" (šejkovi)
  - toppings         opciono: lista dodataka po izboru
  - price            opciono: null = cena se ne prikazuje; primer: { value: 390, currency: "RSD" }
  - nutrition.per100      vrednosti na 100 g/ml
  - nutrition.perServing  vrednosti po porciji; null = automatski se računa iz per100 i servingSize
  - nutritionVerified     false = ispod tabele piše "Vrednosti su okvirne"

  Energija: energyKj i energyKcal. Masti, zasićene masne kiseline, ugljeni hidrati, šećeri,
  vlakna, proteini i so su u gramima.
*/

// Redosled kategorija na sajtu. Nazivi kategorija su u i18n fajlovima (ključ "categories.<id>").
window.POPPY_CATEGORIES = ["slano", "slatko", "sejk"];

window.POPPY_PRODUCTS = [
  /* ============================== SLANO ============================== */
  {
    id: "proteinski-bagel",
    category: "slano",
    visible: true,
    name: { sr: "Proteinski bagel" },
    description: { sr: "Mekan iznutra, hrskav spolja, posut susamom. Savršen za doručak u pokretu, sam ili sa omiljenim namazom." },
    image: "assets/images/products/proteinski-bagel.webp",
    imageAlt: { sr: "Bageli posuti susamom na rešetki za hlađenje" },
    servingSize: { value: 90, unit: "g" },
    ingredients: { sr: ["pšenično brašno", "surutka u prahu (mleko)", "voda", "belance", "susam", "kvasac", "maslinovo ulje", "so"] },
    allergens: { sr: ["gluten", "mleko", "jaja", "susam"] },
    price: null,
    // PLACEHOLDER: izmišljene vrednosti, nisu laboratorijski potvrđene. Zameniti pravim podacima.
    nutrition: {
      per100: { energyKj: 1159, energyKcal: 275, fat: 4.5, saturatedFat: 1.2, carbs: 38, sugars: 3.5, fiber: 5, protein: 18, salt: 1.0 },
      perServing: null
    },
    nutritionVerified: false
  },
  {
    id: "proteinska-proja",
    category: "slano",
    visible: true,
    name: { sr: "Proteinska proja" },
    description: { sr: "Domaća proja kakvu pamtimo, sa sirom i jogurtom. Topla je najlepša, a hladna ide uz sve." },
    image: "assets/images/products/proteinska-proja.webp",
    imageAlt: { sr: "Zlatno pečena proja u plehu u rerni" },
    servingSize: { value: 120, unit: "g" },
    ingredients: { sr: ["kukuruzno brašno", "posni sir (mleko)", "jaja", "grčki jogurt (mleko)", "proteini surutke (mleko)", "suncokretovo ulje", "prašak za pecivo", "so"] },
    allergens: { sr: ["mleko", "jaja"] },
    price: null,
    // PLACEHOLDER: izmišljene vrednosti, nisu laboratorijski potvrđene. Zameniti pravim podacima.
    nutrition: {
      per100: { energyKj: 1039, energyKcal: 247, fat: 7, saturatedFat: 2.5, carbs: 30, sugars: 3, fiber: 4, protein: 14, salt: 0.9 },
      perServing: null
    },
    nutritionVerified: false
  },
  {
    id: "proteinska-gibanica",
    category: "slano",
    visible: true,
    name: { sr: "Proteinska gibanica" },
    description: { sr: "Tanke kore, mnogo sira i ona poznata domaća aroma. Gibanica za nedeljni ručak, ali i za svaki drugi dan." },
    image: "assets/images/products/proteinska-gibanica.webp",
    imageAlt: { sr: "Parče slojevite pite sa sirom na tanjiru" },
    servingSize: { value: 150, unit: "g" },
    ingredients: { sr: ["kore (pšenično brašno)", "posni kravlji sir (mleko)", "jaja", "grčki jogurt (mleko)", "proteini surutke (mleko)", "kisela voda", "suncokretovo ulje", "so"] },
    allergens: { sr: ["gluten", "mleko", "jaja"] },
    price: null,
    // PLACEHOLDER: izmišljene vrednosti, nisu laboratorijski potvrđene. Zameniti pravim podacima.
    nutrition: {
      per100: { energyKj: 886, energyKcal: 211, fat: 8, saturatedFat: 3.8, carbs: 18, sugars: 2.5, fiber: 1.5, protein: 16, salt: 1.1 },
      perServing: null
    },
    nutritionVerified: false
  },

  /* ============================== SLATKO ============================== */
  {
    id: "kasa-hurme-cimet",
    category: "slatko",
    visible: true,
    name: { sr: "Proteinska kaša sa hurmama i cimetom" },
    description: { sr: "Kremasta ovsena kaša sa komadićima hurmi i toplim cimetom. Zimski zagrljaj u činiji, tokom cele godine." },
    image: "assets/images/products/kasa-hurme-cimet.webp",
    imageAlt: { sr: "Činija kremaste kaše posute cimetom, sa štapićima cimeta" },
    servingSize: { value: 250, unit: "g" },
    ingredients: { sr: ["mleko", "ovsene pahuljice", "hurme", "proteini surutke (mleko)", "cimet", "vanila"] },
    allergens: { sr: ["mleko", "ovas (gluten)"] },
    price: null,
    // PLACEHOLDER: izmišljene vrednosti, nisu laboratorijski potvrđene. Zameniti pravim podacima.
    nutrition: {
      per100: { energyKj: 627, energyKcal: 149, fat: 2.5, saturatedFat: 0.8, carbs: 20, sugars: 9, fiber: 3, protein: 10, salt: 0.15 },
      perServing: null
    },
    nutritionVerified: false
  },
  {
    id: "proteinske-palacinke",
    category: "slatko",
    visible: true,
    name: { sr: "Proteinske palačinke" },
    description: { sr: "Pufnaste američke palačinke koje sama dovršiš: izaberi omiljeni topping i napravi svoju kombinaciju." },
    image: "assets/images/products/proteinske-palacinke.webp",
    imageAlt: { sr: "Palačinke sa jagodama, borovnicama i bananom" },
    servingSize: { value: 180, unit: "g" },
    ingredients: { sr: ["ovsene pahuljice", "belance", "grčki jogurt (mleko)", "proteini surutke (mleko)", "banana", "prašak za pecivo", "cimet"] },
    allergens: { sr: ["ovas (gluten)", "jaja", "mleko"] },
    // Dodaci po izboru. Nutritivne vrednosti ispod važe za palačinke BEZ dodataka.
    toppings: { sr: ["jagode i borovnice", "banana i kakao krem", "kikiriki puter", "grčki jogurt i med", "domaći džem od malina"] },
    price: null,
    // PLACEHOLDER: izmišljene vrednosti (bez toppinga), nisu laboratorijski potvrđene. Zameniti pravim podacima.
    nutrition: {
      per100: { energyKj: 797, energyKcal: 189, fat: 4, saturatedFat: 1.5, carbs: 22, sugars: 4, fiber: 2.5, protein: 15, salt: 0.5 },
      perServing: null
    },
    nutritionVerified: false
  },
  {
    id: "kasa-maline",
    category: "slatko",
    visible: true,
    name: { sr: "Proteinska kaša sa malinama" },
    description: { sr: "Ovsena kaša sa slatko-kiselim malinama. Lagana, sveža i roze, baš kako volimo." },
    image: "assets/images/products/kasa-maline.webp",
    imageAlt: { sr: "Činija ovsene kaše sa malinama i voćem" },
    servingSize: { value: 250, unit: "g" },
    ingredients: { sr: ["mleko", "ovsene pahuljice", "maline", "proteini surutke (mleko)", "chia semenke", "vanila"] },
    allergens: { sr: ["mleko", "ovas (gluten)"] },
    price: null,
    // PLACEHOLDER: izmišljene vrednosti, nisu laboratorijski potvrđene. Zameniti pravim podacima.
    nutrition: {
      per100: { energyKj: 597, energyKcal: 142, fat: 2.5, saturatedFat: 0.8, carbs: 18, sugars: 6, fiber: 3.5, protein: 10, salt: 0.12 },
      perServing: null
    },
    nutritionVerified: false
  },

  /* ============================== ŠEJKOVI ==============================
     Ukus se menja izmenom polja name, description, image i imageAlt. */
  {
    id: "sejk-cokolada",
    category: "sejk",
    visible: true,
    name: { sr: "Proteinski šejk: čokolada" },
    description: { sr: "Gust, kremast i pravi čokoladni. Za kraj treninga ili kad baš poželiš nešto slatko." },
    image: "assets/images/products/sejk-cokolada.webp",
    imageAlt: { sr: "Čaša čokoladnog šejka sa slamčicom" },
    servingSize: { value: 330, unit: "ml" },
    ingredients: { sr: ["mleko sa smanjenim sadržajem masti", "proteini mleka", "kakao", "zaslađivač: sukraloza", "zgušnjivač: guar guma"] },
    allergens: { sr: ["mleko"] },
    price: null,
    // PLACEHOLDER: izmišljene vrednosti, nisu laboratorijski potvrđene. Zameniti pravim podacima.
    nutrition: {
      per100: { energyKj: 263, energyKcal: 62, fat: 1.2, saturatedFat: 0.8, carbs: 5.5, sugars: 4, fiber: 0.8, protein: 7, salt: 0.2 },
      perServing: null
    },
    nutritionVerified: false
  },
  {
    id: "sejk-vanila",
    category: "sejk",
    visible: true,
    name: { sr: "Proteinski šejk: vanila" },
    description: { sr: "Nežna vanila, glatka i osvežavajuća. Klasik koji nikad ne razočara." },
    image: "assets/images/products/sejk-vanila.webp",
    imageAlt: { sr: "Ruka drži čašu vanila šejka sa slamčicom" },
    servingSize: { value: 330, unit: "ml" },
    ingredients: { sr: ["mleko sa smanjenim sadržajem masti", "proteini mleka", "prirodna aroma vanile", "zaslađivač: sukraloza", "zgušnjivač: guar guma"] },
    allergens: { sr: ["mleko"] },
    price: null,
    // PLACEHOLDER: izmišljene vrednosti, nisu laboratorijski potvrđene. Zameniti pravim podacima.
    nutrition: {
      per100: { energyKj: 247, energyKcal: 59, fat: 1.1, saturatedFat: 0.7, carbs: 5, sugars: 4.2, fiber: 0.3, protein: 7, salt: 0.18 },
      perServing: null
    },
    nutritionVerified: false
  },
  {
    id: "sejk-jagoda",
    category: "sejk",
    visible: true,
    name: { sr: "Proteinski šejk: jagoda" },
    description: { sr: "Roze, voćni i razigran, sa pravim jagodama. Poppy-jev omiljeni ukus." },
    image: "assets/images/products/sejk-jagoda.webp",
    imageAlt: { sr: "Roze šejk od jagode u visokoj čaši, sa jagodama" },
    servingSize: { value: 330, unit: "ml" },
    ingredients: { sr: ["mleko sa smanjenim sadržajem masti", "proteini mleka", "pire od jagode (8%)", "sok od cvekle (za boju)", "zaslađivač: sukraloza", "zgušnjivač: guar guma"] },
    allergens: { sr: ["mleko"] },
    price: null,
    // PLACEHOLDER: izmišljene vrednosti, nisu laboratorijski potvrđene. Zameniti pravim podacima.
    nutrition: {
      per100: { energyKj: 259, energyKcal: 61, fat: 1.0, saturatedFat: 0.6, carbs: 5.8, sugars: 4.8, fiber: 0.5, protein: 7, salt: 0.17 },
      perServing: null
    },
    nutritionVerified: false
  }
];
