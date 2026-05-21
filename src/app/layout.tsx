import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const iitbSportDisplay = localFont({
  src: "./fonts/IITBSport-Display.woff2",
  variable: "--font-iitb-display",
  weight: "800",
  display: "swap",
});

const iitbSportHeading = localFont({
  src: "./fonts/IITBSport-Heading.woff2",
  variable: "--font-iitb-heading",
  weight: "600",
  display: "swap",
});

const iitbSportText = localFont({
  src: "./fonts/IITBSport-Text.woff2",
  variable: "--font-iitb-display-text",
  weight: "400",
  display: "swap",
});

const iitbSportMono = localFont({
  src: "./fonts/IITBSport-Mono.woff2",
  variable: "--font-iitb-mono",
  weight: "700",
  display: "swap",
});

const iitbSportCaption = localFont({
  src: "./fonts/IITBSport-Caption.woff2",
  variable: "--font-iitb-caption",
  weight: "300",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sports.iitb.ac.in"),
  title: "IITB Sports | Athletes Only",
  description: "IIT Bombay Sports — Powering 10,000+ students across 40+ disciplines since 1958.",
  openGraph: {
    title: "IITB Sports | Athletes Only",
    description: "IIT Bombay Sports — Powering 10,000+ students across 40+ disciplines since 1958.",
    url: "https://sports.iitb.ac.in",
    siteName: "IIT Bombay Sports",
    images: [
      {
        url: "/gymkhana.webp",
        width: 1200,
        height: 630,
        alt: "IIT Bombay Sports",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IITB Sports | Athletes Only",
    description: "IIT Bombay Sports — Powering 10,000+ students across 40+ disciplines since 1958.",
    images: ["/gymkhana.webp"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`
      ${iitbSportDisplay.variable} 
      ${iitbSportHeading.variable} 
      ${iitbSportText.variable} 
      ${iitbSportMono.variable} 
      ${iitbSportCaption.variable}
    `}>
      <body className="antialiased">
        {/* Global Grain Texture — static PNG tile, GPU-uploaded once, no live SVG filter */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.4] mix-blend-overlay"
             style={{ backgroundImage: 'url(/noise.png)', backgroundSize: '64px 64px' }} />
        {children}
      </body>
    </html>
  );
}
