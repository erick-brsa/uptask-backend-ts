import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import projectRoutes from './routes/projectRoutes';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';

dotenv.config();

connectDB();

const app = express();
app.use(cors(corsConfig));
// Habilitar la lectura de JSON
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);

export default app;
