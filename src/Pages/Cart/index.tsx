import { ShoppingCart } from "lucide-react";
import DsButton from "../../design-system/DsButton";
import PageHeader from "../../global/PageHeader";
import { useCartStore } from "../../Stores/Cart.store";
import ProductCard from "../Producs/Components/ProductCard";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems } = useCartStore();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 transition-colors duration-300 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-white p-12 text-center shadow-sm dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
            <ShoppingCart
              size={48}
              className="text-slate-400 dark:text-slate-500"
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              Looks like you haven't added anything to your cart yet. Discover
              our latest products and find what you love!
            </p>
          </div>
          <DsButton
            text="Start Shopping"
            icon={<ShoppingCart size={18} />}
            color="blue"
            className="rounded-xl px-6 py-3 font-semibold mt-4 shadow-lg shadow-blue-500/20"
            onClick={() => navigate("/app/products")}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader text="Cart" />
      <div className="min-h-screen bg-gray-50 p-6 transition-colors duration-300 dark:bg-slate-900">
        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cartItems.map((item) => {
            return <ProductCard key={item.id} product={item} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Cart;
