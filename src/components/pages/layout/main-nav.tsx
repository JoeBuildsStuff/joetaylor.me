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
      className={cn(
        "flex flex-row grow w-full items-center justify-between mr-4",
        className
      )}
      {...props}
    >
      <Link
        href="/"
        className="hidden sm:block text-2xl font-bold transition-colors hover:text-primary mr-4"
      >
        Joe-Taylor.me
      </Link>

      {/* Desktop Navigation */}
      {/* <div className="hidden md:flex items-center space-x-4 lg:space-x-10">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
      </div> */}

      {/* Mobile Navigation */}
      {/* <div className="md:hidden">
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
      </div> */}

      <div className="flex flex-1 items-center space-x-2 justify-end">
        <nav className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button asChild variant="ghost" size="icon" className="h-9 w-9">
              <Link
                href="https://github.com/joeBlockchain"
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  className="dark:fill-white"
                  width="18"
                  height="18"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-9 w-9">
              <Link
                href="https://twitter.com/JoeTaylor_86753"
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  className="dark:fill-white"
                  width="15"
                  height="15"
                >
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-9 w-9">
              <Link
                href="https://medium.com/@learningsomethingnew"
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  className="dark:fill-white v"
                  width="17"
                  height="17"
                >
                  <title>Medium</title>
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </nav>
  );
}
