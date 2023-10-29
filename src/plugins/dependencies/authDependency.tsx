import { signIn, signOut, useSession } from "next-auth/react";
import { useAuthOperations } from "../cache/tanstak-query.plugin/entities/useAuthOperations";
import { useEmployeesStore, useUIStore } from "@/stores";
import { userAuth } from "@/api";

export const useUserAuthentication = () =>
  useAuthOperations().authentication({
    useEmployeesStore,
    searchUser: userAuth.searchUser,
    useSession,
  });

export const useLogin = (fieldForm: string) =>
  useAuthOperations().login(fieldForm, {
    useUIStore,
    signIn,
    handleLogin: userAuth.handleLogin,
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
    registerUser:userAuth.registerUser
  });

export const useLogout = () =>
  useAuthOperations().logout({
    signOut,
    useSession
  });
