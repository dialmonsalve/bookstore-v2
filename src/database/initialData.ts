import { IUser } from "@/types/user";

export const user: IUser[] = [
  {
    email: 'correo@correo.com',
    name: 'diego',
    lastName: 'monsalve',
    password: '12345678',
    role: ['admin'],
    phone: '4567899595'
  },
  {
    email: 'correo2@correo.com',
    name: 'pepe',
    lastName: 'el toro',
    password: '12345678',
    role: ['logistica', 'vendedor'],
    phone: '1234567890'
  },
  {
    email: 'correo3@correo.com',
    name: 'lola',
    lastName: 'loles',
    password: '12345678',
    role: ['compras', 'logistica'],
    phone: '1234567890'
  },
]