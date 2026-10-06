/*
  POPPY: utisci kupaca.
  SVI UTISCI SU PLACEHOLDERI, zameni ih pravim (uz saglasnost kupaca).

  Polja:
  - id        jedinstven
  - visible   false = utisak se ne prikazuje
  - name      ime (npr. samo ime i početno slovo prezimena)
  - city      opciono
  - rating    ocena od 1 do 5
  - text      tekst utiska po jezicima { sr: "..." }
*/
window.POPPY_TESTIMONIALS = [
  {
    id: "jelena",
    visible: true,
    name: "Jelena M.",
    city: "Beograd",
    rating: 5,
    text: { sr: "Kaša sa malinama mi je postala ritual posle jutarnjeg treninga. Zasitna je, a ima ukus kao desert!" }
  },
  {
    id: "milica",
    visible: true,
    name: "Milica P.",
    city: "Novi Sad",
    rating: 5,
    text: { sr: "Nisam verovala da proteinska gibanica može da bude ovako dobra. Mama je tražila recept." }
  },
  {
    id: "teodora",
    visible: true,
    name: "Teodora S.",
    city: "Niš",
    rating: 4,
    text: { sr: "Šejk od jagode je moj spas u pola radnog dana. Jedva čekam još ukusa!" }
  },
  {
    id: "katarina",
    visible: true,
    name: "Katarina Đ.",
    city: "Kragujevac",
    rating: 5,
    text: { sr: "Palačinke sa kikiriki puterom su čista sreća. Pakovanje je preslatko, a mačka Poppy još slađa." }
  }
];
