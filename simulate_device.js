const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

function generateSensorData() {
    return {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        temperature: (Math.random() * 40).toFixed(2),
        humidity: (Math.random() * 100).toFixed(2)
    };
}

async function sendDataToHarperDB(data) {
    const config = {
        method: 'post',
        url: 'http://localhost:9926/SensorData',
        headers: { 
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    try {
        const response = await axios(config);
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

setInterval(() => {
    const data = generateSensorData();
    sendDataToHarperDB(data);
}, 5000);
