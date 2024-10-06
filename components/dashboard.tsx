"use client"
import React, { useEffect, useState } from 'react';
import StatCard from "./stat-chart";
import { Overview } from "./overview"

import { Component as RadarChart } from "./radar_chart"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { processData } from "@/lib/utils"
import { State } from '@/lib/models';

type Statistics = {
    b1: {
        min: number;
        max: number;
        mean: number;
        count: number;
        sum: number;
        std: number;
        median: number;
        majority: number;
        minority: number;
        unique: number;
        histogram: number[][];
        valid_percent: number;
        masked_pixels: number;
        valid_pixels: number;
        percentile_2: number;
        percentile_98: number;
      }
}

type YearData = {
    datetime: string;
    date: Date;
    statistics: Statistics
}

function getYear(yearData: YearData) {
    return yearData.datetime.split('-')[0];
}

function getChartData(data: YearData[]) {
    return data.map((yearData) => {
        return {
            year: getYear(yearData),
            mean: yearData.statistics.b1.mean,
            min: yearData.statistics.b1.min,
            max: yearData.statistics.b1.max,
            count: yearData.statistics.b1.count,
        }
    }).sort((a, b) => a.year.localeCompare(b.year));
}

interface DashboardProps {
  selectedState: State;
  selectedYear: number;
}

export default function Dashboard({ selectedState, selectedYear }: DashboardProps) {
    const [data, setData] = useState<YearData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentYearData = data?.find((yearData) => getYear(yearData) === selectedYear.toString());

    useEffect(() => {
        async function loadData() {
        try {
            setLoading(true);
            setData(null);
            const fetchedData = (await processData(selectedState.value)) as YearData[];
            setData(fetchedData);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
        }

        loadData();
    }, [selectedState]);
    return (
        <>
          {data ? (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Mean" amount={String(Math.floor(currentYearData?.statistics.b1.mean!) || 0)} units="tonne CO₂/km²" />
                <StatCard title="Min" amount={String(Math.floor(currentYearData?.statistics.b1.min!) || 0)} units="tonne CO₂/km²" />
                <StatCard title="Max" amount={String(Math.floor(currentYearData?.statistics.b1.max!) || 0)} units="tonne CO₂/km²" />
                <StatCard title="Total Points" amount={String(Math.floor(currentYearData?.statistics.b1.count!) || 0)} units="" />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview data={getChartData(data)} />
                  </CardContent>
                </Card>
                <RadarChart />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div>Loading...</div>
            </div>
          )}
        </>
      );
}