import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageVoters = () => {
  const [voters, setVoters] = useState([]);
  const [editVoter, setEditVoter] = useState(null);

  // Fetch all voters
  const fetchVoters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/voters');
      setVoters(response.data);
    } catch (error) {
      alert('Error fetching voters');
      console.log(error)
    }
  };

  useEffect(() => {
    fetchVoters();
  }, []);

  // Handle update voter
  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/admin/update-voter/${id}`,
        editVoter,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      setEditVoter(null);
      fetchVoters(); // Refresh the list after update
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating voter');
    }
  };

  // Handle delete voter
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/admin/delete-voter/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message);
      fetchVoters(); // Refresh the list after deletion
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting voter');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Manage Voters</h1>

      {/* List of Voters */}
      <h2 className="text-2xl font-bold mb-4">Voters List</h2>
      <ul>
        {voters.map((voter) => (
          <li key={voter._id} className="mb-4 p-4 border rounded">
            {editVoter?._id === voter._id ? (
              <div>
                <input
                  type="text"
                  value={editVoter.name}
                  onChange={(e) => setEditVoter({ ...editVoter, name: e.target.value })}
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="text"
                  value={editVoter.matricNumber}
                  onChange={(e) => setEditVoter({ ...editVoter, matricNumber: e.target.value })}
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="text"
                  value={editVoter.email}
                  onChange={(e) => setEditVoter({ ...editVoter, email: e.target.value })}
                  className="mb-2 p-2 border rounded w-full"
                />
                <button
                  onClick={() => handleUpdate(voter._id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditVoter(null)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p>Name: {voter.name}</p>
                <p>Matric Number: {voter.matricNumber}</p>
                <p>Email: {voter.email}</p>
                <p>Votes Cast: {voter.votes.length}</p>
                <button
                  onClick={() => setEditVoter(voter)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(voter._id)}
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

export default ManageVoters;
