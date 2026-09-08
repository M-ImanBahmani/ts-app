import { create } from "zustand";
import type { ProductTypes } from "../Types/Product";

type ProductStore = {
  products: ProductTypes[];
  setProduct: (data: ProductTypes[]) => void;
};

export const useProductStore = create<ProductStore>()((set) => ({
  products: [],

  setProduct: (data) => {
    set(() => ({ products: data }));
  },
}));
