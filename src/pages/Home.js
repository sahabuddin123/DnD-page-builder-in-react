import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Drag-and-Drop Builder</h1>
      <Link to="/builder">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Go to Builder</button>
      </Link>
    </div>
  );
};

export default Home;
