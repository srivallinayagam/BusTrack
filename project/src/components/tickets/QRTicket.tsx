import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Bus, Calendar, Clock, MapPin } from 'lucide-react';

interface QRTicketProps {
  ticketId: string;
  route: string;
  validFrom: string;
  validUntil: string;
  price: string;
}

const QRTicket: React.FC<QRTicketProps> = ({
  ticketId,
  route,
  validFrom,
  validUntil,
  price,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-sm mx-auto border-2 border-dashed border-neutral-300 rounded-xl overflow-hidden bg-white"
    >
      <div className="bg-primary-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bus size={24} />
            <h3 className="text-xl font-semibold">Bus Ticket</h3>
          </div>
          <span className="text-lg font-bold">{price}</span>
        </div>
        <div className="mt-2 text-sm text-primary-100">Ticket ID: {ticketId}</div>
      </div>

      <div className="p-6 flex flex-col items-center">
        <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
          <QRCodeSVG
            value={`BUSTICKET:${ticketId}:${route}:${validFrom}`}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>

        <div className="w-full space-y-3 mt-2">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <Bus size={18} className="text-primary-600" />
            </div>
            <div>
              <div className="text-xs text-neutral-500">Route</div>
              <div className="font-semibold">{route}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <Calendar size={18} className="text-primary-600" />
            </div>
            <div>
              <div className="text-xs text-neutral-500">Valid From</div>
              <div className="font-semibold">{validFrom}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <Clock size={18} className="text-primary-600" />
            </div>
            <div>
              <div className="text-xs text-neutral-500">Valid Until</div>
              <div className="font-semibold">{validUntil}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <div className="relative py-4">
          <div className="absolute left-0 right-0 border-t border-neutral-200"></div>
          <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-6 h-12 bg-neutral-100 rounded-r-full"></div>
          <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-6 h-12 bg-neutral-100 rounded-l-full"></div>
        </div>
        
        <div className="text-center text-sm text-neutral-500">
          <p>Please show this QR code to the driver when boarding</p>
        </div>
      </div>
    </motion.div>
  );
};

export default QRTicket;