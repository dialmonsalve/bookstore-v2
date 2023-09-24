import bcrypt from 'bcryptjs';

import { IEmployee, TypeRole } from "@/types";

export const user: IEmployee[] = [
  {
    name: 'diego',
    lastName: 'monsalve',
    email: 'correo@correo.com',
    password: bcrypt.hashSync('12345678'),
    username: 'dialmonsalve',
    phone: '4567899595',
    role: ["admin"],
    image: ''
  },
  {
    email: 'correo1@correo.com',
    name: 'pepe',
    lastName: 'el toro',
    password: bcrypt.hashSync('12345678'),
    role: ['logistica', 'ventas'],
    phone: '1234567890',
    username: 'pepetoro',
    image: ''
  },
  {
    email: 'correo2@correo.com',
    name: 'lola',
    lastName: 'loles',
    password: bcrypt.hashSync('12345678'),
    role: ['compras', 'logistica'],
    phone: '1234567890',
    username: 'lolalo',
    image: ''
  },
  {
    name: 'Brututs',
    lastName: 'Bruto',
    email: 'correo3@correo.com',
    password: bcrypt.hashSync('12345678'),
    username: 'brubru',
    phone: '4567899595',
    role: ["ventas"],
    image: ''
  },
  {
    email: 'corre4@correo.com',
    name: 'Prisma',
    lastName: 'Princess',
    password: bcrypt.hashSync('12345678'),
    role: ['logistica', 'ventas'],
    phone: '1234567890',
    username: 'pripri',
    image: ''
  },
  {
    email: 'correo5@correo.com',
    name: 'Berta',
    lastName: 'loles',
    password: bcrypt.hashSync('12345678'),
    role: ['ventas', 'logistica'],
    phone: '1234567890',
    username: 'brebre',
    image: ''
  },
  {
    name: 'Gilbert',
    lastName: 'Gil',
    email: 'correo6@correo.com',
    password: bcrypt.hashSync('12345678'),
    username: 'gigi',
    phone: '4567899595',
    role: ["ventas"],
    image: ''
  },
  {
    email: 'correo7@correo.com',
    name: 'Masquel',
    lastName: 'Ridel',
    password: bcrypt.hashSync('12345678'),
    role: ['compras', 'ventas'],
    phone: '1234567890',
    username: 'mamari',
    image: ''
  },
  {
    email: 'correo8@correo.com',
    name: 'Tomas',
    lastName: 'Thomson',
    password: bcrypt.hashSync('12345678'),
    role: ['compras'],
    phone: '1234567890',
    username: 'toto',
    image: ''
  },
]