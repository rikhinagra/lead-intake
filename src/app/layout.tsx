import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_TITLE} — ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `${SITE_TITLE} — ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
