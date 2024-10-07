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
                <SelectItem value="0.1">10%</SelectItem>
                <SelectItem value="0.15">15%</SelectItem>
                <SelectItem value="0.2">20%</SelectItem>
                <SelectItem value="0.25">25%</SelectItem>
              </SelectContent>
            </Select>

            {/* Add more margin-top to give space between dropdown and slider */}
            <div className="mt-20 w-full h-full text-size-20">
              <Slider value={sliderValue} onValueChange={setSliderValue} max={10} min={1} />
            </div>

            <div className="mt-4 w-full h-full text-size-20">
              You have selected a carbon reduction rate of {carbonReductionRate * 100}%.
              The current state is: {selectedState.label}.
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-1/2 h-[500px]">
        <CardHeader>
          <CardTitle>Earth Simulator</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-full">
          {/* EarthWrapper frame */}
          <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden">
            <EarthWrapper earthType="normal" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
