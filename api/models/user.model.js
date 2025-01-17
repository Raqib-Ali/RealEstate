import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photo:{
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsPUpLWTuik3cJlvNmbgy04eZOsMYUSjpqkg&s'
    }
}, { timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;