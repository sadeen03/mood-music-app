import { useState, useEffect } from 'react';
import api from '../utils/api';
import SongCard from '../components/SongCard';


const Dashboard = () => {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    mood: 'Happy',
    youtubeUrl: ''
  });

  
  useEffect(() => {
    fetchSongs();
  }, []);

 
  const fetchSongs = async (search = '') => {
    try {
      setLoading(true);
      const url = search ? `/songs?search=${search}` : '/songs';
      const response = await api.get(url);
      setSongs(response.data.songs);
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSongs(query); 
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSong = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/songs', formData);
      
      
      setSongs([response.data.song, ...songs]);
      
      
      setFormData({
        title: '',
        artist: '',
        genre: '',
        mood: 'Happy',
        youtubeUrl: ''
      });
      setShowAddForm(false);
      
      alert('Song added successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding song');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🎵 All Songs</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary"
        >
          {showAddForm ? 'Cancel' : '+ Add Song'}
        </button>
      </div>

      {/* Add Song Form */}
      {showAddForm && (
        <div className="add-song-form">
          <h2>Add New Song</h2>
          <form onSubmit={handleAddSong}>
            <div className="form-row">
              <div className="form-group">
                <label>Song Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter song title"
                />
              </div>

              <div className="form-group">
                <label>Artist *</label>
                <input
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  required
                  placeholder="Enter artist name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Genre</label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="e.g., Pop, Rock, Jazz"
                />
              </div>

              <div className="form-group">
                <label>Mood *</label>
                <select
                  name="mood"
                  value={formData.mood}
                  onChange={handleChange}
                  required
                >
                  <option value="Happy">😊 Happy</option>
                  <option value="Sad">😢 Sad</option>
                  <option value="Romantic">💕 Romantic</option>
                  <option value="Energetic">⚡ Energetic</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>YouTube URL</label>
              <input
                type="url"
                name="youtubeUrl"
                value={formData.youtubeUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Add Song
            </button>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search by title or artist..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* Songs List */}
      {loading ? (
        <div className="loading">Loading songs...</div>
      ) : songs.length === 0 ? (
        <div className="no-results">
          <p>No songs found. {searchQuery && 'Try a different search term.'}</p>
        </div>
      ) : (
        <div className="songs-grid">
          {songs.map((song) => (
            <SongCard 
              key={song._id} 
              song={song}
              onLike={(updatedSong) => {
                // Update song in list
                setSongs(songs.map(s => 
                  s._id === updatedSong._id ? updatedSong : s
                ));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
