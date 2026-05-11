import { readFile } from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export default async function TestMdxPage() {
  const source = await readFile(
    "src/content/whitepapers/csrd-european-workwear-asia/en.mdx",
    "utf-8"
  );

  try {
    const { content } = await compileMDX({
      source,
      options: { parseFrontmatter: false },
    });

    return (
      <main className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <h1 className="h1" style={{ marginBottom: 48 }}>MDX Test Route</h1>
        <div className="body">{content}</div>
      </main>
    );
  } catch {
    notFound();
  }
}
