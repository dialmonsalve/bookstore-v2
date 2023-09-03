import { bookstoreApi } from "@/api/bookstoreApi";
import axios from 'axios'

export const useRegisterUser = () => {

  const registerUser = async (email: string, password: string, name: string): Promise<{ hasError: boolean, message?: string }> => {

    try {
      const { data } = await bookstoreApi.post('/user/register-client', { email, password, name });

      return {
        hasError: false
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }
    }
    return {
      hasError: true,
      message: 'No se pudo crear el usuario - intente nuevamente'
    }

  }


  const handleLoginCLient = async (email: string, password: string):Promise<{ hasError: boolean, message?: string }> => {

    try {
      const { data } = await bookstoreApi.post('/user/login-client', { email, password });

      return {
        hasError: false
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }
    }
    return {
      hasError: true,
      message: 'No se pudo crear el usuario - intente nuevamente'
    }
  }

  return {
    registerUser,
    handleLoginCLient
  }

}
