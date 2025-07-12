import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaUser, FaEnvelope, FaPhone, FaRupeeSign, FaComment } from 'react-icons/fa';

const Donation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    description: '',
    anonymous: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false); // for entrance animation

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setLoading(true);
    try {
      // Call backend to create Razorpay order
      const res = await fetch(`${process.env.REACT_APP_API_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: Number(formData.amount),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          description: formData.description,
          anonymous: formData.anonymous
        }),
      });
      const order = await res.json();
      if (!order.id) throw new Error(order.error || 'Order creation failed');
      // Open Razorpay modal
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxx', // Replace with your Razorpay key or use env
        amount: order.amount,
        currency: order.currency,
        name: 'Basava Parishath Bangalore',
        description: 'Donation',
        order_id: order.id,
        handler: function (response) {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#92400e',
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load Razorpay script
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
    // Trigger entrance animation
    setTimeout(() => setShow(true), 100);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  // Predefined donation amounts
  const suggestedAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Banner - 2/3 Screen */}
      <motion.section
        className="bg-gradient-to-r from-amber-900 to-amber-800 text-white relative overflow-hidden"
        style={{ 
          height: '66.67vh',
          minHeight: '66.67dvh' // Dynamic viewport height for mobile devices
        }}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center h-full flex flex-col items-center justify-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Support Our Cause
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your support empowers our mission.
            Help us provide essential services, amplify unheard voices, and nurture future leaders.
          </motion.p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            {/* Left Column - Donation Info */}
            <motion.div
              className="md:col-span-2"
              variants={fadeInUp}
              transition={{ duration: 0.7 }}
            >
              <div className={`bg-white p-8 rounded-lg shadow-lg h-full border-l-4 border-amber-900 transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-2xl font-bold mb-6 text-amber-900 border-b-2 border-amber-900 pb-2 inline-block">Why Donate?</h2>
                
                <div className="space-y-6 text-gray-600">
                  <p>Your generosity enables us to:</p>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-900 text-white p-2 rounded-full mr-3 mt-1">
                      <FaHandHoldingHeart />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900">Empower Communities</h3>
                      <p className="text-sm">With free health camps, women’s empowerment initiatives, and student support.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-900 text-white p-2 rounded-full mr-3 mt-1">
                      <FaHandHoldingHeart />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900">Elevate Education</h3>
                      <p className="text-sm">Recognizing top educators, supporting students, and hosting cultural education camps.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-700 text-white p-2 rounded-full mr-3 mt-1">
                      <FaHandHoldingHeart />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900">Advance Development</h3>
                      <p className="text-sm">Strategic support for social infrastructure and awareness-building through media.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">Tax Benefits</h3>
                  <p className="text-sm text-gray-600">
                    All donations are eligible for tax deduction under Section 80G of the Income Tax Act.
                  </p>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-500 italic">
                    "Generosity consists not of the sum given, but the manner in which it is bestowed."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Donation Form */}
            <motion.div
              className="md:col-span-3"
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <form 
                onSubmit={handleDonate} 
                className={`bg-white p-8 rounded-lg shadow-lg border-l-4 border-amber-900 transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <h2 className="text-2xl font-bold mb-6 text-amber-900 border-b-2 border-amber-900 pb-2 inline-block">Make a Donation</h2>
                
                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Your Name</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-amber-900">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        name="name"
                        className="w-full border rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                      />
                    </div>
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-amber-900">
                        <FaEnvelope />
                      </span>
                      <input
                        type="email"
                        name="email"
                        className="w-full border rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  
                  {/* Phone Field */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-amber-900">
                        <FaPhone />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full border rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your Phone Number"
                      />
                    </div>
                  </div>
                  
                  {/* Amount Field */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Donation Amount (INR)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-amber-700">
                        <FaRupeeSign />
                      </span>
                      <input
                        type="number"
                        name="amount"
                        min="1"
                        className="w-full border rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-amber-700"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Amount in INR"
                        required
                      />
                    </div>
                    
                    {/* Suggested Amounts */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {suggestedAmounts.map(amount => (
                        <button
                          key={amount}
                          type="button"
                          className={`px-3 py-1 text-sm rounded-md ${
                            Number(formData.amount) === amount
                              ? 'bg-amber-900 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                        >
                          ₹{amount}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Description Field */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Message (Optional)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-amber-900">
                        <FaComment />
                      </span>
                      <textarea
                        name="description"
                        rows="3"
                        className="w-full border rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Share why you're making this donation..."
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* Anonymous Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="anonymous"
                      name="anonymous"
                      checked={formData.anonymous}
                      onChange={handleChange}
                      className="w-4 h-4 text-amber-900 border-gray-300 rounded focus:ring-amber-900"
                    />
                    <label htmlFor="anonymous" className="ml-2 text-gray-700">
                      Make this donation anonymous
                    </label>
                  </div>
                  
                  {error && (
                    <div className="text-amber-800 bg-red-50 p-3 rounded-lg border-l-4 border-amber-700">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="w-full bg-amber-700 text-white py-3 px-4 rounded-lg hover:bg-amber-800 transition font-semibold flex items-center justify-center gap-2 shadow-md mt-4"
                    disabled={loading}
                  >
                    <FaHandHoldingHeart />
                    {loading ? 'Processing...' : 'Complete Donation'}
                  </button>
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Your financial information is encrypted and secure.</p>
                  <div className="flex justify-center gap-4 mt-2">
                    <img src="https://cdn.razorpay.com/static/assets/merchant-badge/badge-dark.png" alt="Razorpay Secure" className="h-10" />
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
          
          {/* Donation Impact Section */}
          <motion.div
            className="mt-16"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-amber-900 border-b-2 border-amber-900 pb-2 inline-block">Your Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { amount: "₹500", impact: "Provides educational materials for one child for a month" },
                { amount: "₹1,000", impact: "Supports a family with essential supplies for a week" },
                { amount: "₹5,000", impact: "Helps fund community development projects in rural areas" }
              ].map((item, idx) => (
                <motion.div
                  key={item.amount}
                  className="bg-white p-8 rounded-lg shadow-lg border-t-4 hover:shadow-xl transition-shadow text-center"
                  style={{ borderColor: idx === 0 ? '#92400e' : idx === 1 ? '#d97706' : '#b45309' }}
                  variants={fadeInUp}
                  transition={{ duration: 0.7, delay: 0.2 * idx }}
                >
                  <div className="text-3xl font-bold mb-4 text-amber-900">{item.amount}</div>
                  <p className="text-gray-600">{item.impact}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Call to Action */}
      <motion.section
        className="text-amber-900 py-16 mt-8"
        style={{ backgroundColor: '#d2b48c' }}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Other Ways to Support</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Beyond financial contributions, there are many ways you can help our cause.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/volunteer"
              className="bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-800 transition duration-300 shadow-lg"
            >
              Volunteer With Us
            </a>
            <a
              href="/contact"
              className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
            >
              Contact for Partnerships
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Donation;