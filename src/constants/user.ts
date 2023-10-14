import { formValidator } from "../helpers/formValidator";
import { TypeRole } from "@/types";

const BASE_SCHEMA = {
  name: formValidator()
    .string()
    .required("Campo nombre es requerido")
    .min(3, "El nombre debe tener al menos de 3 caracteres"),
  lastName: formValidator().string(),
  phone: formValidator().isValidPhone(),
};

const PASSWORD = {
  password: formValidator().string().required("Campo password es requerido"),
};

const EMAIL = {
  email: formValidator()
    .string()
    .email()
    .required("Campo username es requerido"),
};

export const LOGIN_EMPLOYEE = {
  initialForm: {
    username: "",
    password: "",
  },
  formFields: [
    {
      _id: 0,
      name: "username",
      type: "text",
      label: "username",
    },
    {
      _id: 1,
      name: "password",
      type: "password",
      label: "password",
    },
  ],
};

export const LOGIN_CLIENT = {
  initialForm: {
    email: "",
    password: "",
  },
  formFields: [
    {
      _id: 0,
      name: "email",
      type: "email",
      label: "email",
    },
    {
      _id: 1,
      name: "password",
      type: "password",
      label: "password",
    },
  ],
};

export const NEW_EMPLOYEE = {
  initialForm: {
    name: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    repitePassword: "",
    role: "",
  },
};

export const LOGIN_VALIDATION_SCHEMA = {
  client: {
    email: EMAIL.email,
    password: PASSWORD.password,
  },
  employee: {
    username: formValidator().string().required("Campo username es requerido"),
    password: PASSWORD.password,
  },
  newMessage: {
    name: formValidator()
      .string()
      .required("Campo nombre es requerido")
      .min(3, "El nombre debe tener al menos de 3 caracteres"),
    email: EMAIL.email,
    message: formValidator()
      .string()
      .required("Por favor ingresa tu mensaje")
      .min(15, "El mensaje debe tener al menos 15 caracteres"),
  },
};

export const CLIENT_VALIDATION_SCHEMA = {
  newClient: {
    ...BASE_SCHEMA,
    email: formValidator()
      .string()
      .required("Campo email es requerido")
      .email(),
    password: formValidator()
      .string()
      .required("Campo password es requerido")
      .min(8, "El password debe tener al menos de 8 caracteres"),
    repitePassword: formValidator()
      .string()
      .required("Por favor repite el password")
      .min(8, "El password debe tener al menos de 8 caracteres")
      .equalTo("password"),
  },
};

export const EMPLOYEE_VALIDATION_SCHEMA = {
  newEmployee: {
    ...BASE_SCHEMA,
    username: formValidator()
      .string()
      .required("Campo username es requerido")
      .min(4, "El username debe tener al menos de 4 caracteres")
      .notBlankSpace(),
    password: formValidator()
      .string()
      .required("Campo password es requerido")
      .min(4, "El password debe tener al menos de 4 caracteres"),
    role: formValidator().required("El usuario debe tener al menos 1 rol"),
  },
  updateEmployee: {
    ...BASE_SCHEMA,
    username: formValidator()
      .string()
      .required("Campo username es requerido")
      .min(4, "El username debe tener al menos de 4 caracteres")
      .notBlankSpace(),
    role: formValidator().required("El usuario debe tener al menos 1 rol"),
  },
  ROLES: ["logistica", "ventas", "compras"] as TypeRole[],
};
