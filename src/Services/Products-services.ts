import { DUMMY_BASE_URL } from "../Contstans";
import type { ProductTypes } from "../Types/Product";


// get Products for API

  export const getProducts = async (): Promise<ProductTypes[]> => {
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

// get Product for API

// export const getPostApi = async (id: number): Promise<Post> => {
//   const res = await fetch(`${DUMMY_BASE_URL}/posts/${id}`, {
//     method: "GET",
//   });
//   const data = await res.json();
//   if (res.ok) {
//     return data;
//   } else {
//     return Promise.reject(data.message);
//   }
// };


