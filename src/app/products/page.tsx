import React from 'react';
import { Product } from '@/models/Product';
import ProductsList from '@/components/ProductsList';
import ProductSelectOrder from '@/components/ProductSelectOrder';
import ProductFilter from '@/components/ProductFilter';

type Sort = {
  sortBy: 'price';
  order: 'ASC' | 'DESC';
}

type Filter = {
  priceMin?: string;
  priceMax?: string;
  color?: string;
}

type PaginatedProducts = {
  total: number;
  pages: number;
  page: number;
  items: Product[];
};

async function getAvailableColors() {
  const res: { products: Product[] } = require('../../api/products.json');

  const productColors = res.products.map(product => product.color);

  return Array.from(new Set(productColors).values());
}

async function getProducts(page: string = '1', sort?: Sort, filter?: Filter): Promise<PaginatedProducts> {
  const res: { products: Product[] } = require('../../api/products.json');

  let products = res.products;

  if (sort) {
    products = products.sort((productA, productB) => {
      const valueA = productA[sort.sortBy];
      const valueB = productB[sort.sortBy];

      if (valueA < valueB) {
        return sort.order === 'ASC' ? -1 : 1;
      }

      if (valueA > valueB) {
        return sort.order === 'ASC' ? 1 : -1;
      }

      return 0
    });
  }

  if (filter) {
    products = products.filter((product) => {
      const isBetweenPriceRange = filter.priceMin && filter.priceMax ?
        product.price >= Number(filter.priceMin) && product.price <= Number(filter.priceMax)
        : true;

      const isTheSameColor = filter.color ? product.color === filter.color : true;

      return isBetweenPriceRange && isTheSameColor;
    });
  }

  const pageSize = 10;
  const startIndex = (Number(page) - 1) * pageSize;

  products = products.slice(startIndex, startIndex + pageSize);

  return {
    total: products.length,
    pages: Math.ceil(products.length / pageSize),
    page: Number(page),
    items: products,
  }
}

type ProductsPageProps = {
  searchParams: { [key: string]: string | undefined };
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { page = '1', sortBy = 'price', order = 'ASC', priceMin, priceMax, color } = searchParams;
  const sort = { sortBy, order } as Sort;
  const filter: Filter = {
    priceMin,
    priceMax,
    color
  }
  const { items: products, pages, total } = await getProducts(page, sort, filter);
  const availableColors = await getAvailableColors();

  console.log({ pages, total });

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col justify-center items-center mt-6 mb-8">
        <p className="font-bold text-3xl mb-8" >Products</p>
        <p className="font-base">Check our latest products, we have the most modern products in the market</p>
      </div>
      <div className="flex justify-end mb-8 items-end px-6">
        <ProductSelectOrder sort={sort} />
        <ProductFilter availableColors={availableColors} />
      </div>
      <ProductsList
        products={products}
        pages={pages}
        currentPage={Number(page)}
        onPressItem={() => { }}
      />
    </div>
  )
}
