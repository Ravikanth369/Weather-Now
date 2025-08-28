import React, { useEffect, useState, useCallback } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';
import ThemeToggle from './components/ThemeToggle';
import Loader from './components/Loader';
import Background from './components/Background';
import SkyElements from './components/SkyElements';
import { getWeatherByCity, getWeatherByCoords } from './api/weatherService';
import { useLocalStorage } from './hooks/useLocalStorage';

/**
 * App.jsx
 * Main application layout - responsive dashboard for Weather Now.
 * - Uses Open-Meteo API (via weatherService)
 * - Keeps local state for theme, unit, recent searches
 * - Shows loader, friendly error messages and retry buttons
 */

const App = () => {
  // Weather object from API (or null)
  const [weather, setWeather] = useState(null);
  // 'metric' or 'imperial' controls units
  const [unit, setUnit] = useState('metric');
  // 'light' or 'dark'
  const [theme, setTheme] = useState('light');
  // loading / error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // persisted recent searches (array of city names)
  const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);

  // Helper: set friendly error messages
  const showError = (err) => {
    if (!err) {
      setError('');
      return;
    }
    // If error is an Error object or string
    const msg = typeof err === 'string' ? err : (err.message || 'An error occurred');
    setError(msg);
  };

  // Fetch weather by city name (uses geocoding internally)
  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    showError('');
    try {
      const data = await getWeatherByCity(city, unit);
      setWeather(data);
      // Update recent searches (unique, up to 5)
      setRecentSearches(prev => {
        const next = [city, ...prev.filter(s => s.toLowerCase() !== city.toLowerCase())];
        return next.slice(0, 5);
      });
    } catch (err) {
      showError(err.message || 'Error fetching weather');
    } finally {
      setLoading(false);
    }
  }, [unit, setRecentSearches]);

  // Fetch weather by browser geolocation
  const fetchGeoWeather = useCallback(() => {
    if (!navigator.geolocation) {
      showError('Geolocation not supported by this browser');
      return;
    }

    setLoading(true);
    showError('');
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const data = await getWeatherByCoords(latitude, longitude, unit);
        setWeather({ ...data, name: 'Your Location' });
      } catch (err) {
        showError(err.message || 'Error fetching weather');
      } finally {
        setLoading(false);
      }
    }, (err) => {
      // Geolocation permission denied or error
      setLoading(false);
      if (err.code === 1) {
        showError('Geolocation permission denied. Please search by city.');
      } else {
        showError('Failed to get geolocation. Try searching a city.');
      }
    }, { timeout: 10000 });
  }, [unit]);

  // On mount and whenever unit changes, refresh geolocation-based weather (if any)
  useEffect(() => {
    fetchGeoWeather();
  }, [unit]); // eslint-disable-line react-hooks/exhaustive-deps

  // Retry handler for failures (tries geo first, else does nothing)
  const handleRetry = () => {
    showError('');
    if (weather && weather.latitude && weather.longitude) {
      // retry using stored coords
      (async () => {
        setLoading(true);
        try {
          const data = await getWeatherByCoords(weather.latitude, weather.longitude, unit);
          setWeather({ ...data, name: weather.name });
        } catch (err) {
          showError(err.message || 'Retry failed');
        } finally {
          setLoading(false);
        }
      })();
    } else {
      // fallback to geolocation
      fetchGeoWeather();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 relative overflow-hidden sm:px-6 lg:px-20">
      {/* Background gradient tuned to weather & theme */}
      <Background theme={theme} weatherType={(weather && weather.weathercode) ? '' : ''} />

      {/* Sky animations respond to weather code */}
      <SkyElements theme={theme} weathercode={weather?.weathercode} />

      {/* Theme toggle top-right */}
      <ThemeToggle theme={theme} setTheme={setTheme} />

      {/* App header */}
      <header className="w-full max-w-4xl z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mt-8 mb-4 drop-shadow-lg">
          Weather Now
        </h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
          Quick, at-a-glance weather for any city.
        </p>
      </header>

      {/* Search controls */}
      <div className="w-full max-w-4xl z-10">
        <SearchBar onSearch={fetchWeather} recentSearches={recentSearches} />
        <div className="flex items-center justify-between mt-3">
          <UnitToggle unit={unit} setUnit={setUnit} />
          <div>
            <button
              onClick={fetchGeoWeather}
              className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white focus:ring-2"
              aria-label="Use geolocation for current weather"
            >
              Use My Location
            </button>
          </div>
        </div>
      </div>

      {/* Main area */}
      <main className="w-full max-w-4xl z-10 flex flex-col items-center mt-6">
        {loading && <Loader />}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-200 p-4 rounded-lg mb-4 w-full max-w-md text-center">
            <p>{error}</p>
            <div className="mt-3 flex justify-center gap-3">
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded hover:bg-red-200"
              >
                Retry
              </button>
              <button
                onClick={() => { setError(''); }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {weather && !loading && <WeatherCard data={weather} unit={unit} />}

        {/* Helpful footer / tips */}
        <div className="text-xs text-gray-600 dark:text-gray-300 mt-6 text-center">
          Tip: Use recent searches or your location for a quick lookup. Animations reflect current weather.
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mt-auto mb-6 z-10 text-center text-sm text-gray-700 dark:text-gray-300">
        &copy; {new Date().getFullYear()} Weather Now • Built with React, Tailwind & Framer Motion
      </footer>
    </div>
  );
};

export default App;
