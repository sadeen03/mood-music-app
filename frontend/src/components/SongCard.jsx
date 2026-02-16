import { useState } from 'react';
import api from '../utils/api';


const SongCard = ({ song, onLike, onFavorite, showFavoriteButton = true }) => {
  const [localLikes, setLocalLikes] = useState(song.likes);
  const [isLiking, setIsLiking] = useState(false);


  const handleLike = async () => {
    if (isLiking) return; 
    setIsLiking(true);
    setLocalLikes(prev => prev + 1); 

    try {
      const response = await api.put(`/songs/${song._id}/like`);
      if (onLike) onLike(response.data.song);
    } catch (error) {
      
      setLocalLikes(prev => prev - 1);
      console.error('Error liking song:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleFavorite = async () => {
    try {
      await api.post(`/users/favorites/${song._id}`);
      if (onFavorite) onFavorite(song);
      alert('Added to favorites!');
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding to favorites');
    }
  };

 
  const getMoodEmoji = (mood) => {
    const emojis = {
      Happy: '😊',
      Sad: '😢',
      Romantic: '💕',
      Energetic: '⚡'
    };
    return emojis[mood] || '🎵';
  };

  return (
    <div className="song-card">
      <div className="song-header">
        <h3 className="song-title">{song.title}</h3>
        <span className="song-mood">
          {getMoodEmoji(song.mood)} {song.mood}
        </span>
      </div>

      <p className="song-artist">by {song.artist}</p>
      
      {song.genre && (
        <p className="song-genre">Genre: {song.genre}</p>
      )}

      {song.youtubeUrl && (
        <a 
          href={song.youtubeUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="song-link"
        >
          🎬 Watch on YouTube
        </a>
      )}

      <div className="song-actions">
        <button 
          onClick={handleLike} 
          className="btn btn-like"
          disabled={isLiking}
        >
          ❤️ {localLikes}
        </button>

        {showFavoriteButton && (
          <button 
            onClick={handleFavorite} 
            className="btn btn-favorite"
          >
            ⭐ Favorite
          </button>
        )}
      </div>
    </div>
  );
};

export default SongCard;
