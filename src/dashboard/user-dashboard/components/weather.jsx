//importing assets
import sunnyDay from "../assets/sunny-day.png"

import { useState, useEffect} from "react";
import axios from "axios"
import { useQuery } from 'react-query';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/weather.css"

//env
const MICROSOFT_WEATHER_API_KEY = 'St_exwgqnSBjiPVn9CSm82_i_K9Wd9whyWnBy38M-0I';

const Weather = () => {
    const [Location, setLocation] = useState({
        lat: 0,
        long: 0
    });
    var monthNames = 
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var DAY = DAY_NAMES[(new Date()).getUTCDay()];

    function formatDate() {
        const date = new Date()
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getDate() + " " + monthNames[date.getMonth()] + ", " + strTime;
    }

    useEffect(() => {
        if (navigator?.geolocation) {
          navigator.geolocation.getCurrentPosition((userLocation) => {
            if (userLocation) setLocation({
                lat: userLocation.coords.latitude,
                long: userLocation.coords.longitude
            });
          });
        }
      }, []);

    const {isLoading: weatherIsLoading, data: weatherData, error: weatherError}= useQuery('weather', async() => {
        const res = await axios({
            method: 'get',
            url: `https://atlas.microsoft.com/weather/currentConditions/json?api-version=1.0&query=${Location.lat ? Location.lat : 25},${Location.long? Location.long : 80}&subscription-key=${MICROSOFT_WEATHER_API_KEY}`,
            headers: { }
        });
    
        let data = await res.data;
        let to_be_push_data = {
            temperature: data.results[0].temperature.value.toFixed(0),
            phrase: data.results[0].phrase,
            isDayTime: data.results[0].isDayTime,
            wind: `${data.results[0].wind.speed.value} ${data.results[0].wind.speed.unit}`,
            pressure: `${data.results[0].pressure.value} ${data.results[0].pressure.unit}`,
            uvIndex: data.results[0].uvIndex,
            uvIndexPhrase: data.results[0].uvIndexPhrase,
            precipitation: `${data.results[0].precipitationSummary.pastHour.value} ${data.results[0].precipitationSummary.pastHour.unit}`,
            humidity: data.results[0].relativeHumidity
        };
        
        return to_be_push_data;
        }, {
            staleTime: Infinity
        })


    if (weatherIsLoading) return
    if (weatherError) {
        toast.error("Error encountered at fetch")
    }

    return(
        <>
        <div className="weather-container">
            <div className="img-cotainer">
                <div>
                    <span className="current-date">{formatDate()}</span>
                    <span className="day">{DAY}</span>
                </div>
                <img src={sunnyDay} alt="sunny day" />
                <div className="phrase">
                    { weatherData && weatherData.phrase}
                </div>
                <div className="temperature-container">
                    <p className="today-temperature">{weatherData && weatherData.temperature}</p>
                    <small>°C</small>
                </div>
            </div>

            <div className="forecast-container">
                <div className="item">
                    <div className="day">Wind Speed</div>
                    <div className="wind">
                        <span>{weatherData && weatherData.wind}</span>
                    </div>
                </div>
                <div className="item">
                    <div className="day">Pressure</div>
                    <div className="pressure">
                        <span>{weatherData && weatherData.pressure}</span>
                    </div>
                </div>
                <div className="item">
                    <div className="day">Precipitation</div>
                    <div className="precipitation">
                        <span>{weatherData && weatherData.precipitation}</span>
                    </div>
                </div>
                <div className="item">
                    <div className="day">Relative Humidity</div>
                    <div className="humidity">
                        <span>{weatherData && weatherData.humidity}</span>
                        <span>%</span>
                    </div>
                </div>
            </div>
        </div>
        
        <ToastContainer />
        </>
    )
}

export default Weather;