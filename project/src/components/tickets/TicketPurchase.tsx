import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bus, CreditCard, Calendar, Clock } from 'lucide-react';

interface TicketPurchaseProps {
  onPurchase: (ticket: { route: string; type: string }) => void;
}

const TicketPurchase: React.FC<TicketPurchaseProps> = ({ onPurchase }) => {
  const [route, setRoute] = useState('101 - Downtown Express');
  const [ticketType, setTicketType] = useState('single');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPurchase({ route, type: ticketType });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Purchase Ticket</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="route" className="block text-sm font-medium text-neutral-700 mb-1">
            Select Route
          </label>
          <div className="relative">
            <Bus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
            <select
              id="route"
              className="input pl-10"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              required
            >
              <option value="101 - Downtown Express">101 - Downtown Express</option>
              <option value="202 - Market Circle">202 - Market Circle</option>
              <option value="303 - Riverside Route">303 - Riverside Route</option>
              <option value="404 - University Line">404 - University Line</option>
              <option value="505 - Airport Shuttle">505 - Airport Shuttle</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Ticket Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition ${
                ticketType === 'single'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-neutral-200 hover:border-primary-300'
              }`}
              onClick={() => setTicketType('single')}
            >
              <Clock size={24} className="text-primary-600 mb-2" />
              <span className="font-medium">Single Ride</span>
              <span className="text-sm text-neutral-500">Valid 2 hours</span>
              <span className="mt-2 font-bold">$2.40</span>
            </div>
            
            <div
              className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition ${
                ticketType === 'day'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-neutral-200 hover:border-primary-300'
              }`}
              onClick={() => setTicketType('day')}
            >
              <Calendar size={24} className="text-primary-600 mb-2" />
              <span className="font-medium">Day Pass</span>
              <span className="text-sm text-neutral-500">Valid 24 hours</span>
              <span className="mt-2 font-bold">$7.00</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="payment" className="block text-sm font-medium text-neutral-700 mb-1">
            Payment Method
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
            <select
              id="payment"
              className="input pl-10"
              defaultValue="creditCard"
              required
            >
              <option value="creditCard">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="applePay">Apple Pay</option>
              <option value="googlePay">Google Pay</option>
              <option value="PhonePay">Phone Pay</option>
              <option value="Paytm">Paytm</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full py-3"
        >
          <CreditCard className="mr-2" size={18} />
          Purchase Ticket for {ticketType === 'single' ? '$2.40' : '$7.00'}
        </button>
      </form>
    </motion.div>
  );
};

export default TicketPurchase;