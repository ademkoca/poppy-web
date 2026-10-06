/*
  POPPY: formatiranje nutritivnih vrednosti po EU pravilima.
  Zaokruživanje prati smernice Evropske komisije za tolerancije i zaokruživanje (2012):
  - energija: ceo broj (kJ i kcal)
  - masti, ugljeni hidrati, šećeri, vlakna, proteini: ≥ 10 g na 1 g; < 10 g na 0,1 g; ≤ 0,5 g kao "<0,5 g"
  - zasićene masne kiseline: ≥ 10 g na 1 g; < 10 g na 0,1 g; ≤ 0,1 g kao "<0,1 g"
  - so: ≥ 1 g na 0,1 g; < 1 g na 0,01 g; ≤ 0,0125 g kao "<0,01 g"
*/
(function () {
  "use strict";

  var NUTRIENTS = ["energy", "fat", "saturatedFat", "carbs", "sugars", "fiber", "protein", "salt"];
  var SUB_ROWS = { saturatedFat: true, sugars: true };
  var MACRO_KEYS = ["energyKj", "energyKcal", "fat", "saturatedFat", "carbs", "sugars", "fiber", "protein", "salt"];

  function formatter(decimals) {
    return new Intl.NumberFormat(window.PoppyI18n.locale(), {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: false
    });
  }

  function grams(value, decimals) {
    return formatter(decimals).format(value) + " g";
  }

  function formatMacro(value) {
    if (value <= 0.5) return "<" + formatter(1).format(0.5) + " g";
    if (value >= 10) return grams(Math.round(value), 0);
    return grams(Math.round(value * 10) / 10, 1);
  }

  function formatSaturates(value) {
    if (value <= 0.1) return "<" + formatter(1).format(0.1) + " g";
    if (value >= 10) return grams(Math.round(value), 0);
    return grams(Math.round(value * 10) / 10, 1);
  }

  function formatSalt(value) {
    if (value <= 0.0125) return "<" + formatter(2).format(0.01) + " g";
    if (value >= 1) return grams(Math.round(value * 10) / 10, 1);
    return grams(Math.round(value * 100) / 100, 2);
  }

  // Energija se vraća kao dva dela ("1159 kJ /" i "275 kcal") da bi tabela mogla da ih prelomi u dva reda.
  function formatEnergy(values) {
    var f = formatter(0);
    return [f.format(Math.round(values.energyKj)) + " kJ /", f.format(Math.round(values.energyKcal)) + " kcal"];
  }

  function formatValue(nutrient, values) {
    if (nutrient === "energy") return formatEnergy(values);
    var value = Number(values[nutrient]) || 0;
    if (nutrient === "saturatedFat") return formatSaturates(value);
    if (nutrient === "salt") return formatSalt(value);
    return formatMacro(value);
  }

  // Ako perServing nije upisan u config, računa se iz vrednosti na 100 g/ml.
  function perServing(product) {
    var nutrition = product.nutrition || {};
    if (nutrition.perServing) return nutrition.perServing;
    var factor = (product.servingSize && product.servingSize.value ? product.servingSize.value : 100) / 100;
    var result = {};
    MACRO_KEYS.forEach(function (key) {
      result[key] = (Number(nutrition.per100[key]) || 0) * factor;
    });
    return result;
  }

  // Vraća redove tabele: [{ key, isSub, per100, perServing }]
  function rows(product) {
    var per100 = product.nutrition.per100;
    var serving = perServing(product);
    return NUTRIENTS.map(function (nutrient) {
      return {
        key: nutrient,
        isSub: Boolean(SUB_ROWS[nutrient]),
        per100: formatValue(nutrient, per100),
        perServing: formatValue(nutrient, serving)
      };
    });
  }

  function formatServing(servingSize) {
    if (!servingSize) return "";
    return formatter(0).format(servingSize.value) + " " + servingSize.unit;
  }

  function formatPrice(price) {
    if (!price || price.value === undefined || price.value === null || price.value === "") return "";
    return formatter(0).format(price.value) + " " + (price.currency || "RSD");
  }

  window.PoppyNutrition = {
    rows: rows,
    formatServing: formatServing,
    formatPrice: formatPrice
  };
})();
