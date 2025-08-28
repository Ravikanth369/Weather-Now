import React from 'react';
import { motion } from 'framer-motion';

const Background = ({ theme }) => {
  // Gradient variants for day/night
  const variants = {
    light: { background: 'linear-gradient(135deg, #90cdf4, #fef08a, #63b3ed)' },
    dark: { background: 'linear-gradient(135deg, #1e293b, #4f46e5, #0f172a)' },
  };

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      animate={theme === 'light' ? 'light' : 'dark'}
      variants={variants}
      transition={{ duration: 2 }}
    />
  );
};

export default Background;
