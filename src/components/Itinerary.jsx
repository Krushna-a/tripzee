import { useState } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Itinerary = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      name: 'Paris Getaway',
      startDate: '2023-06-10',
      endDate: '2023-06-17',
      days: [
        {
          id: 'day-1',
          date: '2023-06-10',
          activities: [
            { id: 'act-1', time: '09:00', title: 'Eiffel Tower Visit', description: 'Enjoy the view from the top', category: 'Sightseeing' },
            { id: 'act-2', time: '13:00', title: 'Lunch at Le Bistro', description: 'Traditional French cuisine', category: 'Dining' },
            { id: 'act-3', time: '15:00', title: 'Louvre Museum', description: 'See the Mona Lisa', category: 'Culture' }
          ]
        },
        {
          id: 'day-2',
          date: '2023-06-11',
          activities: [
            { id: 'act-4', time: '10:00', title: 'Notre Dame Cathedral', description: 'Gothic architecture masterpiece', category: 'Sightseeing' },
            { id: 'act-5', time: '14:00', title: 'Seine River Cruise', description: '1-hour scenic boat tour', category: 'Activity' }
          ]
        },
        {
          id: 'day-3',
          date: '2023-06-12',
          activities: [
            { id: 'act-6', time: '09:30', title: 'Montmartre Walking Tour', description: 'Explore the artistic neighborhood', category: 'Activity' },
            { id: 'act-7', time: '13:30', title: 'Lunch at Café des Artistes', description: 'Casual dining with a view', category: 'Dining' },
            { id: 'act-8', time: '16:00', title: 'Sacré-Cœur Basilica', description: 'Visit the iconic white church', category: 'Sightseeing' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Tokyo Adventure',
      startDate: '2023-08-05',
      endDate: '2023-08-12',
      days: [
        {
          id: 'day-1',
          date: '2023-08-05',
          activities: [
            { id: 'act-1', time: '10:00', title: 'Meiji Shrine', description: 'Peaceful forest shrine', category: 'Culture' },
            { id: 'act-2', time: '13:00', title: 'Lunch in Harajuku', description: 'Try local street food', category: 'Dining' },
            { id: 'act-3', time: '15:00', title: 'Shibuya Crossing', description: 'Experience the famous intersection', category: 'Sightseeing' }
          ]
        },
        {
          id: 'day-2',
          date: '2023-08-06',
          activities: [
            { id: 'act-4', time: '09:00', title: 'Tokyo Skytree', description: 'Panoramic city views', category: 'Sightseeing' },
            { id: 'act-5', time: '13:00', title: 'Asakusa Temple', description: 'Historic Buddhist temple', category: 'Culture' },
            { id: 'act-6', time: '16:00', title: 'Sumida River Cruise', description: 'Relaxing boat ride', category: 'Activity' }
          ]
        }
      ]
    }
  ]);
  
  const [selectedTrip, setSelectedTrip] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [newActivity, setNewActivity] = useState({
    time: '09:00',
    title: '',
    description: '',
    category: 'Sightseeing'
  });
  const [newTrip, setNewTrip] = useState({
    name: '',
    startDate: '',
    endDate: ''
  });
  const [showAddTripForm, setShowAddTripForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  // Get the currently selected trip
  const currentTrip = trips.find(trip => trip.id === selectedTrip) || trips[0];
  
  // Activity categories
  const activityCategories = [
    'Sightseeing', 'Dining', 'Activity', 'Culture', 
    'Shopping', 'Transportation', 'Accommodation', 'Entertainment'
  ];

  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle drag and drop
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    
    // If dropped outside a droppable area
    if (!destination) return;
    
    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    
    // Find the day from which the activity was dragged
    const sourceDay = currentTrip.days.find(day => day.id === source.droppableId);
    
    // Find the day to which the activity was dragged
    const destinationDay = currentTrip.days.find(day => day.id === destination.droppableId);
    
    // If source and destination are the same day
    if (sourceDay.id === destinationDay.id) {
      const newActivities = Array.from(sourceDay.activities);
      const [removed] = newActivities.splice(source.index, 1);
      newActivities.splice(destination.index, 0, removed);
      
      const newDays = currentTrip.days.map(day => {
        if (day.id === sourceDay.id) {
          return { ...day, activities: newActivities };
        }
        return day;
      });
      
      const newTrips = trips.map(trip => {
        if (trip.id === selectedTrip) {
          return { ...trip, days: newDays };
        }
        return trip;
      });
      
      setTrips(newTrips);
    } else {
      // If moving between different days
      const sourceActivities = Array.from(sourceDay.activities);
      const [removed] = sourceActivities.splice(source.index, 1);
      
      const destinationActivities = Array.from(destinationDay.activities);
      destinationActivities.splice(destination.index, 0, removed);
      
      const newDays = currentTrip.days.map(day => {
        if (day.id === sourceDay.id) {
          return { ...day, activities: sourceActivities };
        }
        if (day.id === destinationDay.id) {
          return { ...day, activities: destinationActivities };
        }
        return day;
      });
      
      const newTrips = trips.map(trip => {
        if (trip.id === selectedTrip) {
          return { ...trip, days: newDays };
        }
        return trip;
      });
      
      setTrips(newTrips);
    }
  };

  // Handle adding a new activity
  const handleAddActivity = () => {
    if (!selectedDay || !newActivity.title) return;
    
    const newActivityObj = {
      id: `act-${Date.now()}`,
      ...newActivity
    };
    
    const updatedTrips = trips.map(trip => {
      if (trip.id === selectedTrip) {
        const updatedDays = trip.days.map(day => {
          if (day.id === selectedDay) {
            return {
              ...day,
              activities: [...day.activities, newActivityObj]
            };
          }
          return day;
        });
        
        return { ...trip, days: updatedDays };
      }
      return trip;
    });
    
    setTrips(updatedTrips);
    setNewActivity({
      time: '09:00',
      title: '',
      description: '',
      category: 'Sightseeing'
    });
  };

  // Handle updating an activity
  const handleUpdateActivity = () => {
    if (!editingActivity || !editingActivity.title) return;
    
    const updatedTrips = trips.map(trip => {
      if (trip.id === selectedTrip) {
        const updatedDays = trip.days.map(day => {
          if (day.id === editingActivity.dayId) {
            const updatedActivities = day.activities.map(activity => {
              if (activity.id === editingActivity.id) {
                return {
                  id: activity.id,
                  time: editingActivity.time,
                  title: editingActivity.title,
                  description: editingActivity.description,
                  category: editingActivity.category
                };
              }
              return activity;
            });
            
            return { ...day, activities: updatedActivities };
          }
          return day;
        });
        
        return { ...trip, days: updatedDays };
      }
      return trip;
    });
    
    setTrips(updatedTrips);
    setEditingActivity(null);
  };

  // Handle deleting an activity
  const handleDeleteActivity = (dayId, activityId) => {
    const updatedTrips = trips.map(trip => {
      if (trip.id === selectedTrip) {
        const updatedDays = trip.days.map(day => {
          if (day.id === dayId) {
            return {
              ...day,
              activities: day.activities.filter(activity => activity.id !== activityId)
            };
          }
          return day;
        });
        
        return { ...trip, days: updatedDays };
      }
      return trip;
    });
    
    setTrips(updatedTrips);
    if (editingActivity && editingActivity.id === activityId) {
      setEditingActivity(null);
    }
  };

  // Handle adding a new trip
  const handleAddTrip = () => {
    if (!newTrip.name || !newTrip.startDate || !newTrip.endDate) return;
    
    // Create array of days between start and end date
    const days = [];
    const start = new Date(newTrip.startDate);
    const end = new Date(newTrip.endDate);
    
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      days.push({
        id: `day-${days.length + 1}`,
        date: date.toISOString().split('T')[0],
        activities: []
      });
    }
    
    const newTripObj = {
      id: Date.now(),
      name: newTrip.name,
      startDate: newTrip.startDate,
      endDate: newTrip.endDate,
      days
    };
    
    setTrips([...trips, newTripObj]);
    setNewTrip({
      name: '',
      startDate: '',
      endDate: ''
    });
    setShowAddTripForm(false);
    setSelectedTrip(newTripObj.id);
  };

  // Handle deleting a trip
  const handleDeleteTrip = () => {
    if (trips.length <= 1) return;
    
    const updatedTrips = trips.filter(trip => trip.id !== selectedTrip);
    setTrips(updatedTrips);
    setSelectedTrip(updatedTrips[0].id);
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
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Interactive Itinerary</h1>
        <button 
          onClick={() => setShowAddTripForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Add New Trip
        </button>
      </motion.div>
      
      {/* Trip selector */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex flex-wrap gap-2">
            {trips.map(trip => (
              <button
                key={trip.id}
                onClick={() => setSelectedTrip(trip.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  trip.id === selectedTrip 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {trip.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Trip details */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-semibold">{currentTrip.name}</h2>
              <p className="text-gray-600">
                {formatDate(currentTrip.startDate)} - {formatDate(currentTrip.endDate)}
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleDeleteTrip}
                className="text-red-600 hover:text-red-800 transition-colors"
                disabled={trips.length <= 1}
              >
                Delete Trip
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Itinerary board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTrip.days.map(day => (
            <div key={day.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-blue-50 p-4 border-b">
                <h3 className="font-semibold">{formatDate(day.date)}</h3>
              </div>
              
              <Droppable droppableId={day.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`p-4 min-h-[200px] ${
                      snapshot.isDraggingOver ? 'bg-blue-50' : ''
                    }`}
                  >
                    {day.activities.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>No activities planned</p>
                        <p className="text-sm">Drag activities here or add new ones</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {day.activities.map((activity, index) => (
                          <Draggable key={activity.id} draggableId={activity.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-3 rounded-lg border ${
                                  snapshot.isDragging 
                                    ? 'bg-blue-50 shadow-lg' 
                                    : 'bg-white hover:bg-gray-50'
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-gray-600">{activity.time}</span>
                                      <span className="text-sm px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                        {activity.category}
                                      </span>
                                    </div>
                                    <h4 className="font-medium mt-1">{activity.title}</h4>
                                    {activity.description && (
                                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                    )}
                                  </div>
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => setEditingActivity({
                                        ...activity,
                                        dayId: day.id
                                      })}
                                      className="text-gray-500 hover:text-blue-600 transition-colors"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                      </svg>
                                    </button>
                                    <button
                                      onClick={() => handleDeleteActivity(day.id, activity.id)}
                                      className="text-gray-500 hover:text-red-600 transition-colors"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              
              <div className="p-4 border-t bg-gray-50">
                <button
                  onClick={() => setSelectedDay(day.id)}
                  className="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors"
                >
                  Add Activity
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </DragDropContext>
      
      {/* Add activity modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Activity</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={newActivity.time}
                  onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Activity title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Optional description"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newActivity.category}
                  onChange={(e) => setNewActivity({...newActivity, category: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {activityCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setSelectedDay(null)}
                className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddActivity}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={!newActivity.title}
              >
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit activity modal */}
      {editingActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Activity</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={editingActivity.time}
                  onChange={(e) => setEditingActivity({...editingActivity, time: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingActivity.title}
                  onChange={(e) => setEditingActivity({...editingActivity, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Activity title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingActivity.description}
                  onChange={(e) => setEditingActivity({...editingActivity, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Optional description"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={editingActivity.category}
                  onChange={(e) => setEditingActivity({...editingActivity, category: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {activityCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setEditingActivity(null)}
                className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateActivity}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={!editingActivity.title}
              >
                Update Activity
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add trip modal */}
      {showAddTripForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Trip</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trip Name</label>
                <input
                  type="text"
                  value={newTrip.name}
                  onChange={(e) => setNewTrip({...newTrip, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g. Summer Vacation"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={newTrip.startDate}
                  onChange={(e) => setNewTrip({...newTrip, startDate: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={newTrip.endDate}
                  onChange={(e) => setNewTrip({...newTrip, endDate: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowAddTripForm(false)}
                className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTrip}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={!newTrip.name || !newTrip.startDate || !newTrip.endDate}
              >
                Create Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Itinerary;