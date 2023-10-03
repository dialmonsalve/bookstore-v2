import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/database";
import { Book, Employee, PurchaseOrder } from "@/models";

import { IPurchaseOrder, IOrderItem } from "@/types/order";

type Data = { message: string } | { purchaseOrder: IPurchaseOrder[] };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getOrderPurchase(req, res);
    case "POST":
      return createPurchaseOrder(req, res);

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

async function getOrderPurchase(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const { limit, page } = req.query

  try {
    await db.connect();

    const purchaseOrder: IPurchaseOrder[] = await PurchaseOrder.find()
      .select(" -createdAt -updatedAt -__v")
      .lean();

    // const totalEmployees = await Employee.countDocuments();

    return res.status(200).json({ purchaseOrder });
  } catch (error: any) {
    console.error(error.message);

    res.status(500).json({ message: "Verificar logs" });
  } finally {
    await db.disconnect();
  }
}

async function createPurchaseOrder(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { purchaseOrder, username } = req.body 

  const {
    productType = "",
    provider = "",
    items = [],
  } = purchaseOrder as IPurchaseOrder;

  if (!productType) {
    return res.status(400).json({
      message: "Se requiere el tipo de producto",
    });
  }
  if (!provider) {
    return res.status(400).json({
      message: "Se requiere el nombre del proveedor",
    });
  }
  if (items.length === 0) {
    return res.status(400).json({
      message: "Se requiere al menos un producto",
    });
  }

  if (!username) {
    return res.status(401).json({
      message: "No está autorizado para esta acción",
    });
  }

  const itemIds = purchaseOrder.items.map((item:IOrderItem) => item.isbn);
  const foundBooks = await Book.find({ isbn: { $in: itemIds } });

  const foundBookIsbn = foundBooks.map(book => book.isbn);
  const missingBookIds = itemIds.filter((isbn:string) => !foundBookIsbn.includes(isbn));

  if (missingBookIds.length > 0) {
    return res.status(401).json({
      message: `Los siguientes ISBN ${missingBookIds} no tienen un libro correspondiente`,
    });
  }

  await db.connect();

  try {
    const employee = await Employee.findOne({ username });

    if (!employee) {
      return res.status(401).json({
        message: "No está autorizado para esta acción",
      });
    }
    const consecutive = (await PurchaseOrder.countDocuments()) + 1;

    const newPurchaseOrder = new PurchaseOrder({
      consecutive,
      ...purchaseOrder,
      createdFor: employee.id,
    });

    newPurchaseOrder.save();

    const { _id } = newPurchaseOrder;

    return res.status(200).json({
      _id,
      ...newPurchaseOrder,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  } finally {
    db.disconnect();
  }
}
