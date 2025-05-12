import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, Mail, Phone, MessageSquare, FileText, MapPin } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const HelpPage: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('general');
  
  const faqCategories = [
    { id: 'general', name: 'General' },
    { id: 'ticketing', name: 'Ticketing' },
    { id: 'tracking', name: 'Bus Tracking' },
    { id: 'payment', name: 'Payment' },
    { id: 'technical', name: 'Technical Issues' },
  ];
  
  const faqs: Record<string, FAQItem[]> = {
    general: [
      {
        question: 'What is BusTrack and how does it work?',
        answer: 'BusTrack is a modern bus tracking and QR ticketing system designed to make public transportation more convenient. It allows you to track buses in real-time, purchase digital tickets, and board buses without needing cash. Simply purchase a ticket, save the QR code to your device, and show it when boarding.'
      },
      {
        question: 'Do I need to create an account to use BusTrack?',
        answer: 'While you can use basic features without an account, creating a free account allows you to save tickets, set favorite routes, receive personalized alerts, and access your purchase history. We recommend creating an account for the best experience.'
      },
      {
        question: 'Which bus routes are supported by BusTrack?',
        answer: 'BusTrack currently supports all major city bus routes, including routes 101-505. You can view the complete list of supported routes in the Routes section of our website or app. We regularly add new routes based on demand and availability.'
      }
    ],
    ticketing: [
      {
        question: 'How do I purchase a ticket using BusTrack?',
        answer: 'To purchase a ticket, navigate to the "Tickets" section, select your desired route and ticket type (single ride or day pass), choose your payment method, and complete the purchase. A QR code ticket will be generated immediately and saved to your account.'
      },
      {
        question: 'How long are tickets valid?',
        answer: 'Single ride tickets are valid for 2 hours from the time of purchase. Day passes are valid for 24 hours from the time of activation. The expiration time is clearly displayed on your ticket.'
      },
      {
        question: 'Can I purchase multiple tickets at once?',
        answer: 'Yes, you can purchase multiple tickets in a single transaction. Each ticket will be stored separately in your account, and you can use them whenever needed within their validity period.'
      }
    ],
    tracking: [
      {
        question: 'How accurate is the real-time bus tracking?',
        answer: 'Our real-time tracking is highly accurate, with updates every 30 seconds. However, factors like network connectivity, traffic conditions, and GPS signal strength can occasionally affect accuracy. We typically provide estimated arrival times within a 1-2 minute window.'
      },
      {
        question: 'Can I see how crowded a bus is before it arrives?',
        answer: 'Yes, on supported routes, we provide a crowdedness indicator showing whether a bus is not crowded, moderately crowded, or very crowded. This feature helps you plan your journey more effectively.'
      }
    ],
    payment: [
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as digital wallets like Apple Pay, Google Pay, and PayPal. We do not currently accept cryptocurrency or direct bank transfers.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes, we use industry-standard encryption and security protocols to protect your payment information. We do not store your complete card details on our servers, and all transactions are processed through secure, PCI-compliant payment gateways.'
      }
    ],
    technical: [
      {
        question: 'What should I do if the QR code doesn\'t scan?',
        answer: 'If your QR code doesn\'t scan, try increasing your screen brightness, cleaning your screen, or zooming in on the code. If problems persist, you can show the ticket ID number (displayed below the QR code) to the driver, or contact our support team for immediate assistance.'
      },
      {
        question: 'How do I reset my password?',
        answer: 'To reset your password, go to the login page and click on "Forgot Password". Enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password. For security reasons, reset links expire after 24 hours.'
      }
    ]
  };

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Thank you for your message. Our support team will respond shortly.');
  };

  return (
    <div className="bg-neutral-50 py-8 min-h-screen">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Help Center</h1>
          <p className="text-neutral-600">
            Find answers to common questions or contact our support team for further assistance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <HelpCircle className="text-primary-600" />
                Frequently Asked Questions
              </h2>
              
              {/* FAQ Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {faqCategories.map(category => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      activeCategory === category.id
                        ? 'bg-primary-100 text-primary-800 border border-primary-300'
                        : 'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {/* FAQ Accordion */}
              <div className="space-y-4">
                {faqs[activeCategory].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-neutral-200 rounded-lg overflow-hidden"
                  >
                    <button
                      className="w-full px-6 py-4 flex justify-between items-center text-left bg-white hover:bg-neutral-50 transition"
                      onClick={() => toggleQuestion(index)}
                    >
                      <span className="font-medium">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-neutral-500 transition-transform ${
                          activeQuestion === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {activeQuestion === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 py-4 bg-neutral-50 border-t border-neutral-200"
                      >
                        <p className="text-neutral-700">{faq.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Support & Quick Links */}
          <div className="lg:col-span-1">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
              
              <form onSubmit={handleContactSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input w-full"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input w-full"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="issue" className="block text-sm font-medium text-neutral-700 mb-1">
                    Issue Type
                  </label>
                  <select id="issue" className="input w-full">
                    <option value="general">General Inquiry</option>
                    <option value="ticket">Ticket Issue</option>
                    <option value="tracking">Tracking Problem</option>
                    <option value="payment">Payment Problem</option>
                    <option value="technical">Technical Issue</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="input w-full"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Quick Contact Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Customer Support</p>
                    <p className="text-neutral-700">+1 (555) 123-4567</p>
                    <p className="text-sm text-neutral-500">Mon-Fri, 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-neutral-700">support@bustrack.com</p>
                    <p className="text-sm text-neutral-500">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-neutral-700">Available in the app</p>
                    <p className="text-sm text-neutral-500">24/7 automated, with live agents during business hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Main Office</p>
                    <p className="text-neutral-700">123 Transit Way, City Center</p>
                    <p className="text-sm text-neutral-500">By appointment only</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Help Resources */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">Helpful Resources</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition">
                  <FileText className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">User Guide</span>
                </a>
                
                <a href="#" className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">Route Maps</span>
                </a>
                
                <a href="#" className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition">
                  <HelpCircle className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">FAQ</span>
                </a>
                
                <a href="#" className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition">
                  <MessageSquare className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">Community</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;