import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blogs";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/effects/reveal";
import { Spotlight } from "@/components/effects/spotlight";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts, tutorials, and insights on software engineering and security.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Blog",
    description:
      "Thoughts, tutorials, and insights on software engineering and security.",
    url: "/blogs",
  },
};

export default function BlogsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="animate-fade-up mb-12 flex flex-col gap-3">
        <p className="eyebrow">Writing</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Latest <span className="text-gradient">Writings</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Thoughts, tutorials, and insights on software engineering and
          security.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {blogPosts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.08} className="h-full">
            <Link
              href={`/blogs/${post.slug}`}
              className="group block h-full rounded-2xl focus-visible:outline-2"
            >
              <Spotlight
                tilt
                className="h-full rounded-2xl transition-transform duration-300"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-[border-color,box-shadow] duration-300 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5 dark:shadow-card-dark">
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 430px"
                    className={cn(
                      "transition-transform duration-500 group-hover:scale-105",
                      post.imageFit === "contain"
                        ? "object-contain p-3"
                        : "object-cover",
                    )}
                  />
                </div>
                <div className="flex grow flex-col p-6">
                  <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                    <time dateTime={post.isoDate}>{post.date}</time>
                    <span className="flex items-center gap-2">
                      <Badge variant="primary">{post.tag}</Badge>
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="grow text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 flex items-center gap-1 text-sm font-medium text-primary">
                    Read article
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                </article>
              </Spotlight>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
