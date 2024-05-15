import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

//import shadcnui stuff

//import providers - theme/clerk/convex
import { Providers } from "@/components/providers";

//import custom stuff
import { MainNav } from "@/components/pages/layout/main-nav";
import { Footer } from "@/components/pages/layout/footer";
import { SiteHeader } from "@/components/pages/layout/site-header";

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
      <body className={cn("font-sans antialiased ", fontSans.variable)}>
        <div
          className={cn(
            "min-h-screen bg-background max-w-6xl mx-auto",
            fontSans.variable
          )}
        >
          <Providers>
            <SiteHeader />
            {children}
          </Providers>
        </div>
      </body>
      {/* <Footer /> */}
    </html>
  );
}
