import express from 'express';
import { deleteUser, SignOutUser, test, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../util.js/verfyUser.js';


 const router = express.Router();

 router.get('/test', test);
 router.post('/update/:id', verifyUser, updateUser);
 router.delete('/delete/:id', verifyUser, deleteUser);
 router.get('/signout', SignOutUser);

export default router;