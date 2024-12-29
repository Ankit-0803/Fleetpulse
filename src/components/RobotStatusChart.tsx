import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TimeSeriesPoint {
  time: string;  // Format: mm:ss
  online: number;
  offline: number;
  lowBattery: number;
}

interface RobotStatusChartProps {
  data: TimeSeriesPoint[];
}

const formatTime = (timeStr: string) => {
  const now = new Date();
  const currentHour = now.getHours().toString().padStart(2, '0');
  return `${currentHour}:${timeStr}`;
};

const RobotStatusChart: React.FC<RobotStatusChartProps> = ({ data }) => {
  const formattedData = data.map(point => ({
    ...point,
    time: formatTime(point.time)
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Robot Status Timeline</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              label={{ value: 'Time (HH:mm:ss)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              label={{ 
                value: 'Number of Robots', 
                angle: -90, 
                position: 'insideLeft', 
                style: { textAnchor: 'middle' } 
              }} 
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="online" 
              stroke="#10B981" 
              strokeWidth={2} 
              dot={{ fill: '#10B981' }} 
              name="Online" 
            />
            <Line 
              type="monotone" 
              dataKey="offline" 
              stroke="#EF4444" 
              strokeWidth={2} 
              dot={{ fill: '#EF4444' }} 
              name="Offline" 
            />
            <Line 
              type="monotone" 
              dataKey="lowBattery" 
              stroke="#F59E0B" 
              strokeWidth={2} 
              dot={{ fill: '#F59E0B' }} 
              name="Low Battery" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RobotStatusChart;