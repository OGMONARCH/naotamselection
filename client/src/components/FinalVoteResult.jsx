import  { useEffect, useState } from 'react';
import axios from 'axios';

const VoteResult = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vote/results');
                setResults(response.data);
            } catch (error) {
                alert(`Error fetching results  ${error}`);
            }
        };
        fetchResults();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Vote Results</h2>
            <ul>
                {results.map((result) => (
                    <li key={result._id} className="mb-2">
                        {result.candidateName} - {result.count} votes
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VoteResult;
