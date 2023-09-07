import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { db } from '@/database';
import { Client, Staff } from '@/models';
import { IStaff, ResponseObject } from '@/types';


type Data =
  | { message: string }
  | IStaff[]


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':

      return getStaff(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

const getStaff = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const session = await getSession({ req });

  try {
    if (!session) {
      throw new Error('Las credenciales son obligatorias');
    }
    await db.connect();

    const staff = await Staff.find().select('-password -createdAt -updatedAt -__v');
    return res.status(200).json(staff);

  } catch (error: any) {
    console.error('No hay ningún usuario registrado con las credenciales:', error.message);

    res.status(500).json({ message: 'Verificar logs' });

  } finally {
    await db.disconnect();
  }
}
