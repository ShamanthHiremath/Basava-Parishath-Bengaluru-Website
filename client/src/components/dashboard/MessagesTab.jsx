import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaUser, FaTrash, FaExternalLinkAlt, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MessagesTab = ({ onSuccess }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Fetch all contact messages
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError('');
      
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch contact messages');
        }
        
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        setError('Failed to fetch contact messages');
        toast.error('Could not load messages', {
          position: "top-right",
          autoClose: 3000
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchContacts();
  }, []);

  // Open delete confirmation modal
  const openDeleteConfirmation = (contactId) => {
    setMessageToDelete(contactId);
    setShowConfirmModal(true);
  };

  // Handle contact message deletion
  const handleDeleteContact = async () => {
    if (!messageToDelete) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.REACT_APP_API_URL}/contact/${messageToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete message');
      }
      
      setContacts(contacts.filter(contact => contact._id !== messageToDelete));
      onSuccess('Message deleted successfully!');
      toast.success('Message deleted successfully', {
        position: "top-right",
        autoClose: 3000
      });
    } catch (err) {
      toast.error('Failed to delete message', {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setShowConfirmModal(false);
      setMessageToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-[#C1121F] p-4 rounded-lg border-l-4 border-[#C1121F]">
        {error}
      </div>
    );
  }

  return (
    <>
      <motion.div
        variants={stagger}
        className="space-y-4"
      >
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Contact Messages</h3>
          <p className="text-gray-600">View and manage messages from website visitors</p>
        </div>
        
        {contacts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <FaEnvelope className="mx-auto mb-4 text-4xl text-gray-300" />
            <p>No messages found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {contacts.map(contact => (
              <ContactCard 
                key={contact._id}
                contact={contact}
                formatDate={formatDate}
                onDelete={() => openDeleteConfirmation(contact._id)}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="relative">
                {/* Gradient top border */}
                <div className="h-2 bg-gradient-to-r from-blue-900 to-[#C1121F]"></div>
                
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-[#C1121F] transition-colors p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setShowConfirmModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <FaExclamationTriangle className="text-[#C1121F] text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Confirm Deletion</h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this message? This action cannot be undone.
                </p>
                
                <div className="flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#C1121F] text-white rounded-lg hover:bg-[#a30f1b] transition-colors flex items-center"
                    onClick={handleDeleteContact}
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Contact Card Component
const ContactCard = ({ contact, formatDate, onDelete }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleEmailClick = () => {
    // Track that the admin has opened an email client
    toast.info('Opening email client', {
      position: "top-right",
      autoClose: 2000
    });
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow p-5"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
        <div>
          <div className="flex items-center mb-2">
            <FaUser className="text-blue-900 mr-2" />
            <h4 className="font-semibold text-lg text-blue-900">{contact.name}</h4>
          </div>
          <div className="flex items-center text-gray-600 mb-3 text-sm">
            <FaEnvelope className="text-blue-900 mr-2" />
            <a 
              href={`mailto:${contact.email}?subject=Re: ${contact.subject}`} 
              className="hover:text-blue-900 transition-colors flex items-center"
              onClick={handleEmailClick}
            >
              {contact.email}
              <FaExternalLinkAlt className="ml-2 text-xs text-gray-400" />
            </a>
          </div>
        </div>
        
        <div className="flex items-center mb-3 md:mb-0">
          <span className="text-sm text-gray-500">
            {formatDate(contact.createdAt || Date.now())}
          </span>
          <button
            className="ml-4 p-2 text-[#C1121F] hover:bg-red-50 rounded-full transition-colors"
            title="Delete Message"
            onClick={onDelete}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      
      <div>
        <h5 className="font-medium text-blue-900 mb-2">
          Subject: {contact.subject}
        </h5>
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-700">
          {contact.message}
        </div>
      </div>
    </motion.div>
  );
};

export default MessagesTab;