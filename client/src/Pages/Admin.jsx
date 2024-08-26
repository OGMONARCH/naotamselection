import CreateCandidate from '../components/AdminDashboard/CreateCandidate';
import ManipulateVotes from '../components/AdminDashboard/ManipulateVotes';
import EditVotes from '../components/AdminDashboard/EditVotes';

const Admin = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <CreateCandidate />
      <ManipulateVotes />
      <EditVotes />
    </div>
  );
};

export default Admin;
