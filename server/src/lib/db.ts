import mongoose from 'mongoose';

export const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error('MongoDB connection string is missing in .env');
        process.exit(1);
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        
        console.log(`MongoDB connected:${conn.connection.host}`);
    } catch (error) {
        console.log('MongoDB connection failed', error);
        process.exit(1);
    }
};
