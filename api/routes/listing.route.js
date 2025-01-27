import express from 'express'
import { verifyUser } from '../util.js/verfyUser.js';
import { createListing } from '../controllers/listing.controller.js';

const router = express.Router();


router.post('/create', verifyUser, createListing);


export default router;

