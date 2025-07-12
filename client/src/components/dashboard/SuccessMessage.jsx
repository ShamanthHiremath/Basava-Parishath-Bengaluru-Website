import React from 'react';
import { motion } from 'framer-motion';

const SuccessMessage = ({ message }) => (
  <motion.div 
    className="bg-green-50 border-l-4 border-green-500 p-4 mt-4 rounded-md text-green-700"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {message}
  </motion.div>
);

export default SuccessMessage;