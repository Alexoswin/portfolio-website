export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  readTime: string;
  tag: string;
  image: string;
  /** SVG diagrams need `contain`; raster covers fill the frame. */
  imageFit: "contain" | "cover";
}

export const blogPosts: BlogPost[] = [
  {
    slug: "asymmetric-cryptography",
    title: "Asymmetric Cryptography Explained",
    excerpt:
      "A detailed guide to public and private keys, how key pairs are created, and a full RSA walkthrough with encryption and signature examples.",
    date: "April 13, 2026",
    isoDate: "2026-04-13",
    readTime: "14 min read",
    tag: "Cryptography",
    image: "/blogs/asymmetric-key-flow-diagram.svg",
    imageFit: "contain",
  },
  {
    slug: "aes-encryption",
    title: "Understanding AES Encryption",
    excerpt:
      "A deep dive into the Advanced Encryption Standard, symmetric key cryptography, and how the algorithm transforms data through its core phases.",
    date: "April 13, 2026",
    isoDate: "2026-04-13",
    readTime: "8 min read",
    tag: "Cryptography",
    image: "/blogs/aes_encryption_diagram.png",
    imageFit: "cover",
  },
];
