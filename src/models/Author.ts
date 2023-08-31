import { IAuthor } from '@/types/book';
import mongoose, { Model, Schema, model } from 'mongoose';

const AuthorSchema = new Schema<IAuthor>({

  name: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
  },
  nationality: {
    type: String,
  },
  birth: {
    type: String,
  },
  biography: {
    type: String,
  },
  web: {
    type: String,
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

const Author = Model<IAuthor> = mongoose.models.Author || model('Author', AuthorSchema);

export default Author;
