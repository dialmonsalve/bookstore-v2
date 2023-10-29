
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IBook } from "@/types";
import { Book } from "@/models";

type Data = { message: string } | IBook;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getBookByIsbn(req, res);

    default:
      return res.status(400).json({ message: "Método no existe" });
  }
}

async function getBookByIsbn(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { isbn } = req.query;

  if (!isbn) {
    return res.status(400).json({ message: `Se requiere el ISBN` });
  }
  await db.connect();
  try {
    const book = await Book.findOne({ isbn })
      .select("_id isbn title authors editorial")
      .lean();
    if (!book) {
      return res
        .status(400)
        .json({ message: `No hay libro creado con el ISBN ${isbn}` });
      }
      return res.status(200).json(book as IBook);
  } catch (error:any) { 

    console.log(error.message);
    res.status(500).json({ message: 'Verificar logs' });
    
  } finally {    
    await db.disconnect();
  }

}
