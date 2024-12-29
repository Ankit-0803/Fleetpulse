export interface Robot {
  id: string;
  isOnline: boolean;
  batteryPercentage: number;
  cpuUsage: number;
  ramUsage: number;
  lastUpdated: string;
  location: {
    lat: number;
    lng: number;
  };
  get status(): 'online' | 'offline' | 'low-battery';
}
