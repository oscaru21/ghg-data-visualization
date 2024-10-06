"use client";
import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import gsap from 'gsap';

// Helper function to convert latitude/longitude to spherical coordinates
const latLongToSpherical = (lat: number, lng: number, radius = 2) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return { x, y, z };
};

// This forwardRef allows the EarthWrapper to access functions inside the Earth component
const Earth = forwardRef((props: any, ref) => {
  const earthRef = useRef<any>();
  const cloudsRef = useRef<any>();
  const [albedoMap, bumpMap, cloudsMap] = useLoader(TextureLoader, [
    '/textures/land_ocean_ice.png',
    '/textures/bump_map.png',
    '/textures/cloud_combined.jpg'
  ]); 

  // Expose zoomToLocation to the parent via ref
  useImperativeHandle(ref, () => ({
    zoomToLocation(lat: number, lng: number) {
      console.log(`Zooming to lat: ${lat}, lng: ${lng}`);
      
      const { x, y, z } = latLongToSpherical(lat, lng);
    
      console.log(`Spherical coordinates: x: ${x}, y: ${y}, z: ${z}`);
    
      gsap.to(earthRef.current.rotation, {
        duration: 2,
        x: Math.PI / 2 - y,
        y: z,
        z: -x,
        onComplete: () => console.log('Zoom animation completed'),
        onError: (err: Error) => console.error('Error during zoom animation:', err)
      });
    
      gsap.to(earthRef.current.position, {
        duration: 2,
        z: 3.5, // Simulating zoom-in
        onComplete: () => console.log('Zoom position completed'),
        onError: (err:Error) => console.error('Error during zoom position:', err)
      });
    }
    
  }));

  useFrame(() => {
    if (earthRef.current) {
      // Rotate the Earth slightly for realism
      earthRef.current.rotation.y += 0.001;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0015; // Clouds rotate slightly faster
    }
  });

  return (
    <>
      {/* Earth Mesh */}
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          map={albedoMap} // Albedo (earth texture)
          bumpMap={bumpMap} // Bump map
          bumpScale={0.02} // Set the bump scale 
        />
      </mesh>
      
      {/* Cloud Layer (Separate mesh with transparency) */}
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.02, 32, 32]} /> {/* Slightly larger than the Earth */}
        <meshStandardMaterial
          map={cloudsMap} // Clouds texture
          transparent={true} // Ensure transparency for clouds
          opacity={0.65} // Adjust opacity to make clouds semi-transparent
        />
      </mesh>
    </>
  );
});

export default Earth;
