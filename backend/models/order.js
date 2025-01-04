import mongoose, {Schema} from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: {
        type: Object, required: true
      },
      quantity: {
        type: Number, required: true
      }
    }
  ],
  user: {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }
})

export default mongoose.model("Order", orderSchema);