import { useEffect, useState } from 'react';
import axios from 'axios';

const CandidateList = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('/api/candidates');
                setCandidates(response.data);
            } catch (error) {
                alert(`Error fetching candidates ${error}`);
            }
        };
        fetchCandidates();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Candidates List</h2>
            <ul>
                {candidates.map((candidate) => (
                    <li key={candidate._id} className="mb-2">
                        {candidate.name} - {candidate.position}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CandidateList;
