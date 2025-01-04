import mongoose, {Schema} from "mongoose";
import {ObjectId} from "mongodb";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  }
})

userSchema.methods.getCart = async function () {
  let userWithCart = await this.populate('cart.items.productId');
  return userWithCart.cart.items.map(e => {
    const product = e.productId;
    return {
      product, quantity: e.quantity, _id: e._id
    }
  });
}

userSchema.methods.addToCart = async function (product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString()
  })

  const updatedCartItems = [...this.cart.items]
  let quantity = 1

  if (cartProductIndex >= 0) {
    updatedCartItems[cartProductIndex].quantity = this.cart.items[cartProductIndex].quantity + 1
  } else {
    updatedCartItems.push({
      productId: ObjectId.createFromHexString(product._id),
      quantity: quantity
    })
  }

  this.cart = {
    items: updatedCartItems
  };
  return await this.save();
}

userSchema.methods.deleteCart = async function (productId) {
  try {
    const updatedCartItems = this.cart.items.filter(item => {
      return item._id.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();

  } catch (error) {
    console.error(error);
  }
}

userSchema.methods.clearCart = async function () {
  this.cart = {items: []};
  return await this.save();
};

export default mongoose.model('User', userSchema)