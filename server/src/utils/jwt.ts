import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';

export const generateAccessToken = (userId: Types.ObjectId) => {
    return jwt.sign({ userId: userId.toString() }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: Types.ObjectId) => {
    return jwt.sign({ userId: userId.toString() }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};



