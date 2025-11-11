import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import SEOStructuredData from "@/components/SEOStructuredData";
import GA from "@/components/GA";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Get base URL safely
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (process.env.VERCEL_URL) {
    const vercelHost = process.env.VERCEL_URL;
    // Never use vercel.app hosts as canonical; fall back to production domain
    if (!/vercel\.app$/i.test(vercelHost)) {
      return new URL(`https://${vercelHost}`);
    }
  }
  return new URL("https://www.delphinassociates.com");
};

export const metadata: Metadata = {
  metadataBase: getBaseUrl(),
  title: {
    default: "Delphin Associates | Civil Construction Company | Chennai, Tamil Nadu",
    template: "%s | Delphin Associates",
  },
  description:
    "Delphin Associates - You Dream We Build. Building Trust Through Quality Since 1999. Leading civil construction company in Chennai, Tamil Nadu, specializing in residential, industrial, commercial, institutional, and church projects. Expert building consultancy and construction services.",
  keywords: [
    "construction company Chennai",
    "civil construction Tamil Nadu",
    "building consultancy Chennai",
    "residential construction Chennai",
    "industrial construction Tamil Nadu",
    "commercial construction Chennai",
    "church buildings construction",
    "institutional buildings",
    "construction services Chennai",
    "building contractors Chennai",
    "civil contractors Tamil Nadu",
    "construction consultancy",
    "project execution services",
    "Madipakkam construction",
    "Chennai builders",
    "construction company since 1999",
  ],
  authors: [{ name: "Delphin Associates" }],
  creator: "Delphin Associates",
  publisher: "Delphin Associates",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Delphin Associates",
    title: "Delphin Associates | Civil Construction Company | Chennai, Tamil Nadu",
    description:
      "You Dream We Build. Building Trust Through Quality Since 1999. Leading civil construction company in Chennai, Tamil Nadu, specializing in residential, industrial, commercial, institutional, and church projects.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Delphin Associates - Civil Construction Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delphin Associates | Civil Construction Company | Chennai",
    description:
      "You Dream We Build. Building Trust Through Quality Since 1999. Leading civil construction company in Chennai, Tamil Nadu.",
    images: ["/logo.jpg"],
    creator: "@delphin75358",
  },
  verification: {
    other: {
      "msvalidate.01": "C63DE252D84E4F2847C50CE603ADB4B6",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  category: "Construction",
  classification: "Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <SEOStructuredData type="Organization" />
        <SEOStructuredData type="WebSite" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2JT8PG47WJ"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2JT8PG47WJ');
          `}
        </Script>
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "u4ed5jx0fg");
          `}
        </Script>
        <Suspense fallback={null}>
          <GA />
        </Suspense>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
