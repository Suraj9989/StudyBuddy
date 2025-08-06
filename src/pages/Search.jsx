import { useState } from 'react';
import axios from "axios";
import Header from "../components/Header";
import "./Search.css";

function Search() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
  try {
    const res = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`);
    setResult(res.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

  return (
    <div>
    <Header/>
    <div className="search-container">
      <h1>Search Topics</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter a topic (e.g., Gravity)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          
          
        />
        <button onClick={handleSearch} >Search</button>
      </div>

      {result && (
        <div className="result">
          <h2>{result.title}</h2>
          <p>{result.extract}</p>
          {result.thumbnail && <img src={result.thumbnail.source} alt={result.title} />}
          <a href={result.content_urls.desktop.page} target="_blank" rel="noopener noreferrer">
            Read more on Wikipedia
          </a>
        </div>
      )}
    </div>
    </div>
  );
}

export default Search;
