import React from 'react';
import { motion } from 'framer-motion';

/**
 * Background
 * Simple animated background gradients for day/night/rain states.
 * Receives theme prop ('light'|'dark') and optional weatherType to tweak colors.
 */
const Background = ({ theme, weatherType = 'clear' }) => {
  // Choose gradient based on theme and weather
  const gradients = {
    day_clear: 'linear-gradient(135deg,#90cdf4 0%,#a7f3d0 100%)', // light blue -> mint
    day_cloudy: 'linear-gradient(135deg,#cbd5e1 0%,#9ca3af 100%)', // gray
    night: 'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)',
    rain: 'linear-gradient(135deg,#606c76 0%,#3b4252 100%)',
  };

  let selected = theme === 'dark' ? gradients.night : gradients.day_clear;
  if (weatherType.includes('rain')) selected = gradients.rain;
  if (weatherType === 'partly-cloudy' || weatherType === 'overcast') selected = gradients.day_cloudy;

  const variants = {
    bg: { background: selected },
  };

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      animate="bg"
      variants={variants}
      transition={{ duration: 1.2 }}
      aria-hidden
    />
  );
};

export default Background;
