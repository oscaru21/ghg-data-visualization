"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface CustomSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  value: number[]; // Expecting an array of values
  onValueChange: (value: number[]) => void; // Prop for handling value change
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  CustomSliderProps
>(({ className, value, onValueChange, ...props }, ref) => (
  <div className="relative">
    {/* Display the current value */}
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-full px-3 py-1 text-sm font-medium shadow">
      Selecting {value[0]} years {/* Display the value dynamically */}
    </div>
    <div className="flex justify-between mt-2 text-xs font-medium">
      {/* Min and Max Labels */}
      <span className="text-gray-500">min: 1 year</span>
      <span className="text-gray-500">max: 10 yr</span>
    </div>
    <SliderPrimitive.Root
      ref={ref}
      value={value}
      onValueChange={onValueChange}
      className={cn("relative flex w-full touch-none select-none items-center mt-2", className)}
      {...props}
    >
      {/* Make the track thicker */}
      <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  </div>
));

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
