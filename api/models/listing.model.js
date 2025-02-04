import mongoose from "mongoose";

const listingschema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    regularPrice:{
        type: Number,
        required: true
    },
    offerPrice:{
        type: Number,
        required: true
    },
    bedrooms:{
        type: Number,
        required: true
    },
    bathrooms:{
        type: Number,
        required: true
    },
    parking:{
        type: Boolean,
        required: true
    },
    type:{
        type: String,
        required: true
    }
}, { timestamps: true});


const Listing = mongoose.model('Listing', listingschema);
export default Listing;