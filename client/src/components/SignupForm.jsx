import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SignupForm = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        if (onSuccess) onSuccess(data.message);
        if (onClose) onClose();
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 font-medium text-gray-700">Username</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaUser className="text-blue-900" />
          </div>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
            placeholder="Enter username"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="text-blue-900" />
          </div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
            placeholder="Enter email address"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block mb-2 font-medium text-gray-700">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="text-[#C1121F]" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-[#C1121F] focus:border-[#C1121F]"
            placeholder="Enter password"
            required
            minLength="6"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-900 transition-colors"
            onClick={togglePasswordVisibility}
            tabIndex="-1"
          >
            {showPassword ? 
              <FaEyeSlash className="h-5 w-5" title="Hide password" /> : 
              <FaEye className="h-5 w-5" title="Show password" />
            }
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Password must be at least 6 characters long</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-[#C1121F] p-4 rounded-md text-[#C1121F]">
          {error}
        </div>
      )}
      
      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-[#00243a] transition-colors flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </>
          ) : (
            <>
              <FaUserPlus className="mr-2" /> Create Admin User
            </>
          )}
        </button>
        {onClose && (
          <button
            type="button"
            className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors border border-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default SignupForm;