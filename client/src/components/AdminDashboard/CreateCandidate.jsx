import  { useState } from 'react';
import adminService from '../../services/adminService';

const CreateCandidate = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminService.createCandidate({ name, position });
      setMessage(response.message);
    } catch (err) {
      setMessage(`${err} creating candidate.`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Candidate Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <button type="submit">Create Candidate</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CreateCandidate;
