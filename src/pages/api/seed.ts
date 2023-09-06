import { db, seedDataBase } from '@/database';
import { Staff } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'No tiene acceso a esta API' });
  };

  await db.connect();
  await Staff.deleteMany();
  await Staff.insertMany(seedDataBase.user);
  await db.disconnect();

  res.status(200).json({ message: 'proceso realizado correctamente' })

}