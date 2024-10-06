"use client";
import React from "react";
import EarthWrapper from "../components/EarthWrapper"; // Import the EarthWrapper
import ProgressDots from "../components/ProgressDots"; // Import the ProgressDots

const HomePage: React.FC = () => {
  return (
    <div style={{ position: "relative", height: "400vh" }}> 
      <ProgressDots numSections={5} />
      
      {/* Section 1 & 2: EarthWrapper */}
      <div style={{ height: "200vh" }}>
        <EarthWrapper />
      </div>

      {/* Section 3 */}
      <div style={{ height: "100vh", background: "gray" }}>
        <h2 style={{ textAlign: "center", paddingTop: "50%" }}>Section 3: Information</h2>
      </div>

      {/* Section 4 */}
      <div style={{ height: "100vh", background: "lightgray" }}>
        <h2 style={{ textAlign: "center", paddingTop: "50%" }}>Section 4: Climate Change</h2>
      </div>

      {/* Section 5 */}
      <div style={{ height: "100vh", background: "white" }}>
        <h2 style={{ textAlign: "center", paddingTop: "50%" }}>Section 5: Actions</h2>
      </div>
    </div>
  );
};

export default HomePage;
