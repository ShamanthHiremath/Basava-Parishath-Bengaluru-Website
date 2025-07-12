import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

function TeamMemberModal({ member, show, onClose }) {
  if (!show || !member) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden"
        >
          <div className="h-3 bg-gradient-to-r from-blue-900 to-blue-900"></div>
          <button
            className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-[#C1121F] transition-colors z-10"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>
          <div className="p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {member.image ? (
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('bg-gradient-to-r', 'from-blue-900', 'to-blue-900');
                      const initials = document.createElement('div');
                      initials.className = 'flex items-center justify-center text-3xl text-white font-bold w-full h-full';
                      initials.innerText = member.name.split(' ').map(n => n[0]).join('').slice(0,2);
                      e.target.parentNode.appendChild(initials);
                    }}
                  />
                </div>
              ) : (
                <div className="w-32 h-32 bg-gradient-to-r from-blue-900 to-blue-900 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-3xl text-white font-bold">
                  {member.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
              )}
              <div className="text-center sm:text-left sm:flex-1">
                <h3 className="text-2xl font-bold text-blue-900 mb-2">{member.name}</h3>
                <div className="inline-block px-4 py-1 rounded-full bg-blue-900/10 text-blue-900 font-medium mb-3">
                  {member.position}
                </div>
                <div className="mt-2 flex justify-center sm:justify-start">
                  {member.linkedin && (
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0A66C2] text-white p-2 rounded-full w-8 h-8 flex items-center justify-center mr-2"
                    >
                      <FaLinkedinIn size={14} />
                    </a>
                  )}
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`}
                      className="bg-blue-900 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center"
                    >
                      <FaEnvelope size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-xl font-semibold mb-4 text-blue-900">About</h4>
              {member.description ? (
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="whitespace-pre-line">{member.description}</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                  <p>No additional information available about {member.name} at this time.</p>
                </div>
              )}
            </div>
            {member.accomplishments && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-xl font-semibold mb-4 text-blue-900">Accomplishments</h4>
                <ul className="space-y-2">
                  {member.accomplishments.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-900 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TeamMemberModal;