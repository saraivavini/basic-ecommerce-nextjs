type CartProduct = {
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

type CartTotals = {
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
}

export type Cart = {
  products: Array<CartProduct>;
  totals: CartTotals;
}
