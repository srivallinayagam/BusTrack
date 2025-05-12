import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Bus, Navigation, MapPin, AlertCircle } from 'lucide-react';

interface BusLocation {
  id: number;
  route: string;
  position: [number, number];
  nextStop: string;
  eta: string;
  status: 'on-time' | 'delayed' | 'arrived';
}

interface BusMapProps {
  center?: [number, number];
  zoom?: number;
}

// Custom component to handle map interactions
const MapController: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  
  return null;
};

const BusMap: React.FC<BusMapProps> = ({ 
  center = [51.505, -0.09], 
  zoom = 13 
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

  // Simulate buses with more detailed information
  const [buses, setBuses] = useState<BusLocation[]>([
    { 
      id: 1, 
      route: "101", 
      position: [51.505, -0.09], 
      nextStop: "Central Station", 
      eta: "2 min",
      status: 'on-time'
    },
    { 
      id: 2, 
      route: "202", 
      position: [51.51, -0.1], 
      nextStop: "Market Street", 
      eta: "5 min",
      status: 'delayed'
    },
    { 
      id: 3, 
      route: "303", 
      position: [51.498, -0.085], 
      nextStop: "Park Avenue", 
      eta: "8 min",
      status: 'on-time'
    },
  ]);

  // Create custom icons for bus markers
  const getBusIcon = (status: 'on-time' | 'delayed' | 'arrived') => {
    const iconColors = {
      'on-time': 'green',
      'delayed': 'red',
      'arrived': 'blue'
    };

    return new Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${iconColors[status]}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  // Find user's current location
  const findMyLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: [number, number] = [
            position.coords.latitude, 
            position.coords.longitude
          ];
          setCurrentLocation(userLocation);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location", error);
          setLoading(false);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  // Refresh map data
  const refreshMap = () => {
    setLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      // In a real app, you'd fetch new bus locations here
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative h-[60vh] md:h-[70vh] rounded-lg overflow-hidden">
      {/* Control Buttons */}
      <div className="absolute top-4 right-4 z-[1000] flex gap-2">
        {/* Location Finding Button */}
        <button
          onClick={findMyLocation}
          className="bg-white p-2 rounded-md shadow-md hover:bg-neutral-100 transition"
          aria-label="Find my location"
        >
          <MapPin className={`w-5 h-5 text-primary-600 ${loading ? 'animate-pulse' : ''}`} />
        </button>

        {/* Refresh Map Button */}
        <button
          onClick={refreshMap}
          className="bg-white p-2 rounded-md shadow-md hover:bg-neutral-100 transition"
          aria-label="Refresh map"
        >
          <Navigation className={`w-5 h-5 text-primary-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Route Filter */}
      <div className="absolute top-4 left-4 z-[1000] flex gap-2">
        <select
          value={selectedRoute || ''}
          onChange={(e) => setSelectedRoute(e.target.value || null)}
          className="bg-white p-2 rounded-md shadow-md text-sm"
        >
          <option value="">All Routes</option>
          {Array.from(new Set(buses.map(bus => bus.route))).map(route => (
            <option key={route} value={route}>Route {route}</option>
          ))}
        </select>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full z-10"
      >
        {/* Map Controller to handle center changes */}
        <MapController center={center} />

        {/* Default OpenStreetMap Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User's Current Location Marker */}
        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={new Icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })}
          >
            <Popup>Your Current Location</Popup>
          </Marker>
        )}

        {/* Bus Markers */}
        {buses
          .filter(bus => !selectedRoute || bus.route === selectedRoute)
          .map((bus) => (
            <Marker
              key={bus.id}
              position={bus.position}
              icon={getBusIcon(bus.status)}
            >
              <Popup>
                <div className="text-center p-1">
                  <div className="flex items-center justify-center mb-2">
                    <Bus className="w-5 h-5 text-primary-600 mr-1" />
                    <span className="font-bold text-primary-600">Route {bus.route}</span>
                  </div>
                  <p className="text-sm mb-1">Next stop: {bus.nextStop}</p>
                  <p className="text-sm font-medium">Arriving in: {bus.eta}</p>
                  <div className="flex items-center justify-center mt-2">
                    {bus.status === 'delayed' && (
                      <div className="flex items-center text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-xs">Delayed</span>
                      </div>
                    )}
                    {bus.status === 'on-time' && (
                      <span className="text-xs text-green-600">On Time</span>
                    )}
                    {bus.status === 'arrived' && (
                      <span className="text-xs text-blue-600">Arrived</span>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default BusMap;