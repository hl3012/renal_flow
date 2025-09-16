import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import { generateAccessToken, generateRefreshToken} from '../utils/jwt';
import { redis } from '../lib/redis';
import { HydratedDocument } from 'mongoose';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/env';
import { Types } from 'mongoose';

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user: HydratedDocument<IUser> = new User({ name, email, password });
        await user.save();

        // generate token and store refreshtoken to redis
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        await redis.set( `refresh_token:${user._id.toString()}`, refreshToken, "EX", 7 * 24 * 60 * 60);

        return res.status(201).json({ message: 'Registration successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
         });
    } catch (error) {
        console.error("Registration failed", error);
        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(500).json({ message: `Registration failed: ${errorMessage}` });
    }
};

export const login = async (req: Request, res: Response) => {
    res.send({ message: 'Login successful' });
};

export const forgotPassword = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Password reset link sent to your email' });
};
export const resetPassword = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Password reset successful' });
};
export const logout = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Logout successful' });
};
export const getMe = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'User details' });
};

export const refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }
    
    try {
        const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: string };
        const savedRefreshToken = await redis.get(`refresh_token:${payload.userId}`);

        if (!savedRefreshToken) {
            return res.status(401).json({ message: 'No refresh token' });
        }
        if (savedRefreshToken !== refreshToken) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken(new Types.ObjectId(payload.userId));
        const newRefreshToken = generateRefreshToken(new Types.ObjectId(payload.userId)); //renew refresh token for safety
        
        await redis.set(`refresh_token:${payload.userId}`, newRefreshToken, "EX", 7 * 24 * 60 * 60);
        return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    }catch (error) {
        console.error("Refresh token error", error);
        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(500).json({ message: `Refresh token failed: ${errorMessage}` });
    }
};
