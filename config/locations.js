/*
  POPPY: lokacije gde se proizvodi mogu kupiti.
  SVE LOKACIJE SU PLACEHOLDERI (izmišljeni objekti), zameni ih pravim.

  Polja:
  - id        jedinstven
  - visible   false = lokacija se ne prikazuje
  - name      naziv objekta
  - city      grad
  - address   ulica i broj
  - hours     lista redova radnog vremena: { days: { sr: "..." }, time: "08–20" }
  - mapsUrl   opciono: tačan link ka mapi. Ako ga nema, link se pravi automatski iz adrese i grada.
*/
window.POPPY_LOCATIONS = [
  {
    id: "beograd-dorcol",
    visible: true,
    name: "Zdrava Kutija Dorćol",
    city: "Beograd",
    address: "Cara Dušana 42",
    hours: [
      { days: { sr: "Ponedeljak – petak" }, time: "08:00 – 20:00" },
      { days: { sr: "Subota" }, time: "09:00 – 16:00" },
      { days: { sr: "Nedelja" }, time: "zatvoreno" }
    ],
    mapsUrl: ""
  },
  {
    id: "beograd-vracar",
    visible: true,
    name: "Fit Corner Vračar",
    city: "Beograd",
    address: "Njegoševa 18",
    hours: [
      { days: { sr: "Ponedeljak – subota" }, time: "07:30 – 21:00" },
      { days: { sr: "Nedelja" }, time: "10:00 – 15:00" }
    ],
    mapsUrl: ""
  },
  {
    id: "novi-sad-centar",
    visible: true,
    name: "Poppy kutak u Studiju Balans",
    city: "Novi Sad",
    address: "Bulevar oslobođenja 123",
    hours: [
      { days: { sr: "Ponedeljak – petak" }, time: "07:00 – 22:00" },
      { days: { sr: "Vikend" }, time: "09:00 – 18:00" }
    ],
    mapsUrl: ""
  },
  {
    id: "nis-centar",
    visible: true,
    name: "Bistro Zrno",
    city: "Niš",
    address: "Obrenovićeva 27",
    hours: [
      { days: { sr: "Svakog dana" }, time: "08:00 – 22:00" }
    ],
    mapsUrl: ""
  },
  {
    id: "kragujevac-centar",
    visible: true,
    name: "Protein Bar Šumadija",
    city: "Kragujevac",
    address: "Kralja Petra I 9",
    hours: [
      { days: { sr: "Ponedeljak – petak" }, time: "08:00 – 20:00" },
      { days: { sr: "Subota" }, time: "09:00 – 14:00" }
    ],
    mapsUrl: ""
  }
];
