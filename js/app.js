// Controller: maps the hash route to a view, mounts it, manages focus, title,
// and active nav state. Header and footer are static markup in index.html.
import { onRoute, startRouter, clear, focusHeading, parseHash, announce } from "./util.js";
import { store } from "./store.js";
import { RACE_MAP } from "../data/races/index.js";
import {
  renderLanding, renderChooser, renderRace, renderResult,
  renderMethodology, renderSummary
} from "./views.js";

const BASE_TITLE = "DC Voter Compass · June 16, 2026";

function titleFor(seg) {
  if (seg[0] === "race" && RACE_MAP[seg[1]]) return `${RACE_MAP[seg[1]].title} · DC Voter Compass`;
  if (seg[0] === "result" && RACE_MAP[seg[1]]) return `Your result: ${RACE_MAP[seg[1]].title} · DC Voter Compass`;
  const names = { choose: "Choose your races", methodology: "Methodology & sources", summary: "Your ballot plan" };
  return names[seg[0]] ? `${names[seg[0]]} · DC Voter Compass` : BASE_TITLE;
}

function viewFor(seg) {
  switch (seg[0]) {
    case undefined: case "": return renderLanding();
    case "choose": return renderChooser();
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
  window.scrollTo(0, 0);
  focusHeading(main);
}

onRoute(route);
startRouter();

// Always-visible "Reset my choices" control in the header.
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
