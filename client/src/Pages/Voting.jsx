import  { useState, useEffect } from 'react';
import voteService from '../services/voteService';

const Voting = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedVotes, setSelectedVotes] = useState({});

  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await voteService.getCandidates();
      setCandidates(response);
    };
    fetchCandidates();
  }, []);

  const handleVoteChange = (position, candidateName) => {
    setSelectedVotes({ ...selectedVotes, [position]: candidateName });
  };

  const handleSubmit = async () => {
    const votes = Object.keys(selectedVotes).map((position) => ({
      position,
      candidateName: selectedVotes[position],
    }));
    await voteService.submitVotes(votes);
  };

  return (
    <div>
      <h1>Voting Page</h1>
      {candidates.map((candidate) => (
        <div key={candidate.name}>
          <h3>{candidate.position}</h3>
          <input
            type="radio"
            name={candidate.position}
            value={candidate.name}
            onChange={() => handleVoteChange(candidate.position, candidate.name)}
          />
          {candidate.name}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Votes</button>
    </div>
  );
};

export default Voting;
