import mongoose, { Model, Schema, model } from 'mongoose';
import { IEmployee } from "../types";
import { Book } from '.';

const EmployeeSchema = new Schema<IEmployee>({

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
    unique: false
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
  isNewEmployee: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  }
}, {
  timestamps: true
})

const Employee = Model<IEmployee> = mongoose.models.Employee || model('Employee', EmployeeSchema);

export default Employee;

EmployeeSchema.pre('deleteOne', { document: true }, async function (next) {
  const Employee = this;

  const hasTransactions = await Book.exists({ Employee: Employee._id });

  if (hasTransactions) {
    Employee.deleted = true;
    await Employee.save();
  } else {
    await Employee.deleteOne();
  }

  next();
});
