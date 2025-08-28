import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => (
  <motion.div
    className="flex justify-center mt-4"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1 }}
  >
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
  </motion.div>
);

export default Loader;
