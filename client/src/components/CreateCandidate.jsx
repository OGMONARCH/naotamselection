import { useState } from 'react';
import axios from 'axios';

const CreateCandidate = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/admin/create-candidate',
        { name, position },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      // Clear input fields after successful creation
      setName('');
      setPosition('');
    } catch (error) {
      if (error.response) {
        // If the error is a response error, display the message from the server
        setError(error.response.data.message || 'Failed to create candidate');
      } else {
        // General error handling (network error, etc.)
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Create Candidate</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          disabled={loading}
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Candidate'}
        </button>
      </div>
    </div>
  );
};

export default CreateCandidate;

