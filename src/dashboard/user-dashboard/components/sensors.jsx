import { LineChart } from 'react-chartkick'
import 'chartkick/chart.js'
import { useState, useEffect, useRef } from 'react'

import axios from 'axios'
import { useQuery } from 'react-query'
import { useLiveSensing } from '../../../hooks/useLiveSensing'

import "../styles/insightReports.css"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sensors = () => {
    const { data: mqttData, status: mqttStatus } = useLiveSensing();
    const [sensorHistory, setSensorHistory] = useState({
        Temperature: {},
        Humidity: {},
        Moisture: {},
        Light: {}
    });

    const isFirstLoad = useRef(true);

    // Initial fetch from local NodeMCU server
    const { isLoading, error, data: initialData } = useQuery('sensors-data', async () => {
        const res = await axios({
            method: 'get',
            url: 'http://localhost:8001/data',
        });

        if (!res) return null;

        const sensorsData = res.data.data;
        const fetchedData = {
            Temperature: {},
            Humidity: {},
            Moisture: {},
            Light: {}
        };

        if (Array.isArray(sensorsData)) {
            sensorsData.forEach(point => {
                const timestamp = point.timestamp;
                fetchedData.Temperature[timestamp] = parseFloat(point.temperature).toFixed(2);
                fetchedData.Humidity[timestamp] = parseFloat(point.humidity).toFixed(2);
                fetchedData.Moisture[timestamp] = parseFloat(point.moisture).toFixed(2);
                fetchedData.Light[timestamp] = parseFloat(point.light).toFixed(2);
            });
        }
        return fetchedData;
    }, {
        staleTime: Infinity,
        enabled: isFirstLoad.current
    });

    // Initialize state with fetched data
    useEffect(() => {
        if (initialData && isFirstLoad.current) {
            setSensorHistory(initialData);
            isFirstLoad.current = false;
        }
    }, [initialData]);

    // Update state with live MQTT data
    useEffect(() => {
        if (mqttData) {
            const timestamp = new Date().toLocaleTimeString();
            setSensorHistory(prev => ({
                Temperature: { ...prev.Temperature, [timestamp]: parseFloat(mqttData.temperature).toFixed(2) },
                Humidity: { ...prev.Humidity, [timestamp]: parseFloat(mqttData.humidity).toFixed(2) },
                Moisture: { ...prev.Moisture, [timestamp]: parseFloat(mqttData.moisture).toFixed(2) },
                Light: { ...prev.Light, [timestamp]: parseFloat(mqttData.light).toFixed(2) }
            }));

            // Limit history to last 20 points for performance
            const limitHistory = (obj) => {
                const keys = Object.keys(obj);
                if (keys.length > 20) {
                    const newObj = {};
                    keys.slice(keys.length - 20).forEach(k => newObj[k] = obj[k]);
                    return newObj;
                }
                return obj;
            };

            setSensorHistory(prev => ({
                Temperature: limitHistory(prev.Temperature),
                Humidity: limitHistory(prev.Humidity),
                Moisture: limitHistory(prev.Moisture),
                Light: limitHistory(prev.Light)
            }));
        }
    }, [mqttData]);

    const getMinMax = (dataObj) => {
        const values = Object.values(dataObj).map(v => parseFloat(v));
        if (values.length === 0) return { min: 0, max: 100 };
        const min = Math.min(...values);
        const max = Math.max(...values);
        // Add padding and handle equal min/max
        if (min === max) return { min: min - 5, max: max + 5 };
        return { min, max };
    };

    if (isLoading && isFirstLoad.current) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading historical data...</div>
    if (error) {
        console.log('An error has occurred: ' + error.message)
        toast.error("Error fetching historical data")
    }

    return (
        <div style={{ position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: '-40px',
                right: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: mqttStatus === 'Connected' ? '#4CAF50' : '#FF9800'
            }}>
                <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: mqttStatus === 'Connected' ? '#4CAF50' : '#FF9800',
                    boxShadow: mqttStatus === 'Connected' ? '0 0 8px #4CAF50' : 'none'
                }}></div>
                {mqttStatus === 'Connected' ? 'LIVE SENSING ACTIVE' : mqttStatus}
            </div>

            <div className="charts-container">
                <p>Temperature data (°C)</p>
                <LineChart data={
                    [{ "name": "Temperature", "data": sensorHistory.Temperature }]}
                    min={getMinMax(sensorHistory.Temperature).min - 1}
                    max={getMinMax(sensorHistory.Temperature).max + 1}
                    curve={true}
                    colors={['#e74c3c']}
                    ytitle="Temperature" xtitle="Time"
                    download="temperature-data" />

                <p>Moisture data (%)</p>
                <LineChart data={
                    [{ "name": "Moisture", "data": sensorHistory.Moisture }]}
                    min={getMinMax(sensorHistory.Moisture).min - 5}
                    max={getMinMax(sensorHistory.Moisture).max + 5}
                    curve={false}
                    colors={["#07bc0c"]}
                    ytitle="Moisture" xtitle="Time"
                    download="moisture-data" />

                <p>Humidity data (%)</p>
                <LineChart data={
                    [{ "name": "Relative Humidity", "data": sensorHistory.Humidity }]}
                    min={getMinMax(sensorHistory.Humidity).min - 2}
                    max={getMinMax(sensorHistory.Humidity).max + 2}
                    curve={true}
                    ytitle="Relative Humidity" xtitle="Time"
                    download="humidity-data" />

                <p>Light data (LUX)</p>
                <LineChart data={
                    [{ "name": "Light Intensity", "data": sensorHistory.Light }]}
                    min={getMinMax(sensorHistory.Light).min - 10}
                    max={getMinMax(sensorHistory.Light).max + 10}
                    curve={true}
                    ytitle="Light Intensity" xtitle="Time"
                    colors={['#f1c40f']}
                    download="light-data" />
            </div>
            <ToastContainer />
        </div>
    )
}

export default Sensors;
