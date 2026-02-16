import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">
          🎵 Mood Music
        </h1>
        <p className="home-tagline">
          Discover the perfect soundtrack for every emotion
        </p>
        <p className="home-description">
          Browse songs by mood, create your personal collection, and share your favorites with the community.
        </p>

        <div className="home-actions">
          {isAuthenticated ? (
            <button 
              onClick={() => navigate('/dashboard')}
              className="btn btn-primary btn-large"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎭</div>
            <h3>Mood-Based Discovery</h3>
            <p>Find songs that match your current emotional state</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Personal Favorites</h3>
            <p>Save your favorite songs for easy access anytime</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Like & Share</h3>
            <p>Show appreciation for songs and contribute to the community</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">➕</div>
            <h3>Add Your Music</h3>
            <p>Share your favorite songs with others</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
