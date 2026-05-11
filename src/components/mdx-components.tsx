/**
 * MDX component map — passed to compileMDX so Markdown elements render
 * with Next.js-optimised components and project styling.
 */

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

export const mdxComponents = {
  img: ({ src, alt, width, height }: { src?: string; alt?: string; width?: number; height?: number }) => {
    if (!src) return null;
    // If explicit dimensions are provided, use next/image directly
    if (width && height) {
      return <Image src={src} alt={alt || ""} width={width} height={height} />;
    }
    // Fallback to unoptimised img for external or dimensionless images.
    // For markdown ![alt](path) syntax, authors should prefer JSX <Image src width height alt />.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt || ""} />;
  },
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    if (!href) return <>{children}</>;
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return <Link href={href as Route} className="prose-link">{children}</Link>;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="prose-link">
        {children}
      </a>
    );
  },
  // Headings, paragraphs, lists, blockquotes and hr are styled by .body * rules
  // in base.css. No component overrides needed — the cascade handles it.
};
