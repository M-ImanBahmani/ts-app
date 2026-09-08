import { useNavigate } from "react-router-dom";
import PageHeader from "../../global/PageHeader";
import { DUMMY_BASE_URL } from "../../Contstans";
import { useEffect } from "react";
import { useProductStore } from "../../Stores/Products.store";
import { ShoppingCart, Star, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "../../Stores/Cart.store";
import DsButton from "../../design-system/DsButton";

function Products() {
  const navigate = useNavigate();
  const { products, setProduct } = useProductStore();
  const { addToCart, decreaseQuantity, cartItems } = useCartStore();

  const getProducts = async () => {
    const res = await fetch(`${DUMMY_BASE_URL}/products`, {
      method: "GET",
    });
    const data = await res.json();
    if (res.ok) {
      return data.products;
    } else {
      return Promise.reject(data.message);
    }
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const data = await getProducts();
        setProduct(data);
      } catch (error) {
        console.log("get Products failed:", error);
        // handleLogout();
      }
    };
    if (!sessionStorage.getItem("token")) {
      console.log("useEffect is run");
      sessionStorage.removeItem("token");
      navigate("/login");
      return;
    } else {
      // if (!sessionStorage.getItem("products")) { کدی که خودم اشتباه نوشتم و هوش مصنوعی بهم یاد داد که باید چجوری بنویسم
      //   fetchProductsData();
      // }
      if (products.length === 0) {
        fetchProductsData();
      }
    }
  }, []);

  // const handleLogout = () => {
  //   sessionStorage.removeItem("token");
  //   navigate("/login");
  // };
  return (
    <div className="min-h-screen bg-gray-50 p-6 transition-colors duration-300 dark:bg-slate-900">
      <PageHeader text="Discover Our Products" />

      {/* گرید ریسپانسیو برای مانیتور، تبلت و موبایل */}
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
          const quantity = cartItem?.quantity || 0;

          return (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
            >
              {/* بخش تصویر محصول با افکت زوم */}
              <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-slate-700/50">
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  {product.discountPercentage}% OFF
                </span>
              </div>

              {/* مشخصات محصول */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-blue-500 dark:text-blue-400">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="fill-current" size={14} />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <h3 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900 dark:text-white">
                  {product.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>

                {/* UI دکمه‌ها با استفاده از DsButton */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                  <span className="text-xl font-black text-gray-900 dark:text-white">
                    ${product.price}
                  </span>

                  {quantity === 0 ? (
                    <DsButton
                      text="Add"
                      icon={<ShoppingCart size={16} />}
                      color="blue"
                      className="rounded-xl px-4 py-2 font-semibold"
                      onClick={() => addToCart(product)}
                    />
                  ) : (
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-600 dark:bg-slate-700">
                      <DsButton
                        icon={
                          quantity === 1 ? (
                            <Trash2 size={16} />
                          ) : (
                            <Minus size={16} />
                          )
                        }
                        color="red"
                        size="sm"
                        justIcon
                        onClick={() => decreaseQuantity(product.id)}
                      />
                      <span className="w-6 text-center font-bold text-gray-900 dark:text-white">
                        {quantity}
                      </span>
                      <DsButton
                        icon={<Plus size={16} />}
                        color="blue"
                        size="sm"
                        justIcon
                        onClick={() => addToCart(product)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Products;
