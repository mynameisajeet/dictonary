import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [word, setWord] = useState('');
  const [wordData, setWordData] = useState(null);

  const fetchWordData = async () => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setWordData(response.data[0]);
    } catch (error) {
      console.error("Error fetching word data:", error);
      setWordData(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWordData();
  };

  return (
    <div className="container">
      <div className="word-search-card">
        <div className='developer-info'>Developed by- Ajeet Agarwal</div>
        <h2>Dictionary</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter a word..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>

      {wordData && (
        <div className="word-info-card">
          <h3>Word: {wordData.word}</h3>
          {wordData.meanings.map((meaning, index) => (
            <div key={index}>
              <p><strong>Part of Speech:</strong> {meaning.partOfSpeech}</p>
              <p><strong>Definition:</strong> {meaning.definitions[0].definition}</p>
              {meaning.definitions[0].example && (
                <p><strong>Example:</strong> {meaning.definitions[0].example}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
