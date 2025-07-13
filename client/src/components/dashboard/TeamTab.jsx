import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaTrash, FaEdit, FaPlus, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TeamTab = ({ onSuccess, onCreateTeamMember, onEditTeamMember }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Fetch all team members
  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/team`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch team members');
      }
      
      const data = await res.json();
      setTeamMembers(data);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError('Failed to fetch team members');
      toast.error('Could not load team members', {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  // Open delete confirmation modal
  const openDeleteConfirmation = (memberId) => {
    setMemberToDelete(memberId);
    setShowConfirmModal(true);
  };

  // Handle team member deletion
  const handleDeleteMember = async () => {
    if (!memberToDelete) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.REACT_APP_API_URL}/team/${memberToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete team member');
      }
      
      setTeamMembers(teamMembers.filter(member => member._id !== memberToDelete));
      onSuccess('Team member deleted successfully!');
      toast.success('Team member deleted successfully', {
        position: "top-right",
        autoClose: 3000
      });
    } catch (err) {
      console.error('Error deleting team member:', err);
      toast.error('Failed to delete team member', {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setShowConfirmModal(false);
      setMemberToDelete(null);
    }
  };

  // Open team form modal for editing
  const handleEdit = (member) => {
    onEditTeamMember(member);
  };

  // Handle team member creation/update
  const handleTeamFormSuccess = (message) => {
    fetchTeam(); // Refresh the team list
    onSuccess(message);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-[#C1121F] p-4 rounded-lg border-l-4 border-[#C1121F]">
        {error}
      </div>
    );
  }

  return (
    <>
      <motion.div
        variants={stagger}
        className="space-y-4"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-amber-900 mb-2">Team Members</h3>
            <p className="text-gray-600">Manage your organization's team members</p>
          </div>
          <button
            className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors shadow-sm flex items-center gap-2"
            onClick={onCreateTeamMember}
          >
            <FaPlus /> Add Team Member
          </button>
        </div>
        
        {teamMembers.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <FaUser className="mx-auto mb-4 text-4xl text-gray-300" />
            <p>No team members found. Add your first team member!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map(member => (
              <TeamMemberCard 
                key={member._id}
                member={member}
                onDelete={() => openDeleteConfirmation(member._id)}
                onEdit={() => handleEdit(member)}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="relative">
                {/* Gradient top border */}
                <div className="h-2 bg-gradient-to-r from-blue-900 to-[#C1121F]"></div>
                
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-[#C1121F] transition-colors p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setShowConfirmModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <FaExclamationTriangle className="text-[#C1121F] text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Confirm Deletion</h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this team member? This action cannot be undone.
                </p>
                
                <div className="flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#C1121F] text-white rounded-lg hover:bg-[#a30f1b] transition-colors flex items-center"
                    onClick={handleDeleteMember}
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ member, onDelete, onEdit }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row">
        {/* Square image on the left */}
        <div 
          className="relative md:w-2/5 aspect-square cursor-pointer" 
          onClick={() => setShowImageModal(true)}
        >
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
            }}
          />
        </div>
        
        {/* Content on the right */}
        <div className="p-4 md:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-amber-900">{member.name}</h3>
                <p className="text-amber-900 font-medium">{member.position}</p>
              </div>
              <div className="flex space-x-1">
                <button 
                  className="p-2 text-amber-900 hover:bg-amber-50 rounded-full transition-colors"
                  onClick={onEdit}
                  title="Edit Team Member"
                >
                  <FaEdit />
                </button>
                <button 
                  className="p-2 text-[#C1121F] hover:bg-red-50 rounded-full transition-colors"
                  onClick={onDelete}
                  title="Delete Team Member"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mt-2 text-sm">
              {member.description}
            </p>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div 
              className="relative max-w-4xl w-full max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-white hover:text-[#C1121F] transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-20"
                onClick={() => setShowImageModal(false)}
              >
                <FaTimes className="text-2xl" />
              </button>
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Found';
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TeamTab;