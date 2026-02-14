import { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const LIVE_SENSING_TOPIC = 'agrisense/farm/sensors';
const BROKER_URL = 'wss://broker.hivemq.com:8884/mqtt';

export function useLiveSensing() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('Connecting...');

    useEffect(() => {
        console.log('Attempting to connect to MQTT broker:', BROKER_URL);

        // 1. Connect to the MQTT Broker
        const client = mqtt.connect(BROKER_URL, {
            clientId: `farm_client_${Math.random().toString(16).slice(2, 8)}`,
            clean: true,
            connectTimeout: 4000,
            reconnectPeriod: 1000,
        });

        // 2. Handle Connection
        client.on('connect', () => {
            console.log('✅ Successfully connected to MQTT Broker');
            setStatus('Connected');
            client.subscribe(LIVE_SENSING_TOPIC, (err) => {
                if (err) {
                    console.error('❌ Subscription error:', err);
                    setStatus('Subscription Error');
                } else {
                    console.log('📡 Subscribed to topic:', LIVE_SENSING_TOPIC);
                }
            });
        });

        // 3. Handle Incoming Messages
        client.on('message', (topic, message) => {
            console.log('📥 Received message on topic:', topic);
            if (topic === LIVE_SENSING_TOPIC) {
                try {
                    const parsedData = JSON.parse(message.toString());
                    console.log('📊 Parsed sensor data:', parsedData);
                    setData(parsedData);
                } catch (e) {
                    console.error('❌ Failed to parse message:', e);
                }
            }
        });

        // 4. Handle Errors
        client.on('error', (err) => {
            console.error('❌ MQTT Client Error:', err);
            setStatus('Error: ' + err.message);
        });

        client.on('reconnect', () => {
            console.log('🔄 Reconnecting to MQTT...');
            setStatus('Reconnecting...');
        });

        return () => {
            console.log('🔌 Cleaning up MQTT connection...');
            if (client) client.end();
        };
    }, []);

    return { data, status };
}
