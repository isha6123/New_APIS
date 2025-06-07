// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const itemRoutes = require('./routes/itemRoutes');
// const app = express();
// const path = require('path');

// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB error:', err));

// app.use('/api/items', itemRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import itemRoutes from './routes/itemRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import unitRoutes from './routes/unitRoutes.js';
import companyRoutes from './routes/companyRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup uploads folder for image access
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/companies', companyRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB connection error:', err));
