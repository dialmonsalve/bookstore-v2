import mongoose, { Model, Schema, model } from 'mongoose';
import { IStaff } from "../types";
import { Book } from '.';


const StaffSchema = new Schema<IStaff>({

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
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
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
    required: true,
    enum: {
      values: ['admin', 'logistica', 'vendedor', 'compras'],
      message: `{VALUE no es un rol válido}`
    },
  }],
  deleted: {
    type: Boolean,
    default: false,
  },
  isNew: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
})

const Staff = Model<IStaff> = mongoose.models.Staff || model('Staff', StaffSchema);

export default Staff;

StaffSchema.pre('deleteOne', { document: true }, async function (next) {
  const Staff = this;

  const hasTransactions = await Book.exists({ Staff: Staff._id });

  if (hasTransactions) {
    Staff.deleted = true;
    await Staff.save();
  } else {
    await Staff.deleteOne();
  }

  next();
});
