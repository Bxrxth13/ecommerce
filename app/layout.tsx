import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FreshMarket - Fresh Groceries Delivered",
  description: "Fresh produce, daily staples, and more delivered in minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} font-sans antialiased text-[#0D1B11] bg-[#F6F8F6]`}
      >
        <Header />
        <main className="min-h-screen pb-20 lg:pb-0">{children}</main>
        <MobileNav />
      </body>
    </html>
  );
}
