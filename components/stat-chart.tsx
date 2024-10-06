import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

interface StatCardProps {
  title: string;
  units: string;
  amount: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, units, amount }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}  {units}</div>
      </CardContent>
    </Card>
  );
};

export default StatCard;