import express from 'express';
import dotenv from 'dotenv';

import projectRoutes from './routes/projectRoutes';
import { connectDB } from './config/db';

dotenv.config();

connectDB();

const app = express();

// Habilitar la lectura de JSON
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);

export default app;
