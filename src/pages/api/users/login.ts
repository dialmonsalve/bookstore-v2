import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { Client, Employee } from '@/models';
import { IEmployee, ResponseObject } from '@/types';


type Data =
  | { message: string }
  | ResponseObject


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':

      return login(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

async function login(req: NextApiRequest, res: NextApiResponse<Data>) {

  const { email = '', password = '', username = '' } = req.body as IEmployee;

  try {

    if ((!email || !password) && !username) {
      throw new Error('Las credenciales son obligatorias');
    }

    await db.connect();

    let user;

    if (username) {
      user = await Employee.findOne({ username });
    }
    else {
      user = await Client.findOne({ email });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Las credenciales no son válidas' })
    }

    const { name, lastName, phone, _id, role, image, email: employeeEmail } = user as IEmployee;

    const responseObject: ResponseObject = {
      _id,
      email: email?.toLowerCase(),
      name,
      image,
      lastName,
      phone,
      role,
    };

    if (username) {
      responseObject.username = username.toLowerCase();
      responseObject.email = employeeEmail
    }

    return res.status(200).json(responseObject)
  } catch (error: any) {
    console.error('Error en autenticación:', error.message);
    res.status(500).json({ message: 'Error en autenticación' });
  } finally {
    await db.disconnect();
  }
}
