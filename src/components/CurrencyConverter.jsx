import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [recentConversions, setRecentConversions] = useState([]);

  // Fake exchange rates (since we're using fake values as per requirements)
  const fakeExchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.82,
    AUD: 1.54,
    CAD: 1.37,
    CHF: 0.89,
    CNY: 7.29,
    INR: 83.12,
    MXN: 17.25,
    SGD: 1.35,
    NZD: 1.67,
    THB: 35.78,
    AED: 3.67,
    ZAR: 18.65
  };

  // Currency symbols
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'Fr',
    CNY: '¥',
    INR: '₹',
    MXN: '$',
    SGD: 'S$',
    NZD: 'NZ$',
    THB: '฿',
    AED: 'د.إ',
    ZAR: 'R'
  };

  // Currency names
  const currencyNames = {
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    JPY: 'Japanese Yen',
    AUD: 'Australian Dollar',
    CAD: 'Canadian Dollar',
    CHF: 'Swiss Franc',
    CNY: 'Chinese Yuan',
    INR: 'Indian Rupee',
    MXN: 'Mexican Peso',
    SGD: 'Singapore Dollar',
    NZD: 'New Zealand Dollar',
    THB: 'Thai Baht',
    AED: 'UAE Dirham',
    ZAR: 'South African Rand'
  };

  // Load exchange rates on component mount
  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setExchangeRates(fakeExchangeRates);
      setIsLoading(false);
      convertCurrency(amount, fromCurrency, toCurrency);
    }, 1000);
  }, []);

  // Convert currency when amount, from or to currency changes
  useEffect(() => {
    if (!isLoading) {
      convertCurrency(amount, fromCurrency, toCurrency);
    }
  }, [amount, fromCurrency, toCurrency, isLoading]);

  // Function to convert currency
  const convertCurrency = (amount, from, to) => {
    // Convert to USD first (as base), then to target currency
    const valueInUSD = amount / exchangeRates[from];
    const convertedValue = valueInUSD * exchangeRates[to];
    
    setConvertedAmount(convertedValue.toFixed(2));
  };

  // Function to handle conversion and save to recent conversions
  const handleConvert = () => {
    const newConversion = {
      id: Date.now(),
      amount,
      fromCurrency,
      toCurrency,
      result: convertedAmount,
      timestamp: new Date().toLocaleTimeString()
    };

    // Add to recent conversions (keep only last 5)
    setRecentConversions(prev => [newConversion, ...prev.slice(0, 4)]);
  };

  // Function to swap currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
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
      <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-8">Currency Converter</motion.h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">{currencySymbols[fromCurrency]}</span>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter amount"
                      min="0"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      {Object.keys(exchangeRates).map(currency => (
                        <option key={currency} value={currency}>
                          {currency} - {currencyNames[currency]}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-center mt-6">
                    <button 
                      onClick={handleSwapCurrencies}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      {Object.keys(exchangeRates).map(currency => (
                        <option key={currency} value={currency}>
                          {currency} - {currencyNames[currency]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  onClick={handleConvert}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Convert
                </button>
              </div>
              
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Converted Amount</p>
                  <div className="flex items-center justify-center">
                    <span className="text-3xl font-bold">
                      {currencySymbols[toCurrency]} {convertedAmount}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-center text-xs text-gray-500">
                <p>Exchange rates are for demonstration purposes only.</p>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">Recent Conversions</h2>
              
              {recentConversions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No recent conversions</p>
                  <p className="text-sm mt-2">Your conversion history will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentConversions.map(conversion => (
                    <div key={conversion.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            {currencySymbols[conversion.fromCurrency]} {conversion.amount} → {currencySymbols[conversion.toCurrency]} {conversion.result}
                          </p>
                          <p className="text-sm text-gray-500">
                            {conversion.fromCurrency} to {conversion.toCurrency}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">{conversion.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CurrencyConverter;