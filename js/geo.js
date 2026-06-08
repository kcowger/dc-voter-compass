// On-device ward lookup. Given coordinates (from the browser's geolocation),
// find which DC ward they fall in by point-in-polygon against the bundled
// official 2022 ward boundaries. No network, nothing leaves the device.
//
// Boundaries are simplified (~13m), and geolocation accuracy varies, so we also
// measure how close the point is to a ward line and how precise the fix was,
// and flag the result as approximate when either is poor.
import { WARD_GEO } from "../data/wards-geo.js";

function ringContains(ring, lng, lat) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
    if (((yi > lat) !== (yj > lat)) && (lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi)) inside = !inside;
  }
  return inside;
}
// rings = [exterior, ...holes]
function polyContains(rings, lng, lat) {
  if (!ringContains(rings[0], lng, lat)) return false;
  for (let k = 1; k < rings.length; k++) if (ringContains(rings[k], lng, lat)) return false;
  return true;
}
function geomContains(geom, lng, lat) {
  if (geom.type === "MultiPolygon") return geom.coordinates.some((p) => polyContains(p, lng, lat));
  return polyContains(geom.coordinates, lng, lat);
}

export function findWard(lng, lat) {
  for (const w of WARD_GEO) if (geomContains(w, lng, lat)) return w.ward;
  return null;
}

// Local equirectangular projection (accurate over a few km at DC's latitude).
function segDistMeters(plng, plat, a, b) {
  const mlo = 111320 * Math.cos((plat * Math.PI) / 180);
  const mla = 110574;
  const ax = (a[0] - plng) * mlo, ay = (a[1] - plat) * mla;
  const bx = (b[0] - plng) * mlo, by = (b[1] - plat) * mla;
  const dx = bx - ax, dy = by - ay;
  const l2 = dx * dx + dy * dy;
  let t = l2 ? (-ax * dx - ay * dy) / l2 : 0;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * dx, cy = ay + t * dy;
  return Math.hypot(cx, cy);
}
function eachRing(geom, fn) {
  const polys = geom.type === "MultiPolygon" ? geom.coordinates : [geom.coordinates];
  for (const poly of polys) for (const ring of poly) fn(ring);
}
export function distToNearestBoundary(lng, lat) {
  let min = Infinity;
  for (const w of WARD_GEO) eachRing(w, (ring) => {
    for (let i = 0; i < ring.length - 1; i++) {
      const d = segDistMeters(lng, lat, ring[i], ring[i + 1]);
      if (d < min) min = d;
    }
  });
  return min;
}

/**
 * @returns {{inDC:boolean, ward?:number, accuracy:number, dist?:number, confident?:boolean}}
 */
export function locateWard(lng, lat, accuracyM) {
  const acc = typeof accuracyM === "number" && isFinite(accuracyM) ? accuracyM : 99999;
  const ward = findWard(lng, lat);
  if (ward == null) return { inDC: false, accuracy: acc };
  const dist = distToNearestBoundary(lng, lat);
  // Confident only with a reasonably precise fix that's clearly inside the ward.
  const confident = acc <= 150 && dist > 60;
  return { inDC: true, ward, dist, accuracy: acc, confident };
}
