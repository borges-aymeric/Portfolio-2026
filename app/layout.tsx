import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import "@fontsource/boldonse";
import "@fontsource/jetbrains-mono";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import { ModalProvider } from "@/contexts/ModalContext";

const barlowCondensed = Barlow_Condensed({
  weight: "900",
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

export const metadata: Metadata = {
  title: "Aymeric Borges - Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={barlowCondensed.variable}>
      <body>
        <ModalProvider>
          <SmoothScroll />
          <ScrollProgress />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}

