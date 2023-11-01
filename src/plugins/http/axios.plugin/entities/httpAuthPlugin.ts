import { Admin } from "@/plugins/interfaces";
import { IClient, IEmployee } from "@/types";
import axios from "axios";

export const httpAuthPlugin = () => {
  const authApi = axios.create({
    baseURL: "http://localhost:3000/api/auth",
  });

  //! Create client or employee
  async function registerUser(
    employee: IEmployee | IClient,
    admin: Admin | null,
    isClient: boolean
  ): Promise<IEmployee | IClient | null> {
    const endpoint = isClient ? "client" : "employee";

    if (!isClient) {
      const isAdmin = admin?.adminRole?.includes("admin");

      if (!isAdmin) {
        throw new Error("Usuario no autorizado para esta acción");
      }
    }

    try {
      const { data } = await authApi.post<IEmployee>(`/register-${endpoint}`, {
        ...employee,
        ...admin,
      });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data.message);
    }
  }

  async function handleLogin(fieldForm: {
    [key: string]: string;
    password: string;
  }): Promise<IEmployee | IClient | null> {
    const { email, password, username } = fieldForm;

    const formData = {
      email: !username ? email || "" : "",
      username: username ? username || "" : "",
      password,
    };

    try {
      const { data } = await authApi.post(`/login`, formData);

      return data;
    } catch (error: any) {
      throw new Error(error.response?.data.message);
    }
  }

  async function findUserByEmailOrUsername(): Promise<IEmployee | null> {
    try {
      const { data } = await authApi.get(`/search-user`);

      return data;
    } catch (error: any) {
      throw new Error(error.response?.data.message);
    }
  }

  return {
    registerUser,
    handleLogin,
    findUserByEmailOrUsername,
  };
};
