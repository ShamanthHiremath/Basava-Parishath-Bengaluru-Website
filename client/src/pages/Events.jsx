import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
// Import event banner images
import event1 from '../assets/events/012A3702.jpg';
import event2 from '../assets/events/DSC07070.jpg';
import event3 from '../assets/events/DSC07105.jpg';

const Events = () => {
  // Keep existing state variables
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Banner carousel data
  const carouselImages = [
    {
      url: event1,
      title: "Our Events",
      subtitle: "We celebrate, educate, and inspire"
    },
    {
      url: event2,
      title: "Our Events",
      subtitle: "We celebrate, educate, and inspire"
    },
    {
      url: event3,
      title: "Our Events",
      subtitle: "We celebrate, educate, and inspire"
    }
  ];
  
  const totalSlides = carouselImages.length;

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };
  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
        setEvents(response.data);
        // If events exist, set the first event as selected by default
        if (response.data.length > 0) {
          setSelectedEventId(response.data[0]._id);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Auto-move event image carousel
  useEffect(() => {
    const selectedEvent = events.find(e => e._id === selectedEventId);
    if (!selectedEvent || !autoPlay || !selectedEvent.photos || selectedEvent.photos.length <= 1) return;
    
    const interval = setInterval(() => {
      setCarouselIdx((idx) => (idx + 1) % selectedEvent.photos.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [selectedEventId, autoPlay, events]);

  // Reset carousel index when event changes
  useEffect(() => {
    setCarouselIdx(0);
    setAutoPlay(true);
  }, [selectedEventId]);

  // Banner auto-rotation (new hero carousel)
  useEffect(() => {
    if (!showGrid) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % totalSlides);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [totalSlides, showGrid]);

  // Get selected event object
  const selectedEvent = events.find(e => e._id === selectedEventId);

  // Hero carousel controls
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  // Filter events into upcoming and past events
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of day for accurate comparison
  
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today;
  }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date ascending
  
  const pastEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate < today;
  }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending (newest first)

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-900"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-amber-800 p-8 rounded-lg border-l-4 border-amber-700 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Add this function to handle event selection and scrolling
  const handleEventSelect = (eventId) => {
    setSelectedEventId(eventId);
    setShowGrid(false);
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Banner with Carousel - Only show if in grid view */}
      {showGrid && (
        <section className="relative w-full h-[100vh] overflow-hidden" style={{ minHeight: '100dvh' }}>
          {/* Carousel Images */}
          {carouselImages.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                zIndex: currentSlide === index ? 10 : 0
              }}
              transition={{ duration: 1 }}
            >
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${slide.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center'
                }}
              >
                {/* Dark overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/60">
                  {/* Content Centered Overlay - Updated position */}
                  <motion.div 
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: currentSlide === index ? 1 : 0
                    }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <div className="max-w-3xl mx-auto px-6 py-10 rounded-lg">
                      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
                        {slide.subtitle}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Navigation Arrows */}
          <div className="absolute z-20 flex justify-between items-center w-full top-1/2 px-4 md:px-8 transform -translate-y-1/2">
            <button 
              onClick={goToPrevSlide}
              className="bg-black/40 hover:bg-black/60 text-white rounded-full p-2 md:p-3 backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <FaArrowLeft size={20} />
            </button>
            <button 
              onClick={goToNextSlide}
              className="bg-black/40 hover:bg-black/60 text-white rounded-full p-2 md:p-3 backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <FaArrowRight size={20} />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/60 hover:bg-white/90 hover:scale-110'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Rest of the Events page content */}
      <div className={`container mx-auto ${showGrid ? 'py-12' : 'py-8 mt-8'} px-4`}>
        {/* Event Grid */}
        {showGrid && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mt-4"
          >
            {/* Upcoming Events Section */}
            {upcomingEvents.length > 0 && (
              <div className="mb-12">
                <motion.div 
                  variants={fadeInUp}
                  className="mb-8 text-center"
                >
                  <h2 className="text-3xl font-bold mb-4 text-amber-900 border-b-2 border-amber-900 pb-2 inline-block">Upcoming Events</h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Join us at our upcoming events and be part of our community initiatives.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                  variants={stagger}
                >
                  {upcomingEvents.map((event, idx) => (
                    <motion.div
                      key={event._id}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden border-t-4"
                      style={{ borderColor: idx === 0 ? '#92400e' : idx === 1 ? '#d97706' : '#b45309' }}
                      onClick={() => handleEventSelect(event._id)}
                      variants={fadeInUp}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <div className="relative">
                        <img
                          src={event.photos && event.photos.length > 0 ? event.photos[0] : '/placeholder-event.jpg'}
                          alt={event.name}
                          className="w-full h-52 object-cover"
                          onError={(e) => {
                            e.target.src = '/placeholder-event.jpg';
                          }}
                        />
                        <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 m-2 rounded-lg text-sm font-medium">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-amber-900 mb-2">{event.name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <FaMapMarkerAlt className="text-amber-900 mr-2" />
                          <span>{event.venue}</span>
                        </div>
                        <p className="text-gray-600 line-clamp-2">{event.description}</p>
                        <button className="mt-4 text-amber-700 font-medium hover:text-amber-800 transition flex items-center">
                          View Details <FaArrowRight className="ml-1" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
            
            {/* Past Events Section - Keep existing code */}
            {pastEvents.length > 0 && (
              <div className="mt-12">
                <motion.div 
                  variants={fadeInUp}
                  className="mb-8 text-center"
                >
                  <h2 className="text-3xl font-bold mb-4 text-amber-900 border-b-2 border-amber-900 pb-2 inline-block">Past Events</h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Explore our previous events and the impact they've made in our community.
                  </p>
                </motion.div>
                
                {/* Keep existing past events code */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                  variants={stagger}
                >
                  {pastEvents.map((event, idx) => (
                    <motion.div
                      key={event._id}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden border-t-4"
                      style={{ borderColor: idx % 3 === 0 ? '#92400e' : idx % 3 === 1 ? '#d97706' : '#b45309' }}
                      onClick={() => handleEventSelect(event._id)}
                      variants={fadeInUp}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <div className="relative">
                        <img
                          src={event.photos && event.photos.length > 0 ? event.photos[0] : '/placeholder-event.jpg'}
                          alt={event.name}
                          className="w-full h-52 object-cover grayscale-[30%]"
                          onError={(e) => {
                            e.target.src = '/placeholder-event.jpg';
                          }}
                        />
                        <div className="absolute top-0 right-0 bg-gray-700 text-white px-3 py-1 m-2 rounded-lg text-sm font-medium">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-amber-900 mb-2">{event.name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <FaMapMarkerAlt className="text-amber-900 mr-2" />
                          <span>{event.venue}</span>
                        </div>
                        <p className="text-gray-600 line-clamp-2">{event.description}</p>
                        <button className="mt-4 text-amber-700 font-medium hover:text-amber-800 transition flex items-center">
                          View Details <FaArrowRight className="ml-1" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
            
            {/* No events message */}
            {events.length === 0 && (
              <motion.div 
                variants={fadeInUp}
                className="text-center py-12 bg-gray-50 rounded-lg"
              >
                <FaCalendarAlt className="mx-auto text-5xl text-gray-300 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No events available</h3>
                <p className="text-gray-500">Check back soon for upcoming events!</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Full Event Info (Detail View) - Keep existing code */}
        {!showGrid && selectedEvent && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.button
              className="mb-6 px-4 py-2 bg-white hover:bg-gray-100 text-amber-900 font-semibold rounded-lg shadow flex items-center transition duration-300"
              onClick={() => setShowGrid(true)}
              variants={fadeInUp}
            >
              <FaArrowLeft className="mr-2" /> Back to Events
            </motion.button>

            <motion.div 
              className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12 border-t-4 border-amber-900"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              {/* Carousel for images */}
              {selectedEvent.photos && selectedEvent.photos.length > 0 && (
                <div className="relative w-full flex flex-col items-center mb-8">
                  <div className="relative w-full max-w-4xl h-[320px] md:h-[480px] flex items-center justify-center mx-auto rounded-lg overflow-hidden shadow-lg">
                    {selectedEvent.photos.length > 1 && (
                      <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow hover:bg-amber-900 hover:text-white z-10 transition-colors"
                        onClick={() => {
                          setAutoPlay(false);
                          setCarouselIdx((carouselIdx - 1 + selectedEvent.photos.length) % selectedEvent.photos.length);
                        }}
                      >
                        <FaArrowLeft />
                      </button>
                    )}
                    
                    <img
                      src={selectedEvent.photos[carouselIdx]}
                      alt={selectedEvent.name}
                      className="object-cover h-full w-full transition-all duration-500"
                      onError={(e) => {
                        e.target.src = '/placeholder-event.jpg';
                      }}
                    />
                    
                    {selectedEvent.photos.length > 1 && (
                      <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow hover:bg-amber-900 hover:text-white z-10 transition-colors"
                        onClick={() => {
                          setAutoPlay(false);
                          setCarouselIdx((carouselIdx + 1) % selectedEvent.photos.length);
                        }}
                      >
                        <FaArrowRight />
                      </button>
                    )}
                  </div>
                  
                  {selectedEvent.photos.length > 1 && (
                    <div className="flex gap-2 mt-6 justify-center">
                      {selectedEvent.photos.map((_, idx) => (
                        <button
                          key={idx}
                          className={`w-4 h-4 rounded-full ${idx === carouselIdx ? 'bg-amber-900 border-amber-900' : 'bg-gray-200 border-gray-300'} border-2 transition-colors`}
                          onClick={() => {
                            setAutoPlay(false);
                            setCarouselIdx(idx);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Event details below carousel */}
              <div className="px-2">
                <h3 className="text-3xl font-bold mb-4 text-amber-900 border-b-2 border-amber-900 pb-2 inline-block">{selectedEvent.name}</h3>
                
                <div className="flex flex-wrap gap-8 mb-6 text-lg text-gray-700">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-amber-900 mr-3" />
                    <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-amber-700 mr-3" />
                    <span>{selectedEvent.venue}</span>
                  </div>
                </div>
                
                <div className="text-gray-700 mt-6 whitespace-pre-line text-lg leading-relaxed bg-gray-50 p-6 rounded-lg border-l-4 border-amber-900">
                  {selectedEvent.description}
                </div>
                
                {/* Event status badge */}
                <div className="mt-8">
                  {new Date(selectedEvent.date) >= today ? (
                    <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      Upcoming Event
                    </span>
                  ) : (
                    <span className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                      Past Event
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Other Events Section */}
            <motion.div 
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-2xl font-bold mb-6 text-amber-900 border-b-2 border-amber-900 pb-2 inline-block">Other Events</h4>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                variants={stagger}
              >
                {events
                  .filter(e => e._id !== selectedEventId)
                  .slice(0, 4) // Show up to 4 other events
                  .map((event, idx) => (
                    <motion.div
                      key={event._id}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden border-l-4 flex"
                      style={{ borderColor: idx === 0 ? '#92400e' : idx === 1 ? '#d97706' : idx === 2 ? '#b45309' : '#f59e0b' }}
                      onClick={() => { 
                        handleEventSelect(event._id); // Updated to use the new function
                        setCarouselIdx(0); 
                        setAutoPlay(true); 
                      }}
                      variants={fadeInUp}
                    >
                      <img
                        src={event.photos && event.photos.length > 0 ? event.photos[0] : '/placeholder-event.jpg'}
                        alt={event.name}
                        className="w-24 h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder-event.jpg';
                        }}
                      />
                      <div className="p-4 flex-1">
                        <h3 className="text-lg font-semibold text-amber-900">{event.name}</h3>
                        <div className="flex items-center text-gray-600 text-sm mt-1">
                          <FaCalendarAlt className="text-amber-900 mr-2" />
                          <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <p className="text-gray-600 mt-2 text-sm line-clamp-1">{event.description}</p>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Call to Action - Keep existing code */}
      <motion.section
        className="text-amber-900 py-16 mt-8"
        style={{ backgroundColor: '#d2b48c' }}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Planning an Event?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Partner with Basava Parishath to organize and promote your next event. Our team will help ensure its success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-800 transition duration-300 shadow-lg"
            >
              Contact Our Team
            </a>
            <a
              href="#"
              className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
            >
              View Event Calendar
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Events;