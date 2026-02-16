import express from 'express';
import { 
  getAllSongs, 
  getSongsByMood, 
  createSong, 
  likeSong 
} from '../controllers/songController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllSongs);


router.get('/mood/:mood', getSongsByMood);

router.post('/', authMiddleware, createSong);

router.put('/:id/like', likeSong);

export default router;
