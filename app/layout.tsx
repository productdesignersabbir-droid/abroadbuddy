import type { Metadata } from "next";
import { Poppins, Stack_Sans_Headline } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const stackSans = Stack_Sans_Headline({
  variable: "--font-stack-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Only used by the EasiAbroad wordmark, to match the brand logo.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500"],
});

// Not in Next's Google font list yet, so it's self-hosted from Google Fonts.
const caslon = localFont({
  variable: "--font-caslon",
  src: [
    { path: "./fonts/LibreCaslonCondensed-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/LibreCaslonCondensed-500-italic.woff2", weight: "500", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "EasiAbroad — Your whole study-abroad journey, one platform",
  description:
    "EasiAbroad helps South Asian students check their readiness, find universities and professors, and track scholarship and conference deadlines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${stackSans.variable} ${caslon.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
