/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const imageUrl = product.image ? urlFor(product.image).url() : "";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image Container */}
      <Link
        href={product.url ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-square w-full overflow-hidden bg-gray-50"
      >
        {product.image && (
          <img
            src={imageUrl}
            alt={product.title || ""}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        )}
      </Link>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-4 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-gray-800 sm:text-base">
          {product.title}
        </h3>

        <Link
          href={product.url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:from-orange-600 hover:to-red-600"
        >
          View on AliExpress
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
