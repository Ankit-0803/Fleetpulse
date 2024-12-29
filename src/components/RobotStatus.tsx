import React from 'react';
import { Battery, Signal, WifiOff } from 'lucide-react';
import { robotService } from '../services/robotService';

interface RobotStatusProps {
  isOnline: boolean;
  batteryPercentage: number;
}

export function RobotStatus({ isOnline, batteryPercentage }: RobotStatusProps) {
  const isLowBattery = batteryPercentage < robotService.LOW_BATTERY_THRESHOLD;

  return (
    <div className="flex items-center gap-2">
      {isOnline ? (
        <Signal className="w-5 h-5 text-green-500" />
      ) : (
        <WifiOff className="w-5 h-5 text-red-500" />
      )}
      <Battery className={`w-4 h-4 ${isLowBattery ? 'text-red-500' : 'text-green-500'}`} />
      <span className={`text-sm ${isLowBattery ? 'text-red-500 font-medium' : ''}`}>
        {batteryPercentage}%
      </span>
    </div>
  );
}