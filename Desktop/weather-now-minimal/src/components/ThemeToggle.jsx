import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Apply smooth transition to background & text
  useEffect(() => {
    document.documentElement.style.transition = 'background-color 0.5s, color 0.5s';
  }, []);

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </motion.button>
  );
};

export default ThemeToggle;
