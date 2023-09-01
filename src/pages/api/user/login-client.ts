import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { Client } from '@/models';
import { IClient } from '@/types';
import { jwt } from '@/helpers';

type Data =
  | { message: string }
  | {
    token: string;
    client: {
      email: string;
      name: string;
      lastName: string;
      phone?: string;
    }
  }


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':

      return loginClient(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

const loginClient = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { email = '', password = '' } = req.body

  await db.connect();
  const client = await Client.findOne({ email });
  await db.disconnect();

  if (!client) {
    return res.status(401).json({ message: 'Correo o contraseña no válidos' })
  }

  if (!bcrypt.compareSync(password, client.password)) {
    return res.status(401).json({ message: 'Correo o contraseña no válidos' })
  }
  const {  name, lastName, phone, _id } = client as IClient;

  // TODO Hacer validación de cuenta

  const token = jwt.signToken(_id!, email);

  return res.status(200).json({
    token,
    client: {
      email,  name, lastName, phone
    }

  })
}
