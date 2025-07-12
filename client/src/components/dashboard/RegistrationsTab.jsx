import React, { useState, useEffect } from 'react';
import { FaDownload, FaEnvelope, FaPhone, FaUser, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const RegistrationsTab = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch registrations
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('admin_token');
        
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/registrations`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        setRegistrations(response.data);
      } catch (err) {
        console.error('Error fetching registrations:', err);
        setError('Failed to load registrations');
        toast.error('Failed to load registrations');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  // Format date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-900">Registrations</h2>
        <p className="text-gray-600">View and manage user registrations</p>
      </div>

      {registrations.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
          <FaUser className="mx-auto mb-4 text-4xl text-gray-300" />
          <p>No registrations found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Occupation</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Resume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {registrations.map((registration) => (
                <tr key={registration._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-blue-900">{registration.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <div className="flex items-center text-sm">
                        <FaPhone className="text-blue-900 mr-2" size={12} />
                        <span>{registration.phoneNumber}</span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <FaEnvelope className="text-blue-900 mr-2" size={12} />
                        <span>{registration.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{registration.city}, {registration.state}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{registration.occupation}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{formatDate(registration.createdAt)}</div>
                  </td>
                  <td className="py-3 px-4">
                    <a 
                      href={registration.resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-900 hover:text-blue-900 transition-colors flex items-center"
                    >
                      <FaDownload className="mr-1" />
                      <span>View</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegistrationsTab;