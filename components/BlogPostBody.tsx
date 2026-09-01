import React from "react";
import Link from "next/link";
import { BlogContentBlock } from "@/lib/blog-data";
import { linkArticleTexts, TextSegment } from "@/lib/internal-links";

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

  return (
    <div className="flex flex-col gap-5">
      {content.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="text-2xl sm:text-3xl font-bold mt-6 mb-1 leading-tight"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "subheading") {
          return (
            <h3
              key={i}
              className="text-lg sm:text-xl font-bold mt-3 mb-1 leading-snug"
              style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="flex flex-col gap-2 pl-1">
              {block.items?.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3 text-base leading-relaxed"
                  style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                >
                  <span
                    className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "#F5A623" }}
                    aria-hidden="true"
                  />
                  <span>
                    <LinkedText segments={segmentsByKey.get(`${i}-${j}`) ?? [{ text: item, href: null }]} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={i}
            className="text-base leading-relaxed"
            style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
          >
            <LinkedText segments={segmentsByKey.get(`${i}-null`) ?? [{ text: block.text ?? "", href: null }]} />
          </p>
        );
      })}
    </div>
  );
}
