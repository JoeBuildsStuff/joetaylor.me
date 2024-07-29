"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      <Link
        href="/"
        className="hidden sm:block text-2xl font-bold transition-colors hover:text-primary mr-4"
      >
        JoeTaylor.me
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4 lg:space-x-10">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
