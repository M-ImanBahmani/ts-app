import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../Services/Products-services";
import ProductCard from "./Components/ProductCard";
import PageHeader from "../../global/PageHeader";
import { AlertCircle } from "lucide-react"; // یک آیکون برای نمایش ارور

function Products() {
  // گرفتن متغیرهای مدیریت ارور از ری‌اکت کوئری
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["Products-list"],
    queryFn: () => getProducts(),
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 transition-colors duration-300 dark:bg-slate-900">
      <PageHeader text="Discover Our Products" />

      {/* 1. مدیریت حالت لودینگ */}
      {isLoading && (
        <div className="mt-8 flex justify-center text-slate-500 dark:text-slate-400">
          Loading products...
        </div>
      )}

      {/* 2. مدیریت حالت ارور (قطعی اینترنت یا خطای سرور) */}
      {isError && (
        <div className="mx-auto mt-8 flex max-w-lg flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-900/10">
          <AlertCircle size={48} className="mb-4 text-red-500" />
          <h3 className="mb-2 text-xl font-bold text-red-700 dark:text-red-400">
            Oops! Something went wrong
          </h3>
          <p className="text-sm text-red-600/80 dark:text-red-400/80">
            {error instanceof Error
              ? error.message
              : "Failed to load products. Please try again later."}
          </p>
        </div>
      )}

      {/* 3. مدیریت حالت موفقیت‌آمیز (نمایش دیتا) */}
      {!isLoading && !isError && products && (
        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
