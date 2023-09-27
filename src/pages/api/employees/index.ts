import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { Employee } from '@/models';
import { IEmployee } from '@/types';

type Data =
  | { message: string }
  | { employees: IEmployee[], totalEmployees: number }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getEmployees(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

const getEmployees = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { limit, page } = req.query

  try {

    await db.connect();

    const employees: IEmployee[] = await Employee.find()
      .select('-password -createdAt -updatedAt -__v')
      .sort({ name: 1 })
      .skip(Number(page) > 0 ? (Number(page) - 1) * Number(limit) : 0)
      .limit(Number(limit))
      .lean();

    const totalEmployees = await Employee.countDocuments();

    return res.status(200).json({ employees, totalEmployees });

  } catch (error: any) {
    console.error(error.message);

    res.status(500).json({ message: 'Verificar logs' });

  } finally {
    await db.disconnect();
  }
}
