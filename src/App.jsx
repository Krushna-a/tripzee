import "./index.css";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Component imports
import DragCarousel from "./components/DragCarousel";
import PackingChecklist from "./components/PackingChecklist";
import DestinationList from "./components/DestinationList";
import CurrencyConverter from "./components/CurrencyConverter";
import TripCountdown from "./components/TripCountdown";
import TravelGallery from "./components/TravelGallery";
import BudgetTracker from "./components/BudgetTracker";
import LanguageCheatSheet from "./components/LanguageCheatSheet";
import Itinerary from "./components/Itinerary";
import AirportNavigation from "./components/AirportNavigation";
import MoodboardBuilder from "./components/MoodboardBuilder";

function App() {
  const followerRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const [activeFeature, setActiveFeature] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const animate = () => {
      // lerp (linear interpolation) for smooth trailing effect
      currentX.current += (mouseX.current - currentX.current) * 0.1;
      currentY.current += (mouseY.current - currentY.current) * 0.1;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 font-sans">
      {/* cursor  */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-5 h-5 bg-rose-500 rounded-full pointer-events-none duration-100 z-50"
      />
      {/* Navigation Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            onClick={() => {
              setActiveFeature("home");
              setMobileMenuOpen(false);
            }}
            className="flex items-center space-x-2"
          >
            <span className="text-2xl">✈️</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Tripzee
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/packing"
              onClick={() => setActiveFeature("packing")}
              className={`px-3 py-2 rounded-md transition-colors ${
                activeFeature === "packing"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:text-blue-600"
              }`}
            >
              Packing List
            </Link>
            <Link
              to="/destinations"
              onClick={() => setActiveFeature("destinations")}
              className={`px-3 py-2 rounded-md transition-colors ${
                activeFeature === "destinations"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:text-blue-600"
              }`}
            >
              Destinations
            </Link>
            <Link
              to="/planner"
              onClick={() => setActiveFeature("planner")}
              className={`px-3 py-2 rounded-md transition-colors ${
                activeFeature === "planner"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:text-blue-600"
              }`}
            >
              Trip Planner
            </Link>
            <Link
              to="/tools"
              onClick={() => setActiveFeature("tools")}
              className={`px-3 py-2 rounded-md transition-colors ${
                activeFeature === "tools"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:text-blue-600"
              }`}
            >
              Travel Tools
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-4 pb-4"
          >
            <div className="flex flex-col space-y-2">
              <Link
                to="/packing"
                onClick={() => {
                  setActiveFeature("packing");
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md transition-colors ${
                  activeFeature === "packing"
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                Packing List
              </Link>
              <Link
                to="/destinations"
                onClick={() => {
                  setActiveFeature("destinations");
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md transition-colors ${
                  activeFeature === "destinations"
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                Destinations
              </Link>
              <Link
                to="/planner"
                onClick={() => {
                  setActiveFeature("planner");
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md transition-colors ${
                  activeFeature === "planner"
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                Trip Planner
              </Link>
              <Link
                to="/tools"
                onClick={() => {
                  setActiveFeature("tools");
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md transition-colors ${
                  activeFeature === "tools"
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                Travel Tools
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <HomePage
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                  />
                }
              />
              <Route path="/packing" element={<PackingChecklist />} />
              <Route path="/destinations" element={<DestinationList />} />
              <Route path="/currency" element={<CurrencyConverter />} />
              <Route path="/countdown" element={<TripCountdown />} />
              <Route path="/gallery" element={<TravelGallery />} />
              <Route path="/budget" element={<BudgetTracker />} />
              <Route path="/language" element={<LanguageCheatSheet />} />
              <Route path="/itinerary" element={<Itinerary />} />
              <Route path="/airport" element={<AirportNavigation />} />
              <Route path="/moodboard" element={<MoodboardBuilder />} />
              <Route path="/planner" element={<TripPlanner />} />
              <Route path="/tools" element={<ToolsHub />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">✈️</span>
                <h2 className="text-xl font-bold">Tripzee</h2>
              </div>
              <p className="text-gray-300">
                Your all-in-one companion for planning, organizing, and enjoying
                your travel adventures.
              </p>
              <div className="mt-6 flex space-x-4">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link
                    to="/packing"
                    className="hover:text-blue-300 transition-colors"
                  >
                    Packing List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/destinations"
                    className="hover:text-blue-300 transition-colors"
                  >
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/planner"
                    className="hover:text-blue-300 transition-colors"
                  >
                    Trip Planner
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className="hover:text-blue-300 transition-colors"
                  >
                    Travel Gallery
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link
                    to="/currency"
                    className="hover:text-blue-300 transition-colors"
                  >
                    Currency Converter
                  </Link>
                </li>
                <li>
                  <Link
                    to="/language"
                    className="hover:text-blue-300 transition-colors"
                  >
                    Language Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/budget"
                    className="hover:text-blue-300 transition-colors"
                  >
                    Budget Tracker
                  </Link>
                </li>
                <li>
                  <Link
                    to="/countdown"
                    className="hover:text-blue-300 transition-colors"
                  >
                    Trip Countdown
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} TravelBuddy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Home Page Component
const HomePage = ({ containerVariants, itemVariants }) => {
  const slides = [
    {
      url: "https://m.economictimes.com/thumb/msid-103866158,width-1600,height-900,resizemode-4,imgsize-71822/a-survey-highlights-that-44-per-cent-of-indians-choose-online-travel-agencies-for-bookings.jpg",
      text: "Explore New Destinations with Ease",
    },
    {
      url: "https://www.rmcad.edu/wp-content/uploads/2024/12/shutterstock_2176161815-scaled.jpg",
      text: "Your Journey, Your Way",
    },
    {
      url: "https://media.self.com/photos/5f0885ffef7a10ffa6640daa/1:1/w_3929,h_3929,c_limit/travel_plane_corona.jpeg",
      text: "Discover Hidden Gems and Local Secrets",
    },
  ];
  return (
    <div className="">
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <DragCarousel slides={slides}></DragCarousel>
        <motion.div variants={itemVariants} className="py-5 overflow-hidden">
          <motion.div
            className="text-lg sm:text-5xl lg:text-6xl xl:text-7xl font-bold whitespace-nowrap"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              duration: 8,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[
              "Your",
              "all-in-one",
              "travel",
              "companion",
              "for",
              "planning,",
              "organizing,",
              "and",
              "enjoying",
              "your",
              "adventures.",
            ].map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mx-2 sm:mx-4 hover:text-teal-500 hover:scale-110 transition-all duration-200 ease-in-out"
              >
                {word}
              </motion.span>
            ))}

            {/* Duplicate for seamless looping */}
            {[
              "Your",
              "all-in-one",
              "travel",
              "companion",
              "for",
              "planning,",
              "organizing,",
              "and",
              "enjoying",
              "your",
              "adventures.",
            ].map((word, index) => (
              <motion.span
                key={`dup-${index}`}
                className="inline-block mx-2 sm:mx-4 hover:text-red-400 transition-colors duration-100"
                whileHover={{
                  scale: 1.1,
                  color: "#fca5a5",
                  textShadow: "0 0 8px rgba(252,165,165,0.5)",
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <FeatureCard
          icon="📋"
          title="Packing Checklist"
          description="Never forget essential items with our smart packing list organizer."
          link="/packing"
          variants={itemVariants}
          color="from-blue-500 to-blue-600"
        />
        <FeatureCard
          icon="🗺️"
          title="Destination Explorer"
          description="Discover and filter destinations by region with helpful travel tips."
          link="/destinations"
          variants={itemVariants}
          color="from-green-500 to-green-600"
        />
        <FeatureCard
          icon="💰"
          title="Currency Converter"
          description="Quickly convert between currencies for better budget planning."
          link="/currency"
          variants={itemVariants}
          color="from-yellow-500 to-yellow-600"
        />
        <FeatureCard
          icon="⏱️"
          title="Trip Countdown"
          description="Watch the excitement build with a countdown to your departure."
          link="/countdown"
          variants={itemVariants}
          color="from-purple-500 to-purple-600"
        />
        <FeatureCard
          icon="📸"
          title="Travel Gallery"
          description="Organize and showcase your travel memories in beautiful galleries."
          link="/gallery"
          variants={itemVariants}
          color="from-pink-500 to-pink-600"
        />
        <FeatureCard
          icon="📊"
          title="Budget Tracker"
          description="Keep your expenses in check with our intuitive budget calculator."
          link="/budget"
          variants={itemVariants}
          color="from-indigo-500 to-indigo-600"
        />
      </motion.div>

      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 mb-16 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Start Planning Your Next Adventure
        </h2>
        <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
          Whether you're a meticulous planner or a spontaneous traveler,
          TravelBuddy has the tools you need.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/planner"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 text-center shadow-md"
          >
            Create New Trip
          </Link>
          <Link
            to="/destinations"
            className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 text-center shadow-sm"
          >
            Explore Destinations
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-8 text-white mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Why Choose TravelBuddy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">🌍</div>
              <h3 className="font-semibold mb-2">Global Coverage</h3>
              <p className="text-blue-100">
                Information on thousands of destinations worldwide
              </p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-semibold mb-2">Real-time Updates</h3>
              <p className="text-blue-100">
                Currency rates, weather forecasts, and travel advisories
              </p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-blue-100">
                Your travel plans stay private and secure
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, link, variants }) => {
  return (
    <motion.div variants={variants}>
      <Link to={link} className="block h-full">
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 h-full flex flex-col">
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 flex-grow">{description}</p>
          <div className="mt-4 text-blue-600 font-medium flex items-center">
            Explore <span className="ml-1">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Trip Planner Hub Component
const TripPlanner = () => {
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Trip Planner</h1>
        <p className="text-gray-600 text-lg">
          Organize every detail of your trip with our comprehensive planning
          tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/countdown"
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100 flex items-start"
        >
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <span className="text-2xl text-blue-600">⏱️</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Trip Countdown</h2>
            <p className="text-gray-600">
              Track the days until your next adventure begins.
            </p>
          </div>
        </Link>

        <Link
          to="/itinerary"
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100 flex items-start"
        >
          <div className="bg-green-100 p-3 rounded-lg mr-4">
            <span className="text-2xl text-green-600">📅</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Interactive Itinerary
            </h2>
            <p className="text-gray-600">
              Plan and organize your daily activities.
            </p>
          </div>
        </Link>

        <Link
          to="/moodboard"
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100 flex items-start"
        >
          <div className="bg-purple-100 p-3 rounded-lg mr-4">
            <span className="text-2xl text-purple-600">🎨</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Trip Moodboard</h2>
            <p className="text-gray-600">Create visual inspiration boards.</p>
          </div>
        </Link>

        <Link
          to="/airport"
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100 flex items-start"
        >
          <div className="bg-yellow-100 p-3 rounded-lg mr-4">
            <span className="text-2xl text-yellow-600">✈️</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Airport Navigation</h2>
            <p className="text-gray-600">Find your way around airports.</p>
          </div>
        </Link>
      </div>

      <div className="mt-12 bg-blue-50 rounded-xl p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Need help planning?
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Our step-by-step guide will help you create the perfect travel plan
        </p>
        <div className="text-center">
          <Link
            to="/itinerary"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Start Planning Guide
          </Link>
        </div>
      </div>
    </div>
  );
};

// Tools Hub Component
const ToolsHub = () => {
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Travel Tools</h1>
        <p className="text-gray-600 text-lg">
          Essential tools to make your travels easier and more enjoyable
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/currency"
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100"
        >
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <span className="text-2xl text-green-600">💰</span>
            </div>
            <h2 className="text-xl font-semibold">Currency Converter</h2>
          </div>
          <p className="text-gray-600">
            Convert between different currencies for your trip.
          </p>
        </Link>

        <Link
          to="/language"
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100"
        >
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <span className="text-2xl text-blue-600">🗣️</span>
            </div>
            <h2 className="text-xl font-semibold">Language Cheat Sheet</h2>
          </div>
          <p className="text-gray-600">
            Generate useful phrases based on your travel type.
          </p>
        </Link>

        <Link
          to="/budget"
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100"
        >
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <span className="text-2xl text-purple-600">📊</span>
            </div>
            <h2 className="text-xl font-semibold">Budget Tracker</h2>
          </div>
          <p className="text-gray-600">Keep track of your travel expenses.</p>
        </Link>

        <Link
          to="/packing"
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100"
        >
          <div className="flex items-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg mr-4">
              <span className="text-2xl text-yellow-600">📋</span>
            </div>
            <h2 className="text-xl font-semibold">Packing Checklist</h2>
          </div>
          <p className="text-gray-600">Create customized packing lists.</p>
        </Link>
      </div>

      <div className="mt-12 bg-indigo-50 rounded-xl p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Pro Tip</h2>
        <p className="text-gray-600 text-center mb-6">
          Use the currency converter and budget tracker together to manage your
          travel finances effectively
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/currency"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
          >
            Try Currency Converter
          </Link>
          <Link
            to="/budget"
            className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-6 rounded-lg transition-colors text-center"
          >
            Open Budget Tracker
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
