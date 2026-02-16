import express from 'express';
import { 
  addToFavorites, 
  getFavorites, 
  removeFromFavorites 
} from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
router.get('/favorites', authMiddleware, getFavorites);

router.post('/favorites/:songId', authMiddleware, addToFavorites);

router.delete('/favorites/:songId', authMiddleware, removeFromFavorites);

export default router;
