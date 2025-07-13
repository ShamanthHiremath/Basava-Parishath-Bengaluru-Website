import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ConfirmationModal from '../ConfirmationModal';

const EventsTab = ({ onSuccess, onCreateEvent, onEditEvent }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

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

  // Fetch all events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try { 
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/events`);
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setError('Failed to fetch events');
      toast.error('Failed to load events', {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  // Open delete confirmation modal
  const confirmDelete = (event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  // Handle actual event deletion after confirmation
  const handleDeleteEvent = async () => {
    if (!eventToDelete) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.REACT_APP_API_URL}/events/${eventToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete event');
      }
      
      setEvents(events.filter(event => event._id !== eventToDelete._id));
      onSuccess('Event deleted successfully!');
      toast.success('Event deleted successfully', {
        position: "top-right",
        autoClose: 3000
      });
    } catch (err) {
      toast.error('Failed to delete event', {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  // Handle edit event
  const handleEditEvent = (event) => {
    if (onEditEvent) {
      onEditEvent(event);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-900"></div>
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
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-amber-900">Events Management</h2>
        <button 
          className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors"
          onClick={() => onCreateEvent && onCreateEvent()}
        >
          Create New Event
        </button>
      </div>
    
      <motion.div 
        className="space-y-4"
        variants={stagger}
      >
        {events.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <FaCalendarAlt className="mx-auto mb-4 text-4xl text-gray-300" />
            <p>No events found. Create your first event!</p>
          </div>
        ) : (
          events.map(event => (
            <EventCard 
              key={event._id}
              event={event}
              onDelete={() => confirmDelete(event)}
              onEdit={() => handleEditEvent(event)}
            />
          ))
        )}
      </motion.div>

      {/* Confirmation modal for delete */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteEvent}
        title="Delete Event"
        message={`Are you sure you want to delete "${eventToDelete?.name}"? This action cannot be undone.`}
      />
    </>
  );
};

// Event Card Component
const EventCard = ({ event, onDelete, onEdit }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
      variants={fadeInUp}
    >
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Event Image */}
        <div className="md:col-span-1 bg-gray-100 flex items-center justify-center h-40 md:h-full">
          {event.photos && event.photos.length > 0 ? (
            <img 
              src={event.photos[0]} 
              alt={event.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <FaCalendarAlt className="text-4xl text-gray-300" />
          )}
        </div>
        
        {/* Event Details */}
        <div className="p-4 md:col-span-3">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="text-xl font-semibold text-amber-900">{event.name}</h3>
              <div className="flex items-center text-gray-600 mt-2 text-sm">
                <FaCalendarAlt className="mr-2 text-amber-900" />
                {new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center text-gray-600 mt-1 text-sm">
                <FaMapMarkerAlt className="mr-2 text-[#C1121F]" />
                {event.venue}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button 
                className="p-2 text-amber-900 hover:bg-amber-50 rounded-full transition-colors"
                title="Edit Event"
                onClick={onEdit}
              >
                <FaEdit />
              </button>
              <button 
                className="p-2 text-[#C1121F] hover:bg-red-50 rounded-full transition-colors"
                title="Delete Event"
                onClick={onDelete}
              >
                <FaTrash />
              </button>
            </div>
          </div>
          
          <div className="mt-3 text-gray-700 line-clamp-2">
            {event.description}
          </div>
          
          {/* Photos Count */}
          {event.photos && event.photos.length > 0 && (
            <div className="mt-3 text-xs text-gray-500">
              {event.photos.length} photo{event.photos.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventsTab;