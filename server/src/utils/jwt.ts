import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/env';

export const generateAccessToken = (userId: Types.ObjectId) => {
    return jwt.sign({ userId: userId.toString() }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};
export const generateRefreshToken = (userId: Types.ObjectId) => {
    return jwt.sign({ userId: userId.toString() }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};



