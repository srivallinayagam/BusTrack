import React from 'react';
import { Link } from 'react-router-dom';
import { Map, QrCode, Clock, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Modern Bus Tracking & QR Ticketing
            </h1>
            <p className="text-lg text-primary-100 mb-8 max-w-lg">
              Track your bus in real-time and purchase digital tickets with our convenient QR code system. No more waiting or fumbling for cash!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/track" className="btn btn-accent btn-lg">
                Track Your Bus
              </Link>
              <Link to="/tickets" className="btn btn-lg bg-white text-primary-800 hover:bg-primary-50">
                Get a Ticket
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-6 shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                <FeatureCard icon={<Map />} title="Live Tracking" />
                <FeatureCard icon={<QrCode />} title="QR Tickets" />
                <FeatureCard icon={<Clock />} title="Bus Schedules" />
                <FeatureCard icon={<Info />} title="Route Info" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center hover:bg-white/20 transition">
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="font-medium text-white">{title}</h3>
    </div>
  );
};

export default HeroSection;