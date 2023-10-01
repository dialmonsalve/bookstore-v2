import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/database";
import { Category, Employee } from "@/models";
import { ICategory } from "@/types";

type Data =
  | { message: string }
  | { categories: ICategory[] }
  | { _id: string; name: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getCategories(req, res);

    case "POST":
      return registerCategory(req, res);

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

async function getCategories(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    await db.connect();

    const categories: ICategory[] = await Category.find()
      .select("-createdAt -updatedAt -__v")
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({ categories });
  } catch (error: any) {
    console.error(error.message);

    res.status(500).json({ message: "Verificar logs" });
  } finally {
    await db.disconnect();
  }
}

async function registerCategory(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name = "", username = "" } = req.body;

  if (name.length < 3) {
    return res.status(400).json({
      message: "El nombre debe tener al menos 3 caracteres",
    });
  }

  await db.connect();
  try {
    const employee = await Employee.findOne({ username });
    const category = await Category.findOne({ name });

    if (!employee) {
      return res
        .status(401)
        .json({ message: "No está autorizado para esta acción" });
    }

    if (category) {
      return res.status(400).json({ message: "La categoría ya existe" });
    }

    const newCategory = new Category({
      name: name.toLowerCase(),
      createdFor: employee._id,
    });

    await newCategory.save();

    const { _id } = newCategory;

    return res.status(200).json({
      _id,
      name,
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
