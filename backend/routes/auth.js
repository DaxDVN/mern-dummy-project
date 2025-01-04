import express from 'express'
import {login, register} from "../controllers/auth.js";
import {body} from "express-validator"
import User from "../models/user.js";

const router = express.Router();

router.post('/register', [
  body('email').notEmpty().isEmail().withMessage('Email is invalid').custom((value, {req}) => {
    return User.findOne({email: value}).then(user => {
      if (user) {
        return Promise.reject('Email address already exists!');
      }
    });
  }),
  body('password').trim().notEmpty().isLength({min: 8}).withMessage("Password must be at least 6 chars long"),
  body('confirmPassword').trim().notEmpty().isLength({min: 8}).withMessage("Password must be at least 6 chars long"),
], register)
router.post('/login', [
  body('email').notEmpty().isEmail().withMessage('Email is invalid').custom((value, {req}) => {
    return User.findOne({email: value}).then(user => {
      if (!user) {
        return Promise.reject('Email address not found!');
      }
    });
  }),
  body('password').trim().notEmpty().isLength({min: 8}).withMessage("Password must be at least 6 chars long")
], login)

export default router;