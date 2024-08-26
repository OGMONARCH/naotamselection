// import  { useState } from 'react';
import CreateCandidate from './CreateCandidate';
import ManipulateVotes from './ManipulateVotes';
import ChangeVoterVotes from './ChangeVoterVotes';

const AdminDashboard = () => {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <CreateCandidate />
      <ManipulateVotes />
      <ChangeVoterVotes />
    </div>
  );
};

export default AdminDashboard;
