import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

//import clerk stuff
import { ClerkProvider } from "@clerk/nextjs";

//import shadcnui stuff

//import providers - theme/clerk/convex
import { Providers } from "@/components/providers";

//import custom stuff
import { NavBar } from "@/components/pages/layout/nav-bar";
import { Footer } from "@/components/pages/layout/footer";

export const metadata: Metadata = {
  title: "Joe Taylor",
  description: "Joe Taylor's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-6xl mx-auto",
          fontSans.variable
        )}
      >
        <Providers>
          <NavBar currentTheme="light" />
          {children}
        </Providers>
      </body>
      {/* <Footer /> */}
    </html>
  );
}
