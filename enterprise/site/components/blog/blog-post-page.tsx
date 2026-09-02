import Link from "next/link";
import { BlogBody } from "@/components/blog/blog-body";
import { BlogCta } from "@/components/blog/blog-cta";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { BlogReveal } from "@/components/blog/blog-reveal";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { LandingNav } from "@/components/landing/landing-nav";
import { SectionContainer } from "@/components/landing/section-container";
import { formatBlogDate, type BlogPost } from "@/data/blog";
import { SITE_NAME, siteUrl } from "@/lib/site";

function buildJsonLd(post: BlogPost) {
  const baseUrl = siteUrl();
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        url: postUrl,
        mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
        datePublished: post.date,
        dateModified: post.date,
        author: { "@type": "Organization", name: post.author, url: baseUrl },
        publisher: { "@type": "Organization", name: SITE_NAME, url: baseUrl },
        articleSection: post.category,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${baseUrl}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
        ],
      },
    ],
  };
}

function MetaDivider() {
  return (
    <span className="h-3 w-px bg-[rgba(246,248,245,0.22)]" aria-hidden="true" />
  );
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(post)) }}
      />
      <LandingLenis />
      <GrainOverlay />
      <LandingNav />

      <main className="relative">
        <BlogHeroBand>
          <div className="max-w-[860px]">
            <div className="mb-6 flex items-center gap-2.5 text-[12px] font-semibold tracking-[0.06em] uppercase">
              <Link
                href="/blog"
                className="text-t3 transition-colors hover:text-t2"
              >
                Blog
              </Link>
              <span className="text-t3/50" aria-hidden="true">
                /
              </span>
              <span className="text-brand">{post.category}</span>
            </div>

            <h1 className="font-heading text-[clamp(36px,4.8vw,62px)] leading-[1.06] font-[660] tracking-[-0.02em] text-t1">
              {post.title}
            </h1>

            <div className="mt-7 max-w-[58ch] space-y-4 text-[18px] leading-[1.6] text-t2">
              {post.summary.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-t3">
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              <MetaDivider />
              <span>{post.author}</span>
              <MetaDivider />
              <span>{post.readingMinutes} min read</span>
            </div>
          </div>
        </BlogHeroBand>

        <section className="border-t border-border-light bg-paper-soft py-20 text-copy md:py-24">
          <SectionContainer>
            {/* Left aligned with the hero title rather than centred, so the
                article keeps the page's left edge once the contents list is
                gone. */}
            <BlogReveal>
              <article className="max-w-[900px] min-w-0">
                <BlogBody blocks={post.body} />
              </article>
            </BlogReveal>
          </SectionContainer>
        </section>

        <BlogCta showAllPosts />
      </main>

      <LandingFooter />
    </>
  );
}
