"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Earth from '@/components/earth';


// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface EarthWrapperProps {
  earthType?: 'normal' | 'onFire'; // Type of Earth texture
}

const EarthWrapper: React.FC<EarthWrapperProps> = ({ earthType }) => {
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
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      {/* The Canvas will be relative to the container */}
      <Canvas
        style={{ height: '100%', width: '100%' }}
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
        <Earth ref={earthRef} isOnFire={false} /> {/* Pass the isOnFire state */}
      </Canvas>
    </div>
  );
};

export default EarthWrapper;
