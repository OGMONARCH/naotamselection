import  { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [matricNumber, setMatricNumber] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signin', { email, matricNumber });
            alert(response.data.message);
        } catch (error) {
            alert(`Sign in failed. Please try again. `);
            console.log(error)
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Voter Sign In</h2>
            <form onSubmit={handleSignIn}>
                <div className="mb-4">
                    <label className="block mb-2 text-sm">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm">Matric Number</label>
                    <input
                        type="text"
                        value={matricNumber}
                        onChange={(e) => setMatricNumber(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
