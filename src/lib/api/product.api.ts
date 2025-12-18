import { IMinMaxFilterData, IProduct, IProductDetail } from "@/interfaces/product.interface";
import axios from "@/lib/axios";

export type ProductKey = "name" | "sku" | "category" | "brand";
export type ProductStatus = "published" | "unpublished";

export interface FetchProductsParams {
  page?: number;
  limit?: number;
  q?: string;
  by?: "name" | "sku" | "category" | "brand";
  minStock?: number;
  maxStock?: number;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus;
}

export interface ProductPayload {
  sku?: string;
  name: string;
  category_id: string;
  brand_id: string;
  selling_price: number;
  description?: string;
  status?: ProductStatus;
  image?: File | null;
}

const productApi = {
  fetchProducts: async (params: FetchProductsParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/products", { params });
  },

  fetchProductStats: async (): Promise<IMinMaxFilterData> => {
    return axios.get("/products/stats");
  },

  fetchProductById: async (id: string): Promise<IProductDetail> => {
    return axios.get(`/products/${id}`);
  },

  createProduct: async (payload: ProductPayload): Promise<IProduct> => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "image" && value instanceof File) {
        formData.append("image", value);
      } else {
        formData.append(key, value as any);
      }
    });

    return axios.post("/products", formData);
  },

  updateProduct: async (id: string, payload: ProductPayload): Promise<IProduct> => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined) return;

      if (key === "image") {
        if (value === null) {
          formData.append("image", "null"); // xóa ảnh
        } else if (value instanceof File) {
          formData.append("image", value);  // thêm ảnh mới
        }
        return;
      }

      formData.append(key, value as any);
    });

    return axios.put(`/products/${id}`, formData);
  },

  updateStatus: async (id: string, status: ProductStatus): Promise<IProduct> => {
  return axios.patch(`/products/${id}/status`, { status });
  },

  deleteProduct: async (id: string) => {
    return axios.delete(`/products/${id}`);
  },
}

export default productApi;