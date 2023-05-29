import { Product } from "@/models/Product";
import { ProductDetails } from "@/models/ProductDetails";
import Image from "next/image";
import Link from "next/link";

async function getProductDetails(id: string): Promise<ProductDetails> {
  const { products }: { products: Product[] } = require('../../../api/products.json');
  const { product }: { product: ProductDetails } = require('../../../api/product.json');

  const productDetails = products.find(product => String(product.id) === String(id));

  return {
    ...product,
    ...productDetails,
  }
}

type ProductPageProps = {
  params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const product = await getProductDetails(id);

  return (
    <div className="flex flex-row h-full p-4">
      <div className="w-1/3 h-full bg-neutral-200 flex items-center ">
        <Image src={product.image} alt={product.name} width={1000} height={1000} />
      </div>
      <div className="flex-1 ml-16">
        <h4 className="text-6xl mb-6">{product.name}</h4>
        <div className="flex mb-12 space-x-4">
          <p>{product.rate} <span className="text-slate-400">Stars </span></p>
          <p>{product.totalRatings} <span className="text-slate-400">Rating</span></p>
          <p>{product.totalSold} <span className="text-slate-400">Sold</span></p>
        </div>
        <div className="mb-12">
          <p className="text-4xl">$ {Number(product.price).toFixed(2)}</p>
        </div>
        <div>
          <p>
            {product.details}
          </p>
        </div>
        <div className="mt-20">
          <p className="mb-4">{product.availablePieces} pieces available</p>
          <Link href="/cart">
            <div className="bg-black px-8 py-4 rounded-full text-white w-fit">Add to Cart </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
