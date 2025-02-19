import express from 'express'
import { verifyUser } from '../util.js/verfyUser.js';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';

const router = express.Router();


router.post('/create', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing);
router.post('/update/:id', verifyUser, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);


export default router;

