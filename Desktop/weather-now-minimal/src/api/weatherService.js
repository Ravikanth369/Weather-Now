/**
 * weatherService.js
 * Uses Open-Meteo public APIs:
 *  - Geocoding: https://geocoding-api.open-meteo.com/v1/search
 *  - Forecast:   https://api.open-meteo.com/v1/forecast?current_weather=true
 *
 * No API key required.
 */

import axios from 'axios';

// Get lat/lon from a city name using Open-Meteo's geocoding
export const getCoordinates = async (city) => {
  try {
    const res = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search`,
      { params: { name: city, count: 1 } }
    );

    if (!res.data || !res.data.results || res.data.results.length === 0) {
      throw new Error('City not found');
    }

    const { latitude, longitude, name, country } = res.data.results[0];
    return { latitude, longitude, name, country };
  } catch (err) {
    // Re-throw human-friendly message
    if (err.response) throw new Error('Geocoding error');
    throw new Error('Network error while fetching coordinates');
  }
};

// Get current weather from Open-Meteo using coordinates
export const getWeatherByCoords = async (latitude, longitude, unit = 'metric') => {
  try {
    // Open-Meteo accepts temperature_unit=celsius|fahrenheit
    const isCelsius = unit === 'metric';
    const res = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        current_weather: true,
        temperature_unit: isCelsius ? 'celsius' : 'fahrenheit',
        windspeed_unit: isCelsius ? 'kmh' : 'mph',
      },
    });

    if (!res.data || !res.data.current_weather) {
      throw new Error('Weather data not available');
    }

    // current_weather: {temperature, windspeed, winddirection, weathercode, time}
    // Return an enriched object for the UI
    return {
      ...res.data.current_weather,
      latitude,
      longitude,
    };
  } catch (err) {
    if (err.response) throw new Error('Weather API returned an error');
    throw new Error('Network error while fetching weather');
  }
};

// Get weather by city name (combines geocoding and weather fetch)
export const getWeatherByCity = async (city, unit = 'metric') => {
  const { latitude, longitude, name, country } = await getCoordinates(city);
  const weather = await getWeatherByCoords(latitude, longitude, unit);
  // Attach readable name/country for display
  return { ...weather, name, country };
};
