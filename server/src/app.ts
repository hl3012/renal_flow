import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.get('/api/health', (req, res) => {
    res.json({status: 'ok', message:'RenalFlow server running'})
});

export default app;
