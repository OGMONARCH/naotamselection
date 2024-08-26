import  { useState } from 'react';
import adminService from '../../services/adminService';

const ManipulateVotes = () => {
  const [candidateName, setCandidateName] = useState('');
  const [newVoteCount, setNewVoteCount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminService.manipulateVote(candidateName, newVoteCount);
      alert(response.message);
    } catch (error) {
      alert('Error updating vote count');
    }
  };

  return (
    <div>
      <h2>Manipulate Votes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          placeholder="Candidate Name"
          required
        />
        <input
          type="number"
          value={newVoteCount}
          onChange={(e) => setNewVoteCount(e.target.value)}
          placeholder="New Vote Count"
          required
        />
        <button type="submit">Update Votes</button>
      </form>
    </div>
  );
};

export default ManipulateVotes;
