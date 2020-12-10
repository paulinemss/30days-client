import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>HOMEPAGE</h1>
      <Link to='/courses'>Browse all courses</Link>
      <br />
      <Link to='/challenges'>Find your current challenges</Link>
    </div>
  );
}

export default HomePage;
