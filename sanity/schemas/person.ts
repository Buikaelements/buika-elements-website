import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons";

/**
 * Person — author & team bios.
 * Referenced by whitepaper.author. Kept minimal on purpose; this is a
 * one-author firm today and shouldn't grow a staff-directory schema.
 */
export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "e.g. 'Founder', 'Production Director'.",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "text", rows: 3 }),
        defineField({ name: "es", title: "Español", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "avatar" },
  },
});
