import React, { useState } from 'react';
import ScheduleTable from '../components/routes/ScheduleTable';
import { motion } from 'framer-motion';
import { MapPin, Bus, Route, Clock, Calendar } from 'lucide-react';

const RoutesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'routes' | 'schedules'>('routes');
  
  const routes = [
    { 
      id: '101', 
      name: 'Downtown Express', 
      description: 'Fast service connecting residential areas to the downtown business district.',
      stops: ['Central Station', 'Market Street', 'City Hall', 'Business District'],
      frequency: 'Every 15-30 minutes',
      operatingHours: '5:00 AM - 11:00 PM',
      days: 'Monday through Friday'
    },
    { 
      id: '202', 
      name: 'Market Circle', 
      description: 'Circular route serving the major shopping areas and market districts.',
      stops: ['Transit Hub', 'Market Square', 'Shopping Center', 'Riverside Park', 'City Center'],
      frequency: 'Every 30-45 minutes',
      operatingHours: '6:00 AM - 10:00 PM',
      days: 'Every day'
    },
    { 
      id: '303', 
      name: 'Riverside Route', 
      description: 'Scenic route along the riverside connecting major recreational areas.',
      stops: ['Main Terminal', 'University Campus', 'Riverside Drive', 'Marina', 'Beach Front', 'Ocean View'],
      frequency: 'Every 60 minutes',
      operatingHours: '7:00 AM - 9:00 PM',
      days: 'Monday through Saturday'
    },
    { 
      id: '404', 
      name: 'University Line', 
      description: 'Direct service to the university campus and surrounding educational facilities.',
      stops: ['Central Station', 'Community College', 'University Main Gate', 'Research Park', 'Student Housing'],
      frequency: 'Every 20 minutes',
      operatingHours: '6:00 AM - 11:30 PM',
      days: 'Monday through Friday (Limited service on weekends)'
    },
    { 
      id: '505', 
      name: 'Airport Shuttle', 
      description: 'Express service connecting the city center to the international airport.',
      stops: ['Central Station', 'Business District', 'Convention Center', 'Airport Terminal 1', 'Airport Terminal 2'],
      frequency: 'Every 30 minutes',
      operatingHours: '4:00 AM - 12:00 AM',
      days: 'Every day'
    },
  ];

  const handleRouteSelect = (routeId: string) => {
    console.log(`Selected route: ${routeId}`);
    // Could implement scrolling to the specific route
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
          <h1 className="text-3xl font-bold mb-2">Routes & Schedules</h1>
          <p className="text-neutral-600">
            Explore our bus routes, stops, and detailed schedules to plan your journey.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex border-b border-neutral-200">
            <button
              className={`px-6 py-3 font-medium text-lg border-b-2 transition ${
                activeTab === 'routes'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
              onClick={() => setActiveTab('routes')}
            >
              <div className="flex items-center gap-2">
                <Route size={18} />
                <span>Routes</span>
              </div>
            </button>
            <button
              className={`px-6 py-3 font-medium text-lg border-b-2 transition ${
                activeTab === 'schedules'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
              onClick={() => setActiveTab('schedules')}
            >
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>Schedules</span>
              </div>
            </button>
          </div>
        </div>

        {/* Routes Tab Content */}
        {activeTab === 'routes' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 gap-6">
              {routes.map((route, index) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-primary-100 p-6 md:w-64 flex flex-col justify-center items-center text-center">
                      <div className="mb-2">
                        <Bus className="w-10 h-10 text-primary-600 mx-auto" />
                      </div>
                      <h3 className="text-xl font-bold text-primary-900">Route {route.id}</h3>
                      <p className="font-medium text-primary-700">{route.name}</p>
                    </div>
                    
                    <div className="p-6 flex-grow">
                      <p className="text-neutral-700 mb-4">{route.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-start gap-2">
                          <Clock className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-neutral-900">Operating Hours</p>
                            <p className="text-neutral-600 text-sm">{route.operatingHours}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <Calendar className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-neutral-900">Service Days</p>
                            <p className="text-neutral-600 text-sm">{route.days}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <Bus className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-neutral-900">Frequency</p>
                            <p className="text-neutral-600 text-sm">{route.frequency}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-primary-600" />
                          <span>Stops</span>
                        </h4>
                        <div className="flex flex-wrap items-center gap-2">
                          {route.stops.map((stop, idx) => (
                            <React.Fragment key={idx}>
                              <span className="bg-neutral-100 px-3 py-1 rounded-full text-sm">
                                {stop}
                              </span>
                              {idx < route.stops.length - 1 && (
                                <span className="text-neutral-300">→</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <button 
                          className="btn btn-primary"
                          onClick={() => handleRouteSelect(route.id)}
                        >
                          Track This Route
                        </button>
                        <button className="btn btn-outline">
                          View Schedule
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Schedules Tab Content */}
        {activeTab === 'schedules' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ScheduleTable onSelectRoute={handleRouteSelect} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RoutesPage;