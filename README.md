# Real-Time IoT Dashboard

## Overview

This project is a real-time IoT dashboard that visualizes sensor data using Chart.js. The dashboard connects to a WebSocket server to receive live updates and dynamically displays the data on a line chart.

You can learn more about this project by checking out [the blog post](https://www.thatamazingprogrammer.com/building-a-real-time-iot-dashboard-with-harperdb-and-nodejs).

## Features

* Real-time data updates via WebSocket
* Dynamic chart updates using Chart.js
* Data visualization for temperature and humidity
* Responsive design for various devices

## Getting Started

### Prerequisites

* Node.js
* npm (Node Package Manager)
* A WebSocket server (you can set up your own or use an existing one)

### Installation

```bash
git clone https://github.com/yourusername/real-time-iot-dashboard.git
cd real-time-iot-dashboard
```

Install dependencies:

```bash
npm install
```

## Running the Application

In one terminal run:

```bash
node simulate_device.js 
```

In another terminal run:

```bash
node server.js 
```

Open [http://localhost:3000](http://localhost:3000/)
