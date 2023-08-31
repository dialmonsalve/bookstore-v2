import { IBook } from '@/types/book';
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
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  summary: {
    type: String,
    required: true,
    trim: true
  },
  publishedDate: {
    type: String,
    required: true,
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
    required: true,
  },
  language: {
    type: String,
    required: true,
    trim: true
  },
  review: {
    type: String,
    trim: true
  },
  ratings: {
    type: String,
    trim: true
  },
  format: {
    type: String,
    enum: {
      values: ['eBook', 'audioBook', 'printedBook', 'PDF', 'EPUB', 'MOBI'],
      message: `{VALUE no es un tipo válido}`
    }
  },
  author: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }],
  category: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  }],
  editorial: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Editorial'
  },
  createdFor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  updatedFor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  isAvailable: {
    type: Boolean,
    require: true,
    default: true
  }, 

}, {
  timestamps: true
})


const Book = Model<IBook> = mongoose.models.Book || model('Book', BookSchema);

export default Book;
