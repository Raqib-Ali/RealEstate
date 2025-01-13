import User from "../models/user.model.js";
import bcrypt from "../../node_modules/bcrypt/bcrypt.js"
import { errorHandler } from "../util.js/error.js";

export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;
  
    try {
        const hash = await bcrypt.hash(password, 10);
        const userName = new User({ username, email, password: hash })
        await userName.save();
        res.status(201).json('User created successfully');
    } catch (error) {
       next(error);
    }

};