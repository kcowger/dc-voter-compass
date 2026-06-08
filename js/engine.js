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
  return { x: x / wsum, y: y / wsum, active: true };
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

  // Suggested ranked-choice ballot: score order, positive scores only, max 5.
  const suggestedRanking = ranked.filter((r) => r.score > 0).slice(0, 5);

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
