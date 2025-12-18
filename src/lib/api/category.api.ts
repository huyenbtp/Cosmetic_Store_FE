import { ICategory } from "@/interfaces/category.interface";
import axios from "@/lib/axios";

const categoryApi = {
  fetchAllCategories: async (): Promise<ICategory[]> => {
    return axios.get("/categories");
  },
}

export default categoryApi;