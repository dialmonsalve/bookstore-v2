import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { Client } from '@/models';
import { IClient, TypeRole } from '@/types';
import { isValidEmail, jwt } from '@/helpers';


type Data =
  | { message: string }
  | {
    token: string;
    client: {
      newClient: IClient
    }
  }


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
    phone = ''
  } = req.body as IClient


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

  await db.connect();
  const client = await Client.findOne({ email });
  await db.disconnect();

  if (client) {
    return res.status(400).json({ message: 'Email ya existe' });
  }

  const newClient = new Client({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    name, lastName, phone
  })


  try {
    await newClient.save({ validateBeforeSave: true })

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Revisar logs del servidor'
    })
  }
  const { _id } = newClient as IClient;

  const token = jwt.signToken(_id!, email);

  return res.status(200).json({
    token,
    client: {
      newClient
    }

  })
}
