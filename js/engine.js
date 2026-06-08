// Scoring engine, pure functions, no DOM, no side effects.
//
// The scoring rule is the one documented in the source guide: each selected
// answer option contributes per-candidate points; totals are summed and ranked.
// Nothing here is hidden, every number a user sees traces to a race's matrix.

/**
 * Sum a race's scores given the user's answers.
 * @param {object} race
 * @param {object} answers  { questionId: optionId | optionId[] }
 * @returns {object} { id: totalScore }
 */
export function tallyScores(race, answers) {
  const totals = {};
  for (const c of race.candidates) totals[c.id] = 0;

  for (const q of race.questions) {
    const a = answers[q.id];
    if (a == null) continue;
    // Ranked answers: the user ordered options by importance (a[0] = most). Weight
    // each by its rank with a normalized descending scheme (rank weights N..1 over
    // their sum, so they total 1). That keeps a rank question on the same 0-3 scale
    // as a single-choice question while making the top pick count most.
    if (q.type === "rank" && Array.isArray(a)) {
      const k = a.length;
      if (!k) continue;
      const denom = (k * (k + 1)) / 2;
      a.forEach((optId, idx) => {
        const opt = q.options.find((o) => o.id === optId);
        if (!opt) return;
        const w = (k - idx) / denom;
        for (const candId of Object.keys(opt.scores)) {
          if (candId in totals) totals[candId] += w * opt.scores[candId];
        }
      });
      continue;
    }
    const chosen = Array.isArray(a) ? a : [a];
    for (const optId of chosen) {
      const opt = q.options.find((o) => o.id === optId);
      if (!opt) continue;
      for (const candId of Object.keys(opt.scores)) {
        if (candId in totals) totals[candId] += opt.scores[candId];
      }
    }
  }
  return totals;
}

/** How many non-optional questions the user has answered. */
function answeredCount(race, answers) {
  let n = 0;
  for (const q of race.questions) {
    const a = answers[q.id];
    if (a == null) continue;
    if (Array.isArray(a) && a.length === 0) continue;
    n++;
  }
  return n;
}

/**
 * The "you are here" marker for the map: a score-weighted average of the
 * positions of the candidates the user matches. Higher-scoring candidates pull
 * harder (a mild exponent sharpens the pull), so the marker drifts toward a
 * clear match or settles between close ones. With no answers it sits at center.
 */
function computeMarker(race, totals, excluded) {
  const live = race.candidates.filter(
    (c) => !c.hidden && !excluded.has(c.id) && Array.isArray(c.pos)
  );
  if (live.length === 0) return { x: 0, y: 0, active: false };

  const min = Math.min(...live.map((c) => totals[c.id] ?? 0));
  let wsum = 0;
  let x = 0;
  let y = 0;
  for (const c of live) {
    // Shift so the lowest match contributes least, then sharpen.
    const shifted = Math.max(0, (totals[c.id] ?? 0) - min);
    const w = Math.pow(shifted, 1.8);
    wsum += w;
    x += w * c.pos[0];
    y += w * c.pos[1];
  }
  if (wsum === 0) return { x: 0, y: 0, active: false };

  let cx = x / wsum;
  let cy = y / wsum;

  // Keep the marker from sitting on top of a candidate's dot. If it lands
  // within MIN_GAP of the nearest candidate, hold it at that gap, offset along
  // the direction it approached from (or, when it's right on the candidate,
  // toward the rest of the field). It still floats to the matching region; it
  // just doesn't cover the candidate. MIN_GAP is in position units; ~0.40
  // clears the largest (best-match) dot plus its glow on the map.
  const MIN_GAP = 0.40;
  let nearest = null;
  let nd = Infinity;
  for (const c of live) {
    const d = Math.hypot(c.pos[0] - cx, c.pos[1] - cy);
    if (d < nd) { nd = d; nearest = c; }
  }
  if (nearest && nd < MIN_GAP) {
    let dx = cx - nearest.pos[0];
    let dy = cy - nearest.pos[1];
    if (nd <= 0.02) {
      // Essentially on the candidate: aim toward the average of the others.
      const others = live.filter((c) => c !== nearest);
      if (others.length) {
        dx = others.reduce((s, c) => s + c.pos[0], 0) / others.length - nearest.pos[0];
        dy = others.reduce((s, c) => s + c.pos[1], 0) / others.length - nearest.pos[1];
      } else { dx = -nearest.pos[0]; dy = -nearest.pos[1]; }
    }
    const len = Math.hypot(dx, dy) || 1;
    cx = nearest.pos[0] + (dx / len) * MIN_GAP;
    cy = nearest.pos[1] + (dy / len) * MIN_GAP;
  }

  cx = Math.max(-0.98, Math.min(0.98, cx));
  cy = Math.max(-0.98, Math.min(0.98, cy));
  return { x: cx, y: cy, active: true };
}

/** Active tradeoffs: every (questionId, optionId) in `when` must be selected. */
function activeTradeoffs(race, answers) {
  if (!race.tradeoffs) return [];
  return race.tradeoffs.filter((t) =>
    t.when.every(([qid, optId]) => {
      const a = answers[qid];
      if (a == null) return false;
      return Array.isArray(a) ? a.includes(optId) : a === optId;
    })
  );
}

/**
 * Full evaluation of a race for the current answers and excluded candidates.
 */
export function evaluate(race, answers = {}, excludedIds = []) {
  const excluded = new Set(excludedIds);
  const totals = tallyScores(race, answers);

  const ranked = race.candidates
    .filter((c) => !c.hidden && !excluded.has(c.id))
    .map((c) => ({ id: c.id, candidate: c, score: totals[c.id] ?? 0 }))
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name));

  const maxScore = ranked.length ? Math.max(0, ranked[0].score) : 0;
  for (const r of ranked) {
    r.normalized = maxScore > 0 ? Math.max(0, r.score) / maxScore : 0;
  }

  const answered = answeredCount(race, answers);
  const requiredCount = race.questions.filter((q) => !q.optional).length;
  const gap = ranked.length >= 2 ? ranked[0].score - ranked[1].score : ranked[0]?.score ?? 0;

  let differentiation;
  if (answered === 0) differentiation = "none";
  else if (ranked.length < 2 || gap >= 2) differentiation = "strong";
  else if (gap >= 1) differentiation = "lean";
  else differentiation = "tossup";

  // Suggested ranking. We don't pad: only suggest ranking extra candidates when
  // your top choices are genuinely close (within ~1 point of the top). With a
  // clear leader, we suggest just your one match. (Strategic reasons to rank
  // more (like the special-election cross-endorsement) are surfaced separately
  // as a note, so the user can choose.)
  const positive = ranked.filter((r) => r.score > 0);
  const suggestedRanking = positive.length
    ? positive.filter((r) => r.score >= positive[0].score - 1).slice(0, 5)
    : [];

  return {
    totals,
    ranked,
    maxScore,
    gap,
    answered,
    requiredCount,
    complete: answered >= requiredCount,
    differentiation,
    tradeoffs: activeTradeoffs(race, answers),
    marker: computeMarker(race, totals, excluded),
    suggestedRanking
  };
}

/**
 * One short, sourced reason a candidate sits where they do, given the user's
 * current answers. Picks the answered option on which this candidate scored
 * highest, and surfaces it. Returns null if nothing scored yet.
 */
export function topReason(race, candidateId, answers) {
  let best = null;
  for (const q of race.questions) {
    const a = answers[q.id];
    if (a == null) continue;
    const chosen = Array.isArray(a) ? a : [a];
    for (const optId of chosen) {
      const opt = q.options.find((o) => o.id === optId);
      if (!opt) continue;
      const s = opt.scores[candidateId] ?? 0;
      if (best == null || s > best.score) best = { score: s, option: opt, question: q };
    }
  }
  return best;
}
