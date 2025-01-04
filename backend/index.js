import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from "mongoose"

import adminRoute from './routes/admin.js'
import shopRouter from './routes/shop.js'
import authRouter from './routes/auth.js'

import {PORT, URI} from "./config.js"
import {migration} from "./util/migration.js"


const app = express()
//config
app.use(bodyParser.json())
app.use(cors())

//router
app.use(authRouter)
app.use('/admin', adminRoute)
app.use(shopRouter)

app.use((err, req, res, next) => {
  console.error(err);

  if (err.httpStatusCode === 500) {
    res.status(500).json({error: "Internal Server Error", message: err.message});
  } else if (err.httpStatusCode === 404) {
    res.status(404).json({error: "Resource Not Found", message: err.message});
  } else if (err.httpStatusCode === 400) {
    res.status(400).json({error: "Bad Request", message: err.message});
  } else {
    res.status(500).json({error: "Something went wrong.", message: err.message});
  }
});


mongoose
  .connect(URI)
  .then(async () => {
    try {
      await migration();
      app.listen(PORT, () => console.log("Server is running on port 5000"));
    } catch (error) {
      console.error('Migration error:', error);
    }
  })
  .catch(error =>
    console.error("Failed to connect to MongoDB:", error))