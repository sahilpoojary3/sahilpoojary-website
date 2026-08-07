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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahilpoojary.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Business & Management Professional`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
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
    description: profile.tagline,
    siteName: profile.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Business & Management Professional`,
    description: profile.tagline,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  jobTitle: "Business & Management Professional",
  description: profile.tagline,
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
