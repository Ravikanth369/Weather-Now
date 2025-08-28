import React from 'react';
import { motion } from 'framer-motion';

/**
 * SkyElements: animated sun/moon, parallax clouds, rain, snow, lightning.
 * Accepts:
 *  - theme: 'light'|'dark'
 *  - weathercode: numeric Open-Meteo code
 */

const weatherCodeMap = {
  0: 'clear', 1: 'clear', 2: 'partly-cloudy', 3: 'overcast',
  45: 'fog', 48: 'fog',
  51: 'rain-light', 53: 'rain', 55: 'rain-heavy',
  61: 'rain-light', 63: 'rain', 65: 'rain-heavy',
  71: 'snow-light', 73: 'snow', 75: 'snow-heavy',
  80: 'rain-light', 81: 'rain', 82: 'rain-heavy',
  95: 'thunderstorm', 96: 'thunderstorm', 99: 'thunderstorm'
};

const Cloud = ({ className = '', speed = 80, opacity = 0.6 }) => (
  <motion.svg
    viewBox="0 0 64 64"
    className={className}
    initial={{ x: -250 }}
    animate={{ x: [ -250, 1200 ] }}
    transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
    aria-hidden
    style={{ opacity }}
  >
    <ellipse cx="32" cy="36" rx="22" ry="12" fill="white" />
    <ellipse cx="44" cy="30" rx="14" ry="9" fill="white" />
    <ellipse cx="20" cy="30" rx="14" ry="9" fill="white" />
  </motion.svg>
);

const Raindrop = ({ left = '10%', delay = 0 }) => (
  <motion.div
    className="absolute w-0.5 h-6 bg-blue-300 rounded"
    style={{ left }}
    initial={{ y: -40, opacity: 0 }}
    animate={{ y: 700, opacity: [0, 1, 0.6] }}
    transition={{ repeat: Infinity, duration: 1.1 + Math.random(), delay }}
    aria-hidden
  />
);

const Snowflake = ({ left = '10%', delay = 0, size = 18 }) => (
  <motion.div
    className="absolute text-white"
    style={{ left, fontSize: size }}
    initial={{ y: -60, opacity: 0 }}
    animate={{ y: 700, opacity: [0, 1, 0] }}
    transition={{ repeat: Infinity, duration: 5 + Math.random() * 3, delay }}
    aria-hidden
  >
    ❄️
  </motion.div>
);

const Lightning = ({ left = '50%', delay = 0 }) => (
  <motion.div
    className="absolute top-10"
    style={{ left, width: 2, height: 220, background: 'radial-gradient(closest-side, rgba(255,255,255,0.9), rgba(255,255,255,0.3))' }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ repeat: Infinity, duration: 1.2 + Math.random(), delay }}
    aria-hidden
  />
);

const SkyElements = ({ theme = 'light', weathercode }) => {
  const isDay = theme === 'light';
  const weatherType = weatherCodeMap[weathercode] || 'clear';

  return (
    <>
      {/* Sun / Moon - gentle diagonal travel */}
      <motion.div
        className="absolute top-12 left-0 z-0"
        initial={{ x: -60 }}
        animate={{ x: [ -60, 1100 ] }}
        transition={{ repeat: Infinity, repeatType: 'loop', duration: 60, ease: 'linear' }}
        aria-hidden
      >
        {isDay ? (
          <svg viewBox="0 0 64 64" className="w-20 h-20">
            <defs>
              <radialGradient id="sunGrad" cx="32" cy="32" r="32">
                <stop offset="0%" stopColor="#fffaf0" />
                <stop offset="60%" stopColor="#ffd166" />
                <stop offset="100%" stopColor="#f79d1e" />
              </radialGradient>
            </defs>
            <circle cx="32" cy="32" r="14" fill="url(#sunGrad)" />
          </svg>
        ) : (
          <svg viewBox="0 0 64 64" className="w-20 h-20 text-gray-200">
            <circle cx="32" cy="32" r="13" fill="#cbd5e1" />
            <path d="M44 22c-5 6-13 8-20 6 3 5 10 8 16 6 8-2 9-11 4-12z" fill="#ffffff10" />
          </svg>
        )}
      </motion.div>

      {/* Clouds - shown for cloudy/rain/thunder */}
      {(weatherType === 'partly-cloudy' || weatherType === 'overcast' || weatherType.includes('rain') || weatherType.includes('thunderstorm')) && (
        <>
          <Cloud className="absolute top-24 left-0 w-72 h-44" speed={110} opacity={0.85} />
          <Cloud className="absolute top-40 left-[-240px] w-56 h-36" speed={160} opacity={0.7} />
          <Cloud className="absolute top-12 left-[-120px] w-44 h-28" speed={210} opacity={0.6} />
        </>
      )}

      {/* Rain: many drops with randomized left/delay */}
      {weatherType.includes('rain') && Array.from({ length: 28 }).map((_, i) => (
        <Raindrop key={`r-${i}`} left={`${Math.random() * 100}%`} delay={Math.random() * 1.2} />
      ))}

      {/* Snow */}
      {weatherType.includes('snow') && Array.from({ length: 20 }).map((_, i) => (
        <Snowflake key={`s-${i}`} left={`${Math.random() * 100}%`} delay={Math.random() * 2} size={12 + Math.random()*12} />
      ))}

      {/* Thunder */}
      {weatherType.includes('thunderstorm') && Array.from({ length: 3 }).map((_, i) => (
        <Lightning key={`l-${i}`} left={`${30 + Math.random() * 40}%`} delay={Math.random() * 3} />
      ))}
    </>
  );
};

export default SkyElements;
