import React from 'react';
import { MapPin, Smartphone, CreditCard, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <MapPin className="w-6 h-6 text-primary-600" />,
    title: 'Real-Time Tracking',
    description: 'See exactly where your bus is and when it will arrive at your stop with accurate GPS tracking.',
  },
  {
    icon: <Smartphone className="w-6 h-6 text-primary-600" />,
    title: 'Mobile Tickets',
    description: 'Purchase and store tickets on your phone. No printing necessary, just show your QR code when boarding.',
  },
  {
    icon: <CreditCard className="w-6 h-6 text-primary-600" />,
    title: 'Cashless Payment',
    description: 'Pay for your tickets securely with credit card, mobile payment, or other digital options.',
  },
  {
    icon: <Bell className="w-6 h-6 text-primary-600" />,
    title: 'Route Alerts',
    description: 'Get notified about delays, route changes, or other important updates for your regular commute.',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white" id="features">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            A Smarter Way to Ride
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Our modern bus tracking and QR ticketing system is designed to make public transportation more convenient, efficient, and accessible for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card hover:border-primary-300 hover:border"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;