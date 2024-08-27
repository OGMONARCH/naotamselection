import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import AdminLogin from './components/AdminLogin';
import CandidateList from './components/CandidateList';
import CastVote from './components/CastVote';
import FinalVoteResult from './components/FinalVoteResult';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <div className="container mx-auto mt-4">
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/candidates" element={<CandidateList />} />
                    <Route path="/cast-vote" element={<CastVote />} />
                    <Route path="/vote-result" element={<FinalVoteResult />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
