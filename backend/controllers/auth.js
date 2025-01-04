import User from "../models/user.js";
import bcrypt from "bcryptjs"
import {generateToken} from "../util/jwtHelper.js";
import {sendEmail} from "../util/mailer.js";
import {validationResult} from "express-validator";

export async function register(req, res) {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()[0]});
  }

  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password !== confirmPassword) {
    return res.status(404).json({error: "error"});
  }

  const user = await User.findOne({email: email})
  if (user) {
    return res.status(409).json({error: "Already exist"});
  }
  const hashPassword = await bcrypt.hash(password, 12)
  const newUser = new User({
    email: email,
    name: email.split("@")[0],
    password: hashPassword,
    cart: {items: []}
  })
  const result = await newUser.save()
  await sendEmail(email, "Create account inform", "Something text", "<h1>You successfully signed up!</h1>")
  return res.status(201).json({result: result})
}

export async function login(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()[0]});
  }
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({email: email})

  if (!user) {
    return res.status(404).json({error: "Email not found!"});
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(401).send({error: "Invalid credentials!"});

  const token = generateToken(user)

  return res.status(200).json({
    message: "Login Successfull",
    email: user.email,
    token,
  })
}