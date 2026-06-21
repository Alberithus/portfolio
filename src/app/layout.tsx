import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Rye, Special_Elite } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeContext";

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

const rye = Rye({
  variable: "--font-rye",
  subsets: ["latin"],
  weight: ["400"],
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  subsets: ["latin"],
  weight: ["400"],
});

const rdr2Font = localFont({
  src: "../../public/fonts/rdr2.ttf",
  variable: "--font-rdr2",
  display: "block",
});

export const metadata: Metadata = {
  title: "ALBERT // PORTFOLIO",
  description: "Albert — web & mobile engineer.",
  keywords: ["Albert Azizov", "Web Engineer", "React Developer", "React Native", "MySQL", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      data-theme="rdr2"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${rye.variable} ${specialElite.variable} ${rdr2Font.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white flex flex-col font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
