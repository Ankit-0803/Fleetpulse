import { useState, useEffect } from 'react';
import { Robot } from '../types/robot';
import { robotService } from '../services/robotService';

const UPDATE_INTERVAL = 5000;

// Utility function to compute the status of a robot
const computeRobotStatus = (robot: Robot): 'online' | 'offline' | 'low-battery' => {
  if (!robot.isOnline) return 'offline';
  if (robot.batteryPercentage < 20) return 'low-battery';
  return 'online';
};

export function useRobotData() {
  const [robots, setRobots] = useState<Robot[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedRobots = robotService.updateRobotData().map((robot) => ({
        ...robot,
        status: computeRobotStatus(robot), // Add status property dynamically
      }));
      setRobots(updatedRobots);
    }, UPDATE_INTERVAL);

    // Initial load
    const initialRobots = robotService.getRobots().map((robot) => ({
      ...robot,
      status: computeRobotStatus(robot), // Add status for initial data
    }));
    setRobots(initialRobots);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return robots;
}
