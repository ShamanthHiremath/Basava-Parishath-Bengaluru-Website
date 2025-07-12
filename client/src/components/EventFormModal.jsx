import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import EventForm from './EventForm';
import axios from 'axios';

const EventFormModal = ({ isOpen, onClose, onEventCreated, eventToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    venue: '',
    description: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [existingPhotos, setExistingPhotos] = useState([]);

  // Initialize form with event data when editing
  useEffect(() => {
    if (eventToEdit) {
      // Format date to YYYY-MM-DD for input[type="date"]
      const formattedDate = eventToEdit.date 
        ? new Date(eventToEdit.date).toISOString().split('T')[0]
        : '';
        
      setFormData({
        name: eventToEdit.name || '',
        date: formattedDate,
        venue: eventToEdit.venue || '',
        description: eventToEdit.description || ''
      });
      
      // Set existing photos if available
      if (eventToEdit.photos && eventToEdit.photos.length > 0) {
        setExistingPhotos(eventToEdit.photos);
      }
    } else {
      // Reset form when creating new event
      setFormData({
        name: '',
        date: '',
        venue: '',
        description: ''
      });
      setExistingPhotos([]);
    }
    
    setSelectedFiles([]);
    setError('');
  }, [eventToEdit, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add files to selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      // Reset input value to allow selecting the same file again
      e.target.value = '';
    }
  };

  // Handle removing a file or existing photo
  const handleRemoveFile = (index, isExisting = false) => {
    if (isExisting) {
      setExistingPhotos(prev => prev.filter((_, i) => i !== index));
    } else {
      setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Combined files for display
  const allPhotos = [
    ...existingPhotos.map(url => ({ url, isExisting: true })),
    ...selectedFiles.map(file => ({ file, isExisting: false }))
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('You must be logged in to perform this action');
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('venue', formData.venue);
      formDataToSend.append('description', formData.description);
      
      // Add existing photos to keep
      existingPhotos.forEach((url, index) => {
        formDataToSend.append('existingPhotos', url);
      });
      
      // Add new photos
      selectedFiles.forEach(file => {
        formDataToSend.append('photos', file);
      });

      let response;
      
      if (eventToEdit) {
        // Update existing event
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/events/${eventToEdit._id}`, 
          formDataToSend, 
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          }
        );
      } else {
        // Create new event
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/events`, 
          formDataToSend, 
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          }
        );
      }

      if (onEventCreated) {
        onEventCreated(response.data);
      }
      
      onClose();
    } catch (err) {
      console.error('Error with event:', err);
      setError(err.response?.data?.message || 'Failed to process event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={eventToEdit ? "Edit Event" : "Create New Event"}
    >
      <EventForm
        form={formData}
        onChange={handleInputChange}
        onFileChange={handleFileChange}
        onRemoveFile={(index) => handleRemoveFile(index, false)}
        onRemoveExistingPhoto={(index) => handleRemoveFile(index, true)}
        onSubmit={handleSubmit}
        loading={isSubmitting}
        error={error}
        onCancel={onClose}
        selectedFiles={selectedFiles}
        existingPhotos={existingPhotos}
        isEditing={!!eventToEdit}
      />
    </Modal>
  );
};

export default EventFormModal;