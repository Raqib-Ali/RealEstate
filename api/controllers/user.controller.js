import User from "../models/user.model.js";
import { errorHandler } from "../util.js/error.js"
import bcryptjs from "../../node_modules/bcrypt/bcrypt.js"

export const test = (req, res) => {
    res.send('user route')
}

export const updateUser = async (req, res, next) => {

    if (req.user.id !== req.params.id) return next(errorHandler(403, 'You can only Update your own account')); 

    try {

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, {new: true})

        const {password, ...rest} = updatedUser._doc

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }



}