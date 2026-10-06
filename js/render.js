/*
  POPPY: generisanje sekcija iz config fajlova.
  Ovde nema sadržaja: svi tekstovi dolaze iz config/*.js i i18n/*.js.
  Svaka funkcija crta sekciju samo ako na stranici postoji njen kontejner.
*/
(function () {
  "use strict";

  var I = window.PoppyI18n;
  var N = window.PoppyNutrition;
  var MASCOT_SRC = "assets/mascot/poppy.svg";
  var SVG_NS = "http://www.w3.org/2000/svg";

  // Ikonice društvenih mreža: Simple Icons (CC0 1.0), https://simpleicons.org
  var SOCIAL_ICONS = {
    instagram: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
    tiktok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
    facebook: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
  };
  var SOCIAL_NAMES = { instagram: "Instagram", tiktok: "TikTok", facebook: "Facebook" };

  var STAR_PATH = "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z";
  var PIN_PATH = "M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z";

  /* ------------------------------------------------------------------ */
  /* Pomoćne funkcije                                                    */
  /* ------------------------------------------------------------------ */

  // h("div", { class: "x", "aria-label": "..." }, [deca ili tekst])
  function h(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (name) {
        var value = attrs[name];
        if (value === null || value === undefined || value === false) return;
        if (name === "text") node.textContent = value;
        else node.setAttribute(name, value === true ? "" : value);
      });
    }
    append(node, children);
    return node;
  }

  function append(node, children) {
    if (children === null || children === undefined) return;
    (Array.isArray(children) ? children : [children]).forEach(function (child) {
      if (child === null || child === undefined || child === false) return;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
  }

  function svgIcon(pathData, className, viewBox) {
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", viewBox || "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    if (className) svg.setAttribute("class", className);
    var path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", pathData);
    svg.appendChild(path);
    return svg;
  }

  function mascot(className, size, decorative) {
    return h("span", { class: "mascot " + (className || "") }, h("img", {
      src: MASCOT_SRC,
      alt: decorative ? "" : "Poppy",
      width: size,
      height: size,
      class: "mascot__img",
      decoding: "async"
    }));
  }

  function isVisible(item) {
    return item && item.visible !== false;
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
    return node;
  }

  function sectionHeader(titleKey, introKey, headingId) {
    return h("header", { class: "section-header reveal" }, [
      h("h2", { class: "section-title", id: headingId, text: I.t(titleKey) }),
      introKey ? h("p", { class: "section-intro", text: I.t(introKey) }) : null
    ]);
  }

  var site = window.POPPY_SITE || {};

  /* ------------------------------------------------------------------ */
  /* Hero                                                                */
  /* ------------------------------------------------------------------ */
  function renderHero() {
    var root = byId("hero-root");
    if (!root) return;
    var images = (site.hero && site.hero.images) || [];

    var plates = images.slice(0, 3).map(function (img, index) {
      return h("div", { class: "hero__plate hero__plate--" + (index + 1) }, h("img", {
        src: img.src,
        alt: I.loc(img.alt),
        width: 720,
        height: 720,
        fetchpriority: index === 0 ? "high" : null,
        decoding: "async"
      }));
    });

    clear(root);
    append(root, [
      h("div", { class: "hero__flatlay" }, plates.concat([
        h("span", { class: "hero__sprinkle hero__sprinkle--1", "aria-hidden": "true" }),
        h("span", { class: "hero__sprinkle hero__sprinkle--2", "aria-hidden": "true" }),
        h("span", { class: "hero__sprinkle hero__sprinkle--3", "aria-hidden": "true" }),
        mascot("hero__mascot", 200, true)
      ])),
      h("div", { class: "hero__content" }, [
        h("p", { class: "hero__eyebrow", text: I.t("hero.eyebrow") }),
        h("h1", { class: "hero__title", text: I.loc(site.tagline) }),
        h("a", { class: "btn btn--primary", href: "#proizvodi", text: I.t("hero.cta") })
      ])
    ]);
  }

  /* ------------------------------------------------------------------ */
  /* O nama                                                              */
  /* ------------------------------------------------------------------ */
  function renderAbout() {
    var root = byId("about-root");
    if (!root) return;
    var about = site.about || {};
    var paragraphs = I.loc(about.text);
    if (!Array.isArray(paragraphs)) paragraphs = paragraphs ? [paragraphs] : [];

    var gallery = (about.images || []).map(function (img) {
      var caption = I.loc(img.caption);
      return h("figure", { class: "about__figure reveal" }, [
        h("img", {
          src: img.src,
          alt: I.loc(img.alt),
          width: 800,
          height: 600,
          loading: "lazy",
          decoding: "async"
        }),
        caption ? h("figcaption", { text: caption }) : null
      ]);
    });

    var founders = I.loc(about.founders);

    clear(root);
    append(root, h("div", { class: "container" }, [
      sectionHeader("about.title", null, "about-title"),
      h("div", { class: "about__grid" }, [
        h("div", { class: "about__text reveal" }, paragraphs.map(function (p) {
          return h("p", { text: p });
        }).concat(founders ? [
          h("div", { class: "about__founders" }, [
            h("h3", { class: "about__founders-title", text: I.t("about.foundersTitle") }),
            h("p", { text: founders })
          ])
        ] : [])),
        h("div", { class: "about__gallery" }, gallery)
      ])
    ]));
  }

  /* ------------------------------------------------------------------ */
  /* Proizvodi                                                           */
  /* ------------------------------------------------------------------ */
  var activeCategory = "all";

  function productCategories() {
    var products = (window.POPPY_PRODUCTS || []).filter(isVisible);
    var order = (window.POPPY_CATEGORIES || []).slice();
    // Kategorija koja postoji u proizvodima, a nije u POPPY_CATEGORIES, ide na kraj.
    products.forEach(function (p) {
      if (order.indexOf(p.category) === -1) order.push(p.category);
    });
    return { products: products, order: order };
  }

  // Vrednost ćelije je tekst ili lista delova (energija: kJ i kcal u dva reda).
  function cellContent(value) {
    if (!Array.isArray(value)) return value;
    return value.map(function (part) {
      return h("span", { class: "nutrition__line", text: part });
    });
  }

  function nutritionTable(product) {
    var unit = product.servingSize ? product.servingSize.unit : "g";
    var captionId = "nutrition-" + product.id;
    var rows = N.rows(product).map(function (row) {
      return h("tr", { class: row.isSub ? "is-sub" : null }, [
        h("th", { scope: "row", text: I.t("nutrition." + row.key) }),
        h("td", null, cellContent(row.per100)),
        h("td", null, cellContent(row.perServing))
      ]);
    });

    return h("div", { class: "nutrition" }, [
      h("table", { class: "nutrition__table", "aria-describedby": product.nutritionVerified ? null : captionId + "-note" }, [
        h("caption", { text: I.t("nutrition.caption") }),
        h("thead", null, h("tr", null, [
          h("th", { scope: "col", text: I.t("nutrition.colNutrient") }),
          h("th", { scope: "col", text: I.t("nutrition.colPer100", { unit: unit }) }),
          h("th", { scope: "col", text: I.t("nutrition.colPerServing", { size: N.formatServing(product.servingSize) }) })
        ])),
        h("tbody", null, rows)
      ]),
      product.nutritionVerified ? null : h("p", { class: "nutrition__note", id: captionId + "-note", text: I.t("nutrition.unverified") })
    ]);
  }

  function listItems(items) {
    return h("ul", { class: "chips" }, items.map(function (item) {
      return h("li", { class: "chip", text: item });
    }));
  }

  function productCard(product) {
    var ingredients = I.loc(product.ingredients) || [];
    var allergens = I.loc(product.allergens) || [];
    var toppings = I.loc(product.toppings) || [];
    var price = N.formatPrice(product.price);
    var titleId = "product-" + product.id;

    return h("article", { class: "product-card reveal", "aria-labelledby": titleId, "data-category": product.category }, [
      h("div", { class: "product-card__media" }, [
        h("img", {
          src: product.image,
          alt: I.loc(product.imageAlt),
          width: 800,
          height: 600,
          loading: "lazy",
          decoding: "async"
        }),
        h("span", { class: "product-card__badge", text: I.t("categories." + product.category) })
      ]),
      h("div", { class: "product-card__body" }, [
        h("h4", { class: "product-card__title", id: titleId, text: I.loc(product.name) }),
        h("p", { class: "product-card__description", text: I.loc(product.description) }),
        h("p", { class: "product-card__meta" }, [
          h("span", { text: I.t("products.serving", { size: N.formatServing(product.servingSize) }) }),
          price ? h("span", { class: "product-card__price", text: I.t("products.price", { price: price }) }) : null
        ]),
        toppings.length ? h("div", { class: "product-card__toppings" }, [
          h("p", { class: "product-card__label", text: I.t("products.toppings") }),
          listItems(toppings)
        ]) : null,
        (ingredients.length || allergens.length) ? h("details", { class: "product-card__details" }, [
          h("summary", { text: I.t("products.detailsSummary") }),
          ingredients.length ? h("p", null, [
            h("strong", { text: I.t("products.ingredients") + ": " }),
            ingredients.join(", ")
          ]) : null,
          allergens.length ? h("p", null, [
            h("strong", { text: I.t("products.allergens") + ": " }),
            allergens.join(", ")
          ]) : null
        ]) : null,
        product.nutrition && product.nutrition.per100 ? nutritionTable(product) : null
      ])
    ]);
  }

  function emptyState(textKey) {
    return h("div", { class: "empty-state" }, [
      mascot("empty-state__mascot", 120, true),
      h("p", { text: I.t(textKey) })
    ]);
  }

  function renderProductList() {
    var list = byId("products-list");
    var status = byId("products-status");
    if (!list) return;
    var data = productCategories();
    var categories = activeCategory === "all" ? data.order : [activeCategory];
    var shown = 0;

    clear(list);
    categories.forEach(function (category) {
      var items = data.products.filter(function (p) { return p.category === category; });
      if (!items.length) return;
      shown += items.length;
      list.appendChild(h("section", { class: "product-group", "aria-labelledby": "category-" + category }, [
        h("h3", { class: "product-group__title reveal", id: "category-" + category, text: I.t("categories." + category) }),
        h("div", { class: "product-grid" }, items.map(productCard))
      ]));
    });

    if (!shown) list.appendChild(emptyState("products.empty"));
    if (status) status.textContent = I.plural("products.count", shown);
    document.dispatchEvent(new CustomEvent("poppy:rendered", { detail: { root: list } }));
  }

  function renderProducts() {
    var root = byId("products-root");
    if (!root) return;
    var data = productCategories();
    var filters = ["all"].concat(data.order.filter(function (category) {
      return data.products.some(function (p) { return p.category === category; });
    }));
    if (filters.indexOf(activeCategory) === -1) activeCategory = "all";

    clear(root);
    append(root, h("div", { class: "container" }, [
      sectionHeader("products.title", "products.intro", "products-title"),
      h("div", { class: "filters reveal", role: "group", "aria-label": I.t("products.filterLabel") }, filters.map(function (category) {
        return h("button", {
          type: "button",
          class: "filter-btn",
          "data-filter": category,
          "aria-pressed": String(category === activeCategory),
          "aria-controls": "products-list",
          text: category === "all" ? I.t("products.filterAll") : I.t("categories." + category)
        });
      })),
      h("p", { class: "visually-hidden", id: "products-status", role: "status", "aria-live": "polite" }),
      h("div", { id: "products-list", class: "products-list" })
    ]));
    renderProductList();
  }

  function setCategory(category) {
    activeCategory = category;
    document.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-filter") === category));
    });
    renderProductList();
  }

  /* ------------------------------------------------------------------ */
  /* Lokacije                                                            */
  /* ------------------------------------------------------------------ */
  function mapsLink(location) {
    if (location.mapsUrl) return location.mapsUrl;
    var query = [location.name, location.address, location.city, "Srbija"].filter(Boolean).join(", ");
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
  }

  function renderLocations() {
    var root = byId("locations-root");
    if (!root) return;
    var locations = (window.POPPY_LOCATIONS || []).filter(isVisible);

    var cards = locations.map(function (location) {
      var hours = location.hours || [];
      return h("li", { class: "location-card reveal" }, [
        h("div", { class: "location-card__head" }, [
          svgIcon(PIN_PATH, "location-card__icon"),
          h("div", null, [
            h("h3", { class: "location-card__title", text: location.name }),
            h("p", { class: "location-card__city", text: location.city })
          ])
        ]),
        h("address", { class: "location-card__address", text: [location.address, location.city].filter(Boolean).join(", ") }),
        hours.length ? h("div", { class: "location-card__hours" }, [
          h("p", { class: "location-card__label", text: I.t("locations.hours") }),
          h("dl", null, hours.reduce(function (acc, row) {
            acc.push(h("dt", { text: I.loc(row.days) }));
            acc.push(h("dd", { text: row.time }));
            return acc;
          }, []))
        ]) : null,
        h("a", {
          class: "btn btn--ghost",
          href: mapsLink(location),
          target: "_blank",
          rel: "noopener noreferrer"
        }, [
          I.t("locations.openMaps"),
          h("span", { class: "visually-hidden", text: " " + location.name + " " + I.t("a11y.newTab") })
        ])
      ]);
    });

    clear(root);
    append(root, h("div", { class: "container" }, [
      sectionHeader("locations.title", "locations.intro", "locations-title"),
      cards.length ? h("ul", { class: "locations-grid", role: "list" }, cards) : emptyState("locations.empty")
    ]));
  }

  /* ------------------------------------------------------------------ */
  /* Utisci                                                              */
  /* ------------------------------------------------------------------ */
  function stars(rating) {
    var value = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    var label = I.t("testimonials.rating", { value: value });
    var wrap = h("p", { class: "stars", role: "img", "aria-label": label });
    for (var i = 1; i <= 5; i++) {
      wrap.appendChild(svgIcon(STAR_PATH, i <= value ? "star is-on" : "star"));
    }
    return wrap;
  }

  function renderTestimonials() {
    var root = byId("testimonials-root");
    if (!root) return;
    var items = (window.POPPY_TESTIMONIALS || []).filter(isVisible);
    if (!items.length) {
      // Bez utisaka sekcija se ne prikazuje, a link u meniju se sakriva.
      (root.closest("section") || root).hidden = true;
      document.querySelectorAll('a[href="#utisci"]').forEach(function (a) {
        if (a.parentElement) a.parentElement.hidden = true;
      });
      return;
    }
    (root.closest("section") || root).hidden = false;

    var cards = items.map(function (item) {
      return h("li", { class: "testimonial reveal" }, h("figure", null, [
        stars(item.rating),
        h("blockquote", null, h("p", { text: I.loc(item.text) })),
        h("figcaption", null, [
          h("span", { class: "testimonial__name", text: item.name }),
          item.city ? h("span", { class: "testimonial__city", text: item.city }) : null
        ])
      ]));
    });

    clear(root);
    append(root, h("div", { class: "container" }, [
      sectionHeader("testimonials.title", "testimonials.intro", "testimonials-title"),
      h("ul", { class: "testimonials-track", role: "list", tabindex: "0", "aria-labelledby": "testimonials-title" }, cards)
    ]));
  }

  /* ------------------------------------------------------------------ */
  /* Footer                                                              */
  /* ------------------------------------------------------------------ */
  function renderFooter() {
    var root = byId("footer-root");
    if (!root) return;
    var contact = site.contact || {};
    var company = site.company || {};
    var social = site.social || {};

    var socialLinks = ["instagram", "tiktok", "facebook"].filter(function (key) {
      return Boolean(social[key]);
    }).map(function (key) {
      return h("li", null, h("a", {
        class: "social-link",
        href: social[key],
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": SOCIAL_NAMES[key] + " " + I.t("a11y.newTab")
      }, svgIcon(SOCIAL_ICONS[key])));
    });

    var contactItems = [];
    if (contact.address) contactItems.push(h("li", null, [h("span", { class: "footer__label", text: I.t("footer.address") }), contact.address]));
    if (contact.phone) contactItems.push(h("li", null, [h("span", { class: "footer__label", text: I.t("footer.phone") }), h("a", { href: "tel:" + contact.phone.replace(/[^\d+]/g, ""), text: contact.phone })]));
    if (contact.email) contactItems.push(h("li", null, [h("span", { class: "footer__label", text: I.t("footer.email") }), h("a", { href: "mailto:" + contact.email, text: contact.email })]));

    var companyItems = [];
    if (company.name) companyItems.push(h("li", { text: company.name }));
    if (company.pib) companyItems.push(h("li", { text: I.t("footer.pib") + ": " + company.pib }));
    if (company.maticniBroj) companyItems.push(h("li", { text: I.t("footer.maticniBroj") + ": " + company.maticniBroj }));

    clear(root);
    append(root, h("div", { class: "container footer__grid" }, [
      h("div", { class: "footer__brand" }, [
        mascot("footer__mascot", 96, true),
        h("p", { class: "footer__logo", text: site.brandName || "Poppy" }),
        h("p", { class: "footer__tagline", text: I.loc(site.tagline) })
      ]),
      socialLinks.length ? h("div", { class: "footer__col" }, [
        h("h2", { class: "footer__title", text: I.t("footer.followUs") }),
        h("ul", { class: "social-list", role: "list" }, socialLinks)
      ]) : null,
      contactItems.length ? h("div", { class: "footer__col" }, [
        h("h2", { class: "footer__title", text: I.t("footer.contact") }),
        h("ul", { class: "footer__list", role: "list" }, contactItems)
      ]) : null,
      companyItems.length ? h("div", { class: "footer__col" }, [
        h("h2", { class: "footer__title", text: I.t("footer.company") }),
        h("ul", { class: "footer__list", role: "list" }, companyItems)
      ]) : null,
      h("p", { class: "footer__copy", text: I.t("footer.rights", { year: new Date().getFullYear(), brand: site.brandName || "Poppy" }) })
    ]));
  }

  /* ------------------------------------------------------------------ */
  /* Prekidač jezika (prikazuje se tek kad postoji više od jednog jezika) */
  /* ------------------------------------------------------------------ */
  function renderLangSwitch() {
    var root = byId("lang-switch");
    if (!root) return;
    var languages = I.languages();
    clear(root);
    root.hidden = languages.length < 2;
    if (root.hidden) return;
    var dictionaries = window.POPPY_I18N || {};
    languages.forEach(function (code) {
      var name = (dictionaries[code] && dictionaries[code]["meta.languageName"]) || code;
      root.appendChild(h("button", {
        type: "button",
        class: "lang-btn",
        lang: code,
        "data-lang": code,
        "aria-pressed": String(code === I.getLang()),
        "aria-label": name,
        text: code.toUpperCase()
      }));
    });
  }

  function renderAll() {
    I.apply(document);
    renderLangSwitch();
    renderHero();
    renderAbout();
    renderProducts();
    renderLocations();
    renderTestimonials();
    renderFooter();
    document.dispatchEvent(new CustomEvent("poppy:rendered", { detail: { root: document } }));
  }

  window.PoppyRender = {
    renderAll: renderAll,
    setCategory: setCategory
  };
})();
