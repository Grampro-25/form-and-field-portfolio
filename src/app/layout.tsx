import type { Metadata } from "next";
import "./globals.css";
import "./motion.css";

export const metadata: Metadata = { title: "form & field | Independent digital design", description: "An independent design practice shaping considered websites, digital identities, and product experiences. Based in Berlin. Working everywhere.", openGraph: { title: "form & field | Digital, by design.", description: "Considered websites and digital experiences.", type: "website" }, robots: { index: true, follow: true } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
