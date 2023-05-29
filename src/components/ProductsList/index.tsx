import { Product } from "@/models/Product"
import ProductCard from "../ProductCard";
import PaginationController from "../PaginationController";

type ProductsListProps = {
  products: Product[];
  pages: number;
  currentPage: number;
  onPressItem: (item: Product) => void;
}

export default function ProductsList(props: ProductsListProps) {
  const { products, pages, currentPage } = props;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex px-6 mb-8 flex-wrap">
        {products.map(product => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
      <div>
        <PaginationController currentPage={currentPage} pages={pages} />
      </div>
    </div>
  )
}
