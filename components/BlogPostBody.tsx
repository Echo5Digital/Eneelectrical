import React from "react";
import Link from "next/link";
import { BlogContentBlock } from "@/lib/blog-data";
import { linkArticleTexts, TextSegment } from "@/lib/internal-links";
import { Check, Zap } from "lucide-react";

// Same rule used by BlogPostClient's Table of Contents — keep both in
// sync so a TOC link always lands on a heading that really exists.
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function LinkedText({ segments }: { segments: TextSegment[] }) {
  return (
    <>
      {segments.map((seg, i) =>
        seg.href ? (
          <Link
            key={i}
            href={seg.href}
            className="font-semibold underline decoration-[#F5A623] decoration-2 underline-offset-2 transition-colors hover:text-[#F5A623]"
          >
            {seg.text}
          </Link>
        ) : (
          <React.Fragment key={i}>{seg.text}</React.Fragment>
        )
      )}
    </>
  );
}

// A short paragraph (roughly under 140 chars) immediately following a
// `list` block reads as the article's one punchy takeaway line, matching
// the amber callout box in the design — a plain paragraph in that same
// spot would be a much longer, ordinary sentence, so this stays a safe,
// narrow rule rather than misfiring on regular body text.
const CALLOUT_MAX_LENGTH = 140;

// A list whose most recent heading/subheading text implies a sequence of
// steps (e.g. "How Is a Whole House Surge Protector Installed?") renders
// as numbered circles instead of checkmarks — matches the design's
// distinction between a benefits/warning-sign list and an install
// walkthrough, without needing a new explicit block type.
const STEP_HEADING_PATTERN = /^(how (is|do|to)\b|steps?\b|process\b)/i;

interface RenderGroup {
  kind: "plain" | "cardGroup";
  blocks: BlogContentBlock[];
  heading?: string;
}

/**
 * Groups the flat block array into render units: a `heading` immediately
 * followed by 2+ consecutive `subheading` blocks (each with its own
 * paragraphs/items before the next subheading or heading) becomes one
 * `cardGroup` unit, rendered as a 2-column icon-card grid — matches the
 * design's "External Surges / Internal Surges" pattern. Everything else
 * stays `plain`, rendered exactly as before.
 */
function groupBlocks(content: BlogContentBlock[]): RenderGroup[] {
  const groups: RenderGroup[] = [];
  let i = 0;

  while (i < content.length) {
    const block = content[i];

    if (block.type === "heading") {
      // Count how many subheadings appear before the next heading.
      let j = i + 1;
      let subheadingCount = 0;
      while (j < content.length && content[j].type !== "heading") {
        if (content[j].type === "subheading") subheadingCount++;
        j++;
      }

      if (subheadingCount >= 2) {
        groups.push({ kind: "cardGroup", heading: block.text, blocks: content.slice(i + 1, j) });
        i = j;
        continue;
      }
    }

    groups.push({ kind: "plain", blocks: [block] });
    i++;
  }

  return groups;
}

/** Splits a cardGroup's blocks into one card per subheading (its own
 *  paragraphs/items until the next subheading). */
function splitIntoCards(blocks: BlogContentBlock[]) {
  const cards: { heading: string; blocks: BlogContentBlock[] }[] = [];
  let current: { heading: string; blocks: BlogContentBlock[] } | null = null;

  for (const block of blocks) {
    if (block.type === "subheading") {
      if (current) cards.push(current);
      current = { heading: block.text ?? "", blocks: [] };
    } else if (current) {
      current.blocks.push(block);
    }
  }
  if (current) cards.push(current);
  return cards;
}

export default function BlogPostBody({ content }: { content: BlogContentBlock[] }) {
  // Collect every linkable text string in reading order, then split them
  // all in one pure pass so the "first occurrence per keyword" rule is
  // decided before rendering — keeps output identical between server and
  // client instead of depending on JSX render order.
  const textEntries: { blockIndex: number; itemIndex: number | null; text: string }[] = [];
  content.forEach((block, blockIndex) => {
    if (block.type === "list") {
      block.items?.forEach((item, itemIndex) => {
        textEntries.push({ blockIndex, itemIndex, text: item });
      });
    } else if (block.type === "paragraph") {
      textEntries.push({ blockIndex, itemIndex: null, text: block.text ?? "" });
    }
  });

  const linkedSegments = linkArticleTexts(textEntries.map((e) => e.text));
  const segmentsByKey = new Map<string, TextSegment[]>();
  textEntries.forEach((entry, i) => {
    segmentsByKey.set(`${entry.blockIndex}-${entry.itemIndex}`, linkedSegments[i]);
  });

  const groups = groupBlocks(content);
  let lastHeadingText = "";

  return (
    <div className="flex flex-col gap-5">
      {groups.map((group, gi) => {
        if (group.kind === "cardGroup") {
          const cards = splitIntoCards(group.blocks);
          return (
            <div key={gi}>
              {group.heading && (
                <h2
                  id={slugify(group.heading)}
                  className="text-2xl sm:text-3xl font-bold mt-6 mb-1 leading-tight scroll-mt-24"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {group.heading}
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-2">
                {cards.map((card, ci) => (
                <div
                  key={ci}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#F5A623" }}
                      aria-hidden="true"
                    >
                      <Zap size={14} color="#0B1F3A" strokeWidth={2.5} />
                    </span>
                    <h4
                      className="text-sm font-bold leading-snug"
                      style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                    >
                      {card.heading}
                    </h4>
                  </div>
                  {card.blocks.map((b, bi) =>
                    b.type === "list" ? (
                      <ul key={bi} className="flex flex-col gap-1.5 pl-9">
                        {b.items?.map((item, ii) => (
                          <li
                            key={ii}
                            className="text-sm leading-relaxed list-disc"
                            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        key={bi}
                        className="text-sm leading-relaxed pl-9"
                        style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                      >
                        {b.text}
                      </p>
                    )
                  )}
                </div>
                ))}
              </div>
            </div>
          );
        }

        const block = group.blocks[0];
        const blockIndex = content.indexOf(block);

        if (block.type === "heading") {
          lastHeadingText = block.text ?? "";
          return (
            <h2
              key={gi}
              id={slugify(block.text ?? "")}
              className="text-2xl sm:text-3xl font-bold mt-6 mb-1 leading-tight scroll-mt-24"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "subheading") {
          lastHeadingText = block.text ?? "";
          return (
            <h3
              key={gi}
              className="text-lg sm:text-xl font-bold mt-3 mb-1 leading-snug"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "list") {
          const isSteps = STEP_HEADING_PATTERN.test(lastHeadingText);
          return (
            <ul key={gi} className="flex flex-col gap-2.5 pl-1">
              {block.items?.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3 text-base leading-relaxed"
                  style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                >
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ backgroundColor: "#F5A623", color: "#0B1F3A" }}
                    aria-hidden="true"
                  >
                    {isSteps ? j + 1 : <Check size={12} strokeWidth={3} />}
                  </span>
                  <span>
                    <LinkedText segments={segmentsByKey.get(`${blockIndex}-${j}`) ?? [{ text: item, href: null }]} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        // paragraph — check whether it's the short callout right after a list
        const prevBlock = blockIndex > 0 ? content[blockIndex - 1] : null;
        const isCallout =
          prevBlock?.type === "list" &&
          (block.text?.length ?? 0) > 0 &&
          (block.text?.length ?? 0) <= CALLOUT_MAX_LENGTH;

        if (isCallout) {
          return (
            <div
              key={gi}
              className="flex items-start gap-3 rounded-xl p-5 my-2"
              style={{ backgroundColor: "rgba(245,166,35,0.12)" }}
            >
              <span
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#0B1F3A" }}
                aria-hidden="true"
              >
                <Zap size={16} color="#F5A623" strokeWidth={2.5} />
              </span>
              <p
                className="text-sm sm:text-base font-semibold leading-relaxed"
                style={{ color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
              >
                <LinkedText segments={segmentsByKey.get(`${blockIndex}-null`) ?? [{ text: block.text ?? "", href: null }]} />
              </p>
            </div>
          );
        }

        return (
          <p
            key={gi}
            className="text-base leading-relaxed"
            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
          >
            <LinkedText segments={segmentsByKey.get(`${blockIndex}-null`) ?? [{ text: block.text ?? "", href: null }]} />
          </p>
        );
      })}
    </div>
  );
}
