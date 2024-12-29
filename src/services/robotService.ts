import { Robot } from '../types/robot';
import { nanoid } from 'nanoid';
import { random } from '../utils/random';
import { locationUtils } from '../utils/location';

const ROBOT_COUNT = 10;
const LOW_BATTERY_THRESHOLD = 20;

function determineStatus(isOnline: boolean, batteryPercentage: number): "offline" | "low-battery" | "online" {
  if (!isOnline) return "offline";
  if (batteryPercentage < LOW_BATTERY_THRESHOLD) return "low-battery";
  return "online";
}


function generateRobot(): Robot {
  const isOnline = random.boolean(0.8); // 80% chance of being online
  const batteryPercentage = random.number(0, 100);
  return {
    id: nanoid(),
    isOnline,
    batteryPercentage,
    cpuUsage: random.number(0, 100),
    ramUsage: random.number(0, 100),
    lastUpdated: new Date().toISOString(),
    location: locationUtils.generateRandomLocation(),
    status: determineStatus(isOnline, batteryPercentage), // Add status
  };
}

let robots: Robot[] = Array.from({ length: ROBOT_COUNT }, generateRobot);

function updateRobotStats(robot: Robot): Robot {
  const isOnline = random.boolean(0.9); // 90% chance of staying online
  const batteryPercentage = Math.max(0, Math.min(100, random.variation(robot.batteryPercentage, 10)));
  return {
    ...robot,
    isOnline,
    batteryPercentage,
    cpuUsage: random.number(0, 100),
    ramUsage: random.number(0, 100),
    lastUpdated: new Date().toISOString(),
    location: locationUtils.updateLocation(robot.location),
    status: determineStatus(isOnline, batteryPercentage), // Update status
  };
}

export const robotService = {
  getRobots: () => robots,
  updateRobotData: () => {
    robots = robots.map(updateRobotStats);
    return robots;
  },
  LOW_BATTERY_THRESHOLD,
};
