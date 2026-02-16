import mongoose from 'mongoose';


const songSchema = new mongoose.Schema({
 
  title: {
    type: String,
    required: [true, 'Song title is required'],
    trim: true
  },
  
 
  artist: {
    type: String,
    required: [true, 'Artist name is required'],
    trim: true
  },
  
 
  genre: {
    type: String,
    trim: true,
    default: 'Unknown'
  },
 
  mood: {
    type: String,
    enum: ['Happy', 'Sad', 'Romantic', 'Energetic'],
    required: [true, 'Mood is required']
  },
 
  youtubeUrl: {
    type: String,
    trim: true
  },
  
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  
  
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {

  timestamps: true
});

const Song = mongoose.model('Song', songSchema);

export default Song;
