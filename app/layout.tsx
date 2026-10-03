import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "UTM Builder — Free UTM URL Generator",
    template: "%s | UTM Builder",
  },
  description:
    "Build clean, trackable campaign URLs with a free UTM builder. Generate, copy, save, and share UTM links in seconds.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "UTM Builder — Free UTM URL Generator",
    description:
      "Build clean, trackable campaign URLs with a fast, free UTM builder.",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UTM Builder — Free UTM URL Generator",
    description:
      "Build clean, trackable campaign URLs with a fast, free UTM builder.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteHeader />
        {children}
        <footer className="border-t border-slate-200/80 bg-white/70 dark:border-slate-800 dark:bg-slate-950/70">
          <div className="shell flex flex-col gap-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
            <p>Free UTM Builder. Your campaign data stays in your browser.</p>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
              <a className="hover:text-slate-900 dark:hover:text-white" href="/about">About</a>
              <a className="hover:text-slate-900 dark:hover:text-white" href="/privacy">Privacy</a>
              <a className="hover:text-slate-900 dark:hover:text-white" href="/terms">Terms</a>
              <a className="hover:text-slate-900 dark:hover:text-white" href="/contact">Contact</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
