import React from "react";
import { cn } from "@/lib/utils";

export const Typography = {
  h1: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLHeadingElement>>) => (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLHeadingElement>>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLHeadingElement>>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLHeadingElement>>) => (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLParagraphElement>>) => (
    <p
      className={cn(
        "leading-relaxed text-lg [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    >
      {children}
    </p>
  ),
  a: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLAnchorElement>>) => (
    <a
      className={cn(
        "text-lg font-medium text-primary underline underline-offset-4",
        className
      )}
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLQuoteElement>>) => (
    <blockquote
      className={cn("text-lg mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    >
      {children}
    </blockquote>
  ),
  ul: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLUListElement>>) => (
    <ul
      className={cn(
        "text-lg list-disc pl-4 [&>li]:mb-2 [&>ul]:mt-2 [&>ul]:ml-4",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  ),
  li: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLLIElement>>) => (
    <li className={cn("text-lg mt-2", className)} {...props}>
      {children}
    </li>
  ),
  table: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLTableElement>>) => (
    <div className={cn("text-lg my-6 w-full overflow-y-auto", className)}>
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLTableSectionElement>>) => (
    <thead
      className={cn("text-lg my-6 w-full overflow-y-auto", className)}
      {...props}
    >
      {children}
    </thead>
  ),
  tbody: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLTableSectionElement>>) => (
    <tbody
      className={cn("text-lg my-6 w-full overflow-y-auto", className)}
      {...props}
    >
      {children}
    </tbody>
  ),
  tr: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLTableRowElement>>) => (
    <tr
      className={cn("text-lg m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    >
      {children}
    </tr>
  ),
  th: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLTableHeaderCellElement>>) => (
    <th
      className={cn(
        "text-lg border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLTableDataCellElement>>) => (
    <td
      className={cn(
        "text-lg border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    >
      {children}
    </td>
  ),
  ol: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLOListElement>>) => {
    const { type, ...olProps } = props; // Destructure to omit `type`
    return (
      <ol
        className={cn(
          "list-decimal my-6 ml-6 [&>li]:mt-2 [&>li::marker]:font-bold",
          className
        )}
        {...olProps} // Spread the rest of the props
      >
        {children}
      </ol>
    );
  },
  //   img: ({
  //     src,
  //     alt,
  //     ...props
  //   }: React.PropsWithChildren<React.ImgHTMLAttributes<HTMLImageElement>>) => (
  //     <img className="max-w-full h-auto" src={src} alt={alt} {...props} />
  //   ),
  code: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLElement>>) => (
    <code className={cn("text-lg bg-muted rounded p-1", className)} {...props}>
      {children}
    </code>
  ),
  pre: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLPreElement>>) => (
    <pre className={cn("bg-muted p-2 overflow-x-auto", className)} {...props}>
      {children}
    </pre>
  ),
  em: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLElement>>) => (
    <em className={cn("italic", className)} {...props}>
      {children}
    </em>
  ),
  strong: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLElement>>) => (
    <strong className={cn("font-bold", className)} {...props}>
      {children}
    </strong>
  ),
  hr: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<React.HTMLProps<HTMLHRElement>>) => (
    <hr className={cn("my-4 border-b-muted", className)} {...props} />
  ),

  // Add more custom components as needed
};
