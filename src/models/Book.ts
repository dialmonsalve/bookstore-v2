import { IBook } from "@/types/backend/book";
import mongoose, { Model, Schema, model } from "mongoose";

const BookSchema = new Schema<IBook>(
  {
    isbn: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    utility: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    publishedDate: {
      type: String,
      trim: true,
    },
    imageLinks: [
      {
        type: String,
        trim: true,
      },
    ],
    pageCount: {
      type: Number,
    },
    language: {
      type: String,
      trim: true,
    },
    format: {
      type: String,
      enum: {
        values: [ "eBook", "audio libro", "impreso", "PDF", "EPUB", "MOBI", "cartone"],
        message: `{VALUE} no es un tipo válido`,
      },
      default: "impreso",
    },
    authors: [
      {
        type: String,
        required: true,
      },
    ],
    categories: [
      {
        type: String,
        required: true,
      },
    ],
    editorial: {
      type: String,
    },
    createdFor: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    updatedFor: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Book = (Model<IBook> = mongoose.models.Book || model("Book", BookSchema));

export default Book;
