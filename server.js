import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import itemRoutes from './routes/itemRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import unitRoutes from './routes/unitRoutes.js';
import companyRoutes from './routes/companyRoutes.js';

dotenv.config();
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/companies', companyRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.log(err));
