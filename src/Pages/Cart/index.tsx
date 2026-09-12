import PageHeader from "../../global/PageHeader";
import { useCartStore } from "../../Stores/Cart.store";
import ProductCard from "../Producs/Components/ProductCard";
import EmptyCart from "./Components/EmptyCart";

function Cart() {
  const { cartItems } = useCartStore();

  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <>
      <PageHeader text="Cart" />
      <div className="min-h-screen bg-gray-50 p-6 transition-colors duration-300 dark:bg-slate-900">
        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cartItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </>
  );
}
export default Cart;
