import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { IStaff } from "@/types";
import { bookstoreApi } from "@/api";
import axios from "axios";

const handleLogin = async (fieldForm: { [key: string]: string | undefined }): Promise<IStaff | null> => {
  const { email, username } = fieldForm;

  const formData = {
    username:username ? username : undefined,
    email
  }
  
  try {
    const { data } = await bookstoreApi.get(`/user/search-user`, {params: formData});
    return data

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }
  }

  return null
}

export const useUser = () => {

  const { data: session, status } = useSession();

  const isStaff = session?.user.role ? "staff" : "client"

  const formData = {
    email: session?.user.email ? (session?.user.email ) : undefined,
    username: session?.user.username ? session?.user.username  : undefined,
  }
  
  const user = useQuery({

    queryKey: [isStaff],

    enabled: !!session?.user?.email!,
    queryFn: async () => {

      if (status === 'authenticated') {
        const data = await handleLogin(formData)
        return data;
      }
      return null;
    }
  })


  return {
    user,
    status
  };
}