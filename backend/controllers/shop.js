import Product from "../models/product.js";
import Order from "../models/order.js";

export async function getProducts(req, res) {
  try {
    const products = await Product.find().populate("userId");
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({error: "Failed to fetch products.", message: err.message});
  }
}


export async function getProductById(req, res, next) {
  try {
    const id = req.params.id;
    const product = await Product.findOne({_id: id});

    if (product) {
      return res.status(200).json(product);
    }
    return res.status(404).json({error: "Product not found."});
  } catch (err) {
    const error = new Error(err)
    err.httpStatusCode = 500
    return next(error)
  }
}

export async function getCart(req, res) {
  try {
    const user = req.user
    const products = await user.getCart()

    return res.status(200).json({products: products})

  } catch (error) {
    return res.status(500).json({error: "Failed to fetch cart.", message: err.message});
  }
}

export async function addCart(req, res) {
  try {
    const cartItem = req.body;

    if (!cartItem._id) {
      return res.status(400).json({error: "Missing required fields"});
    }

    const user = req.user
    await user.addToCart(cartItem);
    return res.status(200).json({id: cartItem._id});
  } catch (e) {
    return res.status(500).json({error: "Failed to add to cart", message: e.message});
  }
}

export async function deleteCart(req, res) {
  try {
    const id = req.params.id;
    const user = req.user

    await user.deleteCart(id);
    return res.status(200).json({id: id});
  } catch (error) {
    return res.status(500).json({error: "Failed to add to cart", message: error.message});
  }
}

export async function getOrders(req, res) {
  try {
    const user = req.user;
    const order = await Order.find({'user.userId': user._id});
    return res.status(200).json(order);
  } catch (e) {
    return res.status(500).json({error: "Failed to get order", message: e.message});
  }
}

export async function addOrder(req, res) {
  try {
    const user = req.user;
    const cart = await user.getCart();

    const order = new Order({
      items: cart.map(item => ({
        product: {...item.product},
        quantity: item.quantity,
      })),
      user: {
        userId: user._id,
        name: user.name,
      },
    });

    await order.save();
    await user.clearCart();
    return res.status(200).json({message: "Order added successfully"});
  } catch (err) {
    return res.status(500).json({error: "Failed to add order", message: err.message});
  }
}
