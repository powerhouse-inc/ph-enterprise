import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionContainer } from "@/components/landing/section-container";
import { BookCallButton } from "@/components/landing/book-call-button";

/**
 * Closing paper band. Deliberately the same proposition and buttons as the
 * landing page's ContactCta so the blog ends where the home page ends.
 */
export function BlogCta({ showAllPosts = false }: { showAllPosts?: boolean }) {
  return (
    <div className="border-t border-border-light bg-paper py-24 text-copy md:py-32">
      <SectionContainer>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="font-heading mb-6 text-[clamp(34px,4.2vw,56px)] leading-[1.05] font-[680] tracking-[-0.02em] text-copy">
            Start with a workflow assessment.
          </h2>
          <p className="mx-auto mb-9 max-w-[600px] text-[18px] leading-[1.65] text-copy-muted">
            Find out where Powerhouse can improve operational efficiency. We map
            the first workflow before a build starts.
          </p>
          <div className="flex items-center justify-center gap-4 max-sm:flex-col">
            <BookCallButton className="h-12 rounded-lg border-[#7A3AFF] bg-[#7A3AFF] px-6 text-[15px] font-semibold text-white hover:bg-[#6B2DF2] max-sm:w-full" />
            <a
              href="https://vetra.io/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center rounded-md border border-border-light bg-white px-5 text-[13px] font-medium text-copy-muted transition-colors hover:border-copy-muted/40 hover:text-copy max-sm:w-full max-sm:justify-center"
            >
              Explore the docs
            </a>
          </div>

          {showAllPosts ? (
            <Link
              href="/blog"
              className="mt-12 inline-flex items-center gap-1.5 text-[13px] font-medium text-copy-muted transition-colors hover:text-copy"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All posts
            </Link>
          ) : null}
        </div>
      </SectionContainer>
    </div>
  );
}
