import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogClient from "./BlogClient";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Electrical Tips & Insights Blog | ENE Electrical Katy, TX",
  description:
    "Practical electrical safety tips, panel upgrade guidance, and home wiring insights from ENE Electrical's licensed team serving Katy and the greater Houston metro.",
  alternates: {
    canonical: "/blog",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "ENE Electrical Blog",
  url: "https://eneelectrical.com/blog",
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
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `https://eneelectrical.com/blog/${post.slug}`,
    datePublished: post.date,
  })),
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-2 lg:pt-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
          ]}
        />
      </div>
      <main>
        <BlogClient posts={blogPosts} />
      </main>
      <Footer />
    </>
  );
}
