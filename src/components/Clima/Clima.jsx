import React, { useEffect, useState } from 'react';
import './Clima.css';
import cloudImage from '../../assets/nubes.jpg'; // Asegúrate de tener una imagen de nube en tu directorio

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?lat=-26.82414&lon=-65.2226&appid=091960382fa3f6e096e82ae3990d8325&units=Metric'
        );
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) return <div className="weather-container">Loading...</div>;
  if (error) return <div className="weather-container">Error: {error.message}</div>;

  return (
    <div className="weather-container">
      <h2>Temperatura Actual</h2>
      <div className="weather-content">
        <div className="weather-info">
          <p><strong>Locación </strong> {weatherData.name}</p>
          <p><strong>Temperatura:</strong> {weatherData.main.temp} °C</p>
          <p><strong>Clima:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Humedad:</strong> {weatherData.main.humidity} %</p>
          <p><strong>Velocidad del Viento:</strong> {weatherData.wind.speed} m/s</p>
        </div>
        <div className="cloud-carousel">
          <img src={cloudImage} alt="Cloud" className="cloud-image" />
        </div>
      </div>
    </div>
  );
};

export default Weather;
