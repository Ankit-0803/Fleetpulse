import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Robot } from '../types/robot';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  robots: Robot[];
  selectedRobotId?: string;
}

export function Map({ robots, selectedRobotId }: MapProps) {
  const center = { lat: 40.7128, lng: -74.006 }; // NYC coordinates

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="w-full h-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {robots.map((robot) => (
        <Marker
          key={robot.id}
          position={[robot.location.lat, robot.location.lng]}
          opacity={robot.isOnline ? 1 : 0.5}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">Robot {robot.id.slice(0, 8)}</p>
              <p>Status: {robot.isOnline ? 'Online' : 'Offline'}</p>
              <p>Battery: {robot.batteryPercentage}%</p>
              <p>CPU: {robot.cpuUsage}%</p>
              <p>RAM: {robot.ramUsage}%</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}