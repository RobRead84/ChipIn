import type { Metadata } from "next";
import { Archivo_Black, Space_Mono, Work_Sans } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: ["400"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ChipIn - Unlock the LinkedIn conversations you're not seeing",
  description: "LinkedIn is full of conversations that could change your career, your pipeline, or your next big idea. Most of them never reach your feed. ChipIn finds them for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${spaceMono.variable} ${workSans.variable} antialiased`}>
      <body className="min-h-[100dvh] flex flex-col">{children}</body>
    </html>
  );
}