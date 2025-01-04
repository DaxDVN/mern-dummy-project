import {promises as fs} from 'fs';
import path from 'path';
import Product from '../models/product.js';
import User from '../models/user.js';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '..', 'datas', 'products.json');

async function getProductsFromFile() {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (err) {
    console.error('Error reading JSON file:', err);
    return [];
  }
}

async function ensureDefaultUser() {
  try {
    const defaultEmail = 'default@example.com';

    let user = await User.findOne({email: defaultEmail});
    if (!user) {
      console.log('Creating default user...');
      user = new User({
        name: 'Default User',
        email: defaultEmail,
        password: "_7imDaxinDev",
        cart: {items: []}
      });
      await user.save();
      console.log('Default user created.');
    } else {
      console.log('Default user already exists.');
    }

    return user;
  } catch (err) {
    console.error('Error ensuring default user:', err);
    throw err;
  }
}

export async function migration() {
  try {
    const user = await ensureDefaultUser();
    const data = await getProductsFromFile();

    if (!data.length) {
      console.log('No data found in JSON file.');
      return;
    }

    const products = data.map(e => ({
      ...e,
      userId: user._id
    }));

    const existingProductsCount = await Product.countDocuments();

    if (existingProductsCount === 0) {
      console.log('Migrating data to database...');
      await Product.insertMany(products);
      console.log('Migration completed.');
    } else {
      console.log('Data already exists in the database.');
    }
  } catch (err) {
    console.error('Migration error:', err);
  }
}
