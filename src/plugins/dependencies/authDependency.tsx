import { signIn, signOut, useSession } from "next-auth/react";
import { useAuth } from "../cache/tanstak-query.plugin/entities/useAuth";
import { useEmployeesStore, useUIStore } from "@/stores";
import { userAuth } from "@/api";

export const useUserAuthentication = () =>
  useAuth().auth({
    useEmployeesStore,
    searchUser: userAuth.searchUser,
    useSession,
  });

export const useLogin = (fieldForm: string) =>
  useAuth().login(fieldForm, {
    useUIStore,
    signIn,
    handleLogin: userAuth.handleLogin,
  });

export const useLoginWithProvider = () =>
  useAuth().loginWithProvider({
    useUIStore,
    signIn,
  });

export const useRegisterUser = () =>
  useAuth().registerUser({
    useUIStore,
    signIn,
    registerUser:userAuth.registerUser
  });

export const useLogout = () =>
  useAuth().logout({
    signOut,
    useSession
  });
