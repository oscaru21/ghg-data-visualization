"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from "@/components/ui/button"

import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import StateSwitcher from "@/components/state-switcher"
import Dashboard from "@/components/dashboard"
import { useState } from "react"
import { Feature, State } from "@/lib/models"
import USStateData from "@/lib/assets/us-states.json";


const states: State[] = USStateData.features.map((feature: Feature) => ({
  label: feature.properties.name,
  value: feature.id,
}));

const years = Array.from({ length: 12 }, (_, i) => 2010 + i);

export default function HomePage() {
    const [selectedState, setSelectedState] = useState<State>(states[0]);
    const [selectedYear, setSelectedYear] = useState<number>(years[0]);

    return (
      <>
        <div className="hidden flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4 mx-4">
              <StateSwitcher states={states} selectedState={selectedState} setSelectedState={setSelectedState}/>
            </div>
          </div>
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                    <span>{selectedYear ? selectedYear : 'Select Year'}</span>
                    <CaretSortIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {years.map((year) => (
                    <DropdownMenuItem key={year} onSelect={() => setSelectedYear(year)}>
                        {year}
                    </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <div className="flex items-center space-x-2">
                <Button>Download</Button>
              </div> */}
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="simulator" >
                  Simulator
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <Dashboard selectedState={selectedState} selectedYear={selectedYear}/>
              </TabsContent>
              <TabsContent value="simulator" className="space-y-4">
               {/* Simulator content */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </>
    )
  }