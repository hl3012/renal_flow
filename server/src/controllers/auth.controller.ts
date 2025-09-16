import { Request, Response } from 'express';
import User from '../models/user.model';

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

        const user = new User({ name, email, password });
        await user.save();

        return res.status(201).json({ message: 'Registration successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
         });
    } catch (error) {
        console.error("Registration failed", error);
        return res.status(500).json({ message: 'Registration failed' });
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
