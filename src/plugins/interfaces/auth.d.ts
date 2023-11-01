import {
  BuiltInProviderType,
  RedirectableProviderType,
} from "next-auth/providers/index";
import { IClient, IEmployee, TypeRole } from "@/types";
import {
  LiteralUnion,
  SessionContextValue,
  SignInAuthorizationParams,
  SignInOptions,
  SignInResponse,
  SignOutParams,
  SignOutResponse,
  UseSessionOptions,
} from "next-auth/react";
import { EmployeesStore, UIStore } from ".";

export interface RegisterUser {
  useUIStore: UIStore;
  signIn<P extends RedirectableProviderType | undefined = undefined>(
    provider?: LiteralUnion<
      P extends RedirectableProviderType
        ? P | BuiltInProviderType
        : BuiltInProviderType
    >,
    options?: SignInOptions,
    authorizationParams?: SignInAuthorizationParams
  ): Promise<
    P extends RedirectableProviderType ? SignInResponse | undefined : undefined
  >;
  registerUser: (
    employee: IEmployee | IClient,
    admin: Admin | null,
    isClient: boolean
  ) => Promise<IEmployee | IClient | null>;
}

export interface LoginUser {
  useUIStore: UIStore;
  signIn<P extends RedirectableProviderType | undefined = undefined>(
    provider?: LiteralUnion<
      P extends RedirectableProviderType
        ? P | BuiltInProviderType
        : BuiltInProviderType
    >,
    options?: SignInOptions,
    authorizationParams?: SignInAuthorizationParams
  ): Promise<
    P extends RedirectableProviderType ? SignInResponse | undefined : undefined
  >;
  handleLogin: (fieldForm: {
    [key: string]: string;
    password: string;
  }) => Promise<IEmployee | IClient | null>;
}

export interface Authentication {
  useSession: UseSessionFunction<any>;
  findUserByEmailOrUsername(): Promise<IEmployee | null>;
  useEmployeesStore: EmployeesStore;
}

export interface Logout {
  signOut<R extends boolean = true>(
    options?: SignOutParams<R>
  ): Promise<R extends true ? undefined : SignOutResponse>;
  useSession: UseSessionFunction<any>;
}

export interface LoginWithProvider {
  signIn<P extends RedirectableProviderType | undefined = undefined>(
    provider?: LiteralUnion<
      P extends RedirectableProviderType
        ? P | BuiltInProviderType
        : BuiltInProviderType
    >,
    options?: SignInOptions,
    authorizationParams?: SignInAuthorizationParams
  ): Promise<
    P extends RedirectableProviderType ? SignInResponse | undefined : undefined
  >;
  useUIStore: UIStore;
}

export interface Admin {
  adminRole: TypeRole[] | undefined;
  userAdmin: string | undefined;
}

type UseSessionFunction<R extends boolean> = (
  options?: UseSessionOptions<R>
) => SessionContextValue<R>;
