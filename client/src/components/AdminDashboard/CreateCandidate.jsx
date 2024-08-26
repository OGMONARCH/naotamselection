import  { useState } from 'react';
import adminService from '../../services/adminService';

const CreateCandidate = () => {
  const [candidateName, setCandidateName] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminService.createCandidate(candidateName, position);
      alert(response.message);
    } catch (error) {
      alert('Error creating candidate');
    }
  };

  return (
    <div>
      <h2>Create Candidate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          placeholder="Candidate Name"
          required
        />
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position"
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateCandidate;
