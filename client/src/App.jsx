import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!inputText) return;
    setLoading(true);
    setError('');
    setImageUrl(null);
    setAudioUrl(null);

    try {
      // Fetch Image
      const imageResponse = await axios.post('http://localhost:5000/api/image', { text: inputText });
      setImageUrl(imageResponse.data.image);

      // Fetch Audio
      // const audioResponse = await axios.post('http://localhost:5000/api/audio', { text: inputText });
      // setAudioUrl(audioResponse.data.audio);

    } catch (err) {
      console.error(err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Text to Image & Audio</h1>

      <div className="input-group">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text (e.g., cat)"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Processing...' : 'Search'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="output-container">
        {imageUrl && (
          <div className="output-item">
            <h3>Generated Image</h3>
            <img src={imageUrl} alt="Generated" />
          </div>
        )}

        {/* {audioUrl && (
          <div className="output-item">
            <h3>generated Audio</h3>
            <audio controls src={audioUrl} />
          </div>
        )} */}
      </div>
    </div>
  );
}

export default App;
