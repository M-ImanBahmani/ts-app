import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DsButton from "../../../design-system/DsButton";

export default function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 transition-colors duration-300 dark:bg-slate-900">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
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
          <p className="max-w-sm text-gray-500 dark:text-gray-400">
            Looks like you haven't added anything to your cart yet. Discover our
            latest products and find what you love!
          </p>
        </div>
        <DsButton
          text="Start Shopping"
          icon={<ShoppingCart size={18} />}
          color="blue"
          className="mt-4 rounded-xl px-6 py-3 font-semibold shadow-lg shadow-blue-500/20"
          onClick={() => navigate("/app/products")}
        />
      </div>
    </div>
  );
}
