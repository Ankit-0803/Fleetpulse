import React, { useState, useEffect } from 'react';
import { Filter, Bot, Wifi, WifiOff, Battery, Bell, RotateCw, AlertCircle } from 'lucide-react';
import { RobotList } from './components/RobotList';
import { Map } from './components/Map';
import { useRobotData } from './hooks/useRobotData';
import { useRobotFilter, FilterType } from './hooks/useRobotFilter';
import { Robot } from './types/robot';
import RobotStatusChart from './components/RobotStatusChart';

// Interface for time series data point
interface TimeSeriesPoint {
  time: string;
  online: number;
  offline: number;
  lowBattery: number;
}

function App() {
  const robots = useRobotData();
  const { filter, setFilter, filteredRobots } = useRobotFilter(robots);
  const [selectedRobotId, setSelectedRobotId] = useState<string>();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesPoint[]>([]);

  // Update time series data every 15 seconds
  useEffect(() => {
    const updateTimeSeriesData = () => {
      const now = new Date();
      const newDataPoint = {
        time: now.toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
        online: robots.filter(r => r.status === 'online').length,
        offline: robots.filter(r => r.status === 'offline').length,
        lowBattery: robots.filter(r => r.status === 'low-battery').length,
      };

      setTimeSeriesData(prevData => {
        const newData = [...prevData, newDataPoint];
        // Keep only the last 8 data points (2 minutes worth of data)
        if (newData.length > 8) {
          return newData.slice(-8);
        }
        return newData;
      });
      
      setLastUpdate(now);
    };

    // Initial update
    updateTimeSeriesData();

    // Set up interval for updates
    const interval = setInterval(updateTimeSeriesData, 15000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [robots]);

  const handleRobotSelect = (robot: Robot) => {
    setSelectedRobotId(robot.id);
  };

  const handleRefresh = () => {
    setLastUpdate(new Date());
    // Trigger robot data refresh logic here
  };

  const criticalAlerts = robots.filter(r => r.status === 'offline' || r.status === 'low-battery').length;

  const metrics = [
    {
      title: "Total Robots",
      value: robots.length,
      icon: Bot,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
      valueColor: "text-gray-800"
    },
    {
      title: "Online Robots",
      value: robots.filter((robot) => robot.status === 'online').length,
      icon: Wifi,
      color: "text-green-600",
      bgColor: "bg-green-100",
      valueColor: "text-green-600"
    },
    {
      title: "Offline Robots",
      value: robots.filter((robot) => robot.status === 'offline').length,
      icon: WifiOff,
      color: "text-red-600",
      bgColor: "bg-red-100",
      valueColor: "text-red-600"
    },
    {
      title: "Low Battery Robots",
      value: robots.filter((robot) => robot.status === 'low-battery').length,
      icon: Battery,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      valueColor: "text-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200">
      <div className="container mx-auto px-6 py-6">
        <header className="mb-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-semibold text-gray-800 mb-2">
                Robot Fleet Dashboard
              </h1>
              <p className="text-gray-700 text-lg">
                Monitoring <span className="font-semibold">{robots.length}</span> robots in real-time
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-lg shadow-sm px-4 py-2 flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">Alerts: </span>
                <span className={`font-semibold ${criticalAlerts > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {criticalAlerts}
                </span>
              </div>
              <button
                onClick={handleRefresh}
                className="bg-white rounded-lg shadow-sm px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <RotateCw className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">Refresh</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
              >
                <option value="all">All Robots</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="low-battery">Low Battery</option>
              </select>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Robot List</h2>
            </div>
            <div className="h-[calc(100vh-340px)] overflow-y-auto">
              <RobotList
                robots={filteredRobots}
                onRobotSelect={handleRobotSelect}
                selectedRobotId={selectedRobotId}
              />
            </div>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Robot Locations</h2>
            </div>
            <div className="h-[calc(100vh-340px)]">
              <Map robots={filteredRobots} selectedRobotId={selectedRobotId} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div 
                key={metric.title} 
                className="bg-white rounded-lg shadow-md relative overflow-hidden"
              >
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-800">
                      {metric.title}
                    </h3>
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${metric.valueColor}`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-gray-500">
                    {((metric.value / robots.length) * 100).toFixed(1)}% of fleet
                  </div>
                </div>
                <div className={`absolute inset-0 opacity-10 ${metric.bgColor}`} />
              </div>
            );
          })}
        </div>

        {/* Status Timeline Chart */}
        <RobotStatusChart data={timeSeriesData} />
      </div>
    </div>
  );
}

export default App;