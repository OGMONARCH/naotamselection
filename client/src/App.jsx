import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Voting from './Pages/Voting';
import Results from './Pages/Results';
import Navbar from './components/Navbar/Navbar';
import TokenVerification from './components/TokenVerification/TokenVerification';
import PrivateRoute from './components/ProtectedRoutes/PrivateRoutes';
import AdminRoute from './components/ProtectedRoutes/AdminRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/voting" element={<PrivateRoute><Voting /></PrivateRoute>} />
        <Route path="/results" element={<Results />} />
        <Route path="/verify-token" element={<TokenVerification />} />
      </Routes>
    </Router>
  );
};

export default App;
