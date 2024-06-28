const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve index.html at the root endpoint
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// WebSocket server handling client connections
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Function to fetch latest data and update clients via WebSocket
async function fetchDataAndUpdateClients() {
    const config = {
        method: 'post',
        url: 'http://localhost:9925',  // HarperDB endpoint
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            operation: 'sql',
            sql: 'SELECT * FROM data.SensorData ORDER BY timestamp DESC LIMIT 1'
        })
    };
    
    try {
        const response = await axios(config);
        const latestData = response.data;
        
        // Check if the response data is an array (expected format)
        if (Array.isArray(latestData)) {
            // Broadcast latest data to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(latestData));
                }
            });
        } else {
            console.error('Unexpected data format:', latestData);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Periodically fetch data and update clients every 5 seconds
setInterval(fetchDataAndUpdateClients, 5000);
