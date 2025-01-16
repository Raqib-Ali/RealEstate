import User from "../models/user.model.js";
import bcrypt from "../../node_modules/bcrypt/bcrypt.js"
import { errorHandler } from "../util.js/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const userName = new User({ username, email, password: hash })
        await userName.save();
        res.status(201).json('User created successfully');
    } catch (error) {
        next(error);
    }

};

export const signin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const validate = await User.findOne({ email });
        if (!validate) return next(errorHandler(404, 'User not found!'));
        const validPassword = bcrypt.compareSync(password, validate.password)
        if (!validPassword) return next(errorHandler(404, 'Wrong Password!'));
        const token = jwt.sign({ id: validate._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validate._doc
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }

};