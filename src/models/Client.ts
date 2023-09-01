import mongoose, { Model, Schema, model } from 'mongoose';
import { IClient } from "../types/user";

const ClientSchema = new Schema<IClient>({

  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }, 
  isAvailable: {
    type: Boolean,
    default: true
  },
  phone: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

const Client = Model<IClient> = mongoose.models.Client || model('Client', ClientSchema);

export default Client;