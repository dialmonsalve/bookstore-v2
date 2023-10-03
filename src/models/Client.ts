import mongoose, { Model, Schema, model } from 'mongoose';
import { IClient } from "../types/user";

const ClientSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
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
  phone: {
    type: String,
  },
  image: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isAccountValidated: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
})

const Client = Model<IClient> = mongoose.models.Client || model('Client', ClientSchema);

export default Client;