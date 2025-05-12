import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bus, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block py-2 px-3 transition ${
      isActive
        ? 'text-primary-600 font-medium'
        : 'text-neutral-700 hover:text-primary-600'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <nav className="container flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-primary-900"
        >
          <Bus className="w-8 h-8 text-primary-600" />
          <span>BusTrack</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClasses} end>
            Home
          </NavLink>
          <NavLink to="/track" className={navLinkClasses}>
            Track
          </NavLink>
          <NavLink to="/tickets" className={navLinkClasses}>
            Tickets
          </NavLink>
          <NavLink to="/routes" className={navLinkClasses}>
            Routes
          </NavLink>
          <NavLink to="/help" className={navLinkClasses}>
            Help
          </NavLink>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link to="/tickets" className="btn btn-primary">
            Get a Ticket
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-neutral-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden py-0'
        }`}
      >
        <div className="container flex flex-col gap-3">
          <NavLink
            to="/"
            className={navLinkClasses}
            onClick={() => setIsMenuOpen(false)}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/track"
            className={navLinkClasses}
            onClick={() => setIsMenuOpen(false)}
          >
            Track
          </NavLink>
          <NavLink
            to="/tickets"
            className={navLinkClasses}
            onClick={() => setIsMenuOpen(false)}
          >
            Tickets
          </NavLink>
          <NavLink
            to="/routes"
            className={navLinkClasses}
            onClick={() => setIsMenuOpen(false)}
          >
            Routes
          </NavLink>
          <NavLink
            to="/help"
            className={navLinkClasses}
            onClick={() => setIsMenuOpen(false)}
          >
            Help
          </NavLink>
          <div className="mt-4">
            <Link
              to="/tickets"
              className="btn btn-primary w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Ticket
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;