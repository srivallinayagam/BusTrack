import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Simulated route data
const routes = [
  { id: '101', name: 'Downtown Express', stops: 15 },
  { id: '202', name: 'Market Circle', stops: 12 },
  { id: '303', name: 'Riverside Route', stops: 18 },
  { id: '404', name: 'University Line', stops: 10 },
  { id: '505', name: 'Airport Shuttle', stops: 8 },
];

interface RouteSelectorProps {
  onRouteSelect: (routeId: string) => void;
}

const RouteSelector: React.FC<RouteSelectorProps> = ({ onRouteSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const filteredRoutes = routes.filter(route => 
    route.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
    onRouteSelect(routeId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Select a Route</h2>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
        <input
          type="text"
          placeholder="Search routes..."
          className="input pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map((route) => (
            <button
              key={route.id}
              className={`w-full text-left p-3 rounded-md transition ${
                selectedRoute === route.id
                  ? 'bg-primary-100 border border-primary-300'
                  : 'hover:bg-neutral-100 border border-transparent'
              }`}
              onClick={() => handleRouteSelect(route.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-primary-700">Route {route.id}</span>
                  <p className="text-sm text-neutral-600">{route.name}</p>
                </div>
                <span className="text-xs bg-neutral-200 px-2 py-1 rounded-full">
                  {route.stops} stops
                </span>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-4 text-neutral-500">
            No routes found. Try a different search.
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteSelector;