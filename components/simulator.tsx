"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EarthWrapper from "@/components/earth-wrapper";
import { State } from "@/lib/models";

interface SimulatorProps {
  selectedState: State;
}

export default function Simulator({ selectedState }: SimulatorProps) {
  const [carbonReductionRate, setCarbonReductionRate] = useState(0);
  const [sliderValue, setSliderValue] = useState([5]);
  const [prediction, setPrediction] = useState<number | null>(null); // Store the prediction
  //const baseURL = process.env.NEXT_PUBLIC_API_URL;
  //const baseURL = "https://682e-142-181-184-245.ngrok-free.app";
  const baseURL = "https://ghg-be-2nbd.onrender.com";

  // Function to fetch the prediction from the API
  const fetchPrediction = async () => {
    const year = 2021 + sliderValue[0];
    const stateName = selectedState.label;
    const reductionRate = carbonReductionRate;
    

    console.log("Fetching prediction for:", { stateName, year, reductionRate });
    console.log("API URL:", `${baseURL}/items/${stateName}/${year}/${reductionRate}`);

    try {
        const response = await fetch(
            
            `${baseURL}/items/${stateName}/${year}/${reductionRate}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    //"ngrok-skip-browser-warning": "true",
                },
            }

        );
        console.log("API response status:", response.status);

        if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
        }
        console.log("API response:", response);
       
          
        const data = await response.json();
        console.log("API data:", data);
        setPrediction(data.predictions[0]); 
        console.log("Prediction:", data.predictions[0]);
    } catch (error) {
        console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="flex gap-8">
      <Card className="w-1/2 h-[500px]">
        <CardHeader>
          <CardTitle>Disaster prediction</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-full">
          <div className="w-full">
            {/* Dropdown for carbon reduction rate */}
            <Select onValueChange={(value) => setCarbonReductionRate(parseFloat(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a carbon reduction rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0%</SelectItem>
                <SelectItem value="0.001">0.1%</SelectItem>
                <SelectItem value="0.002">0.2%</SelectItem>
                <SelectItem value="0.005">0.5%</SelectItem>
                <SelectItem value="0.01">1%</SelectItem>
                <SelectItem value="0.02">2%</SelectItem>
              </SelectContent>
            </Select>

            {/* Add more margin-top to give space between dropdown and slider */}
            <div className="mt-8 w-full h-full text-size-20">
              <Slider value={sliderValue} onValueChange={setSliderValue} max={10} min={1} />
            </div>

            {/* Display selected carbon rate and state */}
            <div className="mt-4 w-full h-full text-size-20">
              You have selected a carbon reduction rate of {carbonReductionRate * 100}%.
              The current state is: {selectedState.label}.
            </div>

            {/* Fetch Prediction Button */}
            <div className="mt-4">
                <button
                    onClick={fetchPrediction}
                    className="bg-black text-white px-4 py-2 rounded-lg transition transform hover:scale-105 active:bg-gray-700 active:scale-95"
                >
                    Get Prediction
                </button>
            </div>

            {/* Display the prediction result */}
            {prediction !== null && (
              <div className="mt-4 w-full h-full text-size-20">
                Prediction: {prediction} natural disasters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Earth Simulator */}
      <Card className="w-1/2 h-[500px]">
        <CardHeader>
          <CardTitle>Earth Simulator</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-full">
          <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden">
            <EarthWrapper earthType="normal" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
