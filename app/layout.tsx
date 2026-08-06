import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Find Senior Insurance | Life & Health Insurance Guidance",
  description:
    "Straightforward help comparing final expense and Medicare insurance options for seniors, with no cost and no obligation.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
