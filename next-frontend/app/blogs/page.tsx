"use client";

import Link from "next/link";
import { m } from "framer-motion";
import Image from "next/image";

const blogs = [
  {
    slug: "asymmetric-cryptography",
    title: "Asymmetric Cryptography Explained",
    excerpt:
      "A detailed guide to public and private keys, how key pairs are created, and a full RSA walkthrough with encryption and signature examples.",
    date: "April 13, 2026",
    isoDate: "2026-04-13",
    readTime: "14 min read",
    image: "/blogs/asymmetric-key-flow-diagram.svg",
    imageClassName:
      "object-contain p-3 transition-transform duration-500 group-hover:scale-105",
  },
  {
    slug: "aes-encryption",
    title: "Understanding AES Encryption",
    excerpt: "A deep dive into the Advanced Encryption Standard, symmetric key cryptography, and how the algorithm transforms data through its core phases.",
    date: "April 13, 2026",
    isoDate: "2026-04-13",
    readTime: "8 min read",
    image: "/blogs/aes_encryption_diagram.png",
    imageClassName:
      "object-cover transition-transform duration-500 group-hover:scale-105",
  },
];

export default function BlogsPage() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Writings</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Thoughts, tutorials, and insights on software engineering and security.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <m.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                <article className="h-full flex flex-col bg-background/50 backdrop-blur-sm border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="relative w-full h-48 overflow-hidden bg-muted">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className={blog.imageClassName}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <time dateTime={blog.isoDate}>{blog.date}</time>
                      <span>{blog.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-muted-foreground text-sm flex-grow">
                      {blog.excerpt}
                    </p>
                    <div className="mt-6 text-sm font-medium text-primary flex items-center">
                      Read Article
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            </m.div>
          ))}
        </div>
      </m.div>
    </div>
  );
}
