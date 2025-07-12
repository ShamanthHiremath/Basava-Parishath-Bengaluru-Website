import React from 'react';
import { FaPlus, FaUserPlus, FaUsers } from 'react-icons/fa';

const DashboardHeader = ({ onCreateEvent, onAddUser, onAddTeamMember }) => (
  <div className="bg-gradient-to-r from-blue-900 to-blue-900 text-white p-6 rounded-t-lg shadow-lg">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
        <p className="text-blue-100">Manage your website content and events</p>
      </div>
      <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
        {/* <button
          className="bg-[#C1121F] text-white px-5 py-2 rounded-lg hover:bg-[#780000] transition-colors shadow-md flex items-center gap-2"
          onClick={onCreateEvent}
        >
          <FaPlus /> Create Event
        </button>
        
        <button
          className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-[#00243a] transition-colors shadow-md flex items-center gap-2"
          onClick={onAddTeamMember}
        >
          <FaUsers /> Add Team Member
        </button> */}
        
        <button
          className="bg-white text-blue-900 px-5 py-2 rounded-lg hover:bg-gray-100 transition-colors shadow-md flex items-center gap-2"
          onClick={onAddUser}
        >
          <FaUserPlus /> Add Admin User
        </button>
      </div>
    </div>
  </div>
);

export default DashboardHeader;