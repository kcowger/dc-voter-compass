// Small, dependency-free helpers. The DOM builder writes all dynamic text via
// textContent (never innerHTML), so user/data content can never inject markup.

/** Build an HTML element. `html` is reserved for trusted static icon markup only. */
export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k === "html") node.innerHTML = v; // trusted static strings only (icons)
    else if (k === "dataset") Object.assign(node.dataset, v);
    else if (k === "style") applyStyle(node, v);
    else if (k === "aria") for (const [ak, av] of Object.entries(v)) { if (av != null) node.setAttribute("aria-" + ak, av); }
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v === true ? "" : v);
  }
  append(node, children);
  return node;
}

const SVGNS = "http://www.w3.org/2000/svg";
/** Build an SVG element. */
export function svgEl(tag, props = {}, ...children) {
  const node = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === "text") node.textContent = v;
    else if (k === "class") node.setAttribute("class", v);
    else if (k === "style") applyStyle(node, v);
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  }
  append(node, children);
  return node;
}

// Apply styles via the CSSOM IDL only (never a style="" attribute string), so a
// strict CSP (style-src 'self', no 'unsafe-inline') is satisfied. Custom
// properties (--foo) must go through setProperty.
function applyStyle(node, obj) {
  for (const [k, val] of Object.entries(obj)) {
    if (val == null) continue;
    if (k.startsWith("--")) node.style.setProperty(k, val);
    else node.style[k] = val;
  }
}

function append(node, children) {
  for (const c of children.flat(4)) {
    if (c == null || c === false) continue;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
}

export function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

/** Append children to an existing node, skipping null/false (unlike native append). */
export function mount(node, ...children) { append(node, children); return node; }

/** Inline SVG icons (trusted static markup). */
const ICONS = {
  check: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  info: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>',
  scale: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18M7 7h10M5 7l-2.5 6a3.5 3.5 0 0 0 5 0L5 7zM19 7l-2.5 6a3.5 3.5 0 0 0 5 0L19 7zM7 21h10"/></svg>',
  external: '<svg viewBox="0 0 24 24" width="0.85em" height="0.85em" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M19 13v6H5V5h6"/></svg>',
  print: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M8 14h8v7H8z"/></svg>',
  source: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM14 3v5h5M8 13h8M8 17h6"/></svg>',
  restart: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/></svg>'
};
export function icon(name, cls) {
  return el("span", { class: "icon" + (cls ? " " + cls : ""), html: ICONS[name] || "", "aria-hidden": "true" });
}

/** Categorical candidate colors (CSS var names from tokens). */
const PALETTE = ["--c1", "--c2", "--c3", "--c4", "--c5", "--c6", "--c7", "--c8", "--c9"];
export function candColor(i) { return `var(${PALETTE[i % PALETTE.length]})`; }

/** Initials for avatar. */
export function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

/* ---------- Hash router ---------- */
const listeners = [];
export function onRoute(fn) { listeners.push(fn); }
export function parseHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  return raw.split("/").filter(Boolean).map(decodeURIComponent);
}
export function navigate(path) {
  if (location.hash === "#/" + path) { dispatch(); return; }
  location.hash = "/" + path;
}
function dispatch() { const seg = parseHash(); for (const fn of listeners) fn(seg); }
window.addEventListener("hashchange", dispatch);
export function startRouter() { if (!location.hash) location.replace("#/"); else dispatch(); }

/* ---------- Accessibility helpers ---------- */
let liveRegion;
export function announce(msg) {
  if (!liveRegion) {
    liveRegion = el("div", { class: "visually-hidden", "aria-live": "polite", "aria-atomic": "true" });
    document.body.append(liveRegion);
  }
  liveRegion.textContent = "";
  // rAF so repeated identical messages re-announce
  requestAnimationFrame(() => { liveRegion.textContent = msg; });
}

export function focusHeading(container) {
  const h = container.querySelector("h1, h2, [data-autofocus]");
  if (h) {
    if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1");
    h.focus({ preventScroll: true });
  }
}

export const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
