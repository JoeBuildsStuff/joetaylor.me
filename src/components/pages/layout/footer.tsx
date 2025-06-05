import Link from "next/link";
import { Globe, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t mt-12 py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Joe Taylor
        </p>
        <div className="flex space-x-6">
          <Link
            href="https://www.joe-taylor.me/"
            prefetch={false}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website"
            className="hover:text-primary"
          >
            <Globe className="h-5 w-5" />
          </Link>
          <Link
            href="https://medium.com/@learningsomethingnew"
            prefetch={false}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
            className="hover:text-primary"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-5 w-5"
            >
              <title>Medium</title>
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
          </Link>
          <Link
            href="https://www.linkedin.com/in/joesephataylor/"
            prefetch={false}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="https://twitter.com/JoeTaylor_86753"
            prefetch={false}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-primary"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-5 w-5"
            >
              <title>X</title>
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
