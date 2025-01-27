import User from "../models/user.model.js";
import { errorHandler } from "../util.js/error.js";
import jwt from 'jsonwebtoken';
import bcrypt from "../../node_modules/bcrypt/bcrypt.js"

export const signup = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hash })
        await user.save();
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
        res.cookie('access_token', token, { httpOnly: true, secure: false })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {

    try {
        const { username, email, photo } = req.body;
        const validate = await User.findOne({ email });
        if (!validate) {
            const generatedPassword = Math.random().toString(32).slice(-8)
            const hash = await bcrypt.hash(generatedPassword, 10);
            const user = new User({ username: username, email, password: hash, photo })
            await user.save();
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc
            res.cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            const token = jwt.sign({ id: validate._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = validate._doc
            res.cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        }

    } catch (error) {
        next(error);
    }
};

