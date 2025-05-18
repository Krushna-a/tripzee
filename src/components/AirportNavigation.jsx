import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AirportNavigation = () => {
  const [selectedAirport, setSelectedAirport] = useState('JFK');
  const [selectedTerminal, setSelectedTerminal] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [savedAirports, setSavedAirports] = useState(['JFK', 'LAX', 'LHR']);
  const [isLoading, setIsLoading] = useState(true);

  // Sample airport data
  const airports = {
    'JFK': {
      name: 'John F. Kennedy International Airport',
      city: 'New York',
      country: 'USA',
      terminals: ['1', '2', '4', '5', '7', '8'],
      amenities: [
        { id: 1, name: 'Starbucks', type: 'Food', terminal: '1', location: 'Near Gate 5', description: 'Coffee shop' },
        { id: 2, name: 'Hudson News', type: 'Shopping', terminal: '1', location: 'Main Concourse', description: 'Newsstand and convenience items' },
        { id: 3, name: 'XpresSpa', type: 'Services', terminal: '1', location: 'Near Gate 12', description: 'Massage and spa services' },
        { id: 4, name: 'Charging Station', type: 'Facilities', terminal: '1', location: 'Gates 8-10', description: 'Free charging for devices' },
        { id: 5, name: 'Currency Exchange', type: 'Services', terminal: '1', location: 'Main Hall', description: 'Money exchange services' },
        { id: 6, name: 'Shake Shack', type: 'Food', terminal: '4', location: 'Food Court', description: 'Burgers and shakes' },
        { id: 7, name: 'Duty Free', type: 'Shopping', terminal: '4', location: 'International Departures', description: 'Tax-free shopping' },
      ]
    },
    'LAX': {
      name: 'Los Angeles International Airport',
      city: 'Los Angeles',
      country: 'USA',
      terminals: ['1', '2', '3', '4', '5', '6', '7', '8', 'B', 'TBIT'],
      amenities: [
        { id: 1, name: 'Urth Caffé', type: 'Food', terminal: '1', location: 'Near Gate 9', description: 'Organic coffee and food' },
        { id: 2, name: 'Fred Segal', type: 'Shopping', terminal: 'TBIT', location: 'Main Concourse', description: 'Clothing and accessories' },
        { id: 3, name: 'Be Relax Spa', type: 'Services', terminal: 'TBIT', location: 'Near Gate 148', description: 'Massage and wellness' },
        { id: 4, name: 'Pet Relief Area', type: 'Facilities', terminal: '1', location: 'Outside Terminal', description: 'Area for pets' },
      ]
    },
    'LHR': {
      name: 'London Heathrow Airport',
      city: 'London',
      country: 'UK',
      terminals: ['2', '3', '4', '5'],
      amenities: [
        { id: 1, name: 'Pret A Manger', type: 'Food', terminal: '2', location: 'Departures Level', description: 'Sandwiches and coffee' },
        { id: 2, name: 'WHSmith', type: 'Shopping', terminal: '2', location: 'Main Concourse', description: 'Books and convenience items' },
        { id: 3, name: 'Heathrow Express', type: 'Transportation', terminal: '2', location: 'Ground Level', description: 'Train to central London' },
        { id: 4, name: 'Prayer Room', type: 'Facilities', terminal: '2', location: 'Level 3', description: 'Multi-faith prayer room' },
      ]
    }
  };

  // Amenity types for filtering
  const amenityTypes = ['All', 'Food', 'Shopping', 'Services', 'Facilities', 'Transportation'];

  // Simulate loading data
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Handle airport change
  const handleAirportChange = (airport) => {
    setIsLoading(true);
    setSelectedAirport(airport);
    setSelectedTerminal(airports[airport].terminals[0]);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Get filtered amenities
  const getFilteredAmenities = () => {
    if (!selectedAirport || !selectedTerminal) return [];
    
    let amenities = airports[selectedAirport].amenities.filter(
      amenity => amenity.terminal === selectedTerminal
    );
    
    if (filterType !== 'All') {
      amenities = amenities.filter(amenity => amenity.type === filterType);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      amenities = amenities.filter(
        amenity => 
          amenity.name.toLowerCase().includes(query) || 
          amenity.description.toLowerCase().includes(query) ||
          amenity.location.toLowerCase().includes(query)
      );
    }
    
    return amenities;
  };

  // Save airport to favorites
  const toggleSaveAirport = (airport) => {
    if (savedAirports.includes(airport)) {
      setSavedAirports(savedAirports.filter(a => a !== airport));
    } else {
      setSavedAirports([...savedAirports, airport]);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-8">Airport Navigation</motion.h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Airport Selection */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Airport</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.keys(airports).map(airportCode => (
                <div 
                  key={airportCode}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedAirport === airportCode ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleAirportChange(airportCode)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{airportCode}</h3>
                      <p className="text-gray-600 text-sm">{airports[airportCode].name}</p>
                      <p className="text-gray-500 text-xs">{airports[airportCode].city}, {airports[airportCode].country}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveAirport(airportCode);
                      }}
                      className="text-gray-400 hover:text-yellow-500 transition-colors"
                    >
                      {savedAirports.includes(airportCode) ? (
                        <span className="text-yellow-500">★</span>
                      ) : (
                        <span>☆</span>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Terminal Selection */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Terminal Map: {airports[selectedAirport].name}</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Terminal</label>
              <div className="flex flex-wrap gap-2">
                {airports[selectedAirport].terminals.map(terminal => (
                  <button
                    key={terminal}
                    onClick={() => setSelectedTerminal(terminal)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedTerminal === terminal 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    Terminal {terminal}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <p className="text-gray-500">Interactive terminal map would be displayed here</p>
              <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg mt-2">
                <p className="text-gray-400">Terminal {selectedTerminal} Map</p>
              </div>
            </div>
          </motion.div>
          
          {/* Amenities */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Terminal {selectedTerminal} Amenities</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
              >
                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {showFilters && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search amenities..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {amenityTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {getFilteredAmenities().length > 0 ? (
                getFilteredAmenities().map(amenity => (
                  <div key={amenity.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{amenity.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{amenity.type}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{amenity.description}</p>
                    <p className="text-gray-500 text-xs mt-2">Location: {amenity.location}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No amenities found matching your criteria.
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default AirportNavigation;