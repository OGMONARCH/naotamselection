import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-900 p-4">
            <nav className="flex justify-between items-center">
                <Link to="/" className="text-white font-bold text-lg">Naotems Election</Link>
                <div>
                    <Link to="/admin/login" className="text-white mr-4">Admin Login</Link>
                    <Link to="/vote-result" className="text-white">View Results</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
