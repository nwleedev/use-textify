import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import PocketbaseProvider from "./providers/pocketbase";
import TanstackQueryProvider from "./providers/tanstack-query";

export const metadata: Metadata = {
  title: "Use Textify",
  description: "Share your awesome prompts with users",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Use Textify",
    title: "Use Textify",
    description: "Share your awesome prompts with users",
  },
  twitter: {
    card: "summary",
    title: "Use Textify",
    description: "Share your awesome prompts with users",
  },
  alternates: {
    canonical: "https://usetextify.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PocketbaseProvider>
          <TanstackQueryProvider>
            <Suspense>{children}</Suspense>
          </TanstackQueryProvider>
        </PocketbaseProvider>
        <div id="portal" className="w-full h-0 fixed"></div>
      </body>
    </html>
  );
}
