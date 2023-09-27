import { IOrderPurchase } from '@/types/order';
import mongoose, { Schema, model, Model } from 'mongoose';


const OrderPurchaseSchema = new Schema<IOrderPurchase>({

  nit: { type: String, },
  productType: {
    type: String,
    required: true,
    enum: ['Book', 'Fashion', 'Toys', 'Stationery'],
    message: `{VALUE} no es un producto válido`
  },
  provider: { type: String, required: true, },
  observations: { type: String, },
  employee: { type: Schema.Types.ObjectId, required: true, ref: 'Employee' },
  consecutive: { type: Number, required: true },
  status: {
    type: String,
    enum: {
      values: ['abierta', 'cerrada', 'cancelada'],
      message: `{VALUE no es un estado válido}`
    },
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'productType'
      },
      isbn: { type: String, required: true },
      name: { type: String, },
      quantity: { type: Number, required: true },
      author: { type: String, },
      editorial: { type: String, },
      size: { type: String, },
    }
  ],

}, {
  timestamps: true
})

const OrderPurchase = Model<IOrderPurchase> = mongoose.models.OrderPurchase || model('OrderPurchase', OrderPurchaseSchema);

export default OrderPurchase;
