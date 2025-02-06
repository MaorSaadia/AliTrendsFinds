import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden">
        {product.image && (
          <Image
            src={urlFor(product.image).url()}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-lg font-semibold text-gray-800">
          {product.title}
        </h3>

        {/* Price if available */}
        {product.price && (
          <p className="mb-4 text-xl font-bold text-red-500">
            ${product.price}
          </p>
        )}

        {/* Description if available */}
        {product.description && (
          <p className="mb-4 line-clamp-3 text-sm text-gray-600">
            {product.description}
          </p>
        )}

        {/* AliExpress Link */}
        <div className="mt-auto">
          <Link
            href={"#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-center font-medium text-white transition-all duration-300 hover:from-orange-600 hover:to-red-600"
          >
            View on AliExpress
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
