import { signIn, signOut, useSession } from "next-auth/react";

import { useEmployeesStore, useUIStore } from "@/stores";

import { useAuthOperations } from "../cache/tanstak-query.plugin/entities/useAuthOperations";
import { httpAuthPlugin } from "../http/axios.plugin/entities/httpAuthPlugin";

export const useUserAuthentication = () =>
  useAuthOperations().authentication({
    useEmployeesStore,
    findUserByEmailOrUsername: httpAuthPlugin().findUserByEmailOrUsername,
    useSession,
  });

export const useLogin = (fieldForm: string) =>
  useAuthOperations().login(fieldForm, {
    useUIStore,
    signIn,
    handleLogin: httpAuthPlugin().handleLogin,
  });

export const useLoginWithProvider = () =>
  useAuthOperations().loginWithProvider({
    useUIStore,
    signIn,
  });

export const useRegisterUser = () =>
  useAuthOperations().registerUser({
    useUIStore,
    signIn,
    registerUser: httpAuthPlugin().registerUser,
  });

export const useLogout = () =>
  useAuthOperations().logout({
    signOut,
    useSession,
  });
