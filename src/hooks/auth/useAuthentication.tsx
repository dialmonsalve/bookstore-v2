import { userAuth } from "@/helpers";
import { IClient, IStaff } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { signIn, signOut, useSession } from "next-auth/react";

export const useLogin = () => {
  const [showError, setShowError] = useState(false);
  const [errorApiMessage, setErrorApiMessage] = useState('');

  const queryClient = useQueryClient();

  const { mutate: loginClient, isLoading, } = useMutation({
    mutationFn: ({ email, password }: IClient) => userAuth.handleLoginCLient({
      email, password, name: ''
    }),
    onSuccess: async ({ hasError, message, client }, { email, password }) => {

      if (hasError) {
        setShowError(true);
        setErrorApiMessage(message!)
        setTimeout(() => setShowError(false), 3000);
        return;
      }
      queryClient.setQueriesData(["user"], client);
      await signIn('credentials', { email, password });
    }
  })

  return {
    loginClient,
    isLoading,
    showError,
    errorApiMessage,
    setShowError
  }
}








export const useStaffLogin = () => {
  const [showError, setShowError] = useState(false);
  const [errorApiMessage, setErrorApiMessage] = useState('');

  const queryClient = useQueryClient();

  const { mutate: loginStaff, isLoading, } = useMutation({
    mutationFn: ({ username, password }: IStaff) => userAuth.handleLoginStaff({
      username, password,
    }),
    onSuccess: async ({ hasError, message, staff }, { username, password }) => {

      if (hasError) {
        setShowError(true);
        setErrorApiMessage(message!)
        setTimeout(() => setShowError(false), 3000);
        return;
      }
      queryClient.setQueriesData(["staff"], staff);
      await signIn('credentials', { username, password });
    }
  })

  return {
    loginStaff,
    isLoading,
    showError,
    errorApiMessage,
    setShowError
  }
}







export const useRegisterUser = () => {

  const [showError, setShowError] = useState(false);
  const [errorApiMessage, setErrorApiMessage] = useState('');

  const queryClient = useQueryClient();


  const { mutate: registerClient, isLoading } = useMutation({
    mutationFn: ({ email, password, name }: IClient) => userAuth.registerUser({
      email, password, name
    }),
    onSuccess: async ({ hasError, message, client }, { email, password }) => {


      if (hasError) {
        setShowError(true);
        setErrorApiMessage(message!)
        setTimeout(() => setShowError(false), 3000);
        return;
      }
      queryClient.setQueriesData(["user"], client);
      await signIn('credentials', { email, password });
    }
  })

  return {
    errorApiMessage,
    showError,
    isLoading,
    registerClient,
    setShowError
  }
}

export const useOAuthClient = () => {

  const { mutate: loginProvider } = useMutation({
    mutationFn: async (providerId: string) => await signIn(providerId)
  })

  return {
    loginProvider
  }
}

export const useUser = () => {

  const { data: session, status } = useSession();
  const { data: client } = useQuery({
    queryKey: ['user'],
    enabled: !!session?.user?.email!,
    queryFn: async () => {

      if (status === 'authenticated') {
        return session?.user
      }
      return null;
    }
  })

  return {
    client,
    status,
    session
  }
}

export const useLogOut = () => {

  const queryClient = useQueryClient()

  const { mutate: logOut, isLoading } = useMutation({
    mutationFn: async () => await signOut(),
    onSuccess: () => {
      queryClient.removeQueries();
    }
  })

  return {
    logOut,
    isLoading
  }
}


