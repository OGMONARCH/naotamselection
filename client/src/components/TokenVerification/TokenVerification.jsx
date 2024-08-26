import  { useState } from 'react';
import voteService from '../../services/voteService';

const TokenVerification = () => {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await voteService.verifyToken(token);
      setMessage(response.message);
    } catch (err) {
      setMessage(`${err} 
        Invalid or expired token.`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button type="submit">Verify</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default TokenVerification;
