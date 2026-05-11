import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

/**
 * Buika Elements — Sanity Studio
 *
 * Run with: npm run sanity:dev
 * Deploys to: sanity.io/manage (managed) or embed at /studio (self-hosted).
 *
 * Project ID + dataset are read from env so local dev and CI can point
 * at different datasets without code changes.
 */
export default defineConfig({
  name: "buika-elements",
  title: "Buika Elements",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Whitepapers & essays")
              .child(
                S.documentTypeList("whitepaper")
                  .title("Whitepapers & essays")
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
              ),
            S.listItem()
              .title("People")
              .child(S.documentTypeList("person").title("People")),
            S.divider(),
            S.listItem()
              .title("Leads (captured)")
              .child(
                S.documentTypeList("lead")
                  .title("Leads")
                  .defaultOrdering([{ field: "capturedAt", direction: "desc" }])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
