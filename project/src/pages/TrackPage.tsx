import React, { useState } from 'react';
import BusMap from '../components/track/BusMap';
import RouteSelector from '../components/track/RouteSelector';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, AlertCircle } from 'lucide-react';

const TrackPage: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  
  // Simulate bus status
  const busStatuses = [
    { id: 1, route: "101", status: "On Time", nextStop: "Central Station", eta: "2 min", lastUpdated: "Just now" },
    { id: 2, route: "202", status: "Slight Delay", nextStop: "Market Street", eta: "8 min", lastUpdated: "1 min ago" },
    { id: 3, route: "303", status: "On Time", nextStop: "Riverside Park", eta: "15 min", lastUpdated: "2 min ago" },
  ];

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
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
          <h1 className="text-3xl font-bold mb-2">Track Your Bus</h1>
          <p className="text-neutral-600">
            Get real-time updates on bus locations, estimated arrival times, and route information.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar with route selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <RouteSelector onRouteSelect={handleRouteSelect} />
            
            {/* Live Status Updates */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">Live Status Updates</h2>
              
              <div className="space-y-4">
                {busStatuses
                  .filter(bus => !selectedRoute || bus.route === selectedRoute)
                  .map((bus) => (
                    <div 
                      key={bus.id} 
                      className={`p-3 rounded-md border ${
                        bus.status === 'On Time' 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-amber-200 bg-amber-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-primary-700">Route {bus.route}</span>
                        <span className={`text-sm px-2 py-0.5 rounded-full ${
                          bus.status === 'On Time' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {bus.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1 text-neutral-700">
                          <MapPin size={14} className="text-neutral-500" /> {bus.nextStop}
                        </div>
                        <div className="flex items-center gap-1 text-neutral-700">
                          <Clock size={14} className="text-neutral-500" /> ETA: {bus.eta}
                        </div>
                      </div>
                      <div className="text-xs text-neutral-500 mt-2">
                        Updated: {bus.lastUpdated}
                      </div>
                    </div>
                  ))}
                
                {(!busStatuses.length || (selectedRoute && !busStatuses.some(b => b.route === selectedRoute))) && (
                  <div className="text-center py-6 text-neutral-500 flex flex-col items-center">
                    <AlertCircle className="w-8 h-8 mb-2 text-neutral-400" />
                    <p>No active buses for this route at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Map container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <BusMap />
            
            {/* Legend and info */}
            <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Active Bus</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Bus Stop</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Your Location</span>
                </div>
                <div className="flex items-center ml-auto">
                  <Clock size={14} className="text-neutral-500 mr-1" />
                  <span className="text-neutral-600">Updates every 30 seconds</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrackPage;