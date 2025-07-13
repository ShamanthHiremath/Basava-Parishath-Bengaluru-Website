import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardHeader from '../components/dashboard/DashboardHeader';
  import EventsTab from '../components/dashboard/EventsTab';
import TeamTab from '../components/dashboard/TeamTab';
import MessagesTab from '../components/dashboard/MessagesTab';
import DonationsTab from '../components/dashboard/DonationsTab';
import EventFormModal from '../components/EventFormModal';
import SignupFormModal from '../components/dashboard/SignupFormModal';
import TeamFormModal from '../components/dashboard/TeamFormModal';
import SuccessMessage from '../components/dashboard/SuccessMessage';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingTeamMember, setEditingTeamMember] = useState(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Success message handler
  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Handle add team member
  const handleAddTeamMember = () => {
    setShowTeamForm(true);
    if (activeTab !== 'team') {
      setActiveTab('team');
    }
  };

  // Handle create team member
  const handleCreateTeamMember = () => {
    setEditingTeamMember(null);
    setShowTeamForm(true);
  };

  // Handle edit team member
  const handleEditTeamMember = (teamMember) => {
    setEditingTeamMember(teamMember);
    setShowTeamForm(true);
  };

  // Handle create event
  const handleCreateEvent = () => {
    setEditingEvent(null);
    setShowEventForm(true);
  };

  // Handle edit event
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16">
      {/* Toast Container for notifications */}
      <ToastContainer position="top-right" />
      
      <motion.div 
        className="max-w-6xl mx-auto px-4 pt-16"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* Dashboard Header */}
        <DashboardHeader 
          onCreateEvent={handleCreateEvent}
          onAddUser={() => setShowSignupForm(true)}
          onAddTeamMember={handleAddTeamMember}
        />
        
        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <SuccessMessage message={successMessage} />
          )}
        </AnimatePresence>
        
        {/* Navigation Tabs */}
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        {/* Main Content Area */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-b-lg shadow-xl mb-8 border-t-4 border-amber-900">
          {activeTab === 'events' && (
            <EventsTab 
              onSuccess={handleSuccess} 
              onCreateEvent={handleCreateEvent}
              onEditEvent={handleEditEvent}
            />
          )}
          
          {activeTab === 'team' && (
            <TeamTab 
              onSuccess={handleSuccess} 
              onCreateTeamMember={handleCreateTeamMember}
              onEditTeamMember={handleEditTeamMember}
            />
          )}
          
          {activeTab === 'messages' && (
            <MessagesTab onSuccess={handleSuccess} />
          )}
          

          {activeTab === 'donations' && (
            <DonationsTab />
          )}
        </div>
      </motion.div>

      {/* Event Creation Modal */}
      <EventFormModal 
        isOpen={showEventForm}
        onClose={() => {
          setShowEventForm(false);
          setEditingEvent(null);
        }}
        onEventCreated={(eventData) => {
          handleSuccess(editingEvent ? 'Event updated successfully!' : 'Event created successfully!');
          setShowEventForm(false);
          setEditingEvent(null);
        }}
        eventToEdit={editingEvent}
      />

      {/* User Creation Modal */}
      <SignupFormModal 
        show={showSignupForm}
        onClose={() => setShowSignupForm(false)}
        onSuccess={(message) => {
          handleSuccess(message);
          setShowSignupForm(false);
        }}
      />
      
      {/* Team Member Creation Modal */}
      <TeamFormModal 
        show={showTeamForm}
        onClose={() => {
          setShowTeamForm(false);
          setEditingTeamMember(null);
        }}
        onSuccess={(message) => {
          handleSuccess(message);
          setShowTeamForm(false);
          setEditingTeamMember(null);
        }}
        teamMember={editingTeamMember}
      />
    </div>
  );
};

// Keep the TabNavigation component in this file
const TabNavigation = ({ activeTab, onTabChange }) => (
  <div className="bg-white/95 backdrop-blur-sm border-b border-amber-200 px-4 shadow-sm">
    <nav className="flex overflow-x-auto">
      <button
        className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200 ${
          activeTab === 'events' 
          ? 'border-amber-900 text-amber-900' 
          : 'border-transparent text-gray-500 hover:text-amber-900 hover:border-amber-300'
        }`}
        onClick={() => onTabChange('events')}
      >
        Events
      </button>
      <button
        className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200 ${
          activeTab === 'team' 
          ? 'border-amber-900 text-amber-900' 
          : 'border-transparent text-gray-500 hover:text-amber-900 hover:border-amber-300'
        }`}
        onClick={() => onTabChange('team')}
      >
        Team
      </button>
      <button
        className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200 ${
          activeTab === 'messages' 
          ? 'border-amber-900 text-amber-900' 
          : 'border-transparent text-gray-500 hover:text-amber-900 hover:border-amber-300'
        }`}
        onClick={() => onTabChange('messages')}
      >
        Messages
      </button>
      <button
        className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200 ${
          activeTab === 'donations' 
          ? 'border-amber-900 text-amber-900' 
          : 'border-transparent text-gray-500 hover:text-amber-900 hover:border-amber-300'
        }`}
        onClick={() => onTabChange('donations')}
      >
        Donations
      </button>
    </nav>
  </div>
);

export default AdminDashboard;