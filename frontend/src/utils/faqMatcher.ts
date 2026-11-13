import type { FaqEntry } from "../data/faq";

/**
 * Findet zur Frage die passendste Antwort aus der FAQ-Liste.
 * Reines Stichwort-Matching im Browser: kein Server, kein API-Schlüssel,
 * nichts verlässt das Gerät.
 *
 * Später austauschbar: Statt findAnswer() kann ChatWidget.vue eine
 * Funktion aufrufen, die einen eigenen Server (Sprachmodell) fragt.
 */

/** Mindestpunktzahl, ab der eine Antwort als Treffer gilt */
const MIN_SCORE = 2;

const STOPWORDS = new Set([
  "der",
  "die",
  "das",
  "den",
  "dem",
  "des",
  "ein",
  "eine",
  "einen",
  "einem",
  "einer",
  "und",
  "oder",
  "aber",
  "im",
  "in",
  "an",
  "auf",
  "aus",
  "bei",
  "von",
  "mit",
  "zu",
  "zum",
  "zur",
  "fuer",
  "fur",
  "ist",
  "sind",
  "so",
  "auch",
  "mal",
  "bitte",
]);

/**
 * klein schreiben, Umlaute wie im Deutschen umschreiben (ä → ae, ü → ue),
 * Akzente und Sonderzeichen entfernen, in Wörter teilen.
 * So passen "über" und "ueber" zusammen.
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

/** 2 = gleich, 1.5 = gleicher Wortanfang (Mehrzahl, Zusammensetzung), 0 = kein Treffer */
function similarity(a: string, b: string): number {
  if (a === b) return 2;

  /* nur kleine Unterschiede (Mehrzahl, Endung): "projekt" ~ "projekte", aber nicht "beruf" ~ "berufsmaturitaet" */

  if (
    Math.min(a.length, b.length) >= 4 &&
    Math.abs(a.length - b.length) <= 3 &&
    (a.startsWith(b) || b.startsWith(a))
  ) {
    return 1.5;
  }

  return 0;
}

function scoreEntry(questionTokens: string[], entry: FaqEntry): number {
  let score = 0;

  for (const keyword of entry.keywords) {
    const keywordTokens = tokenize(keyword);

    if (keywordTokens.length === 0) continue;

    let phraseScore = 0;
    let allMatched = true;

    for (const keywordToken of keywordTokens) {
      let best = 0;

      for (const questionToken of questionTokens) {
        best = Math.max(best, similarity(questionToken, keywordToken));
      }

      if (best === 0) {
        allMatched = false;
        break;
      }

      phraseScore += best;
    }

    if (allMatched) score += phraseScore;
  }

  /* kleiner Bonus, wenn Wörter der hinterlegten Frage vorkommen */

  for (const token of tokenize(entry.question)) {
    if (questionTokens.includes(token)) score += 0.5;
  }

  return score;
}

export function findAnswer(
  question: string,
  entries: FaqEntry[],
): FaqEntry | null {
  const questionTokens = tokenize(question);

  if (questionTokens.length === 0) return null;

  let best: FaqEntry | null = null;
  let bestScore = 0;

  for (const entry of entries) {
    const score = scoreEntry(questionTokens, entry);

    /* bei Gleichstand gewinnt der Eintrag weiter oben */

    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  return bestScore >= MIN_SCORE ? best : null;
}
