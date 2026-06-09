// Screen renderers. Each returns a DOM node mounted by app.js. The race screen
// is a small live controller: answering a question re-evaluates and animates the
// map + ranking in place rather than re-rendering.
import { el, svgEl, icon, clear, mount, candColor, initials, navigate, announce } from "./util.js";
import { evaluate, topReason } from "./engine.js";
import { createMap } from "./map.js";
import { store } from "./store.js";
import { RACES, RACE_MAP, GROUPS, UNCONTESTED } from "../data/races/index.js";
import { locateWard } from "./geo.js";
import { ELECTION, EVIDENCE_HIERARCHY, NEVER_INCLUDED, SOURCES, DISCLAIMER } from "../data/meta.js";

/* ---------------- shared bits ---------------- */

function coverageChip(race) {
  if (race.coverage === "partial") return el("span", { class: "pill pill--warn", text: "Partial coverage" });
  if (race.coverage === "researched") return el("span", { class: "pill", title: "Questions and scoring researched from the candidates' sourced positions", text: "Independently researched" });
  return null;
}
function racePills(race) {
  return el("div", { class: "race__meta" },
    race.rcv ? el("span", { class: "pill pill--rcv pill--dot", text: "Ranked choice" }) : null,
    race.allVoters ? el("span", { class: "pill pill--all", text: "All voters" }) : el("span", { class: "pill", text: race.ballot }),
    coverageChip(race)
  );
}

function sourceLink(source) {
  return el("a", { href: source.url, target: "_blank", rel: "noopener noreferrer" }, source.label, " ", icon("external"));
}

function colorMapFor(race) {
  const m = {};
  race.candidates.forEach((c, i) => { m[c.id] = candColor(i); });
  return m;
}

function shortLabel(text, words = 7) {
  const parts = text.split(/\s+/);
  return parts.length <= words ? text : parts.slice(0, words).join(" ") + "…";
}

/* ---------------- Landing ---------------- */

export function renderLanding() {
  return el("div", { class: "view home" },
    el("div", { class: "home__inner" },
      el("p", { class: "home__eyebrow", text: "DC primary & special election · June 16, 2026" }),
      el("h1", { class: "home__headline" }, "See where you ", el("em", {}, "actually"), " stand on the ballot."),
      el("div", { class: "home__cta" },
        el("button", { class: "btn btn--primary btn--lg", onClick: () => navigate("choose") }, "Begin ", icon("arrowRight", "btn__arrow"))
      )
    )
  );
}

/* ---------------- Chooser ---------------- */

export function renderChooser() {
  const view = el("div", { class: "view container" });
  view.append(
    el("section", { class: "section", style: { paddingBottom: "0" } },
      el("p", { class: "eyebrow", text: "Step 1" }),
      el("h1", { text: "Which races are you voting on?" }),
      el("p", { class: "lead", style: { marginTop: "0.5rem" }, text: "Tap a race to start it. Do them in any order, and come back anytime. Your answers are saved on your device." })
    )
  );

  for (const group of GROUPS) {
    const section = el("section", { class: "chooser__group" });
    const heading = el("h2", {}, group.title);
    section.append(heading, el("p", { class: "chooser__blurb", text: group.blurb }));

    if (group.wardPicker) {
      const picker = el("div", { class: "ward-picker" }, el("label", { id: "wardlbl", text: "Your ward:" }));
      const chips = el("div", { class: "chip-select", role: "group", "aria-labelledby": "wardlbl" });
      const grid = el("div", { class: "race-grid" });
      const renderWardCards = () => {
        clear(grid);
        const w = store.ward;
        const races = group.raceIds.map((id) => RACE_MAP[id]).filter((r) => w == null || r.ward === w);
        if (w != null && races.length === 0) {
          grid.append(el("p", { class: "muted", text: `Ward ${w} doesn't have a contested Council primary this cycle.` }));
        }
        races.forEach((r) => grid.append(raceCard(r)));
      };
      const setChips = (w) => chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(Number(c.dataset.ward) === w)));
      const applyWard = (w) => { store.setWard(w); setChips(w); renderWardCards(); };
      [1, 5, 6].forEach((w) => {
        const chip = el("button", { class: "chip", type: "button", "aria-pressed": String(store.ward === w), dataset: { ward: String(w) } }, `Ward ${w}`);
        chip.addEventListener("click", () => applyWard(store.ward === w ? null : w));
        chips.append(chip);
      });
      picker.append(chips);

      // "Find my ward": on-device only. The browser shares coordinates, we
      // check them against the bundled official ward boundaries locally, and
      // nothing is sent anywhere.
      const officialLink = () => el("a", { href: "https://planning.dc.gov/whatsmyward", target: "_blank", rel: "noopener noreferrer" }, "DC's official lookup", " ", icon("external"));
      const locStatus = el("p", { class: "ward-locate__status", "aria-live": "polite" });
      const setStatus = (...kids) => { clear(locStatus); mount(locStatus, ...kids); };
      const locBtn = el("button", { class: "btn btn--ghost ward-locate__btn", type: "button" }, icon("pin"), " Find my ward");
      locBtn.addEventListener("click", () => {
        if (!navigator.geolocation) { setStatus("This browser can't share location. Try ", officialLink(), "."); return; }
        locBtn.disabled = true;
        setStatus("Locating…");
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            locBtn.disabled = false;
            const r = locateWard(pos.coords.longitude, pos.coords.latitude, pos.coords.accuracy);
            if (!r.inDC) { setStatus("That location doesn't look like it's in DC. Pick your ward above, or check ", officialLink(), "."); return; }
            const contested = [1, 5, 6].includes(r.ward);
            if (contested) applyWard(r.ward); else { store.setWard(r.ward); setChips(null); renderWardCards(); }
            const msg = contested ? `You're in Ward ${r.ward}. Start it below.` : `You're in Ward ${r.ward}, which doesn't have a contested Council primary this year.`;
            if (r.confident) setStatus(el("strong", { text: msg }));
            else setStatus(el("strong", { text: msg }), " That's approximate (your location wasn't precise). Confirm at ", officialLink(), ".");
          },
          (err) => {
            locBtn.disabled = false;
            const m = err && err.code === 1 ? "Location permission was denied." : "Couldn't get your location.";
            setStatus(m + " Pick your ward above, or use ", officialLink(), ".");
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      });
      const locate = el("div", { class: "ward-locate" },
        el("div", { class: "ward-locate__row" }, locBtn, el("span", { class: "ward-locate__or", text: "or tap your ward above" })),
        locStatus,
        el("p", { class: "ward-locate__priv", text: "Your location is checked on your device and never sent anywhere." })
      );

      section.append(picker, locate, grid);
      renderWardCards();
    } else {
      const grid = el("div", { class: "race-grid" });
      group.raceIds.forEach((id) => grid.append(raceCard(RACE_MAP[id])));
      section.append(grid);
    }
    view.append(section);
  }

  // uncontested
  const unc = el("section", { class: "uncontested" },
    el("h2", { text: "Also on the ballot (uncontested)" }),
    el("p", { class: "chooser__blurb", text: "These races effectively have one candidate, so there's nothing to decide, but here's who wins, for the full picture." }),
    el("div", { class: "uncontested__list" },
      UNCONTESTED.map((u) => el("div", { class: "uncontested__item" },
        el("h3", { text: u.office }),
        el("p", {}, el("span", { class: "win", text: u.winner }), ", ", u.note, " ", sourceLink(u.source))
      ))
    )
  );
  view.append(unc);

  return view;
}

function raceCard(race) {
  const done = store.hasAnswers(race.id);
  const liveCount = race.candidates.filter((c) => !c.hidden).length;
  const card = el("button", {
    class: "race-card race-card--go" + (done ? " race-card--done" : ""), type: "button",
    "aria-label": `${race.title}. ${done ? "Review your answers." : "Start this race."}`
  },
    el("span", { class: "race-card__title", text: race.title }),
    el("span", { class: "race-card__seat", text: race.seat }),
    el("div", { class: "race-card__meta" },
      race.rcv ? el("span", { class: "pill pill--rcv", text: "Ranked choice" }) : null,
      race.allVoters ? el("span", { class: "pill pill--all", text: "All voters" }) : null,
      coverageChip(race),
      el("span", { class: "pill", text: `${liveCount} candidates` }),
      done ? el("span", { class: "pill pill--done", text: "✓ answered" }) : null
    ),
    el("span", { class: "race-card__go" }, done ? "Review" : "Start", " ", icon("arrowRight", "btn__arrow"))
  );
  card.addEventListener("click", () => navigate("race/" + race.id));
  return card;
}

/* ---------------- Race screen (live) ---------------- */

export function renderRace(raceId) {
  const race = RACE_MAP[raceId];
  if (!race) return notFound();
  const colorOf = colorMapFor(race);
  const view = el("div", { class: "view container race" });

  // header
  view.append(
    el("button", { class: "crumb", onClick: () => navigate("choose") }, icon("arrowLeft"), "All races"),
    el("div", { class: "race__head" },
      el("h1", { text: race.title }),
      racePills(race),
      el("p", { class: "race__seat", text: race.seat })
    )
  );
  if (race.coverageNote) {
    view.append(el("div", { class: "callout", style: { marginTop: "1rem" } }, el("span", { class: "callout__icon", text: "ℹ️" }), el("p", { text: race.coverageNote })));
  }

  // map + ranking pane
  const map = createMap(race, { onNodeClick: (cid) => openProfile(race, cid, colorOf, refresh) });
  const rankingList = el("div", { class: "ranking", role: "list", "aria-label": "Live candidate ranking" });
  const setAside = el("div", { class: "muted", style: { marginTop: "0.5rem", fontSize: "var(--step--2)" } });
  const mappane = el("div", { class: "mappane" },
    el("div", { class: "card mappane__card" }, map.svg),
    el("p", { class: "mappane__hint", text: "The bright marker is you. It drifts toward your matches as you answer." }),
    el("div", { class: "ranking__title", text: "Live ranking" }),
    rankingList,
    setAside
  );

  // question pane
  const qpane = el("div", { class: "qpane" });
  const progress = el("div", { class: "progress", role: "group", "aria-label": "Question progress" });
  const qhost = el("div", {});
  qpane.append(progress, qhost);

  const layout = el("div", { class: "race__layout" }, mappane, qpane);
  view.append(layout);

  // ----- live state -----
  let current = firstUnanswered();
  function firstUnanswered() {
    const ans = store.getAnswers(race.id);
    const idx = race.questions.findIndex((q) => ans[q.id] == null && !q.optional);
    return idx === -1 ? 0 : idx;
  }

  function refresh() {
    const result = evaluate(race, store.getAnswers(race.id), store.getExcluded(race.id));
    map.update(result, { excluded: store.getExcluded(race.id) });
    renderRanking(result);
  }

  function renderRanking(result) {
    clear(rankingList);
    const ans = store.getAnswers(race.id);
    result.ranked.forEach((r, i) => {
      const reason = reasonText(race, r.id, ans);
      const row = el("button", {
        class: "rank-row", role: "listitem", type: "button",
        onClick: () => openProfile(race, r.id, colorOf, refresh),
        "aria-label": `${i + 1}. ${r.candidate.name}. ${reason}. Open profile.`
      },
        el("span", { class: "rank-row__pos", text: String(i + 1) }),
        el("div", { class: "rank-row__body" },
          el("div", { class: "rank-row__name" }, el("span", { class: "rank-row__swatch", style: { background: colorOf[r.id] } }), r.candidate.name),
          el("div", { class: "rank-row__reason", text: reason })
        ),
        el("span", { class: "rank-row__bar" }, el("span", { class: "rank-row__fill", style: { width: Math.round(r.normalized * 100) + "%", background: colorOf[r.id] } }))
      );
      rankingList.append(row);
    });
    const ex = store.getExcluded(race.id);
    setAside.textContent = ex.length ? `Set aside: ${ex.map((id) => RACE_MAP[race.id].candidates.find((c) => c.id === id)?.name).filter(Boolean).join(", ")}` : "";
  }

  function renderProgress() {
    clear(progress);
    race.questions.forEach((q, i) => {
      const answered = store.getAnswers(race.id)[q.id] != null;
      const dot = el("button", {
        class: "progress__dot" + (i === current ? " progress__dot--current" : answered ? " progress__dot--done" : ""),
        type: "button", "aria-label": `Question ${i + 1}${answered ? ", answered" : ""}${i === current ? ", current" : ""}`,
        onClick: () => { current = i; renderQuestion(true); }
      });
      progress.append(dot);
    });
    progress.append(el("span", { class: "progress__label", text: `Question ${current + 1} of ${race.questions.length}` }));
  }

  function renderQuestion(focusQ = false) {
    renderProgress();
    clear(qhost);
    const q = race.questions[current];
    const card = el("div", { class: "qcard" });

    // Back / Next live at the TOP of the card, so they're reachable without
    // scrolling down past all the options.
    const nav = el("div", { class: "qnav qnav--top" });
    const back = el("button", { class: "btn btn--ghost", type: "button", onClick: () => { if (current > 0) { current--; renderQuestion(true); } }, disabled: current === 0 }, icon("arrowLeft"), " Back");
    const right = el("div", { style: { display: "flex", gap: "0.6rem", alignItems: "center" } });
    const navHint = el("span", { class: "qnav__hint" });
    right.append(navHint);
    if (q.optional) right.append(el("button", { class: "qnav__skip", type: "button", onClick: () => advance() }, "Skip"));
    const isLast = current === race.questions.length - 1;
    const currentAnswered = () => { const a = store.getAnswers(race.id)[q.id]; return Array.isArray(a) ? a.length > 0 : a != null; };
    const allRequiredAnswered = () => race.questions.every((qq) => {
      if (qq.optional) return true;
      const a = store.getAnswers(race.id)[qq.id];
      return Array.isArray(a) ? a.length > 0 : a != null;
    });
    const fwd = isLast
      ? el("button", { class: "btn btn--primary", type: "button", onClick: () => { if (allRequiredAnswered()) navigate("result/" + race.id); } }, "See your result ", icon("arrowRight", "btn__arrow"))
      : el("button", { class: "btn btn--ink", type: "button", onClick: () => { if (currentAnswered() || q.optional) advance(); } }, "Next ", icon("arrowRight", "btn__arrow"));
    right.append(fwd);
    nav.append(back, right);
    const updateNav = () => {
      const blocked = isLast ? !allRequiredAnswered() : !(currentAnswered() || q.optional);
      fwd.disabled = blocked;
      navHint.textContent = blocked ? (isLast ? "Answer all questions first" : "Pick an answer") : "";
    };

    mount(card,
      nav,
      el("p", { class: "qcard__kicker", text: q.optional ? "Optional question" : `Question ${current + 1}` }),
      el("h2", { class: "qcard__q", id: "qtext", tabindex: "-1", text: q.text }),
      q.help ? el("p", { class: "qcard__help", id: "qhelp", text: q.help }) : null
    );

    const isRank = q.type === "rank";
    const opts = el("div", { class: "options" + (isRank ? " options--rank" : ""), role: q.type === "single" ? "radiogroup" : "group", aria: { labelledby: "qtext", describedby: q.help ? "qhelp" : null } });
    const inputs = [];
    const rankBtns = {};
    q.options.forEach((o) => {
      if (isRank) {
        // Click-to-rank: clicking assigns the next rank number; clicking a ranked
        // option removes it and renumbers the rest. The answer is the click order.
        const btn = el("button", { class: "option option--rankable", type: "button" },
          el("span", { class: "option__rank", "aria-hidden": "true" }),
          el("span", { class: "option__label", text: o.label })
        );
        btn.addEventListener("click", () => toggleRank(o.id));
        rankBtns[o.id] = btn;
        opts.append(btn);
      } else {
        const input = el("input", { type: q.type === "single" ? "radio" : "checkbox", name: `${race.id}-${q.id}`, value: o.id });
        inputs.push(input);
        input.addEventListener("change", () => onAnswer(o.id));
        opts.append(el("label", { class: "option" + (q.type === "multi" ? " option--multi" : "") },
          input,
          el("span", { class: "option__face" },
            el("span", { class: "option__marker" }, icon("check")),
            el("span", { class: "option__label", text: o.label })
          )
        ));
      }
    });
    card.append(opts);

    const calloutHost = el("div", {});
    card.append(calloutHost);

    qhost.append(card);

    const rankOrder = () => { const a = store.getAnswers(race.id)[q.id]; return Array.isArray(a) ? a.slice() : []; };

    // In-place updates so the card's entrance animation never replays on a click.
    function syncStates() {
      if (isRank) {
        const order = rankOrder();
        q.options.forEach((o) => {
          const rank = order.indexOf(o.id);
          const ranked = rank !== -1;
          const btn = rankBtns[o.id];
          btn.classList.toggle("is-ranked", ranked);
          btn.setAttribute("aria-pressed", String(ranked));
          btn.querySelector(".option__rank").textContent = ranked ? String(rank + 1) : "";
          btn.setAttribute("aria-label", `${o.label}. ` + (ranked ? `Ranked number ${rank + 1} of ${order.length}. Activate to remove.` : "Not ranked. Activate to add it to your ranking by importance."));
        });
        return;
      }
      const sel = store.getAnswers(race.id)[q.id];
      const selSet = new Set(Array.isArray(sel) ? sel : sel != null ? [sel] : []);
      const atMax = q.type === "multi" && q.max && selSet.size >= q.max;
      inputs.forEach((inp) => {
        inp.checked = selSet.has(inp.value);
        inp.disabled = q.type === "multi" && !inp.checked && atMax;
      });
    }
    function toggleRank(optId) {
      const order = rankOrder();
      const i = order.indexOf(optId);
      if (i === -1) order.push(optId); else order.splice(i, 1);
      store.setAnswer(race.id, q.id, order);
      syncStates(); refresh(); renderCallouts(); updateNav();
      const o = q.options.find((x) => x.id === optId);
      const r = order.indexOf(optId);
      announce(r === -1 ? `Removed ${o.label} from your ranking.` : `Ranked ${o.label} number ${r + 1}.`);
    }
    function renderCallouts() {
      clear(calloutHost);
      const res = evaluate(race, store.getAnswers(race.id), store.getExcluded(race.id));
      res.tradeoffs.forEach((t) => calloutHost.append(
        el("div", { class: "callout" }, el("span", { class: "callout__icon", text: "⚖️" }),
          el("p", {}, el("strong", { text: "Heads up, a real tradeoff. " }), t.text))));
    }
    function onAnswer(optId) {
      if (q.type === "single") {
        // No auto-advance: picking an answer never moves the page on its own.
        // The reader always clicks Next (or Back) to move between questions.
        store.setAnswer(race.id, q.id, optId);
        refresh(); announceTop(); renderCallouts(); updateNav();
      } else {
        const set = new Set(store.getAnswers(race.id)[q.id] || []);
        set.has(optId) ? set.delete(optId) : set.add(optId);
        if (q.max && set.size > q.max) { syncStates(); return; }
        store.setAnswer(race.id, q.id, [...set]);
        refresh(); syncStates(); renderCallouts(); updateNav();
        if (q.max && set.size >= q.max) announce(`That's ${q.max}, the maximum. Deselect one to change your choices.`);
        else announceTop();
      }
    }

    syncStates();
    renderCallouts();
    updateNav();
    // Move focus to the new question heading so screen readers announce it once
    // (replaces the old verbose aria-live on the whole card). Only on question
    // changes, not the initial render, where the page h1 already takes focus.
    if (focusQ) card.querySelector("#qtext")?.focus({ preventScroll: true });
  }

  function advance() { if (current < race.questions.length - 1) { current++; renderQuestion(true); } }

  function announceTop() {
    const result = evaluate(race, store.getAnswers(race.id), store.getExcluded(race.id));
    if (result.ranked[0] && result.marker.active) announce(`Leading: ${result.ranked[0].candidate.name}`);
  }

  renderQuestion();
  refresh();
  return view;
}

function reasonText(race, candId, answers) {
  const best = topReason(race, candId, answers);
  if (!best) return "Awaiting your answers";
  if (best.score >= 3) return "Top fit: " + shortLabel(best.option.label, 6);
  if (best.score === 2) return "Fits: " + shortLabel(best.option.label, 6);
  if (best.score === 1) return "Some fit: " + shortLabel(best.option.label, 6);
  return "Not aligned with your answers so far";
}

/* ---------------- Result ---------------- */

export function renderResult(raceId) {
  const race = RACE_MAP[raceId];
  if (!race) return notFound();
  const colorOf = colorMapFor(race);
  const answers = store.getAnswers(race.id);
  const excluded = store.getExcluded(race.id);
  const result = evaluate(race, answers, excluded);
  const view = el("div", { class: "view container" });

  view.append(el("button", { class: "crumb", style: { marginTop: "1.5rem" }, onClick: () => navigate("race/" + race.id) }, icon("arrowLeft"), "Change my answers"));

  if (result.answered === 0) {
    view.append(el("section", { class: "section" },
      el("h1", { text: race.title }),
      el("p", { class: "lead", text: "You haven't answered anything yet for this race." }),
      el("button", { class: "btn btn--primary", style: { marginTop: "1rem" }, onClick: () => navigate("race/" + race.id) }, "Answer the questions ", icon("arrowRight"))));
    return view;
  }

  const top = result.suggestedRanking[0];
  const confidence = confidenceCopy(race, result);

  view.append(el("section", { class: "result__hero" },
    el("p", { class: "eyebrow result__eyebrow", text: `Your result · ${race.title}` }),
    top
      ? el("p", { class: "result__pick", text: top.candidate.name })
      : el("p", { class: "result__pick", text: "No clear match" }),
    el("p", { class: "result__confidence", text: confidence })
  ));

  // Suggested match(es). We only show a ranked list when the top choices are
  // genuinely close (the engine clusters them); otherwise it's a single pick.
  if (result.suggestedRanking.length) {
    const multi = result.suggestedRanking.length > 1;
    const ballot = el("section", { class: "ballot" });
    ballot.append(el("h2", { class: "ballot__title" },
      multi ? "Your top choices are close" : "Your match",
      (race.rcv && multi) ? el("span", { class: "pill pill--rcv", text: "Rank in this order" }) : null));
    const list = el("div", { class: "ballot__list" });
    result.suggestedRanking.forEach((r, i) => {
      list.append(el("div", { class: "ballot-card", style: { "--cand-color": colorOf[r.id] } },
        el("div", { class: "ballot-card__rank", text: multi ? String(i + 1) : "✓" }),
        el("div", {},
          el("div", { class: "ballot-card__name", text: r.candidate.name }),
          el("div", { class: "ballot-card__role", text: r.candidate.role }),
          el("div", { class: "ballot-card__why", text: whyRanked(race, r, answers) })
        ),
        el("button", { class: "btn btn--ghost ballot-card__link", onClick: () => openProfile(race, r.id, colorOf) }, "Profile")
      ));
    });
    ballot.append(list);
    if (race.rcv && multi) {
      ballot.append(el("p", { class: "muted", style: { marginTop: "1rem", fontSize: "var(--step--1)" }, text: race.rcvNote }));
    } else if (race.rcv) {
      ballot.append(el("p", { class: "muted", style: { marginTop: "1rem", fontSize: "var(--step--1)" }, text: `This race uses ranked-choice voting, so you can rank up to five. We're suggesting just ${top.candidate.name} because they're a clear match for your answers. Rank others only if you'd genuinely be glad to see them win.` }));
    }
    view.append(ballot);
  }

  // tradeoffs
  result.tradeoffs.forEach((t) => view.append(el("div", { class: "callout", style: { marginTop: "1.5rem" } }, el("span", { class: "callout__icon", text: "⚖️" }), el("p", {}, el("strong", { text: "A real tradeoff in your answers. " }), t.text))));

  // cross-endorsement explainer
  if (race.crossEndorsement) {
    view.append(el("div", { class: "callout callout--info", style: { marginTop: "1rem" } }, el("span", { class: "callout__icon", text: "🔗" }), el("p", {}, el("strong", { text: "Ranked-choice strategy. " }), race.crossEndorsement.text)));
  }

  // race context (ag, ward6)
  if (race.raceContext) {
    const rc = el("section", { class: "result__section" }, el("h2", { text: race.raceContext.title }), el("p", { class: "lead", style: { fontSize: "var(--step-0)" }, text: race.raceContext.text }));
    if (race.raceContext.sources) rc.append(el("p", { class: "muted", style: { fontSize: "var(--step--2)", marginTop: "0.5rem" } }, "Sources: ", race.raceContext.sources.flatMap((s, i) => [i ? " · " : "", sourceLink(s)])));
    view.append(rc);
  }

  // comparison table (mayor)
  if (race.comparison) {
    const wrap = el("div", { class: "compare__wrap" });
    const table = el("table", { class: "compare" });
    const liveCands = race.candidates.filter((c) => !c.hidden);
    table.append(el("thead", {}, el("tr", {}, el("th", { text: "Where they differ" }), ...liveCands.map((c) => el("th", { text: c.name })))));
    const tb = el("tbody", {});
    race.comparison.forEach((row) => {
      tb.append(el("tr", {}, el("th", { scope: "row", text: row.dimension }), ...liveCands.map((c) => el("td", { text: row[c.id] || "n/a" }))));
    });
    table.append(tb);
    wrap.append(table);
    view.append(el("section", { class: "result__section" }, el("h2", { text: "Side by side" }), wrap));
  }

  // all candidates
  const candSec = el("section", { class: "result__section" }, el("h2", { text: "Everyone in this race" }), el("p", { class: "muted", text: "Tap any candidate for their full sourced profile, strengths, weaknesses, and any flags." }));
  const grid = el("div", { class: "race-grid", style: { marginTop: "1rem" } });
  result.ranked.forEach((r) => {
    grid.append(el("button", { class: "race-card", type: "button", onClick: () => openProfile(race, r.id, colorOf), style: { "--cand-color": colorOf[r.id] } },
      el("span", { class: "race-card__title", text: r.candidate.name }),
      el("span", { class: "race-card__seat", text: r.candidate.tagline }),
      el("div", { class: "race-card__meta" },
        el("span", { class: "pill pill--match", text: r.score > 0 ? `Match ${Math.round(r.normalized * 100)}%` : "Low match" }),
        r.candidate.flags && r.candidate.flags.length ? el("span", { class: "pill pill--warn", text: "Possible red flags" }) : null
      )
    ));
  });
  // excluded candidates
  excluded.forEach((cid) => {
    const c = race.candidates.find((x) => x.id === cid);
    if (c) grid.append(el("button", { class: "race-card", type: "button", style: { opacity: 0.55 }, onClick: () => openProfile(race, cid, colorOf) },
      el("span", { class: "race-card__title", text: c.name }),
      el("span", { class: "race-card__seat", text: "You set this candidate aside" })));
  });
  candSec.append(grid);
  view.append(candSec);

  // mayor not-covered note
  if (race.notCovered) {
    view.append(el("section", { class: "result__section" },
      el("h2", { style: { fontSize: "var(--step-1)" }, text: "Not scored here" }),
      el("p", { class: "muted", text: race.notCovered.note + " " + race.notCovered.others.join(", ") + "." }),
      el("p", { style: { marginTop: "0.5rem" } }, race.notCovered.links.flatMap((l, i) => [i ? " · " : "", el("a", { href: l.url, target: "_blank", rel: "noopener noreferrer" }, l.label, " ", icon("external"))]))
    ));
  }

  // next actions
  const actions = el("div", { class: "hero__cta", style: { marginTop: "2.5rem" } });
  actions.append(el("a", { class: "btn btn--primary", href: "#/choose" }, "Choose another race ", icon("arrowRight", "btn__arrow")));
  actions.append(el("a", { class: "btn btn--ghost", href: "#/summary" }, "See my full ballot"));
  view.append(actions);

  view.append(disclaimerStrip());
  return view;
}

function confidenceCopy(race, result) {
  const n = result.suggestedRanking.length;
  if (!n) return "Your answers don't point to any candidate in this race. That's a real result; it may be worth reading the profiles directly before you decide.";
  const top = result.suggestedRanking[0];
  if (n === 1) return `${top.candidate.name} is a clear match for what you said you want.`;
  return `It's close at the top. ${top.candidate.name} edges ahead, but ${n - 1} other${n > 2 ? "s" : ""} fit your answers almost as well. Here's a suggested order.`;
}

function whyRanked(race, ranked, answers) {
  const best = topReason(race, ranked.id, answers);
  if (best && best.score >= 2) return "Matches your priority: " + shortLabel(best.option.label, 9);
  if (ranked.candidate.strengths && ranked.candidate.strengths.length) return ranked.candidate.strengths[0];
  return ranked.candidate.tagline;
}

/* ---------------- Candidate profile (overlay) ---------------- */

let lastFocused = null;
export function openProfile(race, candId, colorOf, onChange) {
  const c = race.candidates.find((x) => x.id === candId);
  if (!c) return;
  colorOf = colorOf || colorMapFor(race);
  lastFocused = document.activeElement;

  const close = () => {
    document.removeEventListener("keydown", onKey);
    backdrop.remove();
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  };
  const onKey = (e) => {
    if (e.key === "Escape") { close(); return; }
    if (e.key === "Tab") {
      // Trap Tab within the open dialog (the aria-modal contract).
      const f = sheet.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };
  document.addEventListener("keydown", onKey);

  const body = el("div", { class: "sheet__body", style: { "--cand-color": colorOf[candId] } });
  mount(body,
    el("div", { class: "profile__top" },
      el("div", { class: "avatar", style: { background: colorOf[candId] }, "aria-hidden": "true", text: initials(c.name) }),
      el("div", {},
        el("div", { class: "profile__name", text: c.name }),
        el("div", { class: "profile__role", text: [c.age ? `Age ${c.age}` : null, c.neighborhood, c.role].filter(Boolean).join(" · ") })
      )
    ),
    c.background ? el("p", { class: "profile__role", style: { marginTop: "0.75rem" }, text: c.background }) : null,
    el("p", { class: "profile__tagline", text: c.tagline }),
    el("div", { class: "profile__lean", style: { marginTop: "1rem" } }, el("strong", { text: "Inferred lean: " }), c.inferredLean)
  );

  mount(body,
    block("Stated priorities", c.priorities, colorOf[candId]),
    block("Where they stand", c.positions, colorOf[candId]),
    c.endorsements && c.endorsements.length ? block("Endorsements", c.endorsements, colorOf[candId]) : null,
    block("Strengths", c.strengths, colorOf[candId]),
    minusBlock("Weaknesses & concerns", c.weaknesses)
  );

  if (c.flags && c.flags.length) {
    const fb = el("div", { class: "profile__block" }, el("h4", {}, "Possible red flags"));
    c.flags.forEach((f) => fb.append(el("div", { class: "flagbox" }, el("h5", { text: f.label }), el("p", { text: f.detail }))));
    body.append(fb);
  }

  // exclude toggle
  const excluded = store.isExcluded(race.id, candId);
  const sw = el("label", { class: "switch" },
    el("input", { type: "checkbox", checked: excluded, "aria-label": `Set ${c.name} aside and remove from my ranking` }),
    el("span", { class: "switch__track" }), el("span", { class: "switch__thumb" }));
  sw.querySelector("input").addEventListener("change", () => {
    store.toggleExcluded(race.id, candId);
    onChange && onChange();
  });
  body.append(el("div", { class: "exclude-row" }, sw, el("label", { text: "Set aside, take this candidate out of my ranking. (Useful if a flag is a dealbreaker for you.)" })));

  const srcs = (c.sources && c.sources.length) ? c.sources : (c.source ? [c.source] : []);
  if (srcs.length) body.append(el("p", { class: "profile__source" }, icon("source"), srcs.length > 1 ? " Sources: " : " Source: ", srcs.flatMap((s, i) => [i ? " · " : "", sourceLink(s)])));

  const sheet = el("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": `${c.name} profile` },
    el("div", { class: "sheet__head" },
      el("strong", { style: { fontFamily: "var(--font-display)" }, text: c.name }),
      el("button", { class: "sheet__close", "aria-label": "Close profile", onClick: close }, icon("close"))
    ),
    body
  );
  const backdrop = el("div", { class: "sheet-backdrop" }, sheet);
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(); });
  document.body.append(backdrop);
  sheet.querySelector(".sheet__close").focus();
}

function block(title, items, color) {
  if (!items || !items.length) return null;
  return el("div", { class: "profile__block" },
    el("h4", { text: title }),
    el("ul", { class: "profile__list" }, items.map((t) => el("li", { text: t }))));
}
function minusBlock(title, items) {
  if (!items || !items.length) return null;
  return el("div", { class: "profile__block" },
    el("h4", { text: title }),
    el("ul", { class: "profile__list profile__list--minus" }, items.map((t) => el("li", { text: t }))));
}

/* ---------------- Summary ---------------- */

export function renderSummary() {
  const view = el("div", { class: "view container" });
  const done = RACES.filter((r) => store.hasAnswers(r.id));
  view.append(el("section", { class: "section", style: { paddingBottom: "0.5rem" } },
    el("p", { class: "eyebrow", text: "Your ballot plan" }),
    el("h1", { text: "Your ballot, ready to fill out" }),
    el("p", { class: "lead", style: { marginTop: "0.5rem" } }, `Every registered DC voter gets a ballot in the mail. Fill yours out at home with this plan next to you, or print it (or save the PDF) and bring it to a vote center. Election day is ${ELECTION.dateLabel}; mailed ballots must be postmarked by then. This plan is stored only on your device.`)
  ));

  if (!done.length) {
    view.append(el("p", { class: "lead", style: { marginTop: "1rem" } }, "You haven't completed any races yet. ", el("a", { href: "#/choose" }, "Pick your races to start.")));
    return view;
  }

  done.forEach((race) => {
    const result = evaluate(race, store.getAnswers(race.id), store.getExcluded(race.id));
    const colorOf = colorMapFor(race);
    const card = el("div", { class: "card summary__race", style: { "--cand-color": "var(--brand)" } });
    card.append(el("h2", {}, race.title, race.rcv ? el("span", { class: "pill pill--rcv", text: "Ranked" }) : null, race.allVoters ? el("span", { class: "pill pill--all", text: "All voters" }) : null));
    if (result.suggestedRanking.length) {
      const ranks = el("div", { class: "summary__ranks" });
      result.suggestedRanking.forEach((r, i) => ranks.append(el("span", { class: "summary__rank", style: { "--cand-color": colorOf[r.id] } }, el("b", { text: `${i + 1}` }), r.candidate.name)));
      card.append(ranks);
    } else {
      card.append(el("p", { class: "summary__empty", text: "No clear match, worth reading the profiles before deciding." }));
    }
    card.append(el("a", { class: "crumb", style: { marginTop: "0.75rem", display: "inline-flex" }, href: "#/result/" + race.id }, "See full result ", icon("arrowRight")));
    view.append(card);
  });

  view.append(el("div", { class: "hero__cta no-print", style: { marginTop: "2rem" } },
    el("button", { class: "btn btn--ink", onClick: () => window.print() }, icon("print"), " Print or save as PDF to take with you"),
    el("a", { class: "btn btn--ghost", href: "#/choose" }, "Pick more races")
  ));
  view.append(el("p", { class: "muted no-print", style: { marginTop: "1.5rem", fontSize: "var(--step--2)" }, text: "Reminder: the special election (At-Large) is open to all voters but sits separately on the ballot, don't miss it." }));
  view.append(disclaimerStrip());
  return view;
}

/* ---------------- About ---------------- */

export function renderAbout() {
  const view = el("div", { class: "view container" });
  const p = el("div", { class: "prose section" });
  p.append(
    el("p", { class: "eyebrow", text: "About" }),
    el("h1", { text: "Why I made this" }),
    el("p", { class: "lead" }, "Hi, I'm Kai. This isn't a company, a campaign, or an official anything. It's really just me, my dog, and a little help from Claude. I made it for my wife: this year's ballot is long and genuinely confusing, she's busy, and she wanted to vote feeling informed instead of rushed. It helped her, so I cleaned it up and shared it, because if it took some stress off her plate, maybe it can do the same for you."),
    el("p", {}, "I'm not here to tell you who to vote for. Everything is sourced, so I can show you where the candidates actually stand, put the evidence right next to it, and let you make up your own mind. You know your life and your priorities better than any quiz does; this is just here to make the homework a little lighter. If something looks off, it's worth a second look, and corrections are genuinely welcome."),

    el("h2", { text: "How to use it" }),
    el("p", {}, "Pick the races you're voting on, answer a few questions, and you'll get a ranked shortlist with the reasons behind it. DC mails a ballot to every registered voter, so you can fill yours out at home with your results next to you, or print them (or save the PDF) and bring them to a vote center. Either way, it's a starting point, not a substitute for reading the candidates' own materials."),

    el("h2", { text: "The fine print" }),
    el("ul", {},
      el("li", {}, el("strong", { text: "Independent: " }), "not affiliated with, authorized by, or funded by any candidate, campaign, party, or government body."),
      el("li", {}, el("strong", { text: "Private: " }), "no account, no analytics, no tracking. Your answers stay in your own browser and are never sent anywhere."),
      el("li", {}, el("strong", { text: "Open and checkable: " }), "the code is open source and every claim links to its source. See the ", el("a", { href: "#/methodology" }, "methodology and sources"), " for exactly how the matching works.")
    ),
    el("p", { style: { marginTop: "1.5rem" } }, "Thank you for being the kind of person who looks things up before voting. It genuinely matters, and I'm glad this is helping. Now go vote."),
    el("p", { class: "lead", style: { marginTop: "0.75rem", fontFamily: "var(--font-serif)" }, text: "Yours, Kai (and the dog)" }),
    el("div", { class: "home__cta", style: { marginTop: "2rem" } },
      el("a", { class: "btn btn--primary", href: "#/choose" }, "Find your races ", icon("arrowRight", "btn__arrow"))
    )
  );
  view.append(p);
  return view;
}

/* ---------------- Methodology ---------------- */

export function renderMethodology() {
  const view = el("div", { class: "view container" });
  const p = el("div", { class: "prose section" });
  p.append(
    el("p", { class: "eyebrow", text: "Methodology & sources" }),
    el("h1", { text: "How this guide works" }),
    el("p", { class: "lead" }, "A quick personal note: I'm Kai, and I built this with Claude to help my wife make sense of the ballot, then shared it for other DC voters. The ", el("a", { href: "#/about" }, "About page"), " has that story. This page is the nuts and bolts, so you can trust the results, or check them yourself."),
    el("p", { text: DISCLAIMER.purpose }),

    el("h2", { text: "How the matching works" }),
    el("p", {}, "Each race asks a few questions about your priorities. Every answer carries points for the candidates it fits, drawn from their records and stated positions. We add up the points and rank candidates by total, nothing is hidden, and you can open any candidate to see why they sit where they do."),
    el("p", {}, "Some questions let you rank the options in order of importance instead of just picking one. When you rank, your top choice counts most and each lower choice counts a little less, on a sliding weight. That lets a nuanced topic reflect your real priorities rather than forcing a single answer."),
    el("p", {}, "The map is a picture of that math. Candidates are placed by documented dimensions (for example, progressive to moderate). Your marker sits at the score-weighted center of the candidates you match, so it drifts toward a clear favorite or settles between close ones."),

    el("h2", { text: "Where each race's questions come from" }),
    el("ul", {},
      el("li", {}, el("strong", { text: "Delegate and the two At-Large races: " }), "the questions and scoring draw on The 51st's published candidate profiles (The 51st is a DC newsroom), plus extra questions built from the candidates' own campaign materials."),
      el("li", {}, el("strong", { text: "Mayor, Attorney General, and the Ward 1, 5, and 6 races: " }), "marked “Independently researched.” These were researched directly from local reporting and the candidates' own campaign materials, with the questions and scoring built from those documented positions. The mayoral race scores every candidate on the printed ballot; where a candidate's platform is thin, they're scored only on what they have actually stated."),
      el("li", {}, "Either way, every claim on a candidate's profile links to its source.")
    ),

    el("h2", { text: "What counts as evidence" }),
    el("p", { text: "In descending order of strength:" }),
    el("ol", {}, EVIDENCE_HIERARCHY.map((e) => el("li", { text: e }))),
    el("h3", { text: "What never appears" }),
    el("ul", {}, NEVER_INCLUDED.map((e) => el("li", { text: e }))),

    el("h2", { text: "Voting logistics" }),
    el("ul", {}, ELECTION.facts.map((f) => el("li", {}, f.text, " ", sourceLink(f.source)))),

    el("h2", { text: "Primary sources" }),
    el("ul", { class: "source-list" }, SOURCES.map((s) => el("li", {}, sourceLink(s)))),
    el("p", { class: "muted", style: { marginTop: "0.5rem" }, text: "Researched races additionally cite WTOP candidate Q&As, HillRag, Greater Greater Washington, DC YIMBYs, candidate campaign sites, and the DC Board of Elections. Each citation appears on the relevant candidate's profile." }),

    el("h2", { text: "Privacy" }),
    el("p", {}, "There is no account, no login, no analytics, and no tracking of any kind. Your selections and answers are stored only in your own browser (via localStorage) so you can leave and return. Nothing is ever transmitted to a server. Clearing your browser data, or the button below, erases it."),
    el("button", { class: "btn btn--ghost", style: { marginTop: "0.5rem" }, onClick: () => { if (confirm("Clear all your saved answers and selections on this device?")) { store.resetAll(); announce("Cleared."); navigate(""); } } }, icon("restart"), " Clear my saved answers"),

    el("h2", { text: "Independence & corrections" }),
    el("p", { text: DISCLAIMER.independence }),
    el("p", { text: DISCLAIMER.accuracy }),
    el("p", { text: DISCLAIMER.contact })
  );
  view.append(p);
  return view;
}

/* ---------------- shared footer/disclaimer ---------------- */

function disclaimerStrip() {
  return el("p", { class: "muted", style: { marginTop: "2.5rem", fontSize: "var(--step--2)", maxWidth: "70ch" } },
    "Independent and open source, not affiliated with any candidate, campaign, or party. Verify anything important against the candidate's own materials and the ",
    el("a", { href: "https://www.dcboe.org/", target: "_blank", rel: "noopener noreferrer" }, "DC Board of Elections"),
    " before you vote. ",
    el("a", { href: "#/methodology" }, "Methodology & sources."));
}

function notFound() {
  return el("div", { class: "view container section" }, el("h1", { text: "Race not found" }), el("a", { class: "btn btn--primary", href: "#/choose" }, "Back to races"));
}

export { disclaimerStrip };
