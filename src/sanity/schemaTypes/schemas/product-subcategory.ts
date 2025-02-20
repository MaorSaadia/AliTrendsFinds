import { defineField, defineType } from "sanity";

export const productSubcategory = defineType({
  name: "productSubcategory",
  title: "Product Subcategory",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "parentCategory",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "productCategory" }],
    }),
  ],
});
