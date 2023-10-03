import { userApi } from "@/api/bookstoreApi";

import { IClient, IEmployee, TypeRole } from "@/types";

interface Admin {
  adminRole: TypeRole[] | undefined;
  userAdmin: string | undefined;
}

export async function registerUser(
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
    const { data } = await userApi.post<IEmployee>(`/register-${endpoint}`, {
      ...employee,
      ...admin,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
}

export async function handleLogin(fieldForm: {
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
    const { data } = await userApi.post(`/login`, formData);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
}

export async function searchUser(): Promise<IEmployee | null> {
  try {
    const { data } = await userApi.get(`/search-user`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
}
