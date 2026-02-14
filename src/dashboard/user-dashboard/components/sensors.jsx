import { LineChart } from 'react-chartkick'
import 'chartkick/chart.js'
import { useState } from 'react'

import axios from 'axios'
import { useQuery } from 'react-query'

import "../styles/insightReports.css"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sensors = () => {
    const { isLoading, error, data, isFetching } = useQuery('sensors-data', async () => {
        // Fetch from local NodeMCU server instead of Azure
        const res = await axios({
            method: 'get',
            url: 'http://localhost:8001/data',
        });

        if (!res) return null

        console.log("New data is being fetched", res.data)

        // Local server returns data in format: { data: [[timestamp, temp, hum, moisture, light], ...] }
        const sensorsData = res.data.data;

        const fetchedData = {
            Temperature: {},
            Humidity: {},
            Moisture: {},
            Light: {}
        };

        // Parse the tuple data from Python backend
        // Tuple index: 0=Timestamp, 1=Temperature, 2=Humidity, 3=Moisture, 4=Light
        if (Array.isArray(sensorsData)) {
            sensorsData.forEach(point => {
                // Ensure point is valid array
                if (Array.isArray(point) && point.length >= 5) {
                    const timestamp = point[0];
                    fetchedData.Temperature[timestamp] = parseFloat(point[1]).toFixed(2);
                    fetchedData.Humidity[timestamp] = parseFloat(point[2]).toFixed(2);
                    fetchedData.Moisture[timestamp] = parseFloat(point[3]).toFixed(2);
                    fetchedData.Light[timestamp] = parseFloat(point[4]).toFixed(2);
                }
            });
        }

        const min_max_values = {
            Temperature: { min: Number.MAX_VALUE, max: Number.MIN_VALUE },
            Humidity: { min: Number.MAX_VALUE, max: Number.MIN_VALUE },
            Moisture: { min: Number.MAX_VALUE, max: Number.MIN_VALUE },
            Light: { min: Number.MAX_VALUE, max: Number.MIN_VALUE }
        };

        for (const [field, data] of Object.entries(fetchedData)) {
            const values = Object.values(data);
            if (values.length > 0) {
                min_max_values[field].min = Math.min(...values);
                min_max_values[field].max = Math.max(...values);
            } else {
                // Default min/max if no data
                min_max_values[field].min = 0;
                min_max_values[field].max = 10;
            }
        }

        return { sensorData: fetchedData, minMaxValues: min_max_values }
    }, {
        staleTime: 5000, // Refresh every 5 seconds for local dev
        refetchInterval: 5000
    });

    if (isFetching || isLoading) return
    if (error) {
        console.log('An error has occurred: ' + error.message)
        toast.error("Error encountered at fetch")
    }

    return (
        <>
            <div className="charts-container">
                <p>Temperature data</p>
                <LineChart data={
                    [{ "name": "Temperature", "data": data ? data.sensorData.Temperature : [] }]}
                    min={data ? data.minMaxValues.Temperature.min : 0}
                    max={data ? data.minMaxValues.Temperature.max + 0.1 : 10}
                    curve={true}
                    colors={['#e74c3c']}
                    ytitle="Temperature" xtitle="Time"
                    download="temperature-data" />

                <p>Moisture data</p>
                <LineChart data={
                    [{ "name": "Moisture", "data": data ? data.sensorData.Moisture : [] }]}
                    min={data ? data.minMaxValues.Moisture.min : 0}
                    max={data ? data.minMaxValues.Moisture.max + 1 : 10}
                    curve={false}
                    colors={["#07bc0c"]}
                    ytitle="Moisture" xtitle="Time"
                    download="moisture-data" />

                <p>Humidity data</p>
                <LineChart data={
                    [{ "name": "Relative Humidity", "data": data ? data.sensorData.Humidity : [] }]}
                    min={data ? data.minMaxValues.Humidity.min : 0}
                    max={data ? data.minMaxValues.Humidity.max + 3 : 10}
                    curve={true}
                    ytitle="Relative Humidity /gkg-1" xtitle="Time"
                    download="humidity-data" />

                <p>Light data</p>
                <LineChart data={
                    [{ "name": "Light Intensity", "data": data ? data.sensorData.Light : [] }]}
                    min={data ? data.minMaxValues.Light.min : 0}
                    max={data ? data.minMaxValues.Light.max + 2 : 10}
                    curve={true}
                    ytitle="Light Intensity" xtitle="Time"
                    colors={['#f1c40f']}
                    download="light-data" />
            </div>
            <ToastContainer />
        </>
    )
}

export default Sensors;