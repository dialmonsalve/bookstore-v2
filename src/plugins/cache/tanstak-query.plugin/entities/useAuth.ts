import {
  UseMutationRegisterUser,
  useMutationLogOut,
  useMutationLogin,
  useMutationLoginWithProvider,
  useQueryAuthentication,
} from "../hooks/auth";
import {
  Authentication,
  LoginUser,
  LoginWithProvider,
  Logout,
  RegisterUser,
} from "../interfaces/tanstak-query.auth";

export const useAuth = () => {
  function registerUser(actionRegister: RegisterUser) {
    const register = UseMutationRegisterUser(actionRegister);

    return {
      register: register.mutate,
      isLoading: register.isLoading,
    };
  }

  function login(fieldForm: string, actionRegister: LoginUser) {
    const loginUser = useMutationLogin(fieldForm, actionRegister);

    return {
      login: loginUser.mutate,
      isLoading: loginUser.isLoading,
    };
  }

  function loginWithProvider(loginActions: LoginWithProvider) {
    const provider = useMutationLoginWithProvider(loginActions);
    return {
      provider: provider.mutate,
      isLoading: provider.isLoading,
    };
  }

  function logout(logoutActions: Logout) {
    const userLogout = useMutationLogOut(logoutActions);

    return {
      logout: userLogout.mutate,
    };
  }

  function auth(auth: Authentication) {
    const authUser = useQueryAuthentication(auth);

    return {
      userAuth: authUser.sessionQuery.data,
      isLoading: authUser.sessionQuery.isLoading,
      nextSession: authUser.nextSession,
      status: authUser.status,
    };
  }

  return {
    auth,
    login,
    loginWithProvider,
    logout,
    registerUser,
  };
};
