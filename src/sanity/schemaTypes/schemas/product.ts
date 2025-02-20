import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "Url",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "productCategory" }],
    }),
    defineField({
      name: "subcategory",
      title: "Subcategory",
      type: "reference",
      to: [{ type: "productSubcategory" }],
    }),
  ],
});
