export interface KeywordLink {
  keyword: string;
  href: string;
}

// Ordered longest-phrase-first so multi-word matches win before single words.
export const keywordLinks: KeywordLink[] = [
  { keyword: "whole house surge protector", href: "/services/electrical-panel-upgrade-houston" },
  { keyword: "surge protection", href: "/services/electrical-panel-upgrade-houston" },
  { keyword: "electrical panel upgrade", href: "/services/electrical-panel-upgrade-houston" },
  { keyword: "electrical panel inspections", href: "/services/electrical-inspection-houston" },
  { keyword: "electrical panel", href: "/services/electrical-panel-upgrade-houston" },
  { keyword: "panel upgrade", href: "/services/electrical-panel-upgrade-houston" },
  { keyword: "EV charger", href: "/services/ev-charger-installation-houston" },
  { keyword: "EV charging", href: "/services/ev-charger-installation-houston" },
  { keyword: "generator installation", href: "/services/generator-installation-houston" },
  { keyword: "electrical inspection", href: "/services/electrical-inspection-houston" },
  { keyword: "home rewiring", href: "/services/new-construction-wiring" },
  { keyword: "new construction wiring", href: "/services/new-construction-wiring" },
  { keyword: "electrical troubleshooting", href: "/services/electrical-repair-installation" },
  { keyword: "electrical repair", href: "/services/electrical-repair-installation" },
  { keyword: "outlet installation", href: "/services/electrical-repair-installation" },
  { keyword: "circuit breaker installation", href: "/services/electrical-repair-installation" },
  { keyword: "Katy, TX", href: "/service-areas/electrician-katy-tx" },
  { keyword: "Cinco Ranch", href: "/service-areas/cinco-ranch-tx" },
  { keyword: "Fulshear", href: "/service-areas/fulshear-tx" },
  { keyword: "Energy Corridor", href: "/service-areas/electrician-energy-corridor-houston" },
  { keyword: "Houston metro", href: "/service-areas/houston-tx" },
  { keyword: "Houston, TX", href: "/service-areas/houston-tx" },
];

export interface TextSegment {
  text: string;
  href: string | null;
}

/**
 * Splits a single string into segments, linking only keywords present in
 * `availableKeywords`. Pure function: same inputs always produce the same
 * output, which is required for server/client render consistency.
 */
function splitSingleText(text: string, availableKeywords: Set<string>): TextSegment[] {
  let bestMatch: { keyword: KeywordLink; index: number } | null = null;

  for (const entry of keywordLinks) {
    if (!availableKeywords.has(entry.keyword)) continue;
    const idx = text.toLowerCase().indexOf(entry.keyword.toLowerCase());
    if (idx !== -1 && (bestMatch === null || idx < bestMatch.index)) {
      bestMatch = { keyword: entry, index: idx };
    }
  }

  if (!bestMatch) {
    return [{ text, href: null }];
  }

  const { keyword, index } = bestMatch;
  availableKeywords.delete(keyword.keyword);
  const before = text.slice(0, index);
  const matchText = text.slice(index, index + keyword.keyword.length);
  const after = text.slice(index + keyword.keyword.length);

  return [
    { text: before, href: null },
    { text: matchText, href: keyword.href },
    ...splitSingleText(after, availableKeywords),
  ];
}

/**
 * Given every plain-text string that will appear in an article (in reading
 * order), links only the FIRST occurrence of each keyword across the whole
 * article and returns one segment array per input string, in the same
 * order. This two-pass approach (plan first, then render) keeps the
 * splitting logic pure so server and client produce identical output.
 */
export function linkArticleTexts(texts: string[]): TextSegment[][] {
  const availableKeywords = new Set(keywordLinks.map((k) => k.keyword));
  return texts.map((text) => splitSingleText(text, availableKeywords));
}
