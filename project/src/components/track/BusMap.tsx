import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Bus, Navigation } from 'lucide-react';

interface BusMapProps {
  center?: [number, number];
  zoom?: number;
}

const BusMap: React.FC<BusMapProps> = ({ center = [51.505, -0.09], zoom = 13 }) => {
  const [loading, setLoading] = useState(false);
  
  // Simulate buses on the map
  const buses = [
    { id: 1, route: "101", position: [51.505, -0.09], nextStop: "Central Station", eta: "2 min" },
    { id: 2, route: "202", position: [51.51, -0.1], nextStop: "Market Street", eta: "5 min" },
    { id: 3, route: "303", position: [51.498, -0.085], nextStop: "Park Avenue", eta: "8 min" },
  ];

  // Create a custom icon for bus markers
  const busIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const refreshMap = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="relative h-[60vh] md:h-[70vh] rounded-lg overflow-hidden">
      <div className="absolute top-4 right-4 z-[1000]">
        <button 
          onClick={refreshMap}
          className="bg-white p-2 rounded-md shadow-md hover:bg-neutral-100 transition"
          aria-label="Refresh map"
        >
          <Navigation className={`w-5 h-5 text-primary-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        className="h-full w-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {buses.map((bus) => (
          <Marker 
            key={bus.id}
            position={bus.position}
            icon={busIcon}
          >
            <Popup>
              <div className="text-center p-1">
                <div className="flex items-center justify-center mb-2">
                  <Bus className="w-5 h-5 text-primary-600 mr-1" />
                  <span className="font-bold text-primary-600">Route {bus.route}</span>
                </div>
                <p className="text-sm mb-1">Next stop: {bus.nextStop}</p>
                <p className="text-sm font-medium">Arriving in: {bus.eta}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BusMap;