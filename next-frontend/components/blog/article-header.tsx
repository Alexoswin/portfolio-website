import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/lib/profile";
import { siteConfig } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ArticleHeaderProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  isoDate: string;
  readTime: string;
  tag: string;
  image: string;
  imageAlt: string;
  imageFit?: "contain" | "cover";
}

/** Shared blog article masthead: back link, meta row, title, hero image and BlogPosting schema. */
export function ArticleHeader({
  slug,
  title,
  description,
  date,
  isoDate,
  readTime,
  tag,
  image,
  imageAlt,
  imageFit = "cover",
}: ArticleHeaderProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: isoDate,
    image: `${siteConfig.url}${image}`,
    url: `${siteConfig.url}/blogs/${slug}`,
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteConfig.url,
    },
  };

  return (
    <header className="animate-fade-up">
      <Link
        href="/blogs"
        className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        Back to blogs
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <time dateTime={isoDate}>{date}</time>
        <span aria-hidden="true">·</span>
        <span>{readTime}</span>
        <Badge variant="primary">{tag}</Badge>
      </div>

      <h1 className="mb-8 text-4xl leading-tight font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
        {title}
      </h1>

      <div className="relative mb-16 aspect-video w-full overflow-hidden rounded-2xl border bg-muted shadow-card dark:shadow-card-dark">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 896px) 100vw, 896px"
          className={cn(
            imageFit === "contain" ? "object-contain p-3" : "object-cover",
          )}
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </header>
  );
}
