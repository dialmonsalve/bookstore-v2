import { ITransaction } from '@/types/transaction';
import mongoose, { Schema, model, Model } from 'mongoose';

const TransactionSchema = new Schema({

  transactionType: {
    type: String,
    required: true,
    enum: {
      values: ['EI', 'FV', 'AJE', 'AJS', 'PR', 'DV', 'NC', 'OC'],
      message: `{VALUE} no es un tipo de movimiento válido`
    },
  },
  products: [
    {
      productType: {
        type: String,
        required: true,
        enum:['Book', 'Fashion', 'Toys', 'Stationery'],
        message: `{VALUE} no es un producto válido`
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'products.productType'
      },
      quantity: Number
    }
  ],
  total: Number,
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Employee'
  }
},
  {
    timestamps: true
  }
);

const Transaction = Model<ITransaction> = mongoose.models.Transaction || model('Transaction', TransactionSchema);

export default Transaction;
