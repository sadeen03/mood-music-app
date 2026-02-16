import { useState, useEffect } from 'react';
import api from '../utils/api';
import SongCard from '../components/SongCard';


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    fetchFavorites();
  }, []);

  
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/favorites');
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (songId) => {
    try {
      await api.delete(`/users/favorites/${songId}`);
      
      setFavorites(favorites.filter(song => song._id !== songId));
      alert('Removed from favorites!');
    } catch (error) {
      alert('Error removing from favorites');
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">⭐ My Favorites</h1>
      <p className="page-subtitle">Your personally curated music collection</p>

      {loading ? (
        <div className="loading">Loading favorites...</div>
      ) : favorites.length === 0 ? (
        <div className="no-results">
          <p>You haven't added any favorites yet.</p>
          <p>Start exploring songs and add your favorites!</p>
        </div>
      ) : (
        <div className="songs-grid">
          {favorites.map((song) => (
            <div key={song._id} className="favorite-item">
              <SongCard 
                song={song}
                showFavoriteButton={false}
                onLike={(updatedSong) => {
                  setFavorites(favorites.map(s => 
                    s._id === updatedSong._id ? updatedSong : s
                  ));
                }}
              />
              <button
                onClick={() => handleRemoveFavorite(song._id)}
                className="btn btn-remove"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
