import { useState, useMemo } from 'react';
import { Robot } from '../types/robot';

export type FilterType = 'all' | 'online' | 'offline' | 'low-battery';

export function useRobotFilter(robots: Robot[]) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredRobots = useMemo(() => {
    return robots.filter((robot) => {
      switch (filter) {
        case 'online':
          return robot.status === 'online';
        case 'offline':
          return robot.status === 'offline';
        case 'low-battery':
          return robot.status === 'low-battery';
        default:
          return true; // 'all' filter returns all robots
      }
    });
  }, [robots, filter]);

  return { filter, setFilter, filteredRobots };
}

