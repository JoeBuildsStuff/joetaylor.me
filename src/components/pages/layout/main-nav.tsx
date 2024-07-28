import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-10", className)}
      {...props}
    >
      <Link
        href="/"
        className="mr-12 text-2xl font-bold transition-colors hover:text-primary"
      >
        JoeTaylor.me
      </Link>
      <Link
        href="/"
        className="font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/blog"
        className="font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Blog
      </Link>
      <Link
        href="/projects"
        className="font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Projects
      </Link>
      <Link
        href="/resume"
        className="font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Resume
      </Link>
    </nav>
  );
}
