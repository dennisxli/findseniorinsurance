import type { Metadata } from "next";
import Analytics from "@/app/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.findseniorinsurance.com"),
  title: "Find Senior Insurance | Navigate Life & Medicare Insurance",
  description:
    "A clearer path through final expense and Medicare insurance, with plain-English guidance centered on seniors and their priorities.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Find Senior Insurance",
    title: "A clearer path through life & Medicare insurance.",
    description:
      "Plain-English guidance centered on seniors, their priorities, and the people they want to protect.",
    images: [{ url: "/og.png", width: 1729, height: 910, alt: "Find Senior Insurance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A clearer path through life & Medicare insurance.",
    description:
      "Plain-English guidance centered on seniors, their priorities, and the people they want to protect.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
