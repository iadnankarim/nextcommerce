'use client';

import { useState } from 'react';
import { Chart } from './Chart';
import { Button } from '@/components/ui/button';

interface ChartData {
  date: string;
  revenue: number;
}

interface ChartWrapperProps {
  weekData: ChartData[];
  monthData: ChartData[];
  yearData: ChartData[];
}

type TimeRange = 'week' | 'month' | 'year';

export function ChartWrapper({ weekData, monthData, yearData }: ChartWrapperProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  const getChartData = () => {
    switch (timeRange) {
      case 'week':
        return weekData;
      case 'month':
        return monthData;
      case 'year':
        return yearData;
      default:
        return weekData;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={timeRange === 'week' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeRange('week')}
        >
          Week
        </Button>
        <Button
          variant={timeRange === 'month' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeRange('month')}
        >
          Month
        </Button>
        <Button
          variant={timeRange === 'year' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeRange('year')}
        >
          Year
        </Button>
      </div>
      <Chart data={getChartData()} />
    </div>
  );
}
