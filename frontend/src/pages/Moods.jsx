import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import SongCard from '../components/SongCard';


const Moods = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const moods = [
    {
      name: 'Happy',
      emoji: '😊',
      color: '#FFD700',
      description: 'Uplifting and cheerful tunes'
    },
    {
      name: 'Sad',
      emoji: '😢',
      color: '#4169E1',
      description: 'Melancholic and emotional songs'
    },
    {
      name: 'Romantic',
      emoji: '💕',
      color: '#FF69B4',
      description: 'Love songs and romantic melodies'
    },
    {
      name: 'Energetic',
      emoji: '⚡',
      color: '#FF4500',
      description: 'High-energy and motivating tracks'
    }
  ];

  const handleMoodSelect = async (moodName) => {
    setSelectedMood(moodName);
    setLoading(true);

    try {
      const response = await api.get(`/songs/mood/${moodName}`);
      setSongs(response.data.songs);
    } catch (error) {
      console.error('Error fetching songs by mood:', error);
      alert('Error loading songs');
    } finally {
      setLoading(false);
    }
  };


  const handleReset = () => {
    setSelectedMood(null);
    setSongs([]);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">🎭 Choose Your Mood</h1>
      <p className="page-subtitle">
        Select a mood to discover songs that match your vibe
      </p>

      {!selectedMood ? (
        
        <div className="moods-grid">
          {moods.map((mood) => (
            <div
              key={mood.name}
              className="mood-card"
              onClick={() => handleMoodSelect(mood.name)}
              style={{ borderColor: mood.color }}
            >
              <div className="mood-emoji">{mood.emoji}</div>
              <h2 className="mood-name">{mood.name}</h2>
              <p className="mood-description">{mood.description}</p>
            </div>
          ))}
        </div>
      ) : (
      
        <div>
          <div className="mood-header">
            <button onClick={handleReset} className="btn btn-secondary">
              ← Back to Moods
            </button>
            <h2>
              {moods.find(m => m.name === selectedMood)?.emoji} {selectedMood} Songs
            </h2>
          </div>

          {loading ? (
            <div className="loading">Loading songs...</div>
          ) : songs.length === 0 ? (
            <div className="no-results">
              <p>No songs found for this mood yet.</p>
              <button 
                onClick={() => navigate('/dashboard')}
                className="btn btn-primary"
              >
                Add a Song
              </button>
            </div>
          ) : (
            <div className="songs-grid">
              {songs.map((song) => (
                <SongCard 
                  key={song._id} 
                  song={song}
                  onLike={(updatedSong) => {
                    setSongs(songs.map(s => 
                      s._id === updatedSong._id ? updatedSong : s
                    ));
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Moods;
