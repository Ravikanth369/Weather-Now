import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * ThemeToggle manages the app's theme (light/dark) and applies the `dark` class to <html>.
 */
const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  useEffect(() => {
    // ensure initial theme class is applied
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.transition = 'background-color 0.5s, color 0.5s';
  }, [theme]);

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md focus:ring-2 z-20"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </motion.button>
  );
};

export default ThemeToggle;
