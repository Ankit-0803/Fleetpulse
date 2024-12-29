import React from 'react';
import { Cpu, HardDrive, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RobotMetricsProps {
  cpuUsage: number;
  ramUsage: number;
  lastUpdated: string;
}

export function RobotMetrics({ cpuUsage, ramUsage, lastUpdated }: RobotMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center text-sm">
        <Cpu className="w-4 h-4 mr-1 text-blue-500" />
        <span>{cpuUsage}%</span>
      </div>
      
      <div className="flex items-center text-sm">
        <HardDrive className="w-4 h-4 mr-1 text-purple-500" />
        <span>{ramUsage}%</span>
      </div>
      
      <div className="flex items-center text-sm col-span-2">
        <Clock className="w-4 h-4 mr-1 text-gray-500" />
        <span>{formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}</span>
      </div>
    </div>
  );
}