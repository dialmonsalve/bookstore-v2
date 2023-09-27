// import { IEditorial } from '@/types/backend/book';
// import mongoose, { Model, Schema, model } from 'mongoose';

// const EditorialSchema = new Schema<IEditorial>({

//   nit: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//   },
//   phone: {
//     type: String,
//   },
//   country: {
//     type: String,
//   },
//   web: {
//     type: String,
//   },
//   email: {
//     type: String,
//   }
// ,
// distributor: [{
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'Distributor'
//   }],
//   createdFor: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'Employee'
//   },
//   updatedFor: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'Employee'
//   },
//   isAvailable: {
//     type: Boolean,
//     default: true
//   },

// }, {
//   timestamps: true
// })


// const Editorial = Model<IEditorial> = mongoose.models.Editorial || model('Editorial', EditorialSchema);

// export default Editorial;
