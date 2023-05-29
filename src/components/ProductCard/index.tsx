import React from 'react';
import { Product } from "@/models/Product"
import Image from 'next/image';

type ProductCardProps = {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-neutral-200 drop-shadow-sm mb-4 mr-4">
      <div className="flex-1">
        <Image src={product.image} alt={product.name} height={300} width={200} />
      </div>
      <div className="p-4 bg-white">
        <div className="flex justify-between">
          <p>{product.brand}</p>
          <p>{product.rate} / 5</p>
        </div>
        <p>{product.name}</p>
        <p>{product.price}</p>
      </div>
    </div>
  )
}
