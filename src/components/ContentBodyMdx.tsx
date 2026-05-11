import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "./mdx-components";

/**
 * ContentBodyMdx — server component that compiles MDX source into JSX.
 *
 * Use this in RSC pages when body.kind === "mdx". The compiled output is
 * plain JSX that hydrates correctly without a client component wrapper.
 *
 * parseFrontmatter is false because meta.json is the single source of truth
 * for structured fields (title, abstract, topic, etc.). MDX files contain
 * only the prose body; frontmatter would create a second authority.
 */

export async function ContentBodyMdx({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: false },
    components: mdxComponents,
  });

  return <div className="body">{content}</div>;
}
