import { TypeRole } from '@/types';
import { formValidator } from './formValidator';

export const newClientValidationSchema = {
  name: formValidator()
    .string()
    .required('Campo nombre es requerido')
    .min(3, 'El nombre debe tener al menos de 3 caracteres'),
  lastName: formValidator()
    .string(),
  email: formValidator()
    .string()
    .required('Campo email es requerido')
    .email(),
  phone: formValidator()
    .isValidPhone(),
  password: formValidator()
    .string()
    .required('Campo password es requerido')
    .min(8, 'El password debe tener al menos de 8 caracteres'),
  repitePassword: formValidator()
    .string()
    .required('Por favor repite el password')
    .min(8, 'El password debe tener al menos de 8 caracteres')
    .equalTo('password'),
};


export const newEmployeeValidationSchema = {
  name: formValidator()
    .string()
    .required('Campo nombre es requerido')
    .min(3, 'El nombre debe tener al menos de 3 caracteres'),
  lastName: formValidator()
    .string(),
  email: formValidator()
    .string()
    .required('Campo email es requerido')
    .email(),
  username: formValidator()
    .string()
    .required('Campo username es requerido')
    .min(4, 'El username debe tener al menos de 4 caracteres')
    .notBlankSpace(),
  phone: formValidator()
    .isValidPhone(),
  password: formValidator()
    .string()
    .required('Campo password es requerido')
    .min(4, 'El password debe tener al menos de 4 caracteres'),
};
export const updateEmployeeValidationSchema = {

  name: formValidator()
    .string()
    .required('Campo nombre es requerido')
    .min(3, 'El nombre debe tener al menos de 3 caracteres'),
  lastName: formValidator()
    .string(),
  email: formValidator()
    .string()
    .required('Campo email es requerido')
    .email(),
  username: formValidator()
    .string()
    .required('Campo username es requerido')
    .min(4, 'El username debe tener al menos de 4 caracteres')
    .notBlankSpace(),
  phone: formValidator()
    .isValidPhone(),
};


export const loginClientValidationSchema = {
  email: formValidator()
    .string()
    .email()
    .required('Campo username es requerido'),
  password: formValidator()
    .string()
    .required('Campo password es requerido')
};

export const loginEmployeeValidationSchema = {
  username: formValidator()
    .string()
    .required('Campo username es requerido'),
  password: formValidator()
    .string()
    .required('Campo password es requerido')
}

export const newMessageValidationSchema = {
  name: formValidator()
    .string()
    .required('Campo nombre es requerido')
    .min(3, 'El nombre debe tener al menos de 3 caracteres'),
  email: formValidator()
    .string()
    .required('Campo email es requerido')
    .email(),
  message: formValidator()
    .string()
    .required('Por favor ingresa tu mensaje')
    .min(15, 'El mensaje debe tener al menos 15 caracteres'),
};

export const ROLES = ['logistica', 'ventas', 'compras'] as TypeRole[]



