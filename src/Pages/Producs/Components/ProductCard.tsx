import { Minus, Plus, ShoppingCart, Star, Trash2 } from "lucide-react";
import DsButton from "../../../design-system/DsButton";
import type { ProductTypes } from "../../../Types/Product";
import { useCartStore } from "../../../Stores/Cart.store";

function ProductCard({ product }: { product: ProductTypes }) {
  const { addToCart, decreaseQuantity, cartItems } = useCartStore();
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div
      key={product.id}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 hover:ring-blue-100 dark:bg-slate-800/80 dark:ring-slate-700/50 dark:hover:shadow-blue-900/20 dark:hover:ring-blue-900/50"
    >
      {/* بخش تصویر محصول به صورت باکس داخلی (Inner Box) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* بج تخفیف - گوشه چپ */}
        <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-red-500 to-rose-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
          {product.discountPercentage}% OFF
        </div>

        {/* بج امتیاز - شناور پایین تصویر */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-md dark:bg-slate-900/90 dark:text-slate-100">
          <Star className="fill-amber-400 text-amber-400" size={14} />
          {product.rating}
        </div>
      </div>

      {/* مشخصات محصول */}
      <div className="flex flex-1 flex-col px-3 pt-5 pb-2">
        <span className="mb-2 w-fit rounded-lg bg-blue-50/50 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          {product.category}
        </span>

        <h3 className="mb-1.5 line-clamp-1 text-lg font-extrabold text-slate-900 dark:text-white">
          {product.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {product.description}
        </p>

        {/* قیمت و دکمه‌ها - طراحی جدید یکپارچه */}
        <div className="mt-auto flex items-center justify-between pt-6">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              ${product.price}
            </span>
          </div>

          {quantity === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white transition-all hover:scale-105 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <ShoppingCart size={20} />
            </button>
          ) : (
            <div className="flex h-12 items-center gap-3 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-700">
              <button
                onClick={() => decreaseQuantity(product.id)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-rose-500 shadow-sm transition-transform active:scale-90 dark:bg-slate-800"
              >
                {quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
              </button>
              <span className="w-5 text-center font-bold text-slate-900 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => addToCart(product)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm transition-transform active:scale-90 dark:bg-slate-800 dark:text-blue-400"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
