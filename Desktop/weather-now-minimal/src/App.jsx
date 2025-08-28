import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';
import ThemeToggle from './components/ThemeToggle';
import Loader from './components/Loader';
import Background from './components/Background';
import SkyElements from './components/SkyElements';
import { getWeatherByCity, getWeatherByCoords } from './api/weatherService';
import { useLocalStorage } from './hooks/useLocalStorage';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');
    try {
      const data = await getWeatherByCity(city, unit);
      setWeather(data);
      if (!recentSearches.includes(city)) {
        setRecentSearches([city, ...recentSearches].slice(0, 5));
      }
    } catch (err) {
      setError(err.message || 'Error fetching weather');
    } finally {
      setLoading(false);
    }
  };

  const fetchGeoWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLoading(true);
        try {
          const data = await getWeatherByCoords(latitude, longitude, unit);
          setWeather(data);
        } catch (err) {
          setError(err.message || 'Error fetching weather');
        } finally {
          setLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    fetchGeoWeather();
  }, [unit]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 relative overflow-hidden">
      {/* Background & Sky Elements */}
      <Background theme={theme} />
      <SkyElements theme={theme} weathercode={weather?.weathercode} />

      {/* Theme Toggle */}
      <ThemeToggle theme={theme} setTheme={setTheme} />

      {/* Header */}
      <h1 className="text-5xl font-bold text-center mt-8 mb-6 drop-shadow-lg z-10">
        Weather Now
      </h1>

      {/* Search & Unit */}
      <SearchBar onSearch={fetchWeather} recentSearches={recentSearches} />
      <UnitToggle unit={unit} setUnit={setUnit} />

      {/* Weather / Loading / Error */}
      <div className="flex flex-col items-center mt-6 w-full z-10">
        {loading && <Loader />}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {weather && <WeatherCard data={weather} unit={unit} />}
      </div>

      {/* Footer */}
      <footer className="text-sm text-gray-800 dark:text-gray-300 mt-auto mb-4 z-10">
        &copy; 2025 Weather Now • Built with React, Tailwind & Framer Motion
      </footer>
    </div>
  );
};

export default App;
