import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import SignupForm from '../SignupForm';

const SignupFormModal = ({ show, onClose, onSuccess }) => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Handle successful user creation
  const handleUserCreated = (message) => {
    onSuccess(message || 'User created successfully!');
    onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Gradient top border */}
            <div className="h-2 bg-gradient-to-r from-blue-900 to-blue-900"></div>
            
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-[#C1121F] transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              onClick={onClose}
            >
              <FaTimes />
            </button>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-900">Create New Admin User</h3>
              <SignupForm 
                onClose={onClose} 
                onSuccess={handleUserCreated} 
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignupFormModal;