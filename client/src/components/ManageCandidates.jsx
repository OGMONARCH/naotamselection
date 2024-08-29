import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState({ name: '', position: '' });
  const [editCandidate, setEditCandidate] = useState(null);

  // Fetch all candidates
  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/candidates');
      setCandidates(response.data);
    } catch (error) {
      alert('Error fetching candidates');
      console.log(error)
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Handle create candidate
  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/admin/create-candidate',
        newCandidate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      fetchCandidates(); // Refresh the list after creation
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating candidate');
    }
  };

  // Handle update candidate
  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/admin/update-candidate/${id}`,
        editCandidate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      setEditCandidate(null);
      fetchCandidates(); // Refresh the list after update
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating candidate');
    }
  };

  // Handle delete candidate
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/admin/delete-candidate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message);
      fetchCandidates(); // Refresh the list after deletion
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting candidate');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Manage Candidates</h1>

      {/* Create Candidate */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Create Candidate</h2>
        <input
          type="text"
          placeholder="Name"
          value={newCandidate.name}
          onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Position"
          value={newCandidate.position}
          onChange={(e) => setNewCandidate({ ...newCandidate, position: e.target.value })}
          className="mb-2 p-2 border rounded w-full"
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Create
        </button>
      </div>

      {/* List of Candidates */}
      <h2 className="text-2xl font-bold mb-4">Candidates List</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate._id} className="mb-4 p-4 border rounded">
            {editCandidate?._id === candidate._id ? (
              <div>
                <input
                  type="text"
                  value={editCandidate.name}
                  onChange={(e) => setEditCandidate({ ...editCandidate, name: e.target.value })}
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="text"
                  value={editCandidate.position}
                  onChange={(e) => setEditCandidate({ ...editCandidate, position: e.target.value })}
                  className="mb-2 p-2 border rounded w-full"
                />
                <button
                  onClick={() => handleUpdate(candidate._id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditCandidate(null)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p>Name: {candidate.name}</p>
                <p>Position: {candidate.position}</p>
                <button
                  onClick={() => setEditCandidate(candidate)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(candidate._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-2"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCandidates;
