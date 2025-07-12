import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const TeamMemberModal = ({ member, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-[#C1121F] transition-colors p-2 rounded-full hover:bg-black hover:bg-opacity-10 z-10"
            onClick={onClose}
          >
            <FaTimes className="text-2xl" />
          </button>
          {/* Big square image on the left */}
          <div className="flex-shrink-0 w-full md:w-[400px] aspect-square bg-gray-100 flex items-center justify-center">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover object-center rounded-none"
              onError={e => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
              }}
            />
          </div>
          {/* Info on the right */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-blue-900 mb-2">{member.name}</h3>
            <p className="text-blue-900 font-medium text-xl mb-4">{member.position}</p>
            <div className="text-gray-700 leading-relaxed text-base">
              <p>{member.description}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default TeamMemberModal;