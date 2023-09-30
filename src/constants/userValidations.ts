import { TypeRole } from "@/types";
import { formValidator } from "../helpers/formValidator";

const BASE_SCHEMA = {
  name: formValidator()
    .string()
    .required("Campo nombre es requerido")
    .min(3, "El nombre debe tener al menos de 3 caracteres"),
  lastName: formValidator().string(),
  phone: formValidator().isValidPhone(),
};

export const USER_VALIDATION_SCHEMA = {
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
