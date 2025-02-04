import express from 'express';
import { deleteUser, showListing, SignOutUser, test, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../util.js/verfyUser.js';


 const router = express.Router();

 router.get('/test', test);
 router.post('/update/:id', verifyUser, updateUser);
 router.delete('/delete/:id', verifyUser, deleteUser);
 router.get('/signout', SignOutUser);
 router.get('/listings/:id', verifyUser, showListing);

export default router;