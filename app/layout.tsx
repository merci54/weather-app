import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import "modern-normalize";
import Header from "@/components/Header/Header";
import GeolocationChecker from "@/components/GeolocationChecker/GeolocationChecker";

const DMSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const BricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  weight: ["700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather Now",
  description: "Find out the weather in your city",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${DMSans.variable} ${BricolageGrotesque.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
