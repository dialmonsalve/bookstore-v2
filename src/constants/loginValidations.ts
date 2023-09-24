
import { formValidator } from '../helpers/formValidator';

const PASSWORD = {
  password: formValidator()
    .string()
    .required('Campo password es requerido')
}

const EMAIL = {
  email: formValidator()
    .string()
    .email()
    .required('Campo username es requerido'),
}

export const LOGIN_VALIDATION_SCHEMA = {
  client: {
    email: EMAIL.email,
    password: PASSWORD.password
  },
  employee: {
    username: formValidator()
      .string()
      .required('Campo username es requerido'),
    password: PASSWORD.password
  },
  newMessage:{
    name: formValidator()
      .string()
      .required('Campo nombre es requerido')
      .min(3, 'El nombre debe tener al menos de 3 caracteres'),
    email: EMAIL.email,
    message: formValidator()
      .string()
      .required('Por favor ingresa tu mensaje')
      .min(15, 'El mensaje debe tener al menos 15 caracteres'),
  }
}