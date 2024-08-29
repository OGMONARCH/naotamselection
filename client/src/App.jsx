import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import AdminLogin from './components/AdminLogin';
import CandidateList from './components/CandidateList';
import CastVote from './components/CastVote';
import FinalVoteResult from './components/FinalVoteResult';
import Header from './components/Header';
import AdminSignup from './components/AdminSignup';
import CreateCandidate from './components/CreateCandidate';
import ManageCandidates from './components/ManageCandidates';
import ManageVoters from './components/ManageVoters';

function App() {
    return (
        <Router>
            <div className="bg-dark-purple min-h-screen">
                <Header />
                    <div className="container  h-full mx-auto mt-4">
                        <Routes>
                            <Route path="/" element={<SignIn />} />
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route path="/admin/signup" element={<AdminSignup />} />
                            <Route path="/admin/create-candidate" element={<CreateCandidate />} />
                            <Route path="/admin/manage-candidates" element={<ManageCandidates />} />
                            <Route path="/admin/manage-voters" element={<ManageVoters />} />
                            <Route path="/candidates" element={<CandidateList />} />
                            <Route path="/cast-vote" element={<CastVote />} />
                            <Route path="/vote-result" element={<FinalVoteResult />} />
                        </Routes>
                    </div>
            </div>
        </Router>
    );
}

export default App;
