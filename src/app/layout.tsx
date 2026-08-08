import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/config/profile";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AskSahil from "@/components/AskSahil";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahilpoojary-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Business & Management Professional`,
    template: `%s — ${profile.name}`,
  },
  description: profile.metaDescription,
  keywords: [
    "Sahil Poojary",
    "Sahil Poojary Vancouver",
    "Sahil Poojary MBA",
    "Sahil Poojary business",
    "Business Strategy",
    "Marketing Management",
    "Operations",
    "University Canada West MBA",
  ],
  authors: [{ name: profile.name, url: profile.socials.linkedin }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — Business & Management Professional`,
    description: profile.metaDescription,
    siteName: profile.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Business & Management Professional`,
    description: profile.metaDescription,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  // Drop your Google Search Console verification code in the
  // GOOGLE_SITE_VERIFICATION environment variable to verify the property —
  // no code changes needed. Leave unset until you have a real code; Next.js
  // omits the meta tag entirely when this is undefined.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  image: `${siteUrl}/images/profile.jpg`,
  jobTitle: "Business & Management Professional",
  description: profile.metaDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vancouver",
    addressRegion: "British Columbia",
    addressCountry: "CA",
  },
  email: `mailto:${profile.email}`,
  sameAs: [profile.socials.linkedin],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University Canada West" },
    { "@type": "CollegeOrUniversity", name: "University of Mumbai" },
  ],
  knowsAbout: [
    "Business Strategy",
    "Marketing Management",
    "Operations Management",
    "Digital Transformation",
    "eCommerce",
    "Business Analysis",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: profile.name,
  url: siteUrl,
  publisher: { "@type": "Person", name: profile.name },
  inLanguage: "en",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          // Applies persisted theme before paint to avoid a flash of the wrong theme.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-accent focus:text-paper focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        {profile.sections.askSahil && <AskSahil />}
      </body>
    </html>
  );
}
