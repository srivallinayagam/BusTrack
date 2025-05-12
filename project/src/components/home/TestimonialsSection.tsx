import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "I no longer have to worry about having exact change or waiting blindly for the bus. This app has made my daily commute so much easier!",
    author: "Sarah Johnson",
    role: "Daily Commuter",
    rating: 5,
  },
  {
    quote: "As a student, I love how I can quickly buy a ticket on my phone and know exactly when my bus will arrive. Saves me so much time!",
    author: "Miguel Rodriguez",
    role: "University Student",
    rating: 5,
  },
  {
    quote: "The real-time tracking is incredibly accurate. I can time my arrival at the bus stop perfectly now, even in bad weather.",
    author: "David Chen",
    role: "Business Professional",
    rating: 4,
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what people who use our bus tracking and QR ticketing system have to say:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-neutral-300"}
                  />
                ))}
              </div>
              <blockquote className="text-neutral-700 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="mt-auto">
                <p className="font-semibold text-neutral-900">{testimonial.author}</p>
                <p className="text-sm text-neutral-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;