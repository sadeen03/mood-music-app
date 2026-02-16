import User from '../models/User.js';
import Song from '../models/Song.js';

export const addToFavorites = async (req, res) => {
  try {
    const { songId } = req.params;
    const userId = req.user._id; 

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ 
        success: false, 
        message: 'Song not found.' 
      });
    }
    const user = await User.findById(userId);
    
    if (user.favorites.includes(songId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Song already in favorites.' 
      });
    }

    user.favorites.push(songId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Song added to favorites!',
      favorites: user.favorites
    });

  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding song to favorites.' 
    });
  }
};


export const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate('favorites');

    res.status(200).json({
      success: true,
      count: user.favorites.length,
      favorites: user.favorites
    });

  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching favorites.' 
    });
  }
};


export const removeFromFavorites = async (req, res) => {
  try {
    const { songId } = req.params;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: songId } }, 
      { new: true }
    ).populate('favorites');

    res.status(200).json({
      success: true,
      message: 'Song removed from favorites!',
      favorites: user.favorites
    });

  } catch (error) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error removing song from favorites.' 
    });
  }
};
