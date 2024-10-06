"use client";

import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import Earth from './Earth'; // Import the Earth component

// Capital coordinates of selected states
const stateCapitals = {
  California: { lat: 38.5767, lng: -121.4944 }, // Sacramento
  "New York": { lat: 42.6526, lng: -73.7562 },  // Albany
  "Washington D.C.": { lat: 38.8951, lng: -77.0364 }, // Washington, D.C.
  Texas: { lat: 30.2672, lng: -97.7431 },       // Austin
  Florida: { lat: 30.4383, lng: -84.2807 },     // Tallahassee
};

const EarthWrapper: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('California');
  const earthRef = useRef<any>(null); // Create a ref for the Earth component

  const handleCoordinatesChange = (state: string) => {
    const { lat, lng } = stateCapitals[state];
    setSelectedState(state);
    // Call the Earth component's zoomToLocation function
    if (earthRef.current) {
      earthRef.current.zoomToLocation(lat, lng);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <Earth ref={earthRef} /> {/* Pass the ref to the Earth component */}
      </Canvas>

      <div className="input-controls mt-4 px-8">
        <Label htmlFor="state-select" className="block mb-2 text-lg font-medium">
          Select a state:
        </Label>
        <Select onValueChange={(value) => handleCoordinatesChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(stateCapitals).map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EarthWrapper;
