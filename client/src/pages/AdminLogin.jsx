import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      // Verify token validity with backend
      const verifyToken = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/users/verify-token`, {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            navigate('/admin-dashboard');
          } else {
            // If token is invalid, clear it
            localStorage.removeItem('admin_token');
          }
        } catch (err) {
          localStorage.removeItem('admin_token');
        }
      };
      verifyToken();
    }
  }, [navigate]);

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
      // Call backend for login
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: form.email, 
          password: form.password 
        }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.token) {
        // Store token in localStorage
        localStorage.setItem('admin_token', data.token);
        
        // Store user info if available
        if (data.user) {
          localStorage.setItem('admin_user', JSON.stringify({
            id: data.user._id,
            username: data.user.username,
            email: data.user.email
          }));
        }
        
        // Redirect to admin dashboard
        navigate('/admin-dashboard');
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-30">
      <motion.div 
        className="max-w-md w-full space-y-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-amber-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to access the administrator dashboard
          </p>
        </div>
        
        <motion.div 
          className="mt-8 bg-white py-8 px-6 shadow-xl rounded-lg border-t-4 border-amber-900 backdrop-blur-sm bg-white/95"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-amber-900" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="focus:ring-amber-900 focus:border-amber-900 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-md"
                  placeholder="admin@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-amber-900" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="focus:ring-amber-900 focus:border-amber-900 block w-full pl-10 pr-12 py-3 sm:text-sm border-gray-300 rounded-md"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-amber-900 transition-colors"
                  onClick={togglePasswordVisibility}
                  tabIndex="-1"
                >
                  {showPassword ? 
                    <FaEyeSlash className="h-5 w-5" title="Hide password" /> : 
                    <FaEye className="h-5 w-5" title="Show password" />
                  }
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <div className="text-sm">
                  <a href="#" className="font-medium text-amber-900 hover:text-amber-700">
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-[#C1121F] p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-[#C1121F]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-[#C1121F]">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-900 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-900 transition-colors duration-300"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaSignInAlt className="h-5 w-5 text-amber-300 group-hover:text-amber-200" />
                </span>
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign in'}
              </button>
            </div>
          </form>
        </motion.div>
        
        <motion.div 
          className="text-center mt-4 text-sm text-gray-600"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <p>Need help? <a href="/contact" className="font-medium text-amber-900 hover:text-amber-700 transition-colors">Contact support</a></p>
        </motion.div>
        
        <motion.div 
          className="text-center mt-8"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <div className="text-xs text-gray-500">
            <p>This is a secure administrative area.</p>
            <p>Unauthorized access is prohibited and may be subject to legal action.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;