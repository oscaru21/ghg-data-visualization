"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Earth from './Earth'; // Import the Earth component

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const EarthWrapper: React.FC = () => {
  const earthRef = useRef<any>(null); // Create a ref for the Earth component
  const [isOnFire, setIsOnFire] = useState(false); // State to switch Earth texture

  useEffect(() => {
    // Setup scroll trigger for switching Earth appearance
    ScrollTrigger.create({
      trigger: '.fire-section', // The section where we want to change the Earth
      start: 'top center', // Start when the top of the section reaches the center of the viewport
      onEnter: () => setIsOnFire(true), // Set Earth on fire
      onLeaveBack: () => setIsOnFire(false), // Restore the normal Earth
    });
  }, []);

  return (
    <div style={{ height: '200vh', width: '100vw', position: 'relative' }}>
      {/* Fix the canvas in place to ensure the Earth stays visible */}
      <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw' }}>
        <Canvas
          style={{ height: '100vh', width: '100vw' }}
          gl={{
            antialias: true,
            alpha: false,
          }}
          camera={{ position: [0, 0, 5] }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000002'); // Dark blue color for the universe
          }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[-50, 0, 30]} intensity={3} castShadow={true} />
          <Earth ref={earthRef} isOnFire={isOnFire} /> {/* Pass the isOnFire state */}
        </Canvas>
      </div>

      {/* Content Section 1 */}
      <div className="normal-section" style={{ height: '100vh', width: '100%' }}>
        <h2 style={{ textAlign: 'center', color: 'white' }}>Scroll to see Earth on Fire</h2>
      </div>

      {/* Content Section 2 (Scroll-triggered section) */}
      <div className="fire-section" style={{ height: '100vh', width: '100%' }}>
        <h2 style={{ textAlign: 'center', color: 'white' }}>Earth on Fire</h2>
      </div>
    </div>
  );
};

export default EarthWrapper;
