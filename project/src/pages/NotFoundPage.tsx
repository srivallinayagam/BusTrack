import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-neutral-50 py-16 min-h-screen flex items-center">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-primary-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-neutral-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
            Let's get you back on track!
          </p>
          
          <div className="space-y-4">
            <Link to="/" className="btn btn-primary flex items-center justify-center gap-2 mx-auto w-auto">
              <ArrowLeft size={18} />
              Return to Home
            </Link>
            
            <div className="pt-6 pb-2 border-t border-neutral-200 mt-8">
              <p className="text-neutral-500 text-sm">
                Need help? <Link to="/help" className="text-primary-600 hover:text-primary-700">Contact our support team</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;