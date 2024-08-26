import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [candidates, setCandidates] = useState([]);
    const [votes, setVotes] = useState({});
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const res = await axios.get('/api/vote/candidates');
                
                // Ensure that the response data is an array
                if (Array.isArray(res.data)) {
                    setCandidates(res.data);
                } else {
                    console.error('Unexpected response format:', res.data);
                    setCandidates([]);  // Fallback to an empty array
                }
            } catch (error) {
                console.error('Failed to fetch candidates:', error);
                setCandidates([]);  // Fallback to an empty array
            }
        };
        fetchCandidates();
    }, []);

    const handleVoteChange = (e, position) => {
        const selectedCandidate = e.target.value;
        setVotes((prevVotes) => ({
            ...prevVotes,
            [position]: selectedCandidate,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const voterId = localStorage.getItem('voterId');
            const res = await axios.post('/api/vote/submit', { voterId, votes, token });
            alert(res.data.message);
            navigate('/result');
        } catch (error) {
            console.error('Failed to submit votes:', error);
        }
    };

    return (
        <div>
            <h2>Vote for Your Candidates</h2>
            <form onSubmit={handleSubmit}>
                {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                        <div key={candidate.position}>
                            <label>{candidate.position}</label>
                            <select onChange={(e) => handleVoteChange(e, candidate.position)}>
                                {candidate.options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))
                ) : (
                    <p>No candidates available.</p>
                )}
                <input
                    type="password"
                    placeholder="Enter Token to Confirm"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
                <button type="submit">Submit Votes</button>
            </form>
        </div>
    );
};

export default Home;
