import CurrencyHandler from "@/helpers/CurrencyHandler";
import { Cart } from "@/models/Cart";
import Image from "next/image";

async function getCart() {
  const { cart }: { cart: Cart } = require('../../api/cart.json');

  return cart;
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th className="px-6 py-8">
      {children}
    </th>
  )
}

export default async function CartPage() {
  const { products, totals } = await getCart();

  return (
    <div className="p-8">
      <table className="table-auto w-full text-center">
        <thead className="bg-emerald-400">
          <tr>
            <Th></Th>
            <Th>Product</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Total</Th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.name} className="border-t">
              <td>
                <Image src={product.image} width={120} height={120} alt={product.name} />
              </td>
              <td>
                {product.name}
              </td>
              <td>
                {CurrencyHandler.toCurrency(product.price)}
              </td>
              <td>
                {product.quantity}
              </td>
              <td>
                {CurrencyHandler.toCurrency(product.quantity * product.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div className="border p-8 w-fit">
          <h6 className="mb-6 text-xl">CART TOTALS</h6>
          <table className="table-auto text-lg">
            <tbody>
              <tr>
                <td className="pb-2 pr-12">
                  Subtotal
                </td>
                <td className="pb-2">
                  {CurrencyHandler.toCurrency(totals.subtotal)}
                </td>
              </tr>
              <tr>
                <td className="pb-2">Delivery</td>
                <td className="pb-2">{CurrencyHandler.toCurrency(totals.delivery)}</td>
              </tr>
              <tr>
                <td className="pb-4">Discount</td>
                <td className="pb-4">{CurrencyHandler.toCurrency(totals.discount)}</td>
              </tr>
              <tr className="border-t">
                <td>TOTAL</td>
                <td>{CurrencyHandler.toCurrency(totals.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="bg-emerald-600 text-white rounded-full px-8 py-4 w-[260px] mt-8">Proceed to Checkout</button>
      </div>

    </div>
  )
}
