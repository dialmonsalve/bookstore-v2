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
  isAccountValidated:{
    type:Boolean,
    default:false
  },
  deleted:{
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
})

const Client = Model<IClient> = mongoose.models.Client || model('Client', ClientSchema);

export default Client;