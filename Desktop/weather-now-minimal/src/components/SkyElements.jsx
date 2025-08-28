import React from 'react';
import { motion } from 'framer-motion';

const weatherCodeMap = {
  0: 'clear', 1: 'clear', 2: 'partly-cloudy', 3: 'overcast', 45: 'fog', 48: 'fog',
  51: 'rain-light', 53: 'rain', 55: 'rain-heavy', 56: 'freezing-rain-light', 57: 'freezing-rain-heavy',
  61: 'rain-light', 63: 'rain', 65: 'rain-heavy', 66: 'freezing-rain-light', 67: 'freezing-rain-heavy',
  71: 'snow-light', 73: 'snow', 75: 'snow-heavy', 77: 'snow',
  80: 'rain-light', 81: 'rain', 82: 'rain-heavy',
  85: 'snow-light', 86: 'snow-heavy',
  95: 'thunderstorm', 96: 'thunderstorm', 99: 'thunderstorm'
};

const SkyElements = ({ theme, weathercode }) => {
  const isDay = theme === 'light';
  const weatherType = weatherCodeMap[weathercode] || 'clear';

  // Sun/Moon
  const SunMoon = isDay ? (
    <svg viewBox="0 0 64 64" className="w-20 h-20">
      <circle cx="32" cy="32" r="14" fill="url(#sunGradient)" />
      <defs>
        <radialGradient id="sunGradient" cx="32" cy="32" r="32">
          <stop offset="0%" stopColor="#fff176" />
          <stop offset="100%" stopColor="#fbc02d" />
        </radialGradient>
      </defs>
    </svg>
  ) : (
    <svg viewBox="0 0 64 64" className="w-20 h-20 text-gray-200">
      <circle cx="32" cy="32" r="14" fill="#cbd5e1" />
    </svg>
  );

  // Parallax Cloud
  const Cloud = ({ className, speed = 60, opacity = 0.6 }) => (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      animate={{ x: [0, 900] }}
      transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
    >
      <ellipse cx="32" cy="32" rx="20" ry="12" fill="white" opacity={opacity} />
      <ellipse cx="44" cy="28" rx="14" ry="10" fill="white" opacity={opacity * 0.8} />
      <ellipse cx="20" cy="28" rx="14" ry="10" fill="white" opacity={opacity * 0.7} />
    </motion.svg>
  );

  // Raindrop
  const Raindrop = ({ left, delay = 0 }) => (
    <motion.div
      className="absolute w-1 h-4 bg-blue-400 rounded"
      style={{ left }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 600, opacity: [0, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.2 + Math.random(), delay }}
    />
  );

  // Snowflake
  const Snowflake = ({ left, delay = 0 }) => (
    <motion.div
      className="absolute text-white text-xl"
      style={{ left }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 600, opacity: [0, 1, 0] }}
      transition={{ repeat: Infinity, duration: 5 + Math.random() * 3, delay }}
    >
      ❄️
    </motion.div>
  );

  // Lightning
  const Lightning = ({ delay = 0 }) => (
    <motion.div
      className="absolute top-0 left-1/2 w-1 h-64 bg-white/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut', delay }}
    />
  );

  return (
    <>
      {/* Sun/Moon */}
      <motion.div
        className="absolute top-10 left-0 -z-10"
        animate={{ x: [0, 900], y: [0, 120] }}
        transition={{ repeat: Infinity, repeatType: 'loop', duration: 60, ease: 'linear' }}
      >
        {SunMoon}
      </motion.div>

      {/* Clouds */}
      {(weatherType === 'partly-cloudy' || weatherType === 'overcast' || weatherType.includes('rain') || weatherType.includes('thunderstorm')) && (
        <>
          <Cloud className="absolute top-20 left-0 w-36 h-20" speed={90} opacity={0.7} />
          <Cloud className="absolute top-36 left-[-200px] w-28 h-16" speed={120} opacity={0.6} />
          <Cloud className="absolute top-10 left-[-100px] w-24 h-14" speed={150} opacity={0.5} />
        </>
      )}

      {/* Rain */}
      {weatherType.includes('rain') &&
        Array.from({ length: 25 }).map((_, i) => <Raindrop key={i} left={`${Math.random() * 100}%`} delay={Math.random()} />)}

      {/* Snow */}
      {weatherType.includes('snow') &&
        Array.from({ length: 20 }).map((_, i) => <Snowflake key={i} left={`${Math.random() * 100}%`} delay={Math.random() * 2} />)}

      {/* Thunderstorm */}
      {weatherType.includes('thunderstorm') &&
        Array.from({ length: 3 }).map((_, i) => <Lightning key={i} delay={Math.random() * 3} />)}
    </>
  );
};

export default SkyElements;
