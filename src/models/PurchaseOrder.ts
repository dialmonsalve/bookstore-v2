import { IPurchaseOrder } from "@/types/order";
import mongoose, { Schema, model, Model } from "mongoose";

const PurchaseOrdersSchema = new Schema<IPurchaseOrder>(
  {
    nit: { type: String },
    productType: {
      type: String,
      required: true,
      enum: ["Book", "Fashion", "Toy", "Stationery"],
      message: `{VALUE} no es un producto válido`,
    },
    provider: { type: String, required: true },
    observations: { type: String },
    createdFor: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    updatedFor: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    consecutive: { type: Number, required: true },
    status: {
      type: String,
      enum: {
        values: ["open", "close", "annulled"],
        message: `{VALUE} no es un tipo válido`,
      },
      default: "open",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "productType",
        },
        item: { type: Number, required: true },
        isbn: { type: String, required: true },
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
        authors: [{ type: String }],
        editorial: { type: String },
        size: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PurchaseOrders = (Model<IPurchaseOrder> =
  mongoose.models.PurchaseOrders ||
  model("PurchaseOrders", PurchaseOrdersSchema));

export default PurchaseOrders;
