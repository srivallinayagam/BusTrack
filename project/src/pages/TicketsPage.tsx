import React, { useState, useEffect } from 'react';
import TicketPurchase from '../components/tickets/TicketPurchase';
import QRTicket from '../components/tickets/QRTicket';
import { motion } from 'framer-motion';
import { CreditCard, Check, Clock, Save, Smartphone } from 'lucide-react';

const TicketsPage: React.FC = () => {
  const [purchaseStep, setPurchaseStep] = useState(0);
  const [processingPurchase, setProcessingPurchase] = useState(false);
  const [purchasedTicket, setPurchasedTicket] = useState<{
    id: string;
    route: string;
    type: string;
    validFrom: string;
    validUntil: string;
    price: string;
  } | null>(null);
  
  const [savedTickets, setSavedTickets] = useState<Array<{
    id: string;
    route: string;
    type: string;
    validFrom: string;
    validUntil: string;
    price: string;
    isActive: boolean;
  }>>([
    {
      id: 'TICKET-10458',
      route: '101 - Downtown Express',
      type: 'single',
      validFrom: '09/10/2025, 10:30 AM',
      validUntil: '09/10/2025, 12:30 PM',
      price: '$2.50',
      isActive: true
    }
  ]);

  const handlePurchase = (ticketInfo: { route: string; type: string }) => {
    setProcessingPurchase(true);
    
    // Simulate purchase processing
    setTimeout(() => {
      const now = new Date();
      const validFrom = now.toLocaleString();
      const validUntil = new Date(now.getTime() + (ticketInfo.type === 'single' ? 2 : 24) * 60 * 60 * 1000).toLocaleString();
      
      const newTicket = {
        id: `TICKET-${Math.floor(10000 + Math.random() * 90000)}`,
        route: ticketInfo.route,
        type: ticketInfo.type,
        validFrom,
        validUntil,
        price: ticketInfo.type === 'single' ? '$2.50' : '$5.00',
      };
      
      setPurchasedTicket(newTicket);
      setProcessingPurchase(false);
      setPurchaseStep(1);
    }, 2000);
  };

  const saveTicket = () => {
    if (purchasedTicket) {
      setSavedTickets([...savedTickets, { ...purchasedTicket, isActive: true }]);
      setPurchaseStep(2);
    }
  };

  const newPurchase = () => {
    setPurchaseStep(0);
    setPurchasedTicket(null);
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
          <h1 className="text-3xl font-bold mb-2">Digital Bus Tickets</h1>
          <p className="text-neutral-600">
            Purchase and manage your QR code tickets for seamless boarding with no need for cash.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Ticket Purchase Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {purchaseStep === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Purchase a New Ticket</h2>
                  
                  {processingPurchase ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-12 h-12 border-4 border-t-primary-600 border-neutral-200 rounded-full animate-spin mb-4"></div>
                      <p className="text-lg text-neutral-700">Processing your purchase...</p>
                      <p className="text-neutral-500 mt-2">This will only take a moment.</p>
                    </div>
                  ) : (
                    <TicketPurchase onPurchase={handlePurchase} />
                  )}
                </motion.div>
              )}
              
              {purchaseStep === 1 && purchasedTicket && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Purchase Successful!</h2>
                  <p className="text-neutral-600 mb-8">
                    Your ticket is ready for use. Simply show the QR code when boarding the bus.
                  </p>
                  
                  <QRTicket
                    ticketId={purchasedTicket.id}
                    route={purchasedTicket.route}
                    validFrom={purchasedTicket.validFrom}
                    validUntil={purchasedTicket.validUntil}
                    price={purchasedTicket.price}
                  />
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={saveTicket}
                      className="btn btn-primary flex items-center justify-center gap-2"
                    >
                      <Save size={18} />
                      Save Ticket to My Account
                    </button>
                    <button 
                      onClick={newPurchase}
                      className="btn btn-outline"
                    >
                      Purchase Another Ticket
                    </button>
                  </div>
                </motion.div>
              )}
              
              {purchaseStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Ticket Saved!</h2>
                  <p className="text-neutral-600 mb-6">
                    Your ticket has been saved to your account and is available in your saved tickets.
                  </p>
                  
                  <div className="flex justify-center">
                    <button 
                      onClick={newPurchase}
                      className="btn btn-primary"
                    >
                      Purchase Another Ticket
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Saved Tickets Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Smartphone size={20} className="text-primary-600" />
                My Saved Tickets
              </h2>
              
              <div className="space-y-4">
                {savedTickets.length > 0 ? (
                  savedTickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border rounded-lg p-4 ${
                        ticket.isActive 
                          ? 'border-primary-300 bg-primary-50' 
                          : 'border-neutral-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{ticket.route}</div>
                          <div className="text-sm text-neutral-600">
                            {ticket.type === 'single' ? 'Single Ride' : 'Day Pass'}
                          </div>
                        </div>
                        <span className="font-bold">{ticket.price}</span>
                      </div>
                      
                      <div className="flex items-center text-sm gap-2 mb-1">
                        <Clock size={14} className="text-neutral-500" />
                        <span className="text-neutral-700">Valid from: {ticket.validFrom}</span>
                      </div>
                      
                      <div className="flex items-center text-sm gap-2 mb-3">
                        <Clock size={14} className="text-neutral-500" />
                        <span className="text-neutral-700">Valid until: {ticket.validUntil}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-primary">
                          View QR Code
                        </button>
                        {ticket.isActive && (
                          <div className="ml-auto px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                            Active
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-neutral-500">
                    <CreditCard className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
                    <p>You don't have any saved tickets yet.</p>
                    <p className="mt-2">Purchase a ticket to get started!</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Ticketing Instructions */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">How to Use Your Ticket</h3>
              <ol className="space-y-3 text-neutral-700">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center text-primary-800 font-medium">1</div>
                  <div>Purchase your ticket and save it to your account.</div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center text-primary-800 font-medium">2</div>
                  <div>When boarding, tap "View QR Code" to display your ticket.</div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center text-primary-800 font-medium">3</div>
                  <div>Show the QR code to the driver or scan at the ticket reader.</div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center text-primary-800 font-medium">4</div>
                  <div>Your ticket remains active until the expiration time.</div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;