import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/lib/fonts/icofonts.css";
import "./globals.scss";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "E-commerce project",
  description:
    "Come, look for, choose, filter products in any order. This allows the E-Commerce Project. Choose the category to your liking and browse the description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen font-sans text-dark-6 background-elem antialiased custom-scrollbar",
          fontSans.variable
        )}
      >
        <div className="wrapper">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
