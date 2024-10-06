import React from 'react';
import EarthWrapper from '../components/EarthWrapper'; // Import the EarthWrapper

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Interactive Earth Visualization</h1>
      <EarthWrapper /> {/* Use the EarthWrapper component */}
    </div>
  );
};

export default HomePage;