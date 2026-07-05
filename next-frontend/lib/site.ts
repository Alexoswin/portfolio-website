function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  url: resolveSiteUrl(),
  gaId: "G-V9Y5HK436Y",
  nav: [
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Skills", href: "/#skills" },
    { name: "Education", href: "/#education" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/#contact" },
  ],
  /** Section ids on the home page, in document order — used by the navbar scrollspy. */
  sectionIds: ["experience", "projects", "skills", "education", "contact"],
  contactEndpoint: "https://smart-blind-stick-4.onrender.com/getintouch",
} as const;
