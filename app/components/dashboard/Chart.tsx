'use client';

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ChartData {
  date: string;
  revenue: number;
}

interface ChartProps {
  data: ChartData[];
}

export function Chart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.date}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Revenue</span>
                      <span className="font-bold">${payload[0].value}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 8, fill: 'hsl(var(--primary))' }}
          strokeLinecap="round"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
