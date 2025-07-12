import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaImage, FaTrash, FaExclamationCircle } from 'react-icons/fa';

const DragDropImageUpload = ({ 
  onChange, 
  value, 
  multiple = false, 
  className = "", 
  maxFiles = 5,
  maxSizeInMB = 5,
  acceptedFileTypes = "image/*"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);
  
  // Convert value to array if it's not already
  const imageFiles = Array.isArray(value) ? value : (value ? [value] : []);
  
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
    if (!isDragging) setIsDragging(true);
  };
  
  // Process files whether from drop or file input
  const processFiles = (files) => {
    setErrorMessage("");
    
    // Convert FileList to Array
    const fileArray = Array.from(files);
    
    // Check file count if multiple uploads are allowed
    if (multiple && fileArray.length + imageFiles.length > maxFiles) {
      setErrorMessage(`You can only upload up to ${maxFiles} files.`);
      return;
    }

    // Validate files
    const validFiles = fileArray.filter(file => {
      // Check file type
      if (!file.type.match(acceptedFileTypes.replace(/\*/g, '.*'))) {
        setErrorMessage(`File '${file.name}' has an invalid file type.`);
        return false;
      }
      
      // Check file size
      if (file.size > maxSizeInMB * 1024 * 1024) {
        setErrorMessage(`File '${file.name}' exceeds the maximum size of ${maxSizeInMB}MB.`);
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length === 0) return;
    
    // Create object URLs for preview
    const newFiles = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    // Call onChange with new files added to existing files
    if (multiple) {
      onChange([...imageFiles, ...newFiles]);
    } else {
      // Replace existing file if not multiple
      onChange(newFiles[0]);
      
      // Revoke old preview URLs to prevent memory leaks
      if (imageFiles.length > 0 && imageFiles[0].preview) {
        URL.revokeObjectURL(imageFiles[0].preview);
      }
    }
  };
  
  // Handle dropped files
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };
  
  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };
  
  // Trigger file input click
  const handleChooseFile = () => {
    fileInputRef.current.click();
  };
  
  // Remove a file
  const handleRemoveFile = (index) => {
    const newFiles = [...imageFiles];
    
    // Revoke the preview URL to prevent memory leaks
    if (newFiles[index].preview) {
      URL.revokeObjectURL(newFiles[index].preview);
    }
    
    newFiles.splice(index, 1);
    onChange(multiple ? newFiles : null);
  };
  
  // Handle remove all
  const handleRemoveAll = () => {
    // Revoke all preview URLs
    imageFiles.forEach(file => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
    
    onChange(multiple ? [] : null);
  };
  
  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      // Revoke preview URLs when component unmounts
      if (imageFiles) {
        imageFiles.forEach(file => {
          if (file?.preview) URL.revokeObjectURL(file.preview);
        });
      }
    };
  }, []);
  
  return (
    <div className={`w-full ${className}`}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        multiple={multiple}
        className="hidden"
      />
      
      {/* Drag & Drop area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${
          isDragging 
            ? 'border-blue-900 bg-blue-900/10' 
            : 'border-gray-300 hover:border-blue-900 bg-gray-50'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleChooseFile}
      >
        <div className="flex flex-col items-center justify-center py-6 cursor-pointer">
          <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
          <p className="font-medium text-gray-700">
            Drag & drop {multiple ? 'images' : 'an image'} here
          </p>
          <p className="text-sm text-gray-500 mt-1">or</p>
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-900/90 transition-colors"
          >
            Choose {multiple ? 'Files' : 'File'}
          </button>
          <p className="mt-2 text-xs text-gray-500">
            {multiple ? `Up to ${maxFiles} files` : 'One file'}, max {maxSizeInMB}MB each
          </p>
        </div>
      </div>
      
      {/* Error message */}
      {errorMessage && (
        <div className="mt-2 text-sm text-red-600 flex items-center">
          <FaExclamationCircle className="mr-1" />
          {errorMessage}
        </div>
      )}
      
      {/* Preview area */}
      {imageFiles.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-700">
              {multiple ? 'Selected Images' : 'Selected Image'}
            </h4>
            {multiple && imageFiles.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveAll();
                }}
                className="text-sm text-red-600 hover:text-red-800 transition-colors flex items-center"
              >
                <FaTrash className="mr-1" size={12} />
                Remove All
              </button>
            )}
          </div>
          
          <div className={multiple ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" : ""}>
            {imageFiles.map((file, index) => (
              <div
                key={index}
                className="relative bg-gray-100 rounded-lg overflow-hidden border border-gray-300"
              >
                <div className="aspect-square">
                  <img
                    src={file.preview || URL.createObjectURL(file.file)}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                  className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-1 hover:bg-opacity-90 transition-opacity"
                  aria-label="Remove image"
                >
                  <FaTrash size={14} />
                </button>
                {file.file?.name && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 truncate">
                    {file.file.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropImageUpload;