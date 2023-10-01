import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/database";
import { Book, Employee } from "@/models";
import { IBook } from "@/types";

type Data =
  | { message: string }
  | { books: IBook[]; totalBooks: number }
  | { book: IBook };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getBooks(req, res);
    case "POST":
      return createBook(req, res);

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

async function getBooks(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { limit, page } = req.query;

  try {
    await db.connect();

    const books: IBook[] = await Book.find()
      .select("-createdAt -updatedAt -__v")
      .sort({ name: 1 })
      .skip(Number(page) > 0 ? (Number(page) - 1) * Number(limit) : 0)
      .limit(Number(limit))
      .lean();

    const totalBooks = await Book.countDocuments();

    return res.status(200).json({ books, totalBooks });
  } catch (error: any) {
    console.error(error.message);

    res.status(500).json({ message: "Verificar logs" });
  } finally {
    await db.disconnect();
  }
}

async function createBook(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { book, username = "" } = req.body;

  const { title, authors, categories, isbn, slug } = book as IBook;

  if (title.length <= 0) {
    return res.status(400).json({
      message: "El titulo es requerido",
    });
  }
  if (isbn.length <= 0) {
    return res.status(400).json({
      message: "El isbn es requerido",
    });
  }
  if (slug.length <= 0) {
    return res.status(400).json({
      message: "El slug es requerido",
    });
  }
  if (authors.length === 0) {
    return res.status(400).json({
      message: "Debe tener al menos un autor",
    });
  }
  if (categories.length === 0) {
    return res.status(400).json({
      message: "Debe tener al menos una categoría",
    });
  }

  await db.connect();
  try {
    const searchBook = await Book.findOne({ slug });
    const employee = await Employee.findOne({ username });

    if (searchBook) {
      return res.status(400).json({
        message: "El slug ya existe",
      });
    }

    if (!employee) {
      return res
        .status(401)
        .json({ message: "No está autorizado para esta acción" });
    }

    const newBook = new Book({...book, slug:slug.toLocaleLowerCase()});

    await newBook.save();

    const { _id } = newBook;

    return res.status(200).json({
      _id,
      ...newBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  } finally {
    await db.disconnect();
  }
}
