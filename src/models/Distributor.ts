import { IDistributor } from '@/types/backend/book';
import mongoose, { Model, Schema, model } from 'mongoose';

const DistributorSchema = new Schema<IDistributor>({

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

  },
  createdFor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Staff'
  },
  updatedFor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Staff'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },

}, {
  timestamps: true
})

const Distributor = Model<IDistributor> = mongoose.models.Distributor || model('Distributor', DistributorSchema);

export default Distributor;