import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCta } from "@/components/blog/blog-cta";
import { BlogHeroBand } from "@/components/blog/blog-hero-band";
import { BlogReveal } from "@/components/blog/blog-reveal";
import { GrainOverlay } from "@/components/landing/grain-overlay";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingLenis } from "@/components/landing/landing-lenis";
import { LandingNav } from "@/components/landing/landing-nav";
import { SectionContainer } from "@/components/landing/section-container";
import { BLOG_POSTS, formatBlogDate } from "@/data/blog";
import { SITE_NAME } from "@/lib/site";

// Search-result and card copy only. The hero deliberately carries no deck.
const PAGE_DESCRIPTION =
  "Integrations we wired up, document models we shipped, and what the structured result makes possible.";

export const metadata: Metadata = {
  title: "Blog",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog - ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: "/blog",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <LandingLenis />
      <GrainOverlay />
      <LandingNav />

      <main className="relative">
        <BlogHeroBand>
          <div className="mx-auto max-w-[880px] text-center">
            <h1 className="font-heading text-[clamp(40px,4.8vw,64px)] leading-[1.08] font-[660] tracking-[-0.02em] text-t1">
              <span className="block">How we build</span>
              <span className="block bg-[linear-gradient(90deg,#24D7E8_0%,#3FBCF2_55%,#7A3AFF_125%)] bg-clip-text text-transparent">
                software you own.
              </span>
            </h1>
          </div>
        </BlogHeroBand>

        <section className="border-t border-border-light bg-paper-soft py-20 text-copy md:py-24">
          <SectionContainer>
            <BlogReveal className="space-y-5">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="fade-up rounded-[16px] border border-border-light bg-white p-7 shadow-[0_2px_12px_rgba(17,22,20,0.1)] md:p-9"
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] font-semibold tracking-[0.06em] uppercase">
                      <span className="text-[#7A3AFF]">{post.category}</span>
                      <span className="text-copy-muted/45" aria-hidden="true">
                        /
                      </span>
                      <time dateTime={post.date} className="text-copy-muted">
                        {formatBlogDate(post.date)}
                      </time>
                      <span className="text-copy-muted/45" aria-hidden="true">
                        /
                      </span>
                      <span className="text-copy-muted">
                        {post.readingMinutes} min read
                      </span>
                    </div>

                    <h2 className="font-heading mt-4 text-[clamp(26px,3vw,36px)] leading-[1.12] font-[680] tracking-[-0.02em] text-copy">
                      {post.title}
                    </h2>

                    <p className="mt-4 max-w-[68ch] text-[17px] leading-[1.6] text-pretty text-copy-muted">
                      {post.summary}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#7A3AFF] group-hover:underline">
                      Read the post
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </article>
              ))}
            </BlogReveal>
          </SectionContainer>
        </section>

        <BlogCta />
      </main>

      <LandingFooter />
    </>
  );
}
