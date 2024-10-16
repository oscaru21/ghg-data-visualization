"use client";
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, MeshBasicMaterial, AdditiveBlending, Color } from 'three';
import * as THREE from 'three';
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

// ForwardRef component for the Earth with atmosphere
const Earth = forwardRef(({ isOnFire }: { isOnFire: boolean }, ref) => {
  const earthRef = useRef<any>();
  const cloudsRef = useRef<any>();
  const atmosphereRef = useRef<any>();

  // Load textures for Earth and clouds
  const [albedoMap, bumpMap, cloudsMap] = useLoader(TextureLoader, [
    '/textures/land_ocean_ice.png', // Earth texture
    '/textures/bump_map.png', // Bump map for surface relief
    '/textures/cloud_combined.jpg', // Cloud texture
  ]);

  // Expose zoomToLocation to the parent via ref
  useImperativeHandle(ref, () => ({
    zoomToLocation(lat: number, lng: number) {
      const { x, y, z } = latLongToSpherical(lat, lng);
      gsap.to(earthRef.current.rotation, { duration: 2, x: Math.PI / 2 - y, y: z, z: -x });
    },
  }));

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // Rotate the Earth for realism
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0015; // Rotate clouds slightly faster
    }
  });

  return (
    <>
      {/* Earth Mesh */}
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          map={albedoMap} // Albedo map for Earth texture
          bumpMap={bumpMap} // Bump map for surface relief
          bumpScale={0.02} // Adjust bump scaling
          emissive={isOnFire ? new Color(0xff4500) : new Color(0x000000)} // Glowing red when "on fire"
          emissiveIntensity={isOnFire ? 1 : 0} // Control the intensity of the glow
        />
      </mesh>

      {/* Atmosphere Layer using a transparent MeshBasicMaterial */}
      <mesh ref={atmosphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.03, 32, 32]} /> {/* Slightly larger than the Earth */}
        <meshBasicMaterial
          color={isOnFire ? new Color(0xff4500) : new Color(0x87ceeb)} // Atmosphere color changes based on fire state
          transparent={true}
          opacity={0.3} // Slight opacity for the atmosphere
          blending={AdditiveBlending} // Additive blending for glow effect
          side={THREE.BackSide} // Render on the backside of the atmosphere sphere for a halo effect
        />
      </mesh>

      {/* Cloud Layer (Separate mesh with transparency) */}
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.02, 32, 32]} /> {/* Slightly larger than the Earth */}
        <meshStandardMaterial map={cloudsMap} transparent opacity={0.7} /> {/* Transparent clouds */}
      </mesh>
    </>
  );
});

export default Earth;
