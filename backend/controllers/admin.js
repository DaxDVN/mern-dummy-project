import Product from "../models/product.js";

export async function getProducts(req, res) {
  try {
    const products = await Product.find().populate("userId");
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({error: "Failed to fetch products.", message: err.message});
  }
}

export async function postProduct(req, res) {
  try {
    const user = req.user;
    const productData = req.body;

    const product = new Product({
      title: productData[`title`],
      imageUrl: productData[`imageUrl`],
      description: productData[`description`],
      price: productData[`price`],
      userId: user._id
    });
    const newProduct = await product.save()
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({error: "Failed to add product", message: error.message});
  }
}

export async function getProductById(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findOne({_id: id});

    if (product) {
      return res.status(200).json(product);
    }
    return res.status(404).json({error: "Product not found."});
  } catch (err) {
    return res.status(500).json({error: "Failed to get product", message: err.message});
  }
}


export async function editProduct(req, res) {
  try {
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(id, {...req.body, id: id}, {new: true})
    return res.status(200).json({id: updatedProduct._id});
  } catch (e) {
    return res.status(500).json({error: "Failed to update product", message: e.message});
  }
}

export async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    return res.status(204).json({id: id})
  } catch (error) {
    return res.status(500).json({error: "Failed to delete product", message: e.message});
  }
}