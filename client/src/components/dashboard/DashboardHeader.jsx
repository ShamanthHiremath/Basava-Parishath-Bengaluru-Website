import React from 'react';
import { FaPlus, FaUserPlus, FaUsers } from 'react-icons/fa';

const DashboardHeader = ({ onCreateEvent, onAddUser, onAddTeamMember }) => (
  <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white p-6 rounded-t-lg shadow-xl mb-12 mt-8">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
        <p className="text-amber-100">Manage your website content and events</p>
      </div>
      <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
        <button
          className="bg-amber-700 text-white px-5 py-2 rounded-lg hover:bg-amber-800 transition-colors shadow-md flex items-center gap-2"
          onClick={onCreateEvent}
        >
          <FaPlus /> Create Event
        </button>
        
        <button
          className="bg-white text-amber-900 px-5 py-2 rounded-lg hover:bg-amber-50 transition-colors shadow-md flex items-center gap-2 font-medium"
          onClick={onAddUser}
        >
          <FaUserPlus /> Add Admin User
        </button>
      </div>
    </div>
  </div>
);

export default DashboardHeader;