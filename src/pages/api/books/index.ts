import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { Book } from '@/models';
import { IBook } from '@/types';

type Data =
  | { message: string }
  | { books: IBook[], totalBooks: number }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getBooks(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

const getBooks = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { limit, page } = req.query

  try {

    await db.connect();

    const books: IBook[] = await Book.find()
      .select('-createdAt -updatedAt -__v')
      .sort({ name: 1 })
      .skip(Number(page) > 0 ? (Number(page) - 1) * Number(limit) : 0)
      .limit(Number(limit))
      .lean();

    const totalBooks = await Book.countDocuments();

    return res.status(200).json({ books, totalBooks });

  } catch (error: any) {
    console.error(error.message);

    res.status(500).json({ message: 'Verificar logs' });

  } finally {
    await db.disconnect();
  }
}