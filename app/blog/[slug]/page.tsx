import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostClient from "../BlogPostClient";
import { blogPosts, getBlogPost, getAdjacentPosts } from "@/lib/blog-data";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) {
    return { title: "Post Not Found | ENE Electrical" };
  }
  return {
    title: `${post.title} | ENE Electrical Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.slug);
  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(post.slug);
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.imageSrc,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "ENE Electrical",
    },
    publisher: {
      "@type": "LocalBusiness",
      name: "ENE Electrical",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Katy",
        addressRegion: "TX",
        postalCode: "77494",
        addressCountry: "US",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://eneelectrical.com/blog/${post.slug}`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-2 lg:pt-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
        />
      </div>
      <main>
        <BlogPostClient post={post} prev={prev} next={next} relatedPosts={relatedPosts} />
      </main>
      <Footer />
    </>
  );
}
