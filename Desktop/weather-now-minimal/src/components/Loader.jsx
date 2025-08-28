import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => (
  <div className="flex items-center justify-center py-6" role="status" aria-live="polite">
    <motion.div
      className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
    />
    <span className="sr-only">Loading</span>
  </div>
);

export default Loader;
