import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SkipLink } from "@/components/layout/skip-link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Aurora } from "@/components/effects/aurora";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { profile } from "@/lib/profile";
import { siteConfig } from "@/lib/site";

export const unstable_instant = { prefetch: "static" };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    profile.name,
    "Software Engineer",
    "Portfolio",
    "Full Stack Developer",
    "NestJS",
    "React",
    "Next.js",
    "Node.js",
  ],
  authors: [{ name: profile.name, url: siteConfig.url }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f1a" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.summary,
  email: `mailto:${profile.contact.email}`,
  url: siteConfig.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressCountry: "IN",
  },
  sameAs: [profile.contact.github, profile.contact.linkedin],
  alumniOf: profile.education.map((edu) => ({
    "@type": "EducationalOrganization",
    name: edu.institution,
  })),
  worksFor: {
    "@type": "Organization",
    name: "MIDGENIE AI LABS PRIVATE LIMITED",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${profile.name} — ${profile.title}`,
  url: siteConfig.url,
  author: { "@type": "Person", name: profile.name },
};

/** Escape `<` so user-agnostic JSON can be safely inlined in a script tag. */
function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipLink />
          <Aurora />
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(personJsonLd)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(websiteJsonLd)}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${siteConfig.gaId}');
          `}
        </Script>
      </body>
    </html>
  );
}
