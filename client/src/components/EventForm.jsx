import React, { useState, useRef } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaFileImage, FaAlignLeft, FaTimesCircle, FaUpload } from 'react-icons/fa';

const EventForm = ({ 
  form, 
  onChange, 
  onFileChange, 
  onSubmit, 
  loading, 
  error, 
  onCancel, 
  selectedFiles = [], 
  existingPhotos = [],
  onRemoveFile,
  onRemoveExistingPhoto,
  isEditing = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dropZoneRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = [...e.dataTransfer.files];
    if (files.length > 0) {
      // Filter only image files
      const imageFiles = files.filter(file => 
        file.type.startsWith('image/')
      );
      
      if (imageFiles.length === 0) {
        alert('Please drop only image files');
        return;
      }
      
      // Create a synthetic event object to pass to the onFileChange handler
      const syntheticEvent = {
        target: {
          files: imageFiles
        }
      };
      onFileChange(syntheticEvent);
    }
  };

  // Handle click on drop zone
  const handleDropZoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 font-medium text-gray-700">Event Name</label>
        <div className="relative">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
            placeholder="Enter event name"
            required
          />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-700">Event Date</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-amber-900" />
            </div>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
              required
            />
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-700">Venue</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-amber-900" />
            </div>
            <input
              type="text"
              name="venue"
              value={form.venue}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
              placeholder="Enter venue location"
              required
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          <div className="flex items-center">
            <FaFileImage className="mr-2 text-amber-900" />
            <span>Event Photos</span>
          </div>
        </label>
        
        <div 
          ref={dropZoneRef}
          className={`border-2 border-dashed ${isDragging ? 'border-amber-900 bg-amber-100' : 'border-amber-900 bg-amber-50'} rounded-lg p-6 hover:bg-amber-100 transition-colors`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleDropZoneClick}
        >
          <div className="flex flex-col items-center justify-center cursor-pointer mb-4">
            <input
              ref={fileInputRef}
              type="file"
              id="event-photos"
              name="photos"
              multiple
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center py-4">
              {isDragging ? (
                <FaUpload className="text-amber-900 text-4xl mb-2 animate-bounce" />
              ) : (
                <FaFileImage className="text-amber-900 text-3xl mb-2" />
              )}
              <span className="text-amber-900 font-medium">
                {isDragging ? 'Drop images here' : 'Drag and drop or click to select images'}
              </span>
              <span className="text-gray-500 text-sm mt-1">
                {isEditing ? 'Add new photos or remove existing ones' : 'Select images to upload'}
              </span>
            </div>
          </div>
          
          {/* Display both existing and newly selected photos */}
          {(existingPhotos.length > 0 || selectedFiles.length > 0) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 w-full" onClick={(e) => e.stopPropagation()}>
              {/* Existing photos */}
              {existingPhotos.map((photoUrl, idx) => (
                <div 
                  key={`existing-${idx}`} 
                  className="group relative aspect-square rounded-lg overflow-hidden border border-gray-300 bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={photoUrl}
                    alt={`Existing photo ${idx+1}`}
                    className="object-cover w-full h-full"
                  />
                  {/* Tag showing it's an existing photo */}
                  <div className="absolute top-1 left-1 bg-amber-600 text-white text-xs px-2 py-1 rounded-full opacity-70">
                    Existing
                  </div>
                  {/* Remove button */}
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white bg-opacity-75 rounded-full p-1 text-red-500 hover:text-red-700 hover:bg-opacity-100 transition-colors opacity-0 group-hover:opacity-100"
                    onClick={() => onRemoveExistingPhoto(idx)}
                    aria-label="Remove existing image"
                  >
                    <FaTimesCircle size={18} />
                  </button>
                </div>
              ))}

              {/* Newly selected photos */}
              {selectedFiles.map((file, idx) => (
                <div 
                  key={`new-${idx}`} 
                  className="group relative aspect-square rounded-lg overflow-hidden border border-gray-300 bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="object-cover w-full h-full"
                  />
                  {/* Tag showing it's a new photo */}
                  <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full opacity-70">
                    New
                  </div>
                  {/* Remove button */}
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white bg-opacity-75 rounded-full p-1 text-red-500 hover:text-red-700 hover:bg-opacity-100 transition-colors opacity-0 group-hover:opacity-100"
                    onClick={() => onRemoveFile(idx)}
                    aria-label="Remove new image"
                  >
                    <FaTimesCircle size={18} />
                  </button>
                </div>
              ))}
              
              {/* Add more button */}
              <label 
                htmlFor="event-photos" 
                className="aspect-square rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaFileImage className="text-gray-400 text-2xl mb-2" />
                <span className="text-gray-500 text-sm font-medium">Add More</span>
              </label>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">You can select multiple images or drag & drop them. Recommended size: 1200 x 800 pixels.</p>
      </div>
      
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          <div className="flex items-center">
            <FaAlignLeft className="mr-2 text-amber-900" />
            <span>Description</span>
          </div>
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
          rows={5}
          placeholder="Provide a detailed description of the event..."
          required
        />
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700">
          {error}
        </div>
      )}
      
      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          className="flex-1 bg-amber-900 text-white py-3 rounded-lg font-medium hover:bg-amber-800 transition-colors flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isEditing ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            isEditing ? 'Update Event' : 'Create Event'
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors border border-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;