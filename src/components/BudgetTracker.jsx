import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BudgetTracker = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      name: 'Paris Vacation',
      budget: 3000,
      currency: 'USD',
      expenses: [
        { id: 1, category: 'Accommodation', amount: 800, date: '2023-06-10', note: 'Hotel booking' },
        { id: 2, category: 'Transportation', amount: 500, date: '2023-06-12', note: 'Flight tickets' },
        { id: 3, category: 'Food', amount: 300, date: '2023-06-15', note: 'Restaurants' },
      ]
    },
    {
      id: 2,
      name: 'Tokyo Adventure',
      budget: 4500,
      currency: 'USD',
      expenses: [
        { id: 1, category: 'Accommodation', amount: 1200, date: '2023-08-05', note: 'Airbnb' },
        { id: 2, category: 'Transportation', amount: 900, date: '2023-08-07', note: 'Flights and subway passes' },
        { id: 3, category: 'Activities', amount: 600, date: '2023-08-10', note: 'Tours and attractions' },
        { id: 4, category: 'Food', amount: 800, date: '2023-08-12', note: 'Restaurants and street food' },
      ]
    }
  ]);
  
  const [selectedTrip, setSelectedTrip] = useState(1);
  const [newExpense, setNewExpense] = useState({
    category: 'Accommodation',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });
  const [newTrip, setNewTrip] = useState({
    name: '',
    budget: '',
    currency: 'USD'
  });
  const [showAddTripForm, setShowAddTripForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  // Get the currently selected trip
  const currentTrip = trips.find(trip => trip.id === selectedTrip) || trips[0];
  
  // Calculate total expenses for the current trip
  const totalExpenses = currentTrip?.expenses.reduce((sum, expense) => sum + expense.amount, 0) || 0;
  
  // Calculate remaining budget
  const remainingBudget = currentTrip ? currentTrip.budget - totalExpenses : 0;
  
  // Calculate percentage of budget used
  const budgetUsedPercentage = currentTrip ? Math.min(100, Math.round((totalExpenses / currentTrip.budget) * 100)) : 0;

  // Expense categories
  const expenseCategories = [
    'Accommodation',
    'Transportation',
    'Food',
    'Activities',
    'Shopping',
    'Entertainment',
    'Health',
    'Communication',
    'Miscellaneous'
  ];

  // Currencies
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];

  // Handle adding a new expense
  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.date) return;
    
    const updatedTrips = trips.map(trip => {
      if (trip.id === selectedTrip) {
        return {
          ...trip,
          expenses: [
            ...trip.expenses,
            {
              id: Date.now(),
              ...newExpense,
              amount: parseFloat(newExpense.amount)
            }
          ]
        };
      }
      return trip;
    });
    
    setTrips(updatedTrips);
    setNewExpense({
      category: 'Accommodation',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      note: ''
    });
  };

  // Handle deleting an expense
  const handleDeleteExpense = (expenseId) => {
    const updatedTrips = trips.map(trip => {
      if (trip.id === selectedTrip) {
        return {
          ...trip,
          expenses: trip.expenses.filter(expense => expense.id !== expenseId)
        };
      }
      return trip;
    });
    
    setTrips(updatedTrips);
  };

  // Handle adding a new trip
  const handleAddTrip = () => {
    if (!newTrip.name || !newTrip.budget) return;
    
    const newTripObject = {
      id: Date.now(),
      ...newTrip,
      budget: parseFloat(newTrip.budget),
      expenses: []
    };
    
    setTrips([...trips, newTripObject]);
    setNewTrip({
      name: '',
      budget: '',
      currency: 'USD'
    });
    setShowAddTripForm(false);
    setSelectedTrip(newTripObject.id);
  };

  // Handle editing a trip
  const handleEditTrip = () => {
    if (!editingTrip || !editingTrip.name || !editingTrip.budget) return;
    
    const updatedTrips = trips.map(trip => {
      if (trip.id === selectedTrip) {
        return {
          ...trip,
          name: editingTrip.name,
          budget: parseFloat(editingTrip.budget),
          currency: editingTrip.currency
        };
      }
      return trip;
    });
    
    setTrips(updatedTrips);
    setEditingTrip(null);
  };

  // Handle deleting a trip
  const handleDeleteTrip = () => {
    if (trips.length <= 1) return;
    
    const updatedTrips = trips.filter(trip => trip.id !== selectedTrip);
    setTrips(updatedTrips);
    setSelectedTrip(updatedTrips[0].id);
  };

  // Start editing the current trip
  const startEditTrip = () => {
    setEditingTrip({
      name: currentTrip.name,
      budget: currentTrip.budget,
      currency: currentTrip.currency
    });
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

  // Get expense breakdown by category
  const expenseBreakdown = currentTrip?.expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // Format currency
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: currency 
    }).format(amount);
  };

  return (
    <motion.div 
      className="py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Budget Tracker</h1>
        <button 
          onClick={() => setShowAddTripForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Add New Trip
        </button>
      </motion.div>
      
      {/* Trip Selection */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Trip</label>
              <select
                value={selectedTrip}
                onChange={(e) => setSelectedTrip(parseInt(e.target.value))}
                className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {trips.map(trip => (
                  <option key={trip.id} value={trip.id}>{trip.name}</option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={startEditTrip}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Edit Trip
              </button>
              <button 
                onClick={handleDeleteTrip}
                className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-lg transition-colors"
                disabled={trips.length <= 1}
              >
                Delete Trip
              </button>
            </div>
          </div>
          
          {/* Trip Details */}
          {currentTrip && !editingTrip && (
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Total Budget</p>
                  <p className="text-2xl font-bold">{formatCurrency(currentTrip.budget, currentTrip.currency)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalExpenses, currentTrip.currency)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Remaining Budget</p>
                  <p className={`text-2xl font-bold ${remainingBudget < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(remainingBudget, currentTrip.currency)}
                  </p>
                </div>
              </div>
              
              {/* Budget Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-medium">Budget Used</p>
                  <p className="text-sm font-medium">{budgetUsedPercentage}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${budgetUsedPercentage > 90 ? 'bg-red-600' : budgetUsedPercentage > 70 ? 'bg-yellow-500' : 'bg-green-600'}`}
                    style={{ width: `${budgetUsedPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Edit Trip Form */}
          {editingTrip && (
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trip Name</label>
                  <input
                    type="text"
                    value={editingTrip.name}
                    onChange={(e) => setEditingTrip({...editingTrip, name: e.target.value})}
                    className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter trip name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <input
                    type="number"
                    value={editingTrip.budget}
                    onChange={(e) => setEditingTrip({...editingTrip, budget: e.target.value})}
                    className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter budget amount"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={editingTrip.currency}
                    onChange={(e) => setEditingTrip({...editingTrip, currency: e.target.value})}
                    className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button 
                  onClick={() => setEditingTrip(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditTrip}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Add Trip Modal */}
      {showAddTripForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Trip</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trip Name</label>
                <input
                  type="text"
                  value={newTrip.name}
                  onChange={(e) => setNewTrip({...newTrip, name: e.target.value})}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter trip name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                <input
                  type="number"
                  value={newTrip.budget}
                  onChange={(e) => setNewTrip({...newTrip, budget: e.target.value})}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter budget amount"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={newTrip.currency}
                  onChange={(e) => setNewTrip({...newTrip, currency: e.target.value})}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button 
                onClick={() => setShowAddTripForm(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddTrip}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Add Trip
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Expense Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Expense Form */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  {expenseCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">{currentTrip?.currency}</span>
                  </div>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    className="block w-full pl-10 py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter amount"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note (Optional)</label>
                <input
                  type="text"
                  value={newExpense.note}
                  onChange={(e) => setNewExpense({...newExpense, note: e.target.value})}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a note"
                />
              </div>
              <button
                onClick={handleAddExpense}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Add Expense
              </button>
            </div>
          </div>
          
          {/* Expense Breakdown */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
            {Object.keys(expenseBreakdown || {}).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(expenseBreakdown).map(([category, amount]) => (
                  <div key={category} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                      <span>{category}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(amount, currentTrip.currency)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No expenses yet</p>
            )}
          </div>
        </motion.div>
        
        {/* Expense List */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Expenses</h2>
            {currentTrip?.expenses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Note
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentTrip.expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => (
                      <tr key={expense.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(expense.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {expense.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(expense.amount, currentTrip.currency)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {expense.note || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan="2" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Total
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {formatCurrency(totalExpenses, currentTrip.currency)}
                      </td>
                      <td colSpan="2"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No expenses yet</p>
                <p className="text-sm mt-2">Add your first expense using the form</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BudgetTracker;