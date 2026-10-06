/*
  POPPY: i18n pomoćne funkcije.
  - t(key, vars)   UI tekst iz i18n/<jezik>.js, uz zamenu {promenljivih}
  - loc(field)     tekst iz config-a: string ili objekat { sr: ..., en: ... }
  - plural(base,n) bira ključ base.one / base.few / base.other po pravilima jezika
  - apply(root)    popunjava elemente sa data-i18n i data-i18n-attr
*/
(function () {
  "use strict";

  var site = window.POPPY_SITE || {};
  var dictionaries = window.POPPY_I18N || {};
  var STORAGE_KEY = "poppy-lang";

  var defaultLang = site.defaultLanguage || "sr";
  var available = (site.languages || [defaultLang]).filter(function (code) {
    return Boolean(dictionaries[code]);
  });
  if (available.length === 0) available = [defaultLang];

  function readStoredLang() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(code) {
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {
      /* privatni režim ili blokirano skladište: jezik se samo ne pamti */
    }
  }

  function pickInitialLang() {
    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    var stored = readStoredLang();
    var candidates = [fromUrl, stored, defaultLang];
    for (var i = 0; i < candidates.length; i++) {
      if (candidates[i] && available.indexOf(candidates[i]) !== -1) return candidates[i];
    }
    return available[0];
  }

  var current = pickInitialLang();

  function lookup(key) {
    var dict = dictionaries[current] || {};
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    var fallback = dictionaries[defaultLang] || {};
    if (Object.prototype.hasOwnProperty.call(fallback, key)) return fallback[key];
    if (window.console) console.warn("[i18n] Nedostaje prevod za ključ: " + key);
    return key;
  }

  function interpolate(text, vars) {
    if (!vars) return text;
    return String(text).replace(/\{(\w+)\}/g, function (match, name) {
      return Object.prototype.hasOwnProperty.call(vars, name) ? vars[name] : match;
    });
  }

  function t(key, vars) {
    return interpolate(lookup(key), vars);
  }

  function loc(field) {
    if (field === null || field === undefined) return "";
    if (typeof field === "string" || Array.isArray(field)) return field;
    if (Object.prototype.hasOwnProperty.call(field, current)) return field[current];
    if (Object.prototype.hasOwnProperty.call(field, defaultLang)) return field[defaultLang];
    var keys = Object.keys(field);
    return keys.length ? field[keys[0]] : "";
  }

  function locale() {
    return lookup("meta.locale");
  }

  function plural(baseKey, n, vars) {
    var rule = "other";
    try {
      rule = new Intl.PluralRules(locale()).select(n);
    } catch (e) {
      /* stariji pretraživač: koristi "other" */
    }
    var dict = dictionaries[current] || {};
    var key = baseKey + "." + rule;
    if (!Object.prototype.hasOwnProperty.call(dict, key)) key = baseKey + ".other";
    return t(key, Object.assign({ n: n }, vars || {}));
  }

  // data-i18n="kljuc"                          -> textContent
  // data-i18n-attr="aria-label:kljuc;alt:kljuc" -> atributi
  function apply(root) {
    var scope = root || document;
    scope.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    scope.querySelectorAll("[data-i18n-attr]").forEach(function (node) {
      node.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length === 2) node.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
  }

  function setLang(code) {
    if (available.indexOf(code) === -1) return;
    current = code;
    storeLang(code);
    document.documentElement.setAttribute("lang", code);
    document.dispatchEvent(new CustomEvent("poppy:langchange", { detail: { lang: code } }));
  }

  document.documentElement.setAttribute("lang", current);

  window.PoppyI18n = {
    t: t,
    loc: loc,
    plural: plural,
    apply: apply,
    locale: locale,
    setLang: setLang,
    getLang: function () { return current; },
    languages: function () { return available.slice(); }
  };
})();
