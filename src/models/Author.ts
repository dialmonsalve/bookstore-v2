import { IAuthor } from '@/types/backend/book';
import mongoose, { Model, Schema, model } from 'mongoose';

const AuthorSchema = new Schema<IAuthor>({

  fullName: {
    type: String,
    required: true,
    trim: true
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
}, {
  timestamps: true
})

const Author = Model<IAuthor> = mongoose.models.Author || model('Author', AuthorSchema);

export default Author;
