import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Login successful' });
};
export const register = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Registration successful' });
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
