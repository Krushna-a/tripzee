import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2, FiEdit2, FiClock, FiCalendar, FiMapPin, FiInfo } from 'react-icons/fi';

const TripCountdown = () => {
  const [trips, setTrips] = useState(() => {
    // Load from localStorage if available
    const savedTrips = typeof window !== 'undefined' ? localStorage.getItem('travelBuddyTrips') : null;
    return savedTrips ? JSON.parse(savedTrips) : [
      {
        id: 1,
        destination: 'Paris',
        departureDate: '2023-12-15T00:00:00',
        description: 'Winter in Paris',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80'
      },
      {
        id: 2,
        destination: 'Tokyo',
        departureDate: '2024-04-10T00:00:00',
        description: 'Cherry blossom season',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80'
      }
    ];
  });
  
  const [newTrip, setNewTrip] = useState({
    destination: '',
    departureDate: '',
    description: '',
    image: ''
  });
  
  const [countdowns, setCountdowns] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Save trips to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('travelBuddyTrips', JSON.stringify(trips));
    }
  }, [trips]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      
      const updatedCountdowns = {};
      trips.forEach(trip => {
        const departureDate = new Date(trip.departureDate);
        const timeLeft = departureDate - now;
        
        if (timeLeft > 0) {
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          
          updatedCountdowns[trip.id] = { days, hours, minutes, seconds };
        } else {
          updatedCountdowns[trip.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
      
      setCountdowns(updatedCountdowns);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [trips]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrip(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTrip = (e) => {
    e.preventDefault();
    
    if (!newTrip.destination || !newTrip.departureDate) return;
    
    const trip = {
      id: Date.now(),
      destination: newTrip.destination,
      departureDate: new Date(newTrip.departureDate).toISOString(),
      description: newTrip.description,
      image: newTrip.image || `https://source.unsplash.com/random/800x600/?${newTrip.destination},city,tourism`
    };
    
    setTrips(prev => [...prev, trip]);
    setNewTrip({
      destination: '',
      departureDate: '',
      description: '',
      image: ''
    });
    setShowAddForm(false);
  };

  const handleEditTrip = (trip) => {
    setEditingTrip(trip);
    setNewTrip({
      destination: trip.destination,
      departureDate: trip.departureDate.slice(0, 16), // Convert to datetime-local format
      description: trip.description,
      image: trip.image
    });
    setShowAddForm(true);
  };

  const handleUpdateTrip = (e) => {
    e.preventDefault();
    
    if (!newTrip.destination || !newTrip.departureDate) return;
    
    const updatedTrip = {
      ...editingTrip,
      destination: newTrip.destination,
      departureDate: new Date(newTrip.departureDate).toISOString(),
      description: newTrip.description,
      image: newTrip.image || `https://source.unsplash.com/random/800x600/?${newTrip.destination},city,tourism`
    };
    
    setTrips(prev => prev.map(trip => trip.id === updatedTrip.id ? updatedTrip : trip));
    setNewTrip({
      destination: '',
      departureDate: '',
      description: '',
      image: ''
    });
    setEditingTrip(null);
    setShowAddForm(false);
  };

  const handleDeleteTrip = (id) => {
    setTrips(prev => prev.filter(trip => trip.id !== id));
  };

  const filteredTrips = trips.filter(trip => 
    trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: { y: -5, scale: 1.02 }
  };

  const countdownVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div 
      className="py-8 px-4 sm:px-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Trip Countdown
        </h1>
        <p className="text-gray-600 text-lg">Counting down to your next adventure</p>
      </motion.div>
      
      <motion.div variants={itemVariants} className="mb-8 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search trips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg 
            className="absolute left-3 top-3 h-5 w-5 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingTrip(null);
            setNewTrip({
              destination: '',
              departureDate: '',
              description: '',
              image: ''
            });
          }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          {showAddForm ? 'Cancel' : (
            <>
              <FiPlus className="h-5 w-5" />
              Add New Trip
            </>
          )}
        </button>
      </motion.div>
      
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingTrip ? 'Edit Trip' : 'Add New Trip'}
            </h2>
            <form onSubmit={editingTrip ? handleUpdateTrip : handleAddTrip}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FiMapPin className="text-blue-500" />
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={newTrip.destination}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Where are you going?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FiCalendar className="text-blue-500" />
                    Departure Date
                  </label>
                  <input
                    type="datetime-local"
                    name="departureDate"
                    value={newTrip.departureDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FiInfo className="text-blue-500" />
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={newTrip.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of your trip"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL (optional)
                </label>
                <input
                  type="text"
                  name="image"
                  value={newTrip.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
                {newTrip.destination && !newTrip.image && (
                  <p className="text-xs text-gray-500 mt-1">
                    Leave blank to use a random image of {newTrip.destination}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingTrip(null);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md"
                >
                  {editingTrip ? 'Update Trip' : 'Add Trip'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map(trip => {
            const countdown = countdowns[trip.id];
            const isTripPast = countdown && 
                              countdown.days === 0 && 
                              countdown.hours === 0 && 
                              countdown.minutes === 0 && 
                              countdown.seconds === 0;
            
            return (
              <motion.div
                key={trip.id}
                variants={itemVariants}
                whileHover="hover"
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={trip.image} 
                    alt={trip.destination} 
                    className="w-full h-full object-cover"
                  />
                  {isTripPast && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-xl font-bold bg-red-500 px-4 py-1 rounded-full">
                        Trip Completed!
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-1 text-gray-800">{trip.destination}</h2>
                      {trip.description && (
                        <p className="text-gray-600">{trip.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTrip(trip)}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        aria-label="Edit trip"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTrip(trip.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Delete trip"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4 flex items-center text-sm text-gray-500 gap-2">
                    <FiCalendar className="flex-shrink-0" />
                    <span>
                      {new Date(trip.departureDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  {countdown && !isTripPast && (
                    <>
                      <div className="mb-3 flex items-center text-sm text-gray-500 gap-2">
                        <FiClock className="flex-shrink-0" />
                        <span>Time until departure:</span>
                      </div>
                      <motion.div 
                        className="grid grid-cols-4 gap-2 text-center"
                        variants={countdownVariants}
                        animate="pulse"
                      >
                        <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                          <div className="text-2xl font-bold text-blue-600">{countdown.days}</div>
                          <div className="text-xs text-gray-500 uppercase">Days</div>
                        </div>
                        <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                          <div className="text-2xl font-bold text-blue-600">{countdown.hours}</div>
                          <div className="text-xs text-gray-500 uppercase">Hours</div>
                        </div>
                        <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                          <div className="text-2xl font-bold text-blue-600">{countdown.minutes}</div>
                          <div className="text-xs text-gray-500 uppercase">Mins</div>
                        </div>
                        <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                          <div className="text-2xl font-bold text-blue-600">{countdown.seconds}</div>
                          <div className="text-xs text-gray-500 uppercase">Secs</div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div 
          className="bg-white rounded-xl shadow-md p-8 text-center max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <div className="text-7xl mb-6 text-gray-300">🕒</div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            {searchTerm ? 'No matching trips found' : 'No Upcoming Trips'}
          </h2>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Try a different search term' 
              : 'Add your first trip to start the countdown!'}
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md"
          >
            Add Trip
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TripCountdown;