import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TeamMemberCard from '../components/TeamMemberCard';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeam = async () => {
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
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Our Team</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals who make our vision a reality every day.
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-[#C1121F] p-4 rounded-lg border-l-4 border-[#C1121F] max-w-2xl mx-auto">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {teamMembers.map(member => (
                <TeamMemberCard key={member._id} member={member} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Team;