import  { useState, useEffect } from 'react';
import voteService from '../services/voteService';

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await voteService.getResults();
      setResults(response);
    };
    fetchResults();
  }, []);

  return (
    <div>
      <h1>Results</h1>
      {results.map((result) => (
        <div key={result.name}>
          <h3>{result.position}</h3>
          <p>{result.name}: {result.votes} votes</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
