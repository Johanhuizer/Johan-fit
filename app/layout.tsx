import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNavigation from "./components/BottomNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ForgeFit",
  description:
    "ForgeFit - Jouw persoonlijke fitnesscoach",

  applicationName:
    "ForgeFit",

  appleWebApp: {
    capable: true,
    title: "ForgeFit",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
  <html lang="nl">
  <body className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}>
    {children}
    <BottomNavigation />
  </body>
</html>
);
}
