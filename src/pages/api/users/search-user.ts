import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { db } from '@/database';
import { Client, Staff } from '@/models';
import { IStaff, ResponseObject } from '@/types';


type Data =
  | { message: string }
  | ResponseObject


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':

      return findUserByEmail(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

const findUserByEmail = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const session = await getSession({req});
  
  try {    
    if (!session) {
      throw new Error('Las credenciales son obligatorias');
    }

    const { email, username } = session?.user;

    await db.connect();

    let user;

    if (username) {
      user = await Staff.findOne({ username });
    }
    else {
      user = await Client.findOne({ email });
    }

    const { name, lastName, phone, _id, role, image, email: staffEmail } = user as IStaff;

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
      responseObject.username = username.toLowerCase(),
      responseObject.email = staffEmail
    }

    return res.status(200).json(responseObject);

  } catch (error: any) {
    console.error('No hay ningún usuario registrado con las credenciales:', error.message);

    res.status(500).json({ message: 'Verificar logs' });

  } finally {
    await db.disconnect();
  }
}
