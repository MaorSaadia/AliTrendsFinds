import { product } from "@/sanity/schemaTypes/schemas/product";
import { productCategory } from "@/sanity/schemaTypes/schemas/product-category";
import { productSubcategory } from "@/sanity/schemaTypes/schemas/product-subcategory";
import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productCategory, productSubcategory, product],
};
