import React from 'react';
import { motion } from 'framer-motion';

// Map Open-Meteo weather codes to human-readable descriptions
const weatherCodeMap = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Drizzle: Light',
  53: 'Drizzle: Moderate',
  55: 'Drizzle: Dense',
  56: 'Freezing Drizzle: Light',
  57: 'Freezing Drizzle: Dense',
  61: 'Rain: Slight',
  63: 'Rain: Moderate',
  65: 'Rain: Heavy',
  66: 'Freezing Rain: Light',
  67: 'Freezing Rain: Heavy',
  71: 'Snow fall: Slight',
  73: 'Snow fall: Moderate',
  75: 'Snow fall: Heavy',
  77: 'Snow grains',
  80: 'Rain showers: Slight',
  81: 'Rain showers: Moderate',
  82: 'Rain showers: Violent',
  85: 'Snow showers: Slight',
  86: 'Snow showers: Heavy',
  95: 'Thunderstorm: Slight/Moderate',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

const WeatherCard = ({ data, unit }) => {
  if (!data) return null;

  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const speedUnit = unit === 'metric' ? 'km/h' : 'mph';
  const weatherDesc = weatherCodeMap[data.weathercode] || 'Unknown';

  return (
    <motion.div
      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl p-6 w-full max-w-md flex flex-col items-center space-y-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold">{data.name || 'Current Location'}</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">{data.country || ''}</p>

      <div className="text-6xl font-bold">{Math.round(data.temperature)}{tempUnit}</div>
      <p className="text-lg font-medium">{weatherDesc}</p>

      <div className="flex justify-around w-full mt-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Wind</p>
          <p className="font-medium">{Math.round(data.windspeed)} {speedUnit}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.winddirection}°</p>
        </div>
        {data.precipitation !== undefined && (
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Precipitation</p>
            <p className="font-medium">{data.precipitation} mm</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WeatherCard;
