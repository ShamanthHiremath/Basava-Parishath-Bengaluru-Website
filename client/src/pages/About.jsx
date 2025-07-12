import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import React, { useState, useEffect, useRef } from 'react';
import { FaCheckCircle, FaUserFriends, FaChartLine, FaHandshake, FaTimes, FaLinkedinIn, FaEnvelope, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import image4 from '../assets/events/012A3722.jpg';
import image5 from '../assets/events/DSC07055.jpg';
import image6 from '../assets/events/DSC07193.jpg';


function About() {
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

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Banner - Replacing static banner */}
      <HeroCarousel />

      <div className="container mx-auto px-4 py-12">
        {/* About Section */}
        <motion.section
          className="mb-16 bg-white p-8 rounded-lg shadow-lg"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-6 text-amber-900 border-b-2 border-amber-900 pb-2 inline-block"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Story
          </motion.h2>
          <motion.div
            className="text-lg text-gray-700 space-y-4"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p>
              <b className="text-amber-900">Basava Parishath Bangalore</b> specializes in media management and public relations. As one of the leading media organizations in the state, we are actively involved across the cultural, social, political, and media sectors.
            </p>
            <p>
              Established in 2017, Basava Parishath Bangalore has provided effective media coordination, management, and strategic advice in selected constituencies. We successfully supported candidates in both the 2023 Assembly and 2024 Lok Sabha elections.
            </p>
            <p>
              Through our reliable programs in media and social initiatives, Basava Parishath Bangalore strives to be a positive reflection of society. Following the COVID-19 pandemic, we stood in solidarity with friends in the media sector and provided assistance to many families.
            </p>
            <p>
              Basava Parishath regularly organizes seminars, workshops, and study camps. We are dedicated to recognizing and honoring societal achievers by organizing various award programs and rewarding deserving individuals. Through these initiatives, we aim to identify and highlight those working hard for the betterment of society, thereby inspiring the new generation.
            </p>
            <p>
              Basava Parishath boasts a team of skilled and experienced journalists, public relations professionals, and digital media experts, offering diverse services on a single platform. We have established a strong presence in the media field by providing unique, innovative, and comprehensive media management services.
            </p>
            <p>
              Our organization is committed to providing reliable services to enhance your visibility and support your growth. We offer complete media management solutions, including media coverage, branding, media composition, strategic advice, and political strategy, tailored for both individuals and organizations seeking to increase their popularity and achieve their development goals.
            </p>
          </motion.div>
        </motion.section>

        {/* Event Highlight Section - Moved right after Our Story */}
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-amber-900">Event Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Feature image - larger */}
            <div className="md:col-span-3 rounded-xl overflow-hidden shadow-xl h-96">
              <img 
                src={image4} 
                alt="Image1" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Right side smaller images */}
            <div className="md:col-span-2 grid grid-cols-1 gap-6">
              <div className="rounded-xl overflow-hidden shadow-lg h-44">
                <img 
                  src={image5} 
                  alt="Image2" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg h-44">
                <img 
                  src={image6} 
                  alt="Image3" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="/events" className="inline-block px-6 py-3 bg-amber-900 text-white rounded-lg font-medium hover:bg-amber-800 transition-colors">
              View All Events
            </a>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={fadeInUp} 
              transition={{ duration: 0.7 }}
              className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-amber-900"
            >
              <h2 className="text-3xl font-bold mb-6 text-amber-900">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                Our mission is to empower individuals and communities through education
                and support programs that create lasting change.
              </p>
              <p className="text-gray-700">
                We believe in the power of education to transform lives and create
                opportunities for a better future.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-amber-900"
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-amber-900">Our Values</h3>
              <h4 className="text-lg font-semibold mb-2 text-amber-900">What drives our purpose and progress:</h4>
              <ul className="space-y-4">
                {[
                  "We maintain high standards in everything we do.",
                  "Every initiative aims to uplift and engage local communities.",
                  "Programs that bring lasting change, not just short-term relief.",
                  "We value diverse voices and strive for equal opportunity and representation."
                ].map((value, idx) => (
                  <li className="flex items-start" key={value}>
                    <FaCheckCircle className="text-amber-900 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section - Updated */}
        <motion.section
          className="mb-16 bg-gray-50 py-12 px-6 rounded-lg"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <h2 className="text-3xl font-bold text-center mb-2 text-amber-900">Board Members</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Meet the dedicated board members behind Basava Parishath Bangalore
          </p>
          <TeamCarousel />
        </motion.section>

        {/* Impact Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="py-8"
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-amber-900">Our Impact</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Creating measurable change across Karnataka and beyond
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: 5000, label: "Lives Touched Through Media & Social Programs", suffix: "+", icon: <FaUserFriends className="text-5xl mb-4" /> },
              { value: 70, label: "Community Outreach Events Conducted", suffix: "+", icon: <FaChartLine className="text-5xl mb-4" /> },
              { value: 8, label: "Years of Service in Media, Public Engagement, and Social Impact", suffix: "+", icon: <FaHandshake className="text-5xl mb-4" /> },
              { value: 500, label: "Volunteers and Media Professionals Involved", suffix: "+", icon: <FaHandshake className="text-5xl mb-4" /> }
            ].map((impact, idx) => (
              <motion.div
                className="bg-white text-center p-8 rounded-lg shadow-lg border-t-4"
                style={{ 
                  borderColor: 
                    idx === 0 ? '#003049' : 
                    idx === 1 ? '#669BBC' : 
                    idx === 2 ? '#C1121F' : 
                    '#003049' 
                }}
                key={impact.label}
                variants={fadeInUp}
                transition={{ duration: 0.7, delay: 0.2 * idx }}
              >
                <div className="flex justify-center text-gray-700">
                  {impact.icon}
                </div>
                <h3 className="text-4xl font-bold mb-2 text-amber-900">
                  <CountUp
                    end={impact.value}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                    suffix={impact.suffix}
                  />
                </h3>
                <p className="text-gray-600 font-medium">{impact.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Call to Action */}
      <motion.section
        className="text-amber-900 py-16"
        style={{ backgroundColor: '#d2b48c' }}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of our mission to transform communities and create lasting impact.
          </p>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/contact"
              className="bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-800 transition duration-300 shadow-lg"
            >
              Contact Us
            </a>
            <a
              href="/events"
              className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
            >
              Upcoming Events
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

// Updated TeamCarousel component with API integration and modal
function TeamCarousel() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idx, setIdx] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const autoPlay = true;
  const [visibleCount, setVisibleCount] = useState(window.innerWidth < 768 ? 1 : 3);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/team`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        
        const data = await response.json();
        
        // Sort by order if available, otherwise by default order
        const sortedData = [...data].sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          return 0;
        });
        
        setTeamMembers(sortedData);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members');
        // Fallback to static data if API fails
        setTeamMembers([
          { 
            name: "Rekha M Hiremath", 
            position: "Founder and CEO", 
            description: ""
          },
          { 
            name: "Mahantesh S Hiremath", 
            position: "Executive Director", 
            description: "" 
          },
          { 
            name: "M.P. Kotresh", 
            position: "Managing Committee Member", 
            description: "" 
          },
          { 
            name: "Nanda C. Balehallimath", 
            position: "Managing Committee Member", 
            description: "" 
          },
          { 
            name: "Bheemanagouda K", 
            position: "Managing Committee Member", 
            description: "" 
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay || teamMembers.length === 0) return;
    
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % teamMembers.length);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [autoPlay, teamMembers.length]);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    };
    
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse drag scrolling handlers
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    if (!scrollRef.current) return;
    
    isDragging.current = false;
    scrollRef.current.style.cursor = 'grab';
  };

  // Get the visible members (wrap around)
  const getVisibleMembers = () => {
    if (teamMembers.length === 0) return [];
    
    const members = [];
    for (let i = 0; i < visibleCount; i++) {
      members.push(teamMembers[(idx + i) % teamMembers.length]);
    }
    return members;
  };
  
  const visibleMembers = getVisibleMembers();

  // Open member detail modal
  const openMemberDetails = (member) => {
    setSelectedMember(member);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Close member detail modal
  const closeMemberDetails = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  // Add this to handle image clicks
  const openImageModal = (e) => {
    e.stopPropagation(); // Prevent closing the member modal
    if (selectedMember?.image) {
      setShowImageModal(true);
    }
  };

  // Add this function to close the image modal
  const closeImageModal = () => {
    setShowImageModal(false);
  };

  if (loading) {
    return (
      <div className="w-full max-w-[100%] mx-auto bg-white rounded-lg shadow-lg p-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-900"></div>
      </div>
    );
  }

  if (error && teamMembers.length === 0) {
    return (
      <div className="w-full max-w-[100%] mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-amber-900 text-white rounded-md hover:bg-amber-800 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-[100%] mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col items-center relative">
        {/* Navigation controls */}
        <div className="flex items-center justify-between w-full mb-6">
          <button
            className="text-2xl px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-amber-900"
            onClick={() => setIdx((idx - 1 + teamMembers.length) % teamMembers.length)}
            aria-label="Previous team member"
          >
            &#8592;
          </button>
          <div className="flex gap-2">
            {teamMembers.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full ${i === idx ? 'bg-amber-900' : 'bg-gray-300'}`}
                onClick={() => setIdx(i)}
                style={{ cursor: 'pointer' }}
                aria-label={`Go to team member ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="text-2xl px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-amber-900"
            onClick={() => setIdx((idx + 1) % teamMembers.length)}
            aria-label="Next team member"
          >
            &#8594;
          </button>
        </div>
        
        {/* Team members carousel with mouse drag functionality */}
        <div 
          ref={scrollRef}
          className="w-full flex overflow-x-auto hide-scrollbar"
          style={{ cursor: 'grab', scrollBehavior: 'smooth' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="w-full flex flex-row gap-8 justify-center items-stretch px-4">
            {visibleMembers.map((member, i) => (
              <div
                key={member._id || member.name}
                className="flex-1 min-w-0 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center mx-2 border-t-4 cursor-pointer transform transition-transform hover:scale-105"
                style={{ 
                  minWidth: 280,
                  maxWidth: 400,
                  borderColor: i === 0 ? '#003049' : i === 1 ? '#669BBC' : '#C1121F'
                }}
                onClick={() => openMemberDetails(member)}
              >
                {member.image ? (
                  <div className="w-24 h-24 rounded-[5px] overflow-hidden mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentNode.classList.add('bg-gradient-to-r', 'from-amber-900', 'to-amber-800');
                        const initials = document.createElement('div');
                        initials.className = 'flex items-center justify-center text-2xl text-white font-bold w-full h-full';
                        initials.innerText = member.name.split(' ').map(n => n[0]).join('').slice(0,2);
                        e.target.parentNode.appendChild(initials);
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-r from-amber-900 to-amber-800 rounded-full mb-4 flex items-center justify-center text-2xl text-white font-bold">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-1 text-center text-amber-900">{member.name}</h3>
                <p className="text-amber-900 font-medium mb-2 text-center">{member.position}</p>
                {/* View details button */}
                <button
                  className="mt-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-amber-900 rounded-full transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Member Detail Modal */}
      {showModal && selectedMember && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
            onClick={closeMemberDetails}
          ></div>
          
          <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden"
            >
              {/* Decorative top gradient */}
              <div className="h-3 bg-gradient-to-r from-amber-900 to-amber-800"></div>
              
              {/* Close button */}
              <button
                className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-[#C1121F] transition-colors z-10"
                onClick={closeMemberDetails}
                aria-label="Close modal"
              >
                <FaTimes size={20} />
              </button>
              
              <div className="p-6 flex flex-col md:flex-row gap-8">
                {/* Larger square image on the left - Update with onClick */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                  {selectedMember.image ? (
                    <div 
                      className="aspect-square w-full overflow-hidden rounded-lg border-4 border-white shadow-lg cursor-pointer transition-transform hover:scale-105"
                      onClick={openImageModal}
                    >
                      <img 
                        src={selectedMember.image} 
                        alt={selectedMember.name} 
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.parentNode.classList.add('bg-gradient-to-r', 'from-amber-900', 'to-amber-800');
                          const initials = document.createElement('div');
                          initials.className = 'flex items-center justify-center text-5xl text-white font-bold w-full h-full';
                          initials.innerText = selectedMember.name.split(' ').map(n => n[0]).join('').slice(0,2);
                          e.target.parentNode.appendChild(initials);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="aspect-square w-full bg-gradient-to-r from-amber-900 to-amber-800 rounded-lg border-4 border-white shadow-lg flex items-center justify-center text-5xl text-white font-bold">
                      {selectedMember.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                  )}
                </div>
                
                {/* Content on the right */}
                <div className="w-full md:w-2/3">
                  {/* Header with name and position - centered */}
                  <div className="text-center md:text-center mb-6">
                    <h3 className="text-2xl font-bold text-amber-900 mb-2">{selectedMember.name}</h3>
                    <div className="inline-block px-4 py-1 rounded-full bg-amber-900/10 text-amber-900 font-medium">
                      {selectedMember.position}
                    </div>
                    
                    <div className="mt-3 flex justify-center">
                      {/* Social links - optional, add if available */}
                      {selectedMember.linkedin && (
                        <a 
                          href={selectedMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#0A66C2] text-white p-2 rounded-full w-8 h-8 flex items-center justify-center mr-2"
                        >
                          <FaLinkedinIn size={14} />
                        </a>
                      )}
                      {selectedMember.email && (
                        <a 
                          href={`mailto:${selectedMember.email}`}
                          className="bg-amber-900 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                          <FaEnvelope size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Description section */}
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-xl font-semibold mb-4 text-amber-900">About</h4>
                    {selectedMember.description ? (
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="whitespace-pre-line">{selectedMember.description}</p>
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg text-gray-500">
                        <p>No additional information available about {selectedMember.name} at this time.</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Optional accomplishments section */}
                  {selectedMember.accomplishments && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-xl font-semibold mb-4 text-amber-900">Accomplishments</h4>
                      <ul className="space-y-2">
                        {selectedMember.accomplishments.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-amber-900 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Footer with close button */}
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={closeMemberDetails}
                      className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Full-size Image Modal */}
      {showImageModal && selectedMember?.image && (
        <div className="fixed inset-0 z-[60] overflow-hidden flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
          <div 
            className="absolute inset-0 z-0"
            onClick={closeImageModal}
          ></div>
          
          <div className="relative z-10 max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative rounded-lg overflow-hidden max-h-full max-w-full shadow-2xl"
            >
              <img 
                src={selectedMember.image} 
                alt={selectedMember.name}
                className="max-h-[80vh] max-w-full object-contain" 
              />
              
              <button
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-[#C1121F] transition-colors"
                onClick={closeImageModal}
                aria-label="Close image"
              >
                <FaTimes size={20} />
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-bold text-lg">{selectedMember.name}</h3>
                <p className="text-white/80 text-sm">{selectedMember.position}</p>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Hide scrollbar CSS - keep your existing style */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}

// New HeroCarousel component - Updated with Events.jsx style animation
function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideImages = {
    image1: new URL('../assets/events/012A3702.jpg', import.meta.url).href,
    image2: new URL('../assets/events/DSC07070.jpg', import.meta.url).href,
    image3: new URL('../assets/events/DSC07105.jpg', import.meta.url).href,
  };
  const slides = [
    {
      image: slideImages.image1,
      title: "About Basava Parishath Bangalore",
      description: "Leading the way in media management and public relations since 2017",
      cta: "/about"
    },
    {
      image: slideImages.image2,
      title: "About Basava Parishath Bangalore", 
      description: "Leading the way in media management and public relations since 2017",
      cta: "/about"
    },
    {
      image: slideImages.image3,
      title: "About Basava Parishath Bangalore",
      description: "Leading the way in media management and public relations since 2017",
      cta: "/about"
    }
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000); // Changed to 6 seconds to match Events.jsx
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Navigation functions to match Events.jsx
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <section 
      className="relative w-full overflow-hidden rounded-lg" 
      style={{ 
        height: '100vh',
        minHeight: '100dvh' // Dynamic viewport height for mobile devices
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900 to-amber-800 opacity-90"></div>
      
      {/* Slides - Updated animation to match Events.jsx */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentIndex === index ? 1 : 0,
            zIndex: currentIndex === index ? 10 : 0
          }}
          transition={{ duration: 1 }}
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slide.image})`,
            }}
          >
            {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/60">
              {/* Content Centered Overlay */}
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="max-w-3xl mx-auto px-6 py-10 rounded-lg">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
                    {slide.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Navigation arrows - Updated to match Events.jsx */}
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
      
      {/* Dots navigation - Updated to match Events.jsx */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/60 hover:bg-white/90 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default About;
