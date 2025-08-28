import axios from 'axios';

// Geocoding API (to get latitude/longitude from city name)
export const getCoordinates = async (city) => {
  const res = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );
  if (!res.data.results || res.data.results.length === 0) {
    throw new Error('City not found');
  }
  const { latitude, longitude, name, country } = res.data.results[0];
  return { latitude, longitude, name, country };
};

// Fetch current weather from Open-Meteo
export const getWeatherByCoords = async (latitude, longitude, unit = 'metric') => {
  const isCelsius = unit === 'metric';
  const res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=${isCelsius ? 'celsius' : 'fahrenheit'}`
  );
  if (!res.data.current_weather) {
    throw new Error('Weather data not available');
  }
  return {
    ...res.data.current_weather,
    unit,
    // optional extra info
    latitude,
    longitude,
  };
};

// Get weather by city name
export const getWeatherByCity = async (city, unit = 'metric') => {
  const { latitude, longitude, name, country } = await getCoordinates(city);
  const weather = await getWeatherByCoords(latitude, longitude, unit);
  return { ...weather, name, country };
};
