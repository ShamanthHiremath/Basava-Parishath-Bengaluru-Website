import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { FaHandHoldingHeart, FaGraduationCap, FaPeopleCarry, FaSeedling, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import logo from '../assets/logo.png';
import image1 from '../assets/events/012A3702.jpg';
import image2 from '../assets/events/DSC07070.jpg';
import image3 from '../assets/events/DSC07105.jpg';
import image4 from '../assets/events/012A3722.jpg';
import image5 from '../assets/events/DSC07055.jpg';
import image6 from '../assets/events/DSC07193.jpg';
function Home() {
  // Animation variants for reuse
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const containerStagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    {
      url: image1,
      title: "Welcome to Basava Parishath Bengaluru",
      subtitle: "Empowering society through media, strategy, and community engagement."
    },
    {
      url: image2,
      title: "Welcome to Basava Parishath Bengaluru",
      subtitle: "Empowering society through media, strategy, and community engagement."
    },
    {
      url: image3,
      title: "Welcome to Basava Parishath Bengaluru",
      subtitle: "Empowering society through media, strategy, and community engagement."
    }
  ];
  const totalSlides = carouselImages.length;
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 6000); // Change slide every 6 seconds
    
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel - Full Screen */}
      <section 
        className="relative w-full overflow-hidden" 
        style={{ 
          height: '100vh',
          minHeight: '100dvh' // Dynamic viewport height for mobile devices
        }}
      >
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
              <div className="absolute inset-0 bg-black/50">
                {/* Content Centered Overlay */}
                <motion.div 
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-8 pt-24"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: currentSlide === index ? 1 : 0
                  }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {/* Logo */}
                  <div className="flex bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl justify-center mb-8 shadow-2xl">
                    <img 
                      src={logo} 
                      alt="Basava Parishath Bengaluru Logo" 
                      className="h-20 md:h-28 lg:h-32 drop-shadow-lg"
                    />
                  </div>
                  
                  <motion.h1
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-2xl leading-tight"
                    variants={fadeInUp}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto text-white/95 drop-shadow-xl leading-relaxed"
                    variants={fadeInUp}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    variants={fadeInUp}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Link
                      to="/about"
                      className="bg-white/90 backdrop-blur-sm text-amber-900 px-8 py-4 rounded-xl font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                      Learn More
                    </Link>
                    <Link
                      to="/donate"
                      className="bg-amber-700 hover:bg-amber-800 hover:scale-105 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                    >
                      <FaHandHoldingHeart /> Donate Now
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Navigation Arrows */}
        <div className="absolute z-20 flex justify-between items-center w-full top-1/2 px-4 md:px-8 transform -translate-y-1/2">
          <button 
            onClick={goToPrevSlide}
            className="bg-black/40 hover:bg-black/60 text-white rounded-full p-3 md:p-4 backdrop-blur-sm transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <FaArrowLeft size={24} />
          </button>
          <button 
            onClick={goToNextSlide}
            className="bg-black/40 hover:bg-black/60 text-white rounded-full p-3 md:p-4 backdrop-blur-sm transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <FaArrowRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/60 hover:bg-white/90 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Impact Stats Section - New section */}
      <motion.section
        className="bg-white py-16"
        initial="hidden"
        animate="visible"
        variants={containerStagger}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 5000, label: "Lives Touched Through Media & Social Programs", plus: true },
              { value: 10, label: "Community Outreach Events Conducted", plus: true },
              { value: 8, label: "Years of Service in Media, Public Engagement, and Social Impact", plus: true },
              { value: 500, label: "Volunteers and Media Professionals Involved", plus: true }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="p-6"
                variants={fadeInUp}
              >
                <p className="text-4xl font-bold text-amber-900 mb-2">
                  <CountUp end={stat.value} duration={2.5} />
                  {stat.plus && "+"}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Programs Section - Updated with icons and new styling */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        animate="visible"
        variants={containerStagger}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-amber-900">Our Programs</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Empowering individuals and communities through purpose-driven initiatives
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Media & Strategic Services",
                desc: "Supporting individuals, campaigns, and organizations with innovative media solutions, branding, and PR.",
                icon: <FaGraduationCap className="text-4xl text-amber-900 mb-4" />
              },
              {
                title: "Awards and Recognition:",
                desc: "Honoring socially contributing people to identify and uplift human welfare and spread awareness.",
                icon: <FaPeopleCarry className="text-4xl text-amber-900 mb-4" />
              },
              {
                title: "Social Welfare & Development",
                desc: "From free health camps, food kit donation and campaigns to women's empowerment programs and student aid – we build resilient communities.",
                icon: <FaSeedling className="text-4xl text-amber-700 mb-4" />
              },
              {
                title: "Educational Outreach",
                desc: "Workshops, camps, and recognition programs that promote access to learning and teacher excellence.",
                icon: <FaGraduationCap className="text-4xl text-amber-900 mb-4" />
              }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="bg-white p-8 rounded-lg shadow-lg border-t-4 hover:shadow-xl transition-shadow text-center"
                style={{ 
                  borderColor: 
                    idx === 0 ? '#92400e' : 
                    idx === 1 ? '#d97706' : 
                    idx === 2 ? '#b45309' : 
                    '#92400e' 
                }}
                variants={fadeInUp}
              >
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Event Highlights Section - Updated with local images */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        animate="visible"
        variants={containerStagger}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-amber-900">Event Highlights</h2>
          <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
            A glimpse into our impactful events and initiatives across Bengaluru
          </p>
          
          {/* Featured Event - Large Banner */}
          <motion.div 
            className="mb-10 rounded-xl overflow-hidden shadow-xl relative"
            variants={fadeInUp}
          >
            <img 
              src={image1}
              alt="Basava Parishath Annual Conference" 
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </motion.div>
          
          {/* Event Grid - Multiple Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                img: image2,
              },
              {
                img: image3,
              },
              {
                img: image4,
              },
              {
                img: image5,
              },
              {
                img: image6,
              }
            ].map((event, idx) => (
              <motion.div 
                key={idx}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="h-52 overflow-hidden">
                  <img 
                    src={event.img} 
                    alt={`Event ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* View All Events Button */}
          <motion.div 
            className="text-center mt-10"
            variants={fadeInUp}
          >
            <Link 
              to="/events" 
              className="inline-flex items-center gap-2 bg-amber-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-800 transition-colors"
              onClick={() => {
                // Scroll to top when navigating
                window.scrollTo(0, 0);
              }}
            >
              View All Events <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action - Updated with desert sand brown background and brown text */}
      <motion.section
        className="text-amber-900 py-20"
        style={{ backgroundColor: '#d2b48c' }}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
          <span className='font-bold text-2xl'> Be a changemaker with us.</span><br/>
          Volunteer, partner, sponser or contribute to help amplify voices and transform lives through events, media and social outreach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-800 transition duration-300 shadow-lg"
              onClick={() => {
                // Scroll to top when navigating
                window.scrollTo(0, 0);
              }}
            >
              Get Involved
            </Link>
            <Link
              to="/events"
              className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
              onClick={() => {
                // Scroll to top when navigating
                window.scrollTo(0, 0);
              }}
            >
              Upcoming Events
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;
