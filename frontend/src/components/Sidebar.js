import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBullseye, FaWallet, FaMoneyCheckAlt, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';

import logo from '../images/logo.png';
import { useAuth } from '../contexts/AuthContext';
import ConfirmDialog from './ConfirmDialog';

const menuItems = [
  { icon: <FaTachometerAlt />, label: 'Dashboard', path: '/dashboard' },
  { icon: <FaBullseye />, label: 'Budget Goals', path: '/budget-goals' },
  { icon: <FaWallet />, label: 'Expenses', path: '/expenses' },
  { icon: <FaMoneyCheckAlt />, label: 'Payments', path: '/payments' },
  { icon: <FaCog />, label: 'Settings', path: '/settings' },
];

export default function Sidebar({ expanded, setExpanded }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user } = useAuth();

  const sidebarWidth = expanded ? 'w-72' : 'w-20';

  const handleLogout = () => setShowLogoutConfirm(true);
  const confirmLogout = () => {
    localStorage.removeItem('token');
    setShowLogoutConfirm(false);
    navigate('/');
  };
  const cancelLogout = () => setShowLogoutConfirm(false);

  return (
    <>
      <div className={`fixed top-0 left-0 h-screen z-40 bg-white/95 backdrop-blur-xl border-r border-slate-200/20 shadow-xl transition-all duration-300 font-sans ${sidebarWidth} flex flex-col`}> 
        {/* Gradient left border */}
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-tr-2xl rounded-br-2xl"></div>
        
        {/* Logo and Toggle */}
        <div className="flex items-center h-16 px-4 border-b border-slate-200/20 relative z-10">
          <div className="flex items-center gap-3 flex-1">
            {expanded && (
                <div>
                  <h1 className="bg-gradient-to-r font-bold from-indigo-600 to-purple-600 bg-clip-text text-transparent">XpenseMate</h1>
                  <p className="text-xs font-medium text-slate-500">Financial Dashboard</p>
              </div>
            )}
          </div>
            <button
            className="p-2.5 rounded-xl bg-slate-50/50 border border-slate-200/50 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 hover:border-indigo-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              onClick={() => setExpanded(!expanded)}
              aria-label="Toggle sidebar"
            >
            <FaBars size={16} />
            </button>
        </div>

        {/* User Info */}
        <div className="flex items-center h-20 px-4 border-b border-slate-200/20">
          <div className="flex items-center gap-4 w-full">
            <div className="relative flex-shrink-0">
              <img
                src={user?.profilePhotoUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                alt="User"
                className="w-12 h-12 rounded-2xl shadow-lg border-2 border-white transition-all duration-300 hover:scale-105"
              />
            </div>
            {expanded && (
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-800 tracking-tight truncate">{user?.firstName || 'User'}</h3>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {expanded && (
            <div className="px-3 mb-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Navigation</h4>
            </div>
          )}
          <div className="space-y-2">
          {menuItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
            return (
              <div
                key={idx}
                  onClick={() => navigate(item.path)}
                  className={`group relative flex items-center gap-4 px-3 h-12 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
                    ${isActive ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50/50 border border-transparent hover:border-slate-200/50'}
                    ${!expanded ? 'justify-center' : ''}`}
              >
                  <span className={`flex-shrink-0 transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600'}`}>{item.icon}</span>
                {expanded && (
                    <span className="font-semibold text-sm tracking-tight truncate">{item.label}</span>
                )}
              </div>
            );
          })}
          </div>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-200/20">
          <div
            onClick={handleLogout}
            className="group flex items-center gap-4 px-3 h-12 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-slate-600 hover:text-red-600 hover:bg-red-50/50 border border-transparent hover:border-red-200/50 relative"
          >
            <FaSignOutAlt size={18} className="flex-shrink-0 transition-colors duration-300" />
            {expanded && <span className="font-semibold text-sm tracking-tight">Log out</span>}
          </div>
        </div>

      </div>
      {/* Logout Confirmation Dialog (now outside sidebar for true centering) */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
        title="Log out?"
        message="Are you sure you want to log out?"
        confirmText="Log out"
        cancelText="Cancel"
      />
    </>
  );
}