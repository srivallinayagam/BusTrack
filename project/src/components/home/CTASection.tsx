import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary-800 to-primary-700 rounded-xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-100 max-w-2xl mx-auto mb-8">
            Experience the convenience of modern bus travel with real-time tracking and QR ticketing. No more waiting in uncertainty or fumbling for cash.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/track" className="btn btn-lg bg-white text-primary-800 hover:bg-primary-50">
              Track Your Bus
            </Link>
            <Link to="/tickets" className="btn btn-lg btn-accent flex items-center gap-2">
              Get a Ticket <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;