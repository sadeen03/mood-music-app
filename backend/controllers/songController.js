import Song from '../models/Song.js';


export const getAllSongs = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } }, 
          { artist: { $regex: search, $options: 'i' } }
        ]
      };
    }

  
    const songs = await Song.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: songs.length,
      songs
    });

  } catch (error) {
    console.error('Get songs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching songs.' 
    });
  }
};


export const getSongsByMood = async (req, res) => {
  try {
    const { mood } = req.params;

 
    const validMoods = ['Happy', 'Sad', 'Romantic', 'Energetic'];
    if (!validMoods.includes(mood)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid mood. Choose from: Happy, Sad, Romantic, Energetic.' 
      });
    }

    const songs = await Song.find({ mood }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      mood,
      count: songs.length,
      songs
    });

  } catch (error) {
    console.error('Get songs by mood error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching songs by mood.' 
    });
  }
};


export const createSong = async (req, res) => {
  try {
    const { title, artist, genre, mood, youtubeUrl } = req.body;

    if (!title || !artist || !mood) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide title, artist, and mood.' 
      });
    }

 
    const validMoods = ['Happy', 'Sad', 'Romantic', 'Energetic'];
    if (!validMoods.includes(mood)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid mood. Choose from: Happy, Sad, Romantic, Energetic.' 
      });
    }

    const song = new Song({
      title,
      artist,
      genre,
      mood,
      youtubeUrl
    });

    await song.save();

    res.status(201).json({
      success: true,
      message: 'Song created successfully!',
      song
    });

  } catch (error) {
    console.error('Create song error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating song.' 
    });
  }
};


export const likeSong = async (req, res) => {
  try {
    const { id } = req.params;

    
    const song = await Song.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } }, 
      { new: true } 
    );

    if (!song) {
      return res.status(404).json({ 
        success: false, 
        message: 'Song not found.' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Song liked!',
      song
    });

  } catch (error) {
    console.error('Like song error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error liking song.' 
    });
  }
};
