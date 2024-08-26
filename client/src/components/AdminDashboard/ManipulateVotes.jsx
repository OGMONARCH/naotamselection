import  { useState } from 'react';
import adminService from '../../services/adminService';

const ManipulateVotes = () => {
  const [candidateName, setCandidateName] = useState('');
  const [newVoteCount, setNewVoteCount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminService.manipulateVotes(candidateName, newVoteCount);
      setMessage(response.message);
    } catch (err) {
      setMessage(`${err} updating votes.`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Candidate Name"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
      />
      <input
        type="number"
        placeholder="New Vote Count"
        value={newVoteCount}
        onChange={(e) => setNewVoteCount(e.target.value)}
      />
      <button type="submit">Update Votes</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ManipulateVotes;
