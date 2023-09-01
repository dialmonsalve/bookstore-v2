import bcrypt from 'bcryptjs';

import { IStaff } from "@/types";


export const user: IStaff[] = [
  {
    email: 'correo@correo.com',
    name: 'diego',
    lastName: 'monsalve',
    password: bcrypt.hashSync('12345678'),
    role: ['admin'],
    phone: '4567899595',
    username: 'dialmonsalve'
  },
  {
    email: 'correo2@correo.com',
    name: 'pepe',
    lastName: 'el toro',
    password: bcrypt.hashSync('12345678'),
    role: ['logistica', 'vendedor'],
    phone: '1234567890',
    username: 'pepetoro'
  },
  {
    email: 'correo3@correo.com',
    name: 'lola',
    lastName: 'loles',
    password: bcrypt.hashSync('12345678'),
    role: ['compras', 'logistica'],
    phone: '1234567890',
    username:'lolalo'
  },
]