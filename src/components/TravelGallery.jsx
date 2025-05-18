import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TravelGallery = () => {
  const [albums, setAlbums] = useState([
    {
      id: 1,
      title: 'Paris 2022',
      description: 'Summer vacation in the City of Light',
      coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80',
          caption: 'Eiffel Tower at sunset'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
          caption: 'Seine River cruise'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
          caption: 'Louvre Museum'
        }
      ]
    },
    {
      id: 2,
      title: 'Tokyo 2023',
      description: 'Exploring Japan\'s vibrant capital',
      coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
          caption: 'Tokyo skyline with Mt. Fuji'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1570521462033-3015e76e7432?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80',
          caption: 'Shibuya crossing'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1583766395091-2eb9994ed094?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
          caption: 'Sensoji Temple'
        }
      ]
    }
  ]);
  
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showAddAlbumForm, setShowAddAlbumForm] = useState(false);
  const [newAlbum, setNewAlbum] = useState({
    title: '',
    description: '',
    coverImage: ''
  });
  
  const handleSelectAlbum = (album) => {
    setSelectedAlbum(album);
    setSelectedPhoto(null);
  };
  
  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setSelectedPhoto(null);
  };
  
  const handleSelectPhoto = (photo) => {
    setSelectedPhoto(photo);
  };
  
  const handleClosePhoto = () => {
    setSelectedPhoto(null);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlbum(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddAlbum = (e) => {
    e.preventDefault();
    
    if (!newAlbum.title) return;
    
    const album = {
      id: Date.now(),
      title: newAlbum.title,
      description: newAlbum.description,
      coverImage: newAlbum.coverImage || 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
      photos: []
    };
    
    setAlbums(prev => [...prev, album]);
    setNewAlbum({
      title: '',
      description: '',
      coverImage: ''
    });
    setShowAddAlbumForm(false);
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
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const cardHover = {
    scale: 1.02,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Travel Gallery
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">Capture and organize your travel memories in beautiful collections</p>
      </motion.div>
      
      {!selectedAlbum ? (
        <>
          <div className="mb-8 flex justify-end">
            <motion.button
              onClick={() => setShowAddAlbumForm(!showAddAlbumForm)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all flex items-center shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {showAddAlbumForm ? 'Cancel' : (
                <>
                  <span>Create Album</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </motion.button>
          </div>
          
          <AnimatePresence>
            {showAddAlbumForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 mb-8 overflow-hidden"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Album</h2>
                <form onSubmit={handleAddAlbum}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Album Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={newAlbum.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="My Amazing Trip"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={newAlbum.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Brief description of your trip"
                      rows="3"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL (optional)</label>
                    <input
                      type="url"
                      name="coverImage"
                      value={newAlbum.coverImage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      type="button"
                      onClick={() => setShowAddAlbumForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Create Album
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          
          {albums.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              layout
            >
              {albums.map(album => (
                <motion.div
                  key={album.id}
                  variants={itemVariants}
                  whileHover={cardHover}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group"
                  onClick={() => handleSelectAlbum(album)}
                  layout
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={album.coverImage} 
                      alt={album.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-medium">
                        View {album.photos.length} {album.photos.length === 1 ? 'photo' : 'photos'}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-bold mb-1 text-gray-800">{album.title}</h2>
                    <p className="text-gray-600 line-clamp-2">{album.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto"
              variants={itemVariants}
            >
              <div className="text-6xl mb-4">📸</div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">No Albums Yet</h2>
              <p className="text-gray-600 mb-6">Create your first album to start organizing your travel photos!</p>
              <motion.button
                onClick={() => setShowAddAlbumForm(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Album
              </motion.button>
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <motion.button
              onClick={handleBackToAlbums}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
              whileHover={{ x: -3 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Albums
            </motion.button>
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">{selectedAlbum.title}</h2>
            <p className="text-gray-600 max-w-2xl">{selectedAlbum.description}</p>
          </div>
          
          {selectedAlbum.photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedAlbum.photos.map(photo => (
                <motion.div
                  key={photo.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group"
                  onClick={() => handleSelectPhoto(photo)}
                  layout
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={photo.url} 
                      alt={photo.caption} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {photo.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <p className="text-white text-sm">{photo.caption}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">📷</div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">No Photos in This Album</h2>
              <p className="text-gray-600 mb-6">Add photos to start building your collection!</p>
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Add Photos
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
      
      {/* Lightbox for selected photo */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative max-w-4xl w-full">
              <motion.button
                onClick={handleClosePhoto}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.caption} 
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                {selectedPhoto.caption && (
                  <div className="mt-4 text-center text-white max-w-md">
                    <p className="text-lg">{selectedPhoto.caption}</p>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TravelGallery;