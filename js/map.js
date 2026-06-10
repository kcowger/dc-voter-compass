// The spatial map. Builds an SVG once per race, then updates the "you" marker
// position and the candidate node sizes as the evaluation changes.
//
// Names are kept on the map but de-cluttered: each name sits in a solid chip,
// and a small solver pushes overlapping chips apart so none collide. A faint
// leader line ties each chip to its dot. The "you" marker is a bright bullseye
// with a pill label, drawn on top, so it's always easy to find.
import { svgEl, candColor } from "./util.js";

const VB = 100;
const CENTER = 50;
const HALF = 34;        // half-span of the plot area
const FRAME = HALF + 4; // frame inset from center
const R_BASE = 2.6;     // candidate dot base radius
const R_GROW = 3.8;     // extra radius at a perfect match
const CHIP_FS = 3.0;    // chip font size (user units)

const toX = (px) => CENTER + px * HALF;
const toY = (py) => CENTER - py * HALF;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export function createMap(race, { onNodeClick } = {}) {
  const cands = race.candidates.filter((c) => !c.hidden && Array.isArray(c.pos));
  const colorOf = {};
  race.candidates.forEach((c, i) => { colorOf[c.id] = candColor(i); });

  const svg = svgEl("svg", {
    class: "map",
    viewBox: `0 0 ${VB} ${VB}`,
    role: "img",
    "aria-label": `Map of candidates by ${race.map.x.label.toLowerCase()} (left to right) and ${race.map.y.label.toLowerCase()} (bottom to top). Your position updates as you answer. The full ranking is listed below the map.`
  });

  // frame + faint grid
  svg.append(svgEl("rect", { class: "map__frame", x: CENTER - FRAME, y: CENTER - FRAME, width: FRAME * 2, height: FRAME * 2, rx: 4 }));
  for (let i = 1; i < 4; i++) {
    const p = CENTER - HALF + (i * HALF * 2) / 4;
    svg.append(svgEl("line", { class: "map__grid", x1: p, y1: CENTER - HALF, x2: p, y2: CENTER + HALF }));
    svg.append(svgEl("line", { class: "map__grid", x1: CENTER - HALF, y1: p, x2: CENTER + HALF, y2: p }));
  }
  svg.append(svgEl("line", { class: "map__axis", x1: CENTER - HALF, y1: CENTER, x2: CENTER + HALF, y2: CENTER }));
  svg.append(svgEl("line", { class: "map__axis", x1: CENTER, y1: CENTER - HALF, x2: CENTER, y2: CENTER + HALF }));

  // axis pole words, placed in the outer margins so they never touch a node
  svg.append(svgEl("text", { class: "map__axisend", x: CENTER, y: 5.5, "text-anchor": "middle" }, race.map.y.high));
  svg.append(svgEl("text", { class: "map__axisend", x: CENTER, y: 96.5, "text-anchor": "middle" }, race.map.y.low));
  svg.append(svgEl("text", { class: "map__axisend", x: 5, y: CENTER, "text-anchor": "middle", transform: `rotate(-90 5 ${CENTER})` }, race.map.x.left));
  svg.append(svgEl("text", { class: "map__axisend", x: 95, y: CENTER, "text-anchor": "middle", transform: `rotate(90 95 ${CENTER})` }, race.map.x.right));

  // cross-endorsement links
  for (const link of race.map.links || []) {
    const a = cands.find((c) => c.id === link.a);
    const b = cands.find((c) => c.id === link.b);
    if (!a || !b) continue;
    svg.append(svgEl("line", { class: "map__link", x1: toX(a.pos[0]), y1: toY(a.pos[1]), x2: toX(b.pos[0]), y2: toY(b.pos[1]) }));
  }

  // lead line (marker -> leader), beneath everything else
  const leadLine = svgEl("line", { class: "map__lead-line", x1: CENTER, y1: CENTER, x2: CENTER, y2: CENTER, opacity: 0 });
  svg.append(leadLine);

  // candidate dots
  const nodeRefs = {};
  const dotsLayer = svgEl("g", {});
  for (const c of cands) {
    const x = toX(c.pos[0]);
    const y = toY(c.pos[1]);
    const g = svgEl("g", {
      class: "node", transform: `translate(${x} ${y})`, style: { "--cand-color": colorOf[c.id] },
      tabindex: "0", role: "button", "aria-label": `${c.name}. ${c.tagline}. Open profile.`
    });
    const dot = svgEl("circle", { class: "node__dot", r: R_BASE });
    g.append(dot, svgEl("title", {}, `${c.name}, ${c.tagline}`));
    const fire = () => onNodeClick && onNodeClick(c.id);
    g.addEventListener("click", fire);
    g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fire(); } });
    dotsLayer.append(g);
    nodeRefs[c.id] = { g, dot, x, y };
  }
  svg.append(dotsLayer);

  // de-cluttered name chips with leader lines
  const labelsLayer = svgEl("g", {});
  svg.append(labelsLayer);
  const boxes = cands.map((c) => {
    // chipName lets a candidate override the short map label, for compound
    // surnames where the last word alone is wrong (e.g. "Lewis George").
    const name = c.chipName || lastName(c.name);
    const w = name.length * CHIP_FS * 0.6 + 3.4;
    const h = CHIP_FS + 2.6;
    const dotx = nodeRefs[c.id].x, doty = nodeRefs[c.id].y;
    const below = doty <= CENTER + 6;
    const cy = doty + (below ? 1 : -1) * (R_BASE + 1.5 + h / 2);
    return { c, name, w, h, cx: dotx, cy, dotx, doty };
  });
  declutter(boxes);
  for (const b of boxes) {
    // Leader lines carry the candidate's color so a pushed-away chip is
    // visibly tied to its dot even in a crowded corner.
    const leader = svgEl("line", { class: "map__leader", style: { "--cand-color": colorOf[b.c.id] }, x1: b.dotx, y1: b.doty, x2: b.cx, y2: b.cy });
    const grp = svgEl("g", { class: "chip", style: { "--cand-color": colorOf[b.c.id] } });
    grp.append(
      svgEl("rect", { class: "chip__bg", x: b.cx - b.w / 2, y: b.cy - b.h / 2, width: b.w, height: b.h, rx: b.h / 2 }),
      svgEl("text", { class: "chip__text", x: b.cx, y: b.cy, "text-anchor": "middle", "dominant-baseline": "central" }, b.name)
    );
    // clicking a chip also opens the profile
    const fire = () => onNodeClick && onNodeClick(b.c.id);
    grp.addEventListener("click", fire);
    labelsLayer.append(leader);
    labelsLayer.append(grp);
    nodeRefs[b.c.id].chip = grp;
  }

  // "you" marker: a bright bullseye with a pill label, on top
  const marker = svgEl("g", { class: "marker is-idle", transform: `translate(${CENTER} ${CENTER})` });
  const pillW = 9.5, pillH = 5.4, pillY = -8.8;
  marker.append(
    svgEl("circle", { class: "marker__glow", r: 6 }),
    svgEl("circle", { class: "marker__white", r: 3.7 }),
    svgEl("circle", { class: "marker__core", r: 2.7 }),
    svgEl("circle", { class: "marker__center", r: 0.95 }),
    svgEl("rect", { class: "marker__pill", x: -pillW / 2, y: pillY, width: pillW, height: pillH, rx: pillH / 2 }),
    svgEl("text", { class: "marker__pilltext", x: 0, y: pillY + pillH / 2 + 0.1, "text-anchor": "middle", "dominant-baseline": "central" }, "You")
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
      ref.g.classList.toggle("is-leader", c.id === leaderId);
      ref.g.classList.toggle("is-excluded", ex.has(c.id));
      if (ref.chip) {
        ref.chip.classList.toggle("is-leader", c.id === leaderId);
        ref.chip.classList.toggle("is-excluded", ex.has(c.id));
      }
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

// Push overlapping label boxes apart (axis-aligned separation), then clamp to
// the viewBox. Small N, so the simple O(N^2) loop is plenty.
function declutter(boxes) {
  const PAD = 0.7;
  for (let iter = 0; iter < 200; iter++) {
    let moved = false;
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], b = boxes[j];
        const dx = b.cx - a.cx, dy = b.cy - a.cy;
        const ox = (a.w + b.w) / 2 + PAD - Math.abs(dx);
        const oy = (a.h + b.h) / 2 + PAD - Math.abs(dy);
        if (ox > 0 && oy > 0) {
          moved = true;
          if (ox < oy) {
            const s = ((dx === 0 ? (i % 2 ? 1 : -1) : Math.sign(dx)) * ox) / 2;
            a.cx -= s; b.cx += s;
          } else {
            const s = ((dy === 0 ? 1 : Math.sign(dy)) * oy) / 2;
            a.cy -= s; b.cy += s;
          }
        }
      }
    }
    for (const bx of boxes) {
      bx.cx = clamp(bx.cx, bx.w / 2 + 1, VB - bx.w / 2 - 1);
      bx.cy = clamp(bx.cy, bx.h / 2 + 3, VB - bx.h / 2 - 3);
    }
    if (!moved) break;
  }
}

function lastName(name) {
  const parts = name.split(/\s+/);
  return parts[parts.length - 1];
}
