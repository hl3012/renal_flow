import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from "./routes/auth.route";

dotenv.config();
const app = express();
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);

app.use(cors());
app.use(express.json()); 

app.use("/api/auth", authRoutes);


export default app;
