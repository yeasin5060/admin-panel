import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './src/db/db.js';
import authRouter from './src/routes/user.route.js'

dotenv.config();

const app = express()

//Database connection
await connectDB()

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);



const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));