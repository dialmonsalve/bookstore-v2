import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { db } from '@/database';
import { Employee } from '@/models';
import { IEmployee } from '@/types';

type Data =
  | { message: string }
  | IEmployee[]


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':

      return getEmployees(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

const getEmployees = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const session = await getSession({ req });

  try {
    if (!session) {
      throw new Error('Las credenciales son obligatorias');
    }
    await db.connect();

    const employee: IEmployee[] = await Employee.find()
      .select('-password -createdAt -updatedAt -__v')
      .lean();

    return res.status(200).json(employee);

  } catch (error: any) {
    console.error('No hay ningún usuario registrado con las credenciales:', error.message);

    res.status(500).json({ message: 'Verificar logs' });

  } finally {
    await db.disconnect();
  }
}
