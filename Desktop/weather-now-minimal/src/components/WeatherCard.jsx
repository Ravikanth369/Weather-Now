import React from 'react';
import { motion } from 'framer-motion';

/**
 * WeatherCard
 * Shows current weather details from Open-Meteo's current_weather response.
 *
 * Expected props:
 *  - data: {temperature, windspeed, winddirection, weathercode, name, country, precipitation?}
 *  - unit: 'metric'|'imperial'
 */

const weatherCodeMap = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Depositing rime fog',
  51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
  61: 'Rain: Slight', 63: 'Rain: Moderate', 65: 'Rain: Heavy',
  71: 'Snow: Slight', 73: 'Snow: Moderate', 75: 'Snow: Heavy',
  80: 'Rain showers', 81: 'Rain showers: Moderate', 82: 'Violent showers',
  95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail'
};

const WeatherCard = ({ data, unit }) => {
  if (!data) return null;

  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const speedUnit = unit === 'metric' ? 'km/h' : 'mph';
  const desc = weatherCodeMap[data.weathercode] || 'Unknown';

  // Precip not always present from current_weather; some APIs provide it separately
  const precipitation = data.precipitation ?? null;

  return (
    <motion.section
      aria-label={`Current weather for ${data.name || 'your location'}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl p-6 w-full max-w-md mt-4"
    >
      <header className="text-center mb-4">
        <h3 className="text-2xl font-semibold">{data.name || 'Current Location'}</h3>
        {data.country && <p className="text-sm text-gray-600 dark:text-gray-300">{data.country}</p>}
      </header>

      <div className="flex flex-col items-center gap-3">
        <div className="text-5xl font-bold">{Math.round(data.temperature)}{tempUnit}</div>
        <div className="text-lg font-medium">{desc}</div>

        <div className="w-full flex justify-between mt-4 text-sm">
          <div className="text-center">
            <div className="text-xs text-gray-600 dark:text-gray-300">Wind</div>
            <div className="font-medium">{Math.round(data.windspeed)} {speedUnit}</div>
            <div className="text-xs text-gray-500">{Math.round(data.winddirection)}°</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-600 dark:text-gray-300">Precipitation</div>
            <div className="font-medium">{precipitation !== null ? `${precipitation} mm` : 'N/A'}</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-600 dark:text-gray-300">Time</div>
            <div className="font-medium">{new Date(data.time).toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default WeatherCard;
