import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ALBERT AZIZOV // PORTFOLIO",
  description: "Personal portfolio of Albert Azizov - web & mobile engineer. Minimalist, premium brutalist monochrome interface showcasing technologies and selected works.",
  keywords: ["Albert Azizov", "Web Engineer", "React Developer", "React Native", "MySQL", "Portfolio", "Brutalist Design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}

