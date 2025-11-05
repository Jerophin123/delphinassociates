import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

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

export const metadata: Metadata = {
  title: "Delphin Associates | Civil Construction Company | Chennai, Tamil Nadu",
  description:
    "Delphin Associates - You Dream We Build. Building Trust Through Quality Since 1999. Leading civil construction company in Chennai, Tamil Nadu, specializing in residential, industrial, commercial, institutional, and church projects.",
  keywords: [
    "construction company Chennai",
    "civil construction Tamil Nadu",
    "building consultancy",
    "residential construction",
    "industrial construction",
    "church buildings",
    "institutional buildings",
  ],
  authors: [{ name: "Delphin Associates" }],
  openGraph: {
    title: "Delphin Associates | Civil Construction Company | Chennai",
    description:
      "You Dream We Build. Building Trust Through Quality Since 1999. Leading civil construction company in Chennai, Tamil Nadu.",
    type: "website",
    locale: "en_IN",
    siteName: "Delphin Associates",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delphin Associates | Civil Construction Company",
    description:
      "You Dream We Build. Building Trust Through Quality Since 1999. Leading civil construction company in Chennai, Tamil Nadu.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
