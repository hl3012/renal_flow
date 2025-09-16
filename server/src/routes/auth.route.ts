import { Router } from 'express';
import { login, register, forgotPassword, resetPassword, logout, getMe, refreshToken } from '../controllers/auth.controller';


const router = Router();

router.post('/register', register);
router.post('/refresh', refreshToken); //refresh token to get accesstoken

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);
router.get('/me', getMe);


export default router;
