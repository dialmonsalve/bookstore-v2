import { formValidator } from './formValidator';

export const login = {
  email: '',
  password: ''
}

export const loginValidationSchema = {
  email: formValidator()
    .string()
    .required('Field email is required')
    .email(),
  password: formValidator()
    .string()
    .required('Field password is required')
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
    .required('Field name is required')
    .min(3, 'Name must be at least 3 characters'),
  lastName: formValidator()
    .string(),
  email: formValidator()
    .string()
    .required('Field email is required')
    .email(),
  phone: formValidator()
    .isValidPhone(),
  password: formValidator()
    .string()
    .required('Field password is required')
    .min(8, 'Password must be at least 8 characters'),
  repitePassword: formValidator()
    .string()
    .required('please repite your password')
    .min(8, 'Password must be at least 8 characters')
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
    .required('Field name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: formValidator()
    .string()
    .required('Field email is required')
    .email(),
  message: formValidator()
    .string()
    .required('please enter your message')
    .min(15, 'Message must be at least 15 characters'),
};

