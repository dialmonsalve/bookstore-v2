
import { db } from '@/database';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {


  await db.connect();
  await db.disconnect();

  res.status(200).json({ message: 'John Doe' })
}
