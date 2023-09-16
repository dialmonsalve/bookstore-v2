import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { Employee } from '@/models';
import { IEmployee, ResponseObject } from '@/types';


type Data =
  | { message: string }
  | ResponseObject

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':

      return registerEmployee(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

async function registerEmployee(req: NextApiRequest, res: NextApiResponse<Data>) {

  const {
    email = '',
    password = '',
    name = '',
    lastName = '',
    phone = '',
    role,
    username,
    image = '',
    adminRole,
    userAdmin
  } = req.body


  if (password.length < 4) {
    return res.status(400).json({
      message: 'La contraseña debe tener mínimo 4 caracteres'
    })
  }
  if (name.length < 2) {
    return res.status(400).json({
      message: 'El nombre debe tener mínimo 2 caracteres'
    })
  }

  await db.connect();
  try {

    const admin = await Employee.findOne({ role: { $in: adminRole }, username: userAdmin });

    if (!admin) {
      return res.status(401).json({ message: 'No está autorizado para esta acción' });
    }

    const employee = await Employee.findOne({ username });

    if (employee) {
      return res.status(400).json({ message: 'Usuario ya existe' });
    }

    const newEmployee = new Employee({
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password),
      role,
      name,
      lastName,
      phone,
      username,
      image
    })

    await newEmployee.save({ validateBeforeSave: true })

    const { _id } = newEmployee;

    return res.status(200).json({
      _id, email, image, lastName, name, phone, role, username
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Revisar logs del servidor'
    })
  } finally {
    await db.disconnect();
  }
}

