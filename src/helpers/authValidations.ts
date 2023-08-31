import { formValidator } from './formValidator';

export const login = {
  email: '',
  password: ''
}

export const loginValidationSchema = {
  email: formValidator()
    .string()
    .required('Campo email es requerido')
    .email(),
  password: formValidator()
    .string()
    .required('Campo password es requerido')
};

export const newUser = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  repitePassword: ''
};

export const newUserValidationSchema = {
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


export const newMessage = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
};

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

