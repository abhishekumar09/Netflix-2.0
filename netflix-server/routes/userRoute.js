import express from 'express'
import { getUserInfo, Login, Logout, Register } from '../controllers/user.js';
import {verifytoken} from '../middleware/verifyToken.js';
const router=express.Router()


router.post('/register',Register)
router.post('/login',Login)
router.get('/logout',Logout)
router.get('/auth',verifytoken,getUserInfo)

export default router;