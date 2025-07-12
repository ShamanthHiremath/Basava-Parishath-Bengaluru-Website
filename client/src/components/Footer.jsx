import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaHandHoldingHeart, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { useEffect } from 'react';

const Footer = () => {
  // Function to scroll to top when a link is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Using 'instant' instead of 'smooth' to avoid partial scrolling
    });
  };

  return (
    <footer className="bg-amber-950 text-white border-t border-amber-800 relative pt-10">
      <div className="container mx-auto px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About Section */}
          <div className="md:text-left text-center">
            <h3 className="text-xl font-bold mb-3 text-white border-b border-amber-600 pb-2 inline-block">About Us</h3>
            <p className="text-white mt-3">
              Empowering communities through education, skill development, sustainability, and social initiatives.
            </p>
            
            {/* Social Media Icons - Keep branded colors */}
            <div className="mt-8">
              <h4 className="text-white font-medium mb-2">Connect With Us</h4>
              <ul className="flex space-x-3 w-full justify-center md:justify-start">
                <li>
                  <a 
                    href="https://www.facebook.com/forwardfoundation.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="Facebook"
                  >
                    <div className="bg-[#1877F2] text-white p-2 rounded-full w-9 h-9 flex items-center justify-center">
                      <FaFacebookF size={18} />
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="#0"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="Instagram"
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center instagram-gradient">
                      <FaInstagram size={18} className="text-white" />
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="#0"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="LinkedIn"
                  >
                    <div className="bg-[#0A66C2] text-white p-2 rounded-full w-9 h-9 flex items-center justify-center">
                      <FaLinkedinIn size={18} />
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="#0"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="YouTube"
                  >
                    <div className="bg-[#FF0000] text-white p-2 rounded-full w-9 h-9 flex items-center justify-center">
                      <FaYoutube size={18} />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Quick Links - Modified to scroll to top */}
            <div className="mt-8">
              <h4 className="text-white font-medium mb-3">Quick Links</h4>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-2 w-full justify-center md:justify-start">
                <li>
                  <Link 
                    to="/" 
                    className="text-white hover:text-amber-200 transition-colors"
                    onClick={scrollToTop}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className="text-white hover:text-amber-200 transition-colors"
                    onClick={scrollToTop}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/events" 
                    className="text-white hover:text-amber-200 transition-colors"
                    onClick={scrollToTop}
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-white hover:text-amber-200 transition-colors"
                    onClick={scrollToTop}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/donate" 
                    className="text-amber-200 hover:text-white font-medium transition-colors flex items-center gap-1"
                    onClick={scrollToTop}
                  >
                    <FaHandHoldingHeart size={14} />
                    Donate
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="flex flex-col max-md:items-center">
            <h3 className="text-xl font-bold mb-3 text-white border-b border-amber-600 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-3 mt-3">
              <li className="flex items-center space-x-3">
                <div className="bg-amber-600 p-2 rounded-full">
                  <FiMail className="text-white" size={18} />
                </div>
                <a 
                  href="mailto:mediavisionbng@gmail.com" 
                  className="text-white hover:text-amber-200 transition-colors"
                >
                  mediavisionbng@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="bg-amber-600 p-2 rounded-full">
                  <FiPhone className="text-white" size={18} />
                </div>
                <a 
                  href="tel:+917259456555" 
                  className="text-white hover:text-amber-200 transition-colors"
                >
                  +91 72594 56555
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-amber-600 p-2 rounded-full mt-1">
                  <FiMapPin className="text-white" size={18} />
                </div>
                <span className="text-white">
                  18th Cross, Near Sankey Tank, Malleshwaram, Bengaluru - 06
                </span>
              </li>
            </ul>
            
            {/* Donate Button - Modified to scroll to top */}
            <Link 
              to="/donate"
              className="mt-8 w-full md:w-auto flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-100 text-amber-800 font-medium rounded-md transition-colors shadow-md"
              onClick={scrollToTop}
            >
              <FaHandHoldingHeart className="mr-2" />
              Support Our Cause
            </Link>
          </div>
          
          {/* Map Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4 text-white border-b border-amber-600 pb-2 inline-block">Our Location</h3>
            <div className="rounded-lg overflow-hidden shadow-lg border border-amber-600 w-full">
              <iframe
                title="Organization Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d242.96459075516375!2d77.57097012590636!3d13.00804649234904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1752358321390!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-amber-700 mt-8 pt-6 text-center">
          <p className="text-white">
            © {new Date().getFullYear()} Basava Parishath Bengaluru. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* WhatsApp Button - unchanged */}
      {/* ... */}

      {/* CSS for Instagram gradient - unchanged */}
      {/* ... */}
    </footer>
  );
};

export default Footer;