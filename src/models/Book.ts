import { IBook } from '@/types/backend/book';
import mongoose, { Model, Schema, model } from 'mongoose';

const BookSchema = new Schema<IBook>({

  isbn: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 0
  },
  summary: {
    type: String,
    trim: true
  },
  publishedDate: {
    type: String,
    trim: true
  },
  imageLinks: [
    {
      type: String,
      trim: true
    },
  ],
  pageCount: {
    type: Number,
  },
  language: {
    type: String,
    trim: true
  },
  format: {
    type: String,
    enum: {
      values: ['eBook', 'audioBook', 'printedBook', 'PDF', 'EPUB', 'MOBI'],
      message: `{VALUE no es un tipo válido}`
    },
    default: 'printedBook'
  },
  author: [{
    type: String,
    required: true,
  }],
  category: [{
    type: String,
    required: true,
  }],
  editorial: {
    type: String,
  },
  createdFor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Employee'
  },
  updatedFor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Employee'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  tags: [{
    type: String,
  }]

}, {
  timestamps: true,

})


const Book = Model<IBook> = mongoose.models.Book || model('Book', BookSchema);

export default Book;
