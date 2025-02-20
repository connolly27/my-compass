import type { Metadata } from "next";
import { schoolbell } from "./fonts";
import "./globals.css";

// Metadata for the application - used by Next.js for SEO and document head
export const metadata: Metadata = {
  title: "Bobby's Room",
  description: "A fun and friendly place to learn Next.js",
};

// Root layout component - wraps all pages and applies global styles/fonts
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={schoolbell.className}>
      <body>{children}</body>
    </html>
  );
}
