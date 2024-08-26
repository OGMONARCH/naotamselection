import { useState } from 'react';
import adminService from '../../services/adminService';

const EditVotes = () => {
  const [voterEmail, setVoterEmail] = useState('');
  const [newVoteCount, setNewVoteCount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminService.changeVoterVotes(voterEmail, newVoteCount);
      alert(response.message);
    } catch (error) {
      alert('Error updating voter votes');
    }
  };

  return (
    <div>
      <h2>Change Voter Votes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={voterEmail}
          onChange={(e) => setVoterEmail(e.target.value)}
          placeholder="Voter Email"
          required
        />
        <input
          type="number"
          value={newVoteCount}
          onChange={(e) => setNewVoteCount(e.target.value)}
          placeholder="New Vote Count"
          required
        />
        <button type="submit">Update Voter Votes</button>
      </form>
    </div>
  );
};

export default EditVotes;
