"use client";

import Link from "next/link";
import Image from "next/image";
import Section, { SectionHeading } from "@/components/Section";
import VanCta from "@/components/VanCta";
import { BlogPost } from "@/lib/blog-data";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

interface Props {
  posts: BlogPost[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogClient({ posts }: Props) {
  const [featured, ...rest] = posts;

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(245,166,35,0.12) 0%, transparent 55%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-center text-center gap-6">
          <span
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: "rgba(245,166,35,0.15)",
              color: "#F5A623",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <BookOpen size={14} />
            ENE Electrical Blog
          </span>

          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-4xl"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Electrical Tips & Insights{" "}
            <span style={{ color: "#F5A623" }}>from Katy, TX</span>
          </h1>

          <p
            className="text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Practical guidance from ENE Electrical's licensed team on panel
            upgrades, home safety, surge protection, and everything else
            homeowners across Katy and the Houston metro ask us about.
          </p>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      {featured && (
        <Section background="white" spacing="lg">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64 lg:h-full min-h-[280px]">
              <Image
                src={featured.imageSrc}
                alt={featured.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {featured.category}
              </span>
            </div>
            <div className="p-6 lg:p-10 flex flex-col gap-4">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
              >
                Latest Article
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold leading-tight"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                {featured.title}
              </h2>
              <p
                className="text-base leading-relaxed text-gray-500"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  {formatDate(featured.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {featured.readTime} read
                </span>
              </div>
              <span
                className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide mt-2"
                style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
              >
                Read Article
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Section>
      )}

      {/* ── POST GRID ── */}
      <Section background="default" spacing="lg">
        <SectionHeading
          eyebrow="More Articles"
          title="Recent Posts"
          subtitle="Straightforward advice on electrical safety, upgrades, and maintenance for homeowners in Katy and Houston."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-[0.75rem] overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
                <Image
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span
                  className="absolute top-3 left-3 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "#F5A623",
                    color: "#0B1F3A",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {post.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{post.readTime} read</span>
                </div>
                <h3
                  className="text-base font-bold mb-2 leading-snug"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-5 line-clamp-3">
                  {post.excerpt}
                </p>
                <span
                  className="self-start text-sm font-semibold uppercase tracking-wide flex items-center gap-1 transition-opacity group-hover:opacity-75"
                  style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
                >
                  Read More
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <VanCta
        heading={
          <>
            Have an Electrical Question We Haven&apos;t{" "}
            <span style={{ color: "#F5A623" }}>Covered Yet?</span>
          </>
        }
        description="ENE Electrical's licensed team is here to help with panel upgrades, repairs, inspections, and everything in between. Reach out and get a straight answer from a real electrician."
      />
    </>
  );
}
