import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getUserData } from '../services/storage';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const user = getUserData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user: authUser, logout } = useAuth();

  const links = [
    { to: '/learn', label: 'Learn' },
    { to: '/explore', label: 'Explore' },
    { to: '/simulate', label: 'Simulate' },
    { to: '/compare', label: 'Compare' },
    { to: '/timeline', label: 'Timeline' },
    { to: '/chat', label: 'Ask Vox' },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50"
      style={{
        background: 'linear-gradient(180deg, #F5ECD7 0%, #EAD9B8 100%)',
        borderBottom: '2px solid #C9A87C',
        boxShadow: '0 2px 12px rgba(61,43,31,0.15)',
      }}
    >
      <div className="page-wrapper flex items-center justify-between py-3">
        {/* Logo / Masthead */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="wax-seal text-xs" style={{ width: 36, height: 36, fontSize: '0.7rem' }}>B</div>
          <div>
            <h1
              className="font-playfair text-lg font-bold leading-none m-0"
              style={{ color: '#1A1008', letterSpacing: '1px' }}
            >
              BALLET<span style={{ color: '#B33A3A' }}>BRAINS</span>
            </h1>
            <p className="font-elite text-xs m-0 leading-none mt-0.5" style={{ color: '#8B6F47', letterSpacing: '2px' }}>
              ELECTION INTELLIGENCE
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* XP Badge & User Avatar */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="gold-coin" title="Experience Points">{user.xp}</div>
            {user.streak > 0 && (
              <span className="font-elite text-xs" style={{ color: '#B33A3A' }} title="Day Streak">
                🔥 {user.streak}
              </span>
            )}
          </div>

          {authUser ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img 
                  src={authUser.picture} 
                  alt="User" 
                  className="w-8 h-8 rounded-full border-2 border-[#C9A87C] sepia-image"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 paper-card-lined z-50">
                  <div className="p-3 border-b border-[#C9A87C]">
                    <p className="font-playfair font-bold text-sm m-0">{authUser.name}</p>
                    <p className="font-elite text-xs text-[#8B6F47] truncate m-0">{authUser.email}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 font-elite text-sm text-[#B33A3A] hover:bg-[#EAD9B8] transition-colors"
                  >
                    SIGN OUT
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="stamp-btn-outline text-xs py-1 px-3">SIGN IN</Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden stamp-btn-outline py-1 px-2 text-xs"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden border-t"
          style={{ borderColor: '#C9A87C', background: '#EAD9B8' }}
        >
          <div className="flex flex-col py-2 px-6">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `nav-link py-2 ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex items-center gap-2 py-2">
              <div className="gold-coin" style={{ width: 28, height: 28, fontSize: '0.65rem' }}>{user.xp}</div>
              <span className="font-elite text-xs" style={{ color: '#8B6F47' }}>XP EARNED</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
