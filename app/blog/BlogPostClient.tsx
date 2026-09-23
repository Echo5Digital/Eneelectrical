"use client";

import Link from "next/link";
import Image from "next/image";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import VanCta from "@/components/VanCta";
import BlogPostBody from "@/components/BlogPostBody";
import { BlogPost } from "@/lib/blog-data";
import {
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Zap,
  Phone,
  CalendarCheck,
  FileText,
  ListChecks,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";

interface Props {
  post: BlogPost;
  prev?: BlogPost;
  next?: BlogPost;
  relatedPosts: BlogPost[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Same rule used by BlogPostBody: real heading text -> a stable slug, so
// the Table of Contents links always land on a heading that really
// exists on the page.
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function FaqAccordion({ items }: { items: BlogPost["faqs"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left gap-3"
              aria-expanded={isOpen}
            >
              <span
                className="font-semibold text-sm leading-snug"
                style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
              >
                {item.question}
              </span>
              <span className="flex-shrink-0" style={{ color: "#F5A623" }}>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>
            {isOpen && (
              <div
                className="px-4 pb-3.5 text-sm leading-relaxed text-gray-600 border-t border-gray-100"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <p className="pt-3">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BlogPostClient({ post, prev, next, relatedPosts }: Props) {
  const tocItems = post.content
    .filter((b) => b.type === "heading" && b.text)
    .map((b) => ({ text: b.text as string, id: slugify(b.text as string) }));

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#0B1F3A" }}
        aria-labelledby="post-heading"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={post.imageSrc}
            alt={post.imageAlt}
            fill
            priority
            className="object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.97) 0%, rgba(11,31,58,0.85) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col items-center text-center gap-6">
          <span
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: "rgba(245,166,35,0.15)",
              color: "#F5A623",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {post.category}
          </span>

          <h1
            id="post-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-blue-100">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime} read
            </span>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY + SIDEBAR ── */}
      <Section background="white" spacing="lg" maxWidth="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-12 items-start">
          {/* ── Main column ── */}
          <div>
            {post.bodyImage && (
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={post.bodyImage}
                  alt={post.bodyImageAlt || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <article className="flex flex-col gap-5">
              <p
                className="text-lg leading-relaxed font-medium"
                style={{ color: "#0B1F3A", fontFamily: "Inter, sans-serif" }}
              >
                {post.intro}
              </p>
              <BlogPostBody content={post.content} />
            </article>

            {/* Related service CTA */}
            <div
              className="mt-10 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
              style={{ backgroundColor: "#F7F8FA", border: "1px solid #e5e7eb" }}
            >
              <div>
                <p
                  className="text-sm font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
                >
                  Need Help With This?
                </p>
                <p
                  className="text-base font-bold"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  ENE Electrical offers {post.relatedServiceLabel} throughout Katy & Houston
                </p>
              </div>
              <Link
                href={post.relatedServiceHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest shadow-md transition-all duration-200 hover:brightness-105 active:scale-95 flex-shrink-0"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <Zap size={15} />
                View Service
              </Link>
            </div>
          </div>

          {/* ── Sidebar (sticky) ── */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
            {/* Need Electrical Help? */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#0B1F3A" }}
            >
              <span
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#F5A623" }}
                aria-hidden="true"
              >
                <Zap size={18} color="#0B1F3A" strokeWidth={2.5} />
              </span>
              <h3
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Need Electrical Help?
              </h3>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, sans-serif" }}
              >
                Our licensed electricians are ready to help with{" "}
                {post.relatedServiceLabel.toLowerCase()} and more.
              </p>
              <a
                href="tel:+18327830303"
                className="flex items-center gap-2 text-base font-bold mb-4"
                style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
              >
                <Phone size={16} />
                (832) 783-0303
              </a>
              <Link
                href="/appointment-booking"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-bold shadow-md transition-all duration-200 hover:brightness-105 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <CalendarCheck size={16} />
                Book Appointment
              </Link>
            </div>

            {/* Related Service */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 pt-5 pb-1 flex items-center gap-2">
                <FileText size={16} style={{ color: "#0B1F3A" }} />
                <span
                  className="text-sm font-bold"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  Related Service
                </span>
              </div>
              <div className="relative w-full h-32 mt-3">
                <Image
                  src={post.imageSrc}
                  alt={post.relatedServiceLabel}
                  fill
                  className="object-cover"
                />
                <span
                  className="absolute bottom-3 left-3 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#F5A623" }}
                  aria-hidden="true"
                >
                  <FileText size={16} color="#0B1F3A" />
                </span>
              </div>
              <div className="p-5">
                <h4
                  className="text-base font-bold mb-2 leading-snug"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {post.relatedServiceLabel}
                </h4>
                <Link
                  href={post.relatedServiceHref}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
                >
                  View Service
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Table of Contents */}
            {tocItems.length > 0 && (
              <div className="rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ListChecks size={16} style={{ color: "#0B1F3A" }} />
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Table of Contents
                  </span>
                </div>
                <ul className="flex flex-col gap-1">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="flex items-start gap-1.5 text-sm py-1.5 leading-snug hover:text-[#F5A623] transition-colors"
                        style={{ color: "#1A2530", fontFamily: "Inter, sans-serif" }}
                      >
                        <ChevronDown size={14} className="-rotate-90 mt-0.5 flex-shrink-0" style={{ color: "#F5A623" }} />
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQ */}
            {post.faqs.length > 0 && (
              <div className="rounded-2xl border border-gray-200 p-5">
                <h3
                  className="text-sm font-bold mb-3"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  Frequently Asked Questions
                </h3>
                <FaqAccordion items={post.faqs} />
              </div>
            )}
          </aside>
        </div>
      </Section>

      {/* ── PREV / NEXT ── */}
      {(prev || next) && (
        <Section background="default" spacing="md" maxWidth="2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group flex flex-col gap-2 p-5 rounded-xl border border-gray-200 bg-white hover:border-amber-400 hover:shadow-md transition-all duration-200"
              >
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
                >
                  <ArrowLeft size={13} />
                  Previous
                </span>
                <span
                  className="text-sm font-semibold leading-snug"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group flex flex-col gap-2 p-5 rounded-xl border border-gray-200 bg-white hover:border-amber-400 hover:shadow-md transition-all duration-200 sm:text-right sm:items-end"
              >
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest sm:flex-row-reverse"
                  style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
                >
                  <ArrowRight size={13} />
                  Next
                </span>
                <span
                  className="text-sm font-semibold leading-snug"
                  style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                >
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </Section>
      )}

      {/* ── RELATED POSTS ── */}
      {relatedPosts.length > 0 && (
        <Section background="white" spacing="lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-8 text-center"
            style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
          >
            More From the Blog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group block rounded-[0.75rem] overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative w-full h-40 overflow-hidden flex-shrink-0">
                  <Image
                    src={rp.imageSrc}
                    alt={rp.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3
                    className="text-sm font-bold mb-2 leading-snug"
                    style={{ color: "#0B1F3A", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {rp.title}
                  </h3>
                  <span
                    className="mt-auto text-xs font-semibold uppercase tracking-wide flex items-center gap-1"
                    style={{ color: "#F5A623", fontFamily: "Montserrat, sans-serif" }}
                  >
                    Read More
                    <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* ── CTA / CONTACT ── */}
      <Section background="primary" spacing="lg" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <span
              className="inline-block font-semibold text-sm uppercase tracking-widest"
              style={{ color: "#F5A623", fontFamily: "Inter, sans-serif" }}
            >
              Get Started Today
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Talk to a Licensed Electrician
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Inter, sans-serif" }}
            >
              Have questions about your home's electrical system? ENE
              Electrical serves Katy and the greater Houston metro with
              licensed, background-checked technicians ready to help.
            </p>
            <div className="pt-2">
              <Link
                href="/appointment-booking"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-200 hover:brightness-105 active:scale-95"
                style={{
                  backgroundColor: "#F5A623",
                  color: "#0B1F3A",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
                }}
              >
                <Zap size={16} />
                Book Appointment
              </Link>
            </div>
          </div>
          <div>
            <ContactForm
              heading="Request a Free Quote"
              subheading="We'll respond within 24 hours."
              ctaLabel="Send My Request"
            />
          </div>
        </div>
      </Section>

      <VanCta
        heading={
          <>
            Ready to Schedule Your{" "}
            <span style={{ color: "#F5A623" }}>Electrician?</span>
          </>
        }
        description="ENE Electrical brings licensed, background-checked technicians to homes throughout Katy and the greater Houston metro."
      />
    </>
  );
}
