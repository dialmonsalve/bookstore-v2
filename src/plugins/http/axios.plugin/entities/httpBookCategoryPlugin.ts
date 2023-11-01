import axios from "axios";

import { ICategory } from "@/types";

export const httpBookCategoryPlugin = ()=>{
  const bookCategoryApi =  axios.create({
    baseURL: "http://localhost:3000/api/categories",
  })

  //! Get all categories
  async function get(): Promise<ICategory[] | null> {
    try {
      const { data } = await bookCategoryApi.get<ICategory[]>("");
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data.message);
    }
  }

  //! Create a category
  async function create(name: string, username?: string): Promise<ICategory | null> {
    if (!username) {
      throw new Error("Usuario no autorizado para esta acción");
    }

    try {
      const { data } = await bookCategoryApi.post("", {
        name,
        username,
      });

      return data;
    } catch (error: any) {
      throw new Error(error.response?.data.message);
    }
  }

  return {
    get,
    create
  }
};
