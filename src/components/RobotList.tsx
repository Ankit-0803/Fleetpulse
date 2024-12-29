import React from 'react';
import { Robot } from '../types/robot';
import { RobotStatus } from './RobotStatus';
import { RobotMetrics } from './RobotMetrics';

interface RobotListProps {
  robots: Robot[];
  onRobotSelect: (robot: Robot) => void;
  selectedRobotId?: string;
}

export function RobotList({ robots, onRobotSelect, selectedRobotId }: RobotListProps) {
  return (
    <div className="overflow-auto h-full">
      {robots.map((robot) => (
        <div
          key={robot.id}
          className={`p-4 mb-2 rounded-lg cursor-pointer transition-colors ${
            selectedRobotId === robot.id
              ? 'bg-blue-100 hover:bg-blue-200'
              : 'bg-white hover:bg-gray-50'
          } ${!robot.isOnline && 'opacity-60'}`}
          onClick={() => onRobotSelect(robot)}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700">
              Robot {robot.id.slice(0, 8)}
            </span>
            <RobotStatus
              isOnline={robot.isOnline}
              batteryPercentage={robot.batteryPercentage}
            />
          </div>
          
          <RobotMetrics
            cpuUsage={robot.cpuUsage}
            ramUsage={robot.ramUsage}
            lastUpdated={robot.lastUpdated}
          />
        </div>
      ))}
    </div>
  );
}