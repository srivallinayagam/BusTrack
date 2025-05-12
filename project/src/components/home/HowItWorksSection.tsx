import React from 'react';
import { Smartphone, QrCode, Bus, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Smartphone className="w-8 h-8 text-white" />,
    title: 'Open the App',
    description: 'Access BusTrack from any device with a web browser. No download required!',
    color: 'bg-primary-600',
  },
  {
    icon: <QrCode className="w-8 h-8 text-white" />,
    title: 'Purchase Ticket',
    description: 'Select your route and purchase a ticket. A QR code will be generated immediately.',
    color: 'bg-secondary-600',
  },
  {
    icon: <Bus className="w-8 h-8 text-white" />,
    title: 'Board the Bus',
    description: 'Show your QR code to the driver or scanner when boarding the bus.',
    color: 'bg-accent-500',
  },
  {
    icon: <ThumbsUp className="w-8 h-8 text-white" />,
    title: 'Enjoy Your Ride',
    description: 'Your ticket is validated instantly. Enjoy your journey with ease!',
    color: 'bg-primary-700',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-50" id="how-it-works">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Using our QR ticketing system is simple and convenient. Follow these four easy steps to get started:
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-4 shadow-lg`}>
                    {step.icon}
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white text-primary-800 flex items-center justify-center font-bold text-sm border border-neutral-200">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;