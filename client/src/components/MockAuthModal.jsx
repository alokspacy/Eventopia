import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const MockAuthModal = ({ isOpen, onClose }) => {
  const { loginUser } = useAppContext();
  const [isCustom, setIsCustom] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  if (!isOpen) return null;

  const handleQuickLogin = (role) => {
    if (role === 'admin') {
      loginUser({
        _id: 'user_admin',
        email: 'admin@eventopia.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      });
    } else {
      loginUser({
        _id: 'user_alok_singh',
        email: 'alok.singh@example.com',
        firstName: 'Alok',
        lastName: 'Singh',
        role: 'user',
      });
    }
    onClose();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) return;
    
    loginUser({
      _id: `user_${Date.now()}`,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: 'user',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition cursor-pointer"
        >
          <X className="size-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Welcome to <span className="text-primary">Eventopia</span></h2>
          <p className="text-sm text-gray-400 mt-1">Select a profile to start booking tickets</p>
        </div>

        {!isCustom ? (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleQuickLogin('user')}
              className="flex items-center justify-between w-full p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-primary/50 rounded-xl transition text-left cursor-pointer group"
            >
              <div>
                <p className="font-semibold text-white group-hover:text-primary transition">Log in as Alok Singh</p>
                <p className="text-xs text-gray-400 mt-0.5">Test as regular ticket buyer</p>
              </div>
              <span className="text-xs text-primary font-medium border border-primary/20 bg-primary/10 px-2 py-0.5 rounded-full">User Profile</span>
            </button>

            <button
              onClick={() => handleQuickLogin('admin')}
              className="flex items-center justify-between w-full p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-primary/50 rounded-xl transition text-left cursor-pointer group"
            >
              <div>
                <p className="font-semibold text-white group-hover:text-primary transition">Log in as Admin</p>
                <p className="text-xs text-gray-400 mt-0.5">Manage shows, list bookings, view charts</p>
              </div>
              <span className="text-xs text-primary font-medium border border-primary/20 bg-primary/10 px-2 py-0.5 rounded-full">Admin Dashboard</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-800"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase">or</span>
              <div className="flex-grow border-t border-gray-800"></div>
            </div>

            <button
              onClick={() => setIsCustom(true)}
              className="w-full py-3 bg-transparent border border-gray-700 hover:border-white text-gray-300 hover:text-white rounded-full text-sm font-medium transition cursor-pointer text-center"
            >
              Create Custom Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 focus:border-primary focus:outline-none rounded-lg text-sm text-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 focus:border-primary focus:outline-none rounded-lg text-sm text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-700 focus:border-primary focus:outline-none rounded-lg text-sm text-white"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-dull text-white rounded-xl text-sm font-semibold transition cursor-pointer shadow-lg shadow-primary/20 mt-2"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setIsCustom(false)}
              className="text-center text-xs text-gray-400 hover:text-white transition mt-1 cursor-pointer"
            >
              Go Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MockAuthModal;
