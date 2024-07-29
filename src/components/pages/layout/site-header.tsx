import Link from "next/link";

import { MainNav } from "@/components/pages/layout/main-nav";
// import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/ui/mode-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between">
        <MainNav />
        {/* <MobileNav /> */}
        <div className="flex items-center space-x-2 md:space-x-10">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
