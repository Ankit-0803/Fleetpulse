# Robot Fleet Monitoring 

The **Robot Fleet Monitoring System** is a tool designed to visualize and monitor the status and telemetry of a fleet of robots in real-time. It provides interactive mapping, detailed robot statistics, and dynamic updates.

## Features

### 1. **Live Updates**
- **WebSocket Integration:** The system uses WebSockets for efficient, real-time data transfer.
- Updates the robot statistics and map location every 5 seconds without requiring a page reload.

### 2. **Robot Overview**
- Displays detailed information for each robot, including:
  - Unique Robot Identifier (UUID)
  - Connection Status: Online/Offline
  - Battery Level
  - CPU and RAM Utilization
  - Last Updated Timestamp
  - Location (Latitude and Longitude)

### 3. **Map Integration**
- Built with **Leaflet.js** to provide an interactive, real-time map.
- Shows live locations of robots, dynamically updated as new telemetry data is received.

### 4. **Alert System**
- Highlights conditions such as:
  - Offline robots
  - Low battery levels (<20%)

### 5. **Real-Time Statistics**
- Displays the total number of:
  - Active Robots (Online)
  - Offline Robots
  - Robots with Low Battery (<20%)
    

## Technologies Used

### Frontend:
- **React.js**: For building the responsive interface.
- **Leaflet.js**: For rendering the real-time map.

### Backend:
- **FastAPI**: For simulating and delivering telemetry data.
- **WebSockets**: For real-time communication.
- **Mock Data**: Generated using `fake_robot_data.json`.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/robot-fleet-monitoring.git
   cd Robot Fleet Monitoring

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev
