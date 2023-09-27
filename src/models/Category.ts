import { ICategory } from '@/types/backend/book';
import mongoose, { Model, Schema, model } from 'mongoose';

const CategorySchema = new Schema<ICategory>({

  name: {
    type: String,
    required: true,
    trim: true
  },
  createdFor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Employee'
  },
  updatedFor: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },

}, {
  timestamps: true
})

const Category = Model<ICategory> = mongoose.models.Category || model('Category', CategorySchema);

export default Category;