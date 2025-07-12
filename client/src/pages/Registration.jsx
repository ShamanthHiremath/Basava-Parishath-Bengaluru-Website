import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    worksDone: '',
    contributionsAchievements: '',
    occupation: ''
  });
  
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        e.target.value = null;
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size should be less than 5MB');
        e.target.value = null;
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!resumeFile) {
      toast.error('Please upload your resume');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Create form data for file upload
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Add resume file
      formDataToSend.append('resume', resumeFile);
      
      // Submit registration
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/registrations`, 
        formDataToSend, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Reset form on success
      setFormData({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        city: '',
        state: '',
        worksDone: '',
        contributionsAchievements: '',
        occupation: ''
      });
      setResumeFile(null);
      setSuccess(true);
      
      toast.success('Registration submitted successfully!');
      
      // Reset file input
      document.getElementById('resume-upload').value = '';
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.error || 'Failed to submit registration');
      toast.error(err.response?.data?.error || 'Failed to submit registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12" style={{ marginTop: '5rem' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-amber-900 to-amber-800 py-6 px-8">
            <h1 className="text-2xl font-bold text-white">Registration Form</h1>
            <p className="text-gray-100 mt-2">Nominee Application Form</p>
          </div>
          
          {success ? (
            <div className="p-8 text-center">
              <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-2">Registration Successful!</h2>
                <p>Thank you for your registration. We will get back to you soon.</p>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="bg-amber-900 text-white px-6 py-2 rounded-md hover:bg-amber-800 transition-colors"
              >
                Register Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8">
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="md:col-span-2">
                  <h2 className="text-lg font-semibold text-amber-900 mb-4 border-b border-gray-200 pb-2">
                    Personal Information
                  </h2>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-900 focus:border-amber-900 outline-none"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                    Phone Number (WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-900 focus:border-amber-900 outline-none"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-900 focus:border-amber-900 outline-none"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="resume" className="block text-gray-700 font-medium mb-2">
                    Resume (PDF) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="resume-upload"
                    name="resume"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-900 focus:border-amber-900 outline-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-900 focus:border-amber-900 outline-none"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-900 focus:border-amber-900 outline-none"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-900 focus:border-amber-900 outline-none"
                    required
                  />
                </div>
                
                {/* Professional Information */}
                <div className="md:col-span-2 mt-4">
                  <h2 className="text-lg font-semibold text-amber-900 mb-4 border-b border-gray-200 pb-2">
                    Professional Information
                  </h2>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="occupation" className="block text-gray-700 font-medium mb-2">
                    Occupation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-900 focus:border-amber-900 outline-none"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="worksDone" className="block text-gray-700 font-medium mb-2">
                    Works Done
                  </label>
                  <textarea
                    id="worksDone"
                    name="worksDone"
                    value={formData.worksDone}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-900 focus:border-amber-900 outline-none"
                  ></textarea>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="contributionsAchievements" className="block text-gray-700 font-medium mb-2">
                    Contributions and Achievements
                  </label>
                  <textarea
                    id="contributionsAchievements"
                    name="contributionsAchievements"
                    value={formData.contributionsAchievements}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-900 focus:border-amber-900 outline-none"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-amber-900 text-white px-6 py-3 rounded-md hover:bg-amber-800 transition-colors font-medium flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Registration'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;