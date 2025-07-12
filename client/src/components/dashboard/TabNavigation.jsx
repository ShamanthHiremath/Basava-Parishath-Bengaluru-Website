import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => (
  <div className="bg-white border-b border-gray-200 px-4 shadow-sm">
    <nav className="flex overflow-x-auto">
      <button
        className={`py-4 px-6 text-sm font-medium border-b-2 ${
          activeTab === 'events' 
          ? 'border-blue-900 text-blue-900' 
          : 'border-transparent text-gray-500 hover:text-blue-900 hover:border-gray-300'
        }`}
        onClick={() => onTabChange('events')}
      >
        Events
      </button>
      <button
        className={`py-4 px-6 text-sm font-medium border-b-2 ${
          activeTab === 'users' 
          ? 'border-blue-900 text-blue-900' 
          : 'border-transparent text-gray-500 hover:text-blue-900 hover:border-gray-300'
        }`}
        onClick={() => onTabChange('users')}
      >
        Users
      </button>
      <button
        className={`py-4 px-6 text-sm font-medium border-b-2 ${
          activeTab === 'donations' 
          ? 'border-blue-900 text-blue-900' 
          : 'border-transparent text-gray-500 hover:text-blue-900 hover:border-gray-300'
        }`}
        onClick={() => onTabChange('donations')}
      >
        Donations
      </button>
      <button
        className={`py-4 px-6 text-sm font-medium border-b-2 ${
          activeTab === 'messages' 
          ? 'border-blue-900 text-blue-900' 
          : 'border-transparent text-gray-500 hover:text-blue-900 hover:border-gray-300'
        }`}
        onClick={() => onTabChange('messages')}
      >
        Messages
      </button>
    </nav>
  </div>
);

export default TabNavigation;