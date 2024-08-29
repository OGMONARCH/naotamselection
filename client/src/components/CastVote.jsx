import { useState } from 'react';
import axios from 'axios';

const CastVote = () => {
    const [votes, setVotes] = useState([{ candidateName: '', position: '' }]);

    const handleVoteChange = (index, field, value) => {
        const newVotes = [...votes];
        newVotes[index][field] = value;
        setVotes(newVotes);
    };

    const handleAddVote = () => {
        setVotes([...votes, { candidateName: '', position: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/vote/cast-vote', { votes });
            alert(response.data.message);
        } catch (error) {
            alert(`Error submitting vote ${error}`);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Cast Your Vote</h2>
            <form onSubmit={handleSubmit}>
                {votes.map((vote, index) => (
                    <div key={index} className="mb-4">
                        <label className="block mb-2 text-sm">Candidate Name</label>
                        <input
                            type="text"
                            value={vote.candidateName}
                            onChange={(e) => handleVoteChange(index, 'candidateName', e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <label className="block mb-2 text-sm mt-2">Position</label>
                        <input
                            type="text"
                            value={vote.position}
                            onChange={(e) => handleVoteChange(index, 'position', e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                ))}
                                <button
                    type="button"
                    onClick={handleAddVote}
                    className="w-full bg-purple-600 text-white p-2 rounded mt-4"
                >
                    Add Another Vote
                </button>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded mt-4"
                >
                    Submit Votes
                </button>
            </form>
        </div>
    );
};

export default CastVote;
