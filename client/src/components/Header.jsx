import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiInfo, FiMail, FiMenu, FiX, FiCamera } from "react-icons/fi";
import { FaCalendarAlt, FaHandHoldingHeart, FaUserPlus } from "react-icons/fa";
import GoogleTranslate from './GoogleTranslate';
import GoogleTranslateMob from './GoogleTranslateMob';
import logo from '../assets/logo.png';
import headerLogo from '../assets/header_logo.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    if (menuOpen) {
      const closeMenu = (e) => {
        // Close if click is outside the menu
        if (!e.target.closest('.mobile-menu') && !e.target.closest('button[aria-label="Toggle menu"]')) {
          setMenuOpen(false);
        }
      };

      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener('click', closeMenu);
    }
  }, [menuOpen]);

  // Close menu when a link is clicked (for better UX)
  const handleLinkClick = () => setMenuOpen(false);

  // Function to open Google Translate dropdown
  const openTranslateDropdown = () => {
    let attempts = 0;
    const tryOpenDropdown = () => {
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.focus();
        combo.click();
        const event = new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40, which: 40 });
        combo.dispatchEvent(event);
      } else if (attempts < 5) {
        attempts++;
        setTimeout(tryOpenDropdown, 300);
      }
    };
    tryOpenDropdown();
  };

  const openTranslateDropdownMod = () => {
    let attempts = 0;
    const tryOpenDropdownMod = () => {
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.focus();
        combo.click();
        const event = new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40, which: 40 });
        combo.dispatchEvent(event);
      } else if (attempts < 5) {
        attempts++;
        setTimeout(tryOpenDropdownMod, 300);
      }
    };
    tryOpenDropdownMod();
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 w-full pt-2 px-4">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-white/20">
        {/* Main navigation */}
        <nav className="py-5 px-3 sm:px-4 flex justify-between items-center min-h-[80px]">
          <NavLink to="/" className="flex items-center flex-shrink-0">
            <img src={headerLogo} className="h-8 sm:h-10 w-auto mr-2 sm:mr-3" alt="Logo" />
            <span className="text-base sm:text-lg lg:text-2xl font-black text-amber-900 break-words leading-tight max-w-[200px] sm:max-w-none sm:whitespace-nowrap">
              Basava Parishath Bengaluru
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors text-xs xl:text-sm whitespace-nowrap ${isActive
                  ? "bg-amber-900 text-white font-medium"
                  : "text-amber-900 hover:bg-amber-50"
                }`
              }
            >
              <FiHome size={16} />
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors text-xs xl:text-sm whitespace-nowrap ${isActive
                  ? "bg-amber-900 text-white font-medium"
                  : "text-amber-900 hover:bg-amber-50"
                }`
              }
            >
              <FiInfo size={16} />
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors text-xs xl:text-sm whitespace-nowrap ${isActive
                  ? "bg-amber-900 text-white font-medium"
                  : "text-amber-900 hover:bg-amber-50"
                }`
              }
            >
              <FiMail size={16} />
              Contact
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors text-xs xl:text-sm whitespace-nowrap ${isActive
                  ? "bg-amber-900 text-white font-medium"
                  : "text-amber-900 hover:bg-amber-50"
                }`
              }
            >
              <FaCalendarAlt size={16} />
              Events
            </NavLink>

            {/* Gallery Link */}
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors text-xs xl:text-sm whitespace-nowrap ${isActive
                  ? "bg-amber-900 text-white font-medium"
                  : "text-amber-900 hover:bg-amber-50"
                }`
              }
            >
              <FiCamera size={16} />
              Gallery
            </NavLink>

            {/* Registration Link */}
            <NavLink
              to="/registration"
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors text-xs xl:text-sm whitespace-nowrap ${isActive
                  ? "bg-amber-900 text-white font-medium"
                  : "text-amber-900 hover:bg-amber-50"
                }`
              }
            >
              <FaUserPlus size={16} />
              Registration
            </NavLink>

            <NavLink
              to="/donate"
              className="flex items-center gap-1 px-2 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg transition-colors shadow-md text-xs xl:text-sm whitespace-nowrap"
            >
              <FaHandHoldingHeart size={16} />
              Donate
            </NavLink>

            {/* Google Translate integrated in navbar */}
            <div className="flex items-center bg-amber-50 rounded-lg px-2 py-1 shadow-sm hover:shadow transition-shadow">
              <span
                className="text-xs text-amber-800 font-semibold cursor-pointer inline mr-1 hover:underline whitespace-nowrap"
                onClick={openTranslateDropdown}
              >
                Translate:
              </span>
              <div className="scale-75 origin-left">
                <GoogleTranslate />
              </div>
            </div>
          </div>

          {/* Mobile/Tablet - Translate and Burger */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Google Translate for Mobile */}
            <div className="flex items-center bg-amber-50 rounded-lg px-2 py-1 shadow-sm hover:shadow transition-shadow">
              <span
                className="text-xs text-amber-800 font-semibold cursor-pointer inline mr-1 hover:underline whitespace-nowrap"
                onClick={openTranslateDropdownMod}
              >
                Translate:
              </span>
              <div className="scale-75 origin-left">
                <GoogleTranslateMob />
              </div>
            </div>

            {/* Mobile Burger */}
            <button
              className="bg-amber-100 p-2 rounded-lg z-50 relative flex-shrink-0 hover:bg-amber-200 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((open) => !open);
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={18} className="text-amber-900" /> : <FiMenu size={18} className="text-amber-900" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed top-0 right-0 bg-white/95 backdrop-blur-md shadow-xl py-3 lg:hidden z-40 w-64 sm:w-72 transform transition-transform duration-300 ease-in-out mobile-menu rounded-l-2xl ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ maxHeight: '100vh', overflowY: 'auto' }}
      >
        {/* Close button inside the menu */}
        <div className="flex justify-end px-4 mb-4">
          <button
            className="p-2 text-amber-900 hover:bg-amber-100 rounded-lg transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Menu header with logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} className="h-12 w-auto" alt="Logo" />
        </div>

        {/* Menu links */}
        <NavLink
          to="/"
          end
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 border-l-4 ${isActive ? "border-amber-900 bg-amber-50 text-amber-900 font-medium" : "border-transparent text-gray-700 hover:bg-amber-50"
            }`
          }
        >
          <FiHome />
          Home
        </NavLink>
        <NavLink
          to="/about"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 border-l-4 ${isActive ? "border-amber-900 bg-amber-50 text-amber-900 font-medium" : "border-transparent text-gray-700 hover:bg-amber-50"
            }`
          }
        >
          <FiInfo />
          About
        </NavLink>
        <NavLink
          to="/contact"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 border-l-4 ${isActive ? "border-amber-900 bg-amber-50 text-amber-900 font-medium" : "border-transparent text-gray-700 hover:bg-amber-50"
            }`
          }
        >
          <FiMail />
          Contact
        </NavLink>
        <NavLink
          to="/events"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 border-l-4 ${isActive ? "border-amber-900 bg-amber-50 text-amber-900 font-medium" : "border-transparent text-gray-700 hover:bg-amber-50"
            }`
          }
        >
          <FaCalendarAlt />
          Events
        </NavLink>

        <NavLink
          to="/gallery"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 border-l-4 ${isActive ? "border-amber-900 bg-amber-50 text-amber-900 font-medium" : "border-transparent text-gray-700 hover:bg-amber-50"
            }`
          }
        >
          <FiCamera />
          Gallery
        </NavLink>

        <NavLink
          to="/registration"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 border-l-4 ${isActive ? "border-amber-900 bg-amber-50 text-amber-900 font-medium" : "border-transparent text-gray-700 hover:bg-amber-50"
            }`
          }
        >
          <FaUserPlus />
          Registration
        </NavLink>

        <div className="px-4 py-3 mt-2">
          <NavLink
            to="/donate"
            onClick={handleLinkClick}
            className="flex items-center gap-2 px-4 py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg transition-colors w-full justify-center shadow-md"
          >
            <FaHandHoldingHeart />
            Donate
          </NavLink>
        </div>
      </div>

      {/* Backdrop blur overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 lg:hidden z-30"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}

export default Header;