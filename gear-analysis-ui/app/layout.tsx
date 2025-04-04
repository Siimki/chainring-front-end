import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from '@vercel/analytics/next';

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GearReport – Gear Usage Analyzer",
  description: "Upload your .FIT ride file and get a detailed breakdown of gear usage, drivetrain zones, and efficiency.",
  metadataBase: new URL("https://gearreport.vercel.app"),
  openGraph: {
    title: "GearReport – Gear Usage Analyzer",
    description: "See your gear usage, chain alignment, and drivetrain zones visualized from your FIT ride files.",
    url: "https://gearreport.vercel.app",
    siteName: "GearReport",
    images: [
      {
        url: "/preview-image.png",
        width: 1200,
        height: 630,
        alt: "GearReport preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GearReport – Gear Usage Analyzer",
    description: "Upload your FIT file to analyze drivetrain performance.",
    images: ["/preview-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
    ],
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="jnY71NAJAejMoXBmz7pGvkOt97FqCg4wLOg3VlNsPJU" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
