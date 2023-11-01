import axios from "axios";

import { URL_CONSTANTS } from "@/constants";

import { IBook } from "@/types";
import { DataBooks } from "@/plugins/interfaces";

export const httpBookPlugin = ()=>{
  const bookApi = axios.create({
    baseURL: "http://localhost:3000/api/books",
  })

  // ! get all books
  async function get(page: number): Promise<DataBooks | null> {
    const params = new URLSearchParams();

    params.append("page", page?.toString());
    params.append("limit", `${URL_CONSTANTS.limit}`);

    try {
      const { data } = await bookApi.get<DataBooks>("", { params });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data.message);
    }
  }

  //! Create book
  async function create(book: IBook, username: string): Promise<IBook | null> {
    if (!username) {
      throw new Error("Usuario no autorizado para esta acción");
    }
    try {
      const { data } = await bookApi.post("", { book, username });

      return data;
    } catch (error: any) {
      throw new Error(error.response?.data.message);
    }
  }

  //! Get book by ISBN
  async function getByISBN(isbn: string): Promise<IBook | null> {
    try {
      const { data } = await bookApi.get<IBook | null>(`/${isbn}`);
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data.message);
    }
  }

  // ! Update book
  async function update() {
    throw new Error("Function isn't implemented");
  }

  // ! Delete book
  async function remove() {
    throw new Error("Function isn't implemented");
  }

  return {
    get,
    create,
    getByISBN,
    update,
    remove
  }
};
