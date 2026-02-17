import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import songRoutes from './routes/songRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ⚠️ API Routes لازم يكونوا قبل Frontend routes
app.use('/auth', authRoutes);
app.use('/songs', songRoutes);
app.use('/users', userRoutes);

// Health check endpoint للـ API
app.get('/api', (req, res) => {
  res.json({ 
    success: true, 
    message: '🎵 Mood Music API is running!' 
  });
});

// ✅ Frontend Static Files (بعد API routes)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ✅ كل الطلبات التانية تروح للـ Frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});