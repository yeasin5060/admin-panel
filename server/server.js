import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './src/db/db.js';
import authRouter from './src/routes/user.route.js'
import adRouter from './src/routes/ad.routes.js'
import adminRouter from './src/routes/admin.route.js'
import analyticsRouter from './src/routes/analytics.route.js'
import adminSettingRouter from './src/routes/adSetting.route.js'

dotenv.config();

const app = express()

//Database connection
await connectDB()

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/ad', adRouter);
app.use('/api/admin', adminRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/admin/setting', adminSettingRouter);



const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));