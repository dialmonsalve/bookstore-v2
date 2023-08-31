import { IEditorial } from '@/types/book';
import mongoose, { Model, Schema, model } from 'mongoose';

const EditorialSchema = new Schema<IEditorial>({

  nit: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  country: {
    type: String,
  },
  web: {
    type: String,
  },
  email: {

  }
,
distributor: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Distributor'
  }],
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


const Editorial = Model<IEditorial> = mongoose.models.Editorial || model('Editorial', EditorialSchema);

export default Editorial;
