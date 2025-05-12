import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Clock, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock schedule data
const scheduleData = [
  { 
    id: 1, 
    route: '101', 
    name: 'Downtown Express', 
    departure: '06:00 AM', 
    arrival: '06:45 AM', 
    frequency: 'Every 30 min',
    days: 'Mon-Fri',
    stops: ['Central Station', 'Market Street', 'City Hall', 'Business District'] 
  },
  { 
    id: 2, 
    route: '101', 
    name: 'Downtown Express', 
    departure: '07:00 AM', 
    arrival: '07:45 AM', 
    frequency: 'Every 30 min',
    days: 'Mon-Fri',
    stops: ['Central Station', 'Market Street', 'City Hall', 'Business District'] 
  },
  { 
    id: 3, 
    route: '101', 
    name: 'Downtown Express', 
    departure: '08:00 AM', 
    arrival: '08:45 AM', 
    frequency: 'Every 30 min',
    days: 'Mon-Fri',
    stops: ['Central Station', 'Market Street', 'City Hall', 'Business District'] 
  },
  { 
    id: 4, 
    route: '202', 
    name: 'Market Circle', 
    departure: '06:15 AM', 
    arrival: '07:00 AM', 
    frequency: 'Every 45 min',
    days: 'Mon-Sun',
    stops: ['Transit Hub', 'Market Square', 'Shopping Center', 'Riverside Park', 'City Center'] 
  },
  { 
    id: 5, 
    route: '202', 
    name: 'Market Circle', 
    departure: '07:15 AM', 
    arrival: '08:00 AM', 
    frequency: 'Every 45 min',
    days: 'Mon-Sun',
    stops: ['Transit Hub', 'Market Square', 'Shopping Center', 'Riverside Park', 'City Center'] 
  },
  { 
    id: 6, 
    route: '303', 
    name: 'Riverside Route', 
    departure: '06:30 AM', 
    arrival: '07:15 AM', 
    frequency: 'Hourly',
    days: 'Mon-Sat',
    stops: ['Main Terminal', 'University Campus', 'Riverside Drive', 'Marina', 'Beach Front', 'Ocean View'] 
  },
];

interface ScheduleTableProps {
  onSelectRoute?: (routeId: string) => void;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ onSelectRoute }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [filterRoute, setFilterRoute] = useState<string | null>(null);

  // Get unique route IDs for the filter dropdown
  const routeOptions = Array.from(new Set(scheduleData.map(item => item.route)));

  const filteredData = scheduleData.filter(item => {
    const matchesSearch = 
      item.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.stops.some(stop => stop.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRouteFilter = filterRoute ? item.route === filterRoute : true;
    
    return matchesSearch && matchesRouteFilter;
  });

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleRouteClick = (routeId: string) => {
    if (onSelectRoute) {
      onSelectRoute(routeId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Bus Schedules</h2>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Search routes, stops, or times..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="md:w-48">
            <select
              className="input"
              value={filterRoute || ''}
              onChange={(e) => setFilterRoute(e.target.value || null)}
            >
              <option value="">All Routes</option>
              {routeOptions.map(route => (
                <option key={route} value={route}>Route {route}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50">
            <tr className="text-left">
              <th className="py-3 px-4 font-semibold text-neutral-700">Route</th>
              <th className="py-3 px-4 font-semibold text-neutral-700">Departure</th>
              <th className="py-3 px-4 font-semibold text-neutral-700">Arrival</th>
              <th className="py-3 px-4 font-semibold text-neutral-700">Days</th>
              <th className="py-3 px-4 font-semibold text-neutral-700">Frequency</th>
              <th className="py-3 px-4 font-semibold text-neutral-700"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((schedule) => (
                <React.Fragment key={schedule.id}>
                  <tr className="border-t border-neutral-200 hover:bg-neutral-50 transition">
                    <td className="py-3 px-4">
                      <div>
                        <button
                          onClick={() => handleRouteClick(schedule.route)}
                          className="font-medium text-primary-600 hover:text-primary-800 transition"
                        >
                          Route {schedule.route}
                        </button>
                        <div className="text-neutral-600">{schedule.name}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-neutral-400" /> 
                        {schedule.departure}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-neutral-400" /> 
                        {schedule.arrival}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-neutral-400" /> 
                        {schedule.days}
                      </div>
                    </td>
                    <td className="py-3 px-4">{schedule.frequency}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => toggleRow(schedule.id)}
                        className="p-1 rounded-full hover:bg-neutral-100 transition"
                        aria-label={expandedRow === schedule.id ? "Collapse" : "Expand"}
                      >
                        {expandedRow === schedule.id ? (
                          <ChevronUp size={18} className="text-neutral-600" />
                        ) : (
                          <ChevronDown size={18} className="text-neutral-600" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedRow === schedule.id && (
                    <tr className="bg-neutral-50">
                      <td colSpan={6} className="py-4 px-6">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <MapPin size={16} className="text-primary-600" />
                            Stops:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {schedule.stops.map((stop, index) => (
                              <div 
                                key={index} 
                                className="bg-white px-3 py-1 rounded-full border border-neutral-200 text-sm"
                              >
                                {stop}
                                {index < schedule.stops.length - 1 && (
                                  <span className="inline-block mx-2 text-neutral-300">→</span>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex gap-4">
                            <button 
                              className="btn btn-sm btn-primary"
                              onClick={() => handleRouteClick(schedule.route)}
                            >
                              Track This Bus
                            </button>
                            <button className="btn btn-sm btn-outline">
                              View Full Details
                            </button>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-neutral-500">
                  No schedules found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTable;