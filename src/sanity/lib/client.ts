// sanity/lib/client.ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";
import { sanityFetch } from "@/sanity/lib/live";
import { Product, ProductCategory, ProductSubcategory } from "@/sanity.types";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const getAllProducts = async () => {
  const query = `*[_type == "product"]{
    ...,
    category->,
    subcategory->
  }`;
  const products = await sanityFetch({ query: query });
  return products.data as Product[];
};

export const getAllCategories = async () => {
  const query = `*[_type == "productCategory"]{
    ...,
    "subcategories": *[_type == "productSubcategory" && references(^._id)]
  }`;
  const categories = await sanityFetch({ query: query });
  return categories.data as (ProductCategory & {
    subcategories: ProductSubcategory[];
  })[];
};

export const getAllSubcategories = async () => {
  const query = `*[_type == "productSubcategory"]{
    ...,
    parentCategory->
  }`;
  const subcategories = await sanityFetch({ query: query });
  return subcategories.data as ProductSubcategory[];
};

export const getCategoryBySlug = async (slug: string) => {
  const query = `*[_type == "productCategory" && slug.current == $slug][0]{
    ...,
    "subcategories": *[_type == "productSubcategory" && references(^._id)]
  }`;
  const category = await sanityFetch({ query: query, params: { slug } });
  return category.data as ProductCategory & {
    subcategories: ProductSubcategory[];
  };
};

export const getSubcategoryBySlug = async (
  categorySlug: string,
  subcategorySlug: string
) => {
  const query = `*[_type == "productSubcategory" && 
    slug.current == $subcategorySlug && 
    references(*[_type == "productCategory" && slug.current == $categorySlug]._id)
  ][0]`;
  const subcategory = await sanityFetch({
    query: query,
    params: { categorySlug, subcategorySlug },
  });
  return subcategory.data as ProductSubcategory;
};

export const getProductsByCategorySlug = async (
  slug: string,
  subcategorySlug?: string | undefined
) => {
  let query;
  const params: { slug: string; subcategorySlug?: string } = { slug };

  if (subcategorySlug) {
    query = `*[_type == "product" && 
      references(*[_type == "productCategory" && slug.current == $slug]._id) &&
      references(*[_type == "productSubcategory" && slug.current == $subcategorySlug]._id)
    ]{
      ...,
      category->,
      subcategory->
    }`;
    params.subcategorySlug = subcategorySlug;
  } else {
    query = `*[_type == "product" && references(*[_type == "productCategory" && slug.current == $slug]._id)]{
      ...,
      category->,
      subcategory->
    }`;
  }

  const products = await sanityFetch({
    query: query,
    params: params,
  });
  return products.data as Product[];
};

export const getProductById = async (id: string) => {
  const query = `*[_type == "product" && _id == $id][0]{
    ...,
    category->,
    subcategory->
  }`;
  const product = await sanityFetch({ query: query, params: { id } });
  return product.data as Product;
};

export const searchProducts = async (searchQuery: string) => {
  const query = `*[_type == "product" && (
    title match "*" + $searchQuery + "*" ||
    description match "*" + $searchQuery + "*" ||
    category->title match "*" + $searchQuery + "*" ||
    subcategory->title match "*" + $searchQuery + "*"
  )]{
    ...,
    category->,
    subcategory->
  }`;

  const products = await sanityFetch({ query: query, params: { searchQuery } });
  return products.data as Product[];
};
