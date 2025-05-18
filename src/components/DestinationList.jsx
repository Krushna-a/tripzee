import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DestinationList = () => {
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: 'Paris',
      country: 'France',
      region: 'Europe',
      emoji: '🗼',
      description: 'The City of Light with iconic landmarks like the Eiffel Tower and Louvre Museum.',
      tags: ['Romantic', 'Cultural', 'Historical'],
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80'
    },
    {
      id: 2,
      name: 'Bali',
      country: 'Indonesia',
      region: 'Asia',
      emoji: '🏝️',
      description: 'A tropical paradise known for beautiful beaches, rice terraces, and spiritual retreats.',
      tags: ['Beach', 'Nature', 'Spiritual'],
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80'
    },
    {
      id: 3,
      name: 'New York City',
      country: 'United States',
      region: 'North America',
      emoji: '🗽',
      description: 'The Big Apple offers world-class shopping, dining, and iconic landmarks like Times Square.',
      tags: ['Urban', 'Shopping', 'Entertainment'],
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 4,
      name: 'Cape Town',
      country: 'South Africa',
      region: 'Africa',
      emoji: '🏞️',
      description: 'A stunning coastal city with Table Mountain, beautiful beaches, and vibrant culture.',
      tags: ['Nature', 'Adventure', 'Cultural'],
      image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
    },
    {
      id: 5,
      name: 'Sydney',
      country: 'Australia',
      region: 'Oceania',
      emoji: '🏙️',
      description: 'Famous for its Opera House, harbor, and beautiful beaches like Bondi.',
      tags: ['Beach', 'Urban', 'Scenic'],
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 6,
      name: 'Rio de Janeiro',
      country: 'Brazil',
      region: 'South America',
      emoji: '🏖️',
      description: 'Home to iconic Christ the Redeemer statue, Copacabana beach, and vibrant carnival.',
      tags: ['Beach', 'Cultural', 'Festive'],
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 7,
      name: 'Tokyo',
      country: 'Japan',
      region: 'Asia',
      emoji: '🏯',
      description: 'A fascinating blend of ultramodern and traditional, from neon-lit skyscrapers to historic temples.',
      tags: ['Urban', 'Cultural', 'Foodie'],
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
    },
    {
      id: 8,
      name: 'Santorini',
      country: 'Greece',
      region: 'Europe',
      emoji: '🏛️',
      description: 'Famous for stunning sunsets, white-washed buildings, and crystal-clear waters.',
      tags: ['Romantic', 'Scenic', 'Beach'],
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
    }
  ]);

  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);

  const regions = ['All', 'Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania'];
  
  const allTags = ['All', ...new Set(destinations.flatMap(dest => dest.tags))];

  useEffect(() => {
    let filtered = [...destinations];
    
    if (selectedRegion !== 'All') {
      filtered = filtered.filter(dest => dest.region === selectedRegion);
    }
    
    if (selectedTag !== 'All') {
      filtered = filtered.filter(dest => dest.tags.includes(selectedTag));
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        dest => 
          dest.name.toLowerCase().includes(query) || 
          dest.country.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredDestinations(filtered);
  }, [destinations, selectedRegion, selectedTag, searchQuery]);

  const openDestinationDetails = (destination) => {
    setSelectedDestination(destination);
  };

  const closeDestinationDetails = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">Explore Destinations</h1>
        <p className="text-gray-600">Discover amazing places around the world</p>
      </motion.div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(destination => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
              onClick={() => openDestinationDetails(destination)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{destination.name}</h3>
                  <span className="text-2xl">{destination.emoji}</span>
                </div>
                <p className="text-gray-600 mb-3">{destination.country} • {destination.region}</p>
                <div className="flex flex-wrap gap-2">
                  {destination.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <span className="text-4xl mb-4 block">🔍</span>
          <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
          <p className="text-gray-600">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Destination Details Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="relative h-64 md:h-80">
              <img 
                src={selectedDestination.image} 
                alt={selectedDestination.name} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={closeDestinationDetails}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="flex items-center">
                  <span className="text-4xl mr-3">{selectedDestination.emoji}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedDestination.name}</h2>
                    <p className="text-gray-200">{selectedDestination.country} • {selectedDestination.region}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">About</h3>
                <p className="text-gray-600">{selectedDestination.description}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Experiences</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDestination.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DestinationList;