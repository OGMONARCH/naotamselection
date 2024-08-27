import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-green-500 p-4">
            <nav className="flex justify-between items-center">
                <Link to="/" className="text-black font-bold text-lg">Voting App</Link>
                <div>
                    <Link to="/admin-login" className="text-black mr-4">Admin Login</Link>
                    <Link to="/vote-result" className="text-black">View Results</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
