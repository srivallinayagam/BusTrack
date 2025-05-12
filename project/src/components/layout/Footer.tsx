import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <Bus className="w-8 h-8 text-primary-400" />
              <span>BusTrack</span>
            </Link>
            <p className="mt-4 text-neutral-400 text-sm">
              Modern bus tracking and QR ticketing system for a seamless public transit experience.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-primary-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-neutral-400 hover:text-primary-400 transition">
                  Track Your Bus
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="text-neutral-400 hover:text-primary-400 transition">
                  Buy Tickets
                </Link>
              </li>
              <li>
                <Link to="/routes" className="text-neutral-400 hover:text-primary-400 transition">
                  Routes & Schedules
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-neutral-400 hover:text-primary-400 transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-neutral-400 hover:text-primary-400 transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-neutral-400 hover:text-primary-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-neutral-400 hover:text-primary-400 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-400">123 Transit Way, City Center, Country</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-neutral-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-neutral-400">support@bustrack.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-neutral-800" />

        <div className="text-center text-neutral-500 text-sm">
          <p>© {new Date().getFullYear()} BusTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;