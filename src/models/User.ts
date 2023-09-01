import mongoose, { Model, Schema, model } from 'mongoose';
import { IUser } from "../types/user";

const UserSchema = new Schema<IUser>({

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
  role: [{
    type: String,
    required:true,
    enum: {
      values: ['admin' , 'logistica' , 'vendedor' , 'compras'],
      message: `{VALUE no es un rol válido}`
    },
  }],
}, {
  timestamps: true
})

const User = Model<IUser> = mongoose.models.User || model('User', UserSchema);

export default User;