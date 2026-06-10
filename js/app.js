// Controller: maps the hash route to a view, mounts it, manages focus, title,
// and active nav state. Header and footer are static markup in index.html.
import { onRoute, startRouter, clear, focusHeading, parseHash, announce } from "./util.js";
import { store } from "./store.js";
import { RACE_MAP } from "../data/races/index.js";
import {
  renderLanding, renderChooser, renderRace, renderResult,
  renderMethodology, renderSummary, renderAbout
} from "./views.js";

const BASE_TITLE = "DC Voter Compass · June 16, 2026";

function titleFor(seg) {
  if (seg[0] === "race" && RACE_MAP[seg[1]]) return `${RACE_MAP[seg[1]].title} · DC Voter Compass`;
  if (seg[0] === "result" && RACE_MAP[seg[1]]) return `Your result: ${RACE_MAP[seg[1]].title} · DC Voter Compass`;
  const names = { choose: "Choose your races", methodology: "Methodology & sources", summary: "Your ballot plan", about: "About" };
  return names[seg[0]] ? `${names[seg[0]]} · DC Voter Compass` : BASE_TITLE;
}

function viewFor(seg) {
  switch (seg[0]) {
    case undefined: case "": return renderLanding();
    case "choose": return renderChooser();
    case "about": return renderAbout();
    case "methodology": return renderMethodology();
    case "summary": return renderSummary();
    case "race": return renderRace(seg[1]);
    case "result": return renderResult(seg[1]);
    default: return renderLanding();
  }
}

function updateNav(seg) {
  const active = seg[0] || "";
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const match = a.getAttribute("data-nav") === active || (active === "" && a.getAttribute("data-nav") === "home");
    a.setAttribute("aria-current", match ? "page" : "false");
  });
}

// The header Reset only appears once there is something to reset.
function syncResetVisibility() {
  const btn = document.querySelector('[data-action="reset"]');
  if (!btn) return;
  const s = store.state;
  const hasState = Object.keys(s.answers).length > 0 || Object.keys(s.excluded).length > 0 || s.ward != null;
  btn.hidden = !hasState;
}

function route(seg) {
  const main = document.getElementById("app");
  let node;
  try {
    node = viewFor(seg);
  } catch (err) {
    console.error("View error:", err);
    node = document.createElement("div");
    node.className = "view container section";
    node.innerHTML = ""; // safe: static text below
    const h = document.createElement("h1"); h.textContent = "Something went wrong";
    const p = document.createElement("p"); p.textContent = "Please reload the page. If it keeps happening, the saved data may be corrupted, you can clear it from the Methodology page.";
    node.append(h, p);
  }
  clear(main);
  main.append(node);
  document.title = titleFor(seg);
  updateNav(seg);
  syncResetVisibility();
  window.scrollTo(0, 0);
  focusHeading(main);
}

onRoute(route);
startRouter();

// "Reset my choices" control in the header (hidden until there's state).
const resetBtn = document.querySelector('[data-action="reset"]');
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    if (confirm("Clear all your saved races and answers on this device? This can't be undone.")) {
      store.resetAll();
      route(parseHash()); // re-render the current view with the cleared state
      announce("Your choices were cleared.");
    }
  });
}

// Mobile nav: an accessible disclosure menu. The links collapse behind a menu
// button on small screens; the button toggles them, and the panel closes on
// navigation, Escape, or a click anywhere else.
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("site-nav-links");
if (navToggle && navLinks) {
  const closeMenu = () => { navToggle.setAttribute("aria-expanded", "false"); navLinks.classList.remove("is-open"); };
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navLinks.classList.toggle("is-open", !open);
  });
  navLinks.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
  window.addEventListener("hashchange", closeMenu);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("click", (e) => { if (!e.target.closest(".site-nav")) closeMenu(); });
}

// After election day the guide is historical; say so instead of pretending.
// (June 17, 2026 04:00 UTC = just after midnight Eastern on election night.)
if (Date.now() > Date.parse("2026-06-17T04:00:00Z")) {
  const b = document.createElement("div");
  b.className = "stale-banner";
  b.setAttribute("role", "note");
  b.textContent = "This guide was built for the June 16, 2026 DC primary and special election, which has now passed. For results, see the DC Board of Elections at dcboe.org.";
  document.body.insertBefore(b, document.querySelector("main"));
}
