// The spatial map. Builds an SVG once per race, then updates the "you" marker
// position and the candidate node sizes as the evaluation changes.
import { svgEl, candColor } from "./util.js";

const VB = 100;        // viewBox size
const CENTER = 50;
const HALF = 34;       // half-span of the plot area in user units
const R_BASE = 2.5;    // candidate dot base radius
const R_GROW = 4.3;    // extra radius at a perfect match

const toX = (px) => CENTER + px * HALF;
const toY = (py) => CENTER - py * HALF; // SVG y is inverted

export function createMap(race, { onNodeClick } = {}) {
  const cands = race.candidates.filter((c) => !c.hidden && Array.isArray(c.pos));
  const colorOf = {};
  race.candidates.forEach((c, i) => { colorOf[c.id] = candColor(i); });

  const svg = svgEl("svg", {
    class: "map",
    viewBox: `0 0 ${VB} ${VB}`,
    role: "img",
    "aria-label": `Map of candidates by ${race.map.x.label.toLowerCase()} and ${race.map.y.label.toLowerCase()}. Your position updates as you answer. The full ranking is listed below the map.`
  });

  // frame + faint quadrant grid
  svg.append(svgEl("rect", { class: "map__frame", x: CENTER - HALF - 4, y: CENTER - HALF - 4, width: (HALF + 4) * 2, height: (HALF + 4) * 2, rx: 4 }));
  for (let i = 1; i < 4; i++) {
    const p = CENTER - HALF + (i * (HALF * 2)) / 4;
    svg.append(svgEl("line", { class: "map__grid", x1: p, y1: CENTER - HALF, x2: p, y2: CENTER + HALF }));
    svg.append(svgEl("line", { class: "map__grid", x1: CENTER - HALF, y1: p, x2: CENTER + HALF, y2: p }));
  }
  // center axes
  svg.append(svgEl("line", { class: "map__axis", x1: CENTER - HALF, y1: CENTER, x2: CENTER + HALF, y2: CENTER }));
  svg.append(svgEl("line", { class: "map__axis", x1: CENTER, y1: CENTER - HALF, x2: CENTER, y2: CENTER + HALF }));

  // axis-end labels
  const edge = HALF + 7;
  svg.append(svgEl("text", { class: "map__axisend", x: CENTER - edge, y: CENTER, "text-anchor": "start", "dominant-baseline": "central" }, race.map.x.left));
  svg.append(svgEl("text", { class: "map__axisend", x: CENTER + edge, y: CENTER, "text-anchor": "end", "dominant-baseline": "central" }, race.map.x.right));
  svg.append(svgEl("text", { class: "map__axisend", x: CENTER, y: CENTER - edge - 1, "text-anchor": "middle" }, race.map.y.high));
  svg.append(svgEl("text", { class: "map__axisend", x: CENTER, y: CENTER + edge + 2, "text-anchor": "middle" }, race.map.y.low));

  // cross-endorsement links
  for (const link of race.map.links || []) {
    const a = cands.find((c) => c.id === link.a);
    const b = cands.find((c) => c.id === link.b);
    if (!a || !b) continue;
    svg.append(svgEl("line", { class: "map__link", x1: toX(a.pos[0]), y1: toY(a.pos[1]), x2: toX(b.pos[0]), y2: toY(b.pos[1]) }));
    const mx = (toX(a.pos[0]) + toX(b.pos[0])) / 2;
    const my = (toY(a.pos[1]) + toY(b.pos[1])) / 2;
    svg.append(svgEl("text", { class: "map__linklabel", x: mx, y: my - 1, "text-anchor": "middle" }, link.label || ""));
  }

  // lead line (marker -> leader), drawn before nodes so it sits beneath
  const leadLine = svgEl("line", { class: "map__lead-line", x1: CENTER, y1: CENTER, x2: CENTER, y2: CENTER, opacity: 0 });
  svg.append(leadLine);

  // candidate nodes
  const nodeRefs = {};
  for (const c of cands) {
    const x = toX(c.pos[0]);
    const y = toY(c.pos[1]);
    const labelAbove = c.pos[1] < -0.55; // near bottom edge -> label above
    const g = svgEl("g", {
      class: "node", transform: `translate(${x} ${y})`, style: { "--cand-color": colorOf[c.id] },
      tabindex: "0", role: "button", "aria-label": `${c.name}. ${c.tagline}. Open profile.`
    });
    const halo = svgEl("circle", { class: "node__halo", r: R_BASE * 2.3 });
    const dot = svgEl("circle", { class: "node__dot", r: R_BASE });
    const label = svgEl("text", { class: "node__label", x: 0, y: labelAbove ? -R_BASE * 2.6 : R_BASE * 2.6 + 2.6 }, lastName(c.name));
    g.append(halo, dot, label);
    g.append(svgEl("title", {}, `${c.name}, ${c.tagline}`));
    const fire = () => onNodeClick && onNodeClick(c.id);
    g.addEventListener("click", fire);
    g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fire(); } });
    svg.append(g);
    nodeRefs[c.id] = { g, dot, halo, label, x, y };
  }

  // the "you" marker (on top)
  const marker = svgEl("g", { class: "marker is-idle", transform: `translate(${CENTER} ${CENTER})` });
  marker.append(
    svgEl("circle", { class: "marker__pulse", r: 3 }),
    svgEl("circle", { class: "marker__ring", r: 4.4 }),
    svgEl("circle", { class: "marker__core", r: 2.3 }),
    svgEl("text", { class: "marker__label", x: 0, y: -6 }, "You")
  );
  svg.append(marker);

  function update(result, { excluded = [] } = {}) {
    const ex = new Set(excluded);
    const leaderId = result.ranked.find((r) => !ex.has(r.id) && r.score > 0)?.id;
    for (const c of cands) {
      const ref = nodeRefs[c.id];
      const r = result.ranked.find((x) => x.id === c.id);
      const norm = r ? r.normalized : 0;
      const scale = (R_BASE + norm * R_GROW) / R_BASE;
      ref.dot.style.transform = `scale(${scale.toFixed(3)})`;
      ref.halo.style.transform = `scale(${(scale * 0.95).toFixed(3)})`;
      ref.g.classList.toggle("is-leader", c.id === leaderId);
      ref.g.classList.toggle("is-excluded", ex.has(c.id));
    }
    const m = result.marker;
    if (m.active) {
      marker.setAttribute("transform", `translate(${toX(m.x).toFixed(2)} ${toY(m.y).toFixed(2)})`);
      marker.classList.remove("is-idle"); marker.classList.add("is-active");
      if (leaderId) {
        const L = nodeRefs[leaderId];
        leadLine.setAttribute("x1", toX(m.x)); leadLine.setAttribute("y1", toY(m.y));
        leadLine.setAttribute("x2", L.x); leadLine.setAttribute("y2", L.y);
        leadLine.setAttribute("opacity", "1");
      } else leadLine.setAttribute("opacity", "0");
    } else {
      marker.setAttribute("transform", `translate(${CENTER} ${CENTER})`);
      marker.classList.add("is-idle"); marker.classList.remove("is-active");
      leadLine.setAttribute("opacity", "0");
    }
  }

  return { svg, update, colorOf };
}

function lastName(name) {
  const parts = name.split(/\s+/);
  return parts[parts.length - 1];
}
