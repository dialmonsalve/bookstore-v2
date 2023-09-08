import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { ResponseObject } from '@/types';

import { Client } from '@/models';
import { IClient } from '@/types';
import { isValidEmail } from '@/helpers';

type Data =
  | { message: string }
  | ResponseObject

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':

      return registerClient(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

const registerClient = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const {
    email = '',
    password = '',
    name = '',
    lastName = '',
    phone = '',
    image = '',
  } = req.body

  if (password.length < 8) {
    return res.status(400).json({
      message: 'La contraseña debe tener mínimo 8 caracteres'
    })
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: 'El nombre debe tener mínimo 2 caracteres'
    })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: 'El correo no es válido'
    })
  }

  try {
    await db.connect();

    const client = await Client.findOne({ email });

    if (client) {
      return res.status(400).json({ message: 'Cliente ya existe' });
    }

    const newClient = new Client({
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password),
      name, 
      lastName, 
      phone, 
      image
    })

    await newClient.save({ validateBeforeSave: true })

    const { _id } = newClient as IClient;

    return res.status(200).json({
      _id, email, image, lastName, name, phone
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Revisar logs del servidor'
    })
  }finally {
    await db.disconnect();
  }
}

