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
    imgUrls:{
        type: Array,
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
    furnished:{
        type: Boolean,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    userRef:{
        type: String,
        required: true
    },
    offer:{
        type: Boolean,
        required: true
    }
}, { timestamps: true});


const Listing = mongoose.model('Listing', listingschema);
export default Listing;