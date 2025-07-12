import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Donation from './pages/Donation';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Events from './pages/Events';
import ProtectedRoute from './components/ProtectedRoute';
import { FaTimes, FaBell } from 'react-icons/fa';
import './App.css';
import Registration from './pages/Registration';
import Gallery from './pages/Gallery';

function App() {
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => setShowModal(true), 2000);
  //   return () => clearTimeout(timer);
  // }, []);
  
  // Animation variants from Home.jsx
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Router>
      <div className="ancizar-serif min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Enhanced Popup Modal with AnimatePresence for smooth animations */}
        <AnimatePresence>
          {showModal && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="bg-white rounded-lg shadow-xl w-full max-w-md relative overflow-hidden"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4 }}
              >
                {/* Top color band */}
                <div className="h-2 bg-gradient-to-r from-blue-900 to-blue-900"></div>
                
                {/* Close button */}
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-[#C1121F] transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <FaTimes size={20} />
                </button>
                
                <div className="p-6 pt-8">
                  {/* Icon at the top */}
                  <div className="w-16 h-16 rounded-full bg-blue-900 mx-auto mb-4 flex items-center justify-center text-white">
                    <FaBell size={28} />
                  </div>
                  
                  {/* Modal content */}
                  <h2 className="text-2xl font-bold mb-4 text-blue-900 text-center">
                    Welcome to Basava Parishath Bangalore!
                  </h2>
                  
                  <p className="text-gray-700 text-center mb-6">
                    Join our newsletter to stay updated on our latest events, initiatives, and opportunities to get involved with our community.
                  </p>
                  
                  {/* Email subscription form */}
                  <div className="mb-6">
                    <div className="flex">
                      <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
                      />
                      <button className="bg-[#C1121F] hover:bg-[#780000] text-white font-medium px-4 py-2 rounded-r-md transition-colors duration-300">
                        Subscribe
                      </button>
                    </div>
                  </div>
                  
                  {/* Modal footer */}
                  <div className="text-center text-sm text-gray-500 mt-4">
                    <p>By subscribing, you agree to our <a href="/privacy" className="text-blue-900 hover:text-blue-900 hover:underline">privacy policy</a></p>
                  </div>
                </div>
                
                {/* Bottom actions */}
                <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-t border-gray-200">
                  <button 
                    className="text-gray-600 hover:text-blue-900 text-sm font-medium hover:underline"
                    onClick={() => setShowModal(false)}
                  >
                    Remind me later
                  </button>
                  <button 
                    className="text-blue-900 hover:text-blue-900 text-sm font-medium hover:underline"
                    onClick={() => setShowModal(false)}
                  >
                    Don't show again
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
