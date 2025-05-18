import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MoodboardBuilder = () => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'Mediterranean Summer',
      description: 'Inspiration for my Greek island hopping trip',
      items: [
        { id: 1, type: 'image', content: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80', caption: 'Santorini sunset' },
        { id: 2, type: 'image', content: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80', caption: 'Beach day in Mykonos' },
        { id: 3, type: 'text', content: 'Try authentic Greek salad with local olive oil', caption: 'Food goals' },
        { id: 4, type: 'image', content: 'https://images.unsplash.com/photo-1602172694651-9a2b10a044e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80', caption: 'Acropolis in Athens' },
        { id: 5, type: 'text', content: 'Island hopping by ferry - check schedules in advance!', caption: 'Transportation note' },
      ]
    },
    {
      id: 2,
      title: 'Japan Cherry Blossoms',
      description: 'Spring trip to Japan during sakura season',
      items: [
        { id: 1, type: 'image', content: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80', caption: 'Cherry blossoms in Tokyo' },
        { id: 2, type: 'text', content: 'Best viewing spots: Ueno Park, Shinjuku Gyoen, Meguro River', caption: 'Must-visit locations' },
        { id: 3, type: 'image', content: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80', caption: 'Traditional tea ceremony' },
      ]
    }
  ]);
  
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [newBoard, setNewBoard] = useState({
    title: '',
    description: ''
  });
  const [newItem, setNewItem] = useState({
    type: 'image',
    content: '',
    caption: ''
  });
  const [showAddBoardForm, setShowAddBoardForm] = useState(false);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [layout, setLayout] = useState('grid'); // 'grid' or 'masonry'
  
  const fileInputRef = useRef(null);

  // Handle board selection
  const handleSelectBoard = (board) => {
    setSelectedBoard(board);
    setShowAddItemForm(false);
  };

  // Handle back to boards list
  const handleBackToBoards = () => {
    setSelectedBoard(null);
    setShowAddItemForm(false);
  };

  // Handle input change for new board
  const handleBoardInputChange = (e) => {
    const { name, value } = e.target;
    setNewBoard(prev => ({ ...prev, [name]: value }));
  };

  // Handle input change for new item
  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  // Handle adding a new board
  const handleAddBoard = (e) => {
    e.preventDefault();
    
    if (!newBoard.title) return;
    
    const board = {
      id: Date.now(),
      title: newBoard.title,
      description: newBoard.description,
      items: []
    };
    
    setBoards(prev => [...prev, board]);
    setNewBoard({
      title: '',
      description: ''
    });
    setShowAddBoardForm(false);
    setSelectedBoard(board);
  };

  // Handle adding a new item to a board
  const handleAddItem = (e) => {
    e.preventDefault();
    
    if (!newItem.content) return;
    
    const item = {
      id: Date.now(),
      type: newItem.type,
      content: newItem.content,
      caption: newItem.caption
    };
    
    const updatedBoards = boards.map(board => {
      if (board.id === selectedBoard.id) {
        return {
          ...board,
          items: [...board.items, item]
        };
      }
      return board;
    });
    
    setBoards(updatedBoards);
    setSelectedBoard({
      ...selectedBoard,
      items: [...selectedBoard.items, item]
    });
    setNewItem({
      type: 'image',
      content: '',
      caption: ''
    });
    setShowAddItemForm(false);
  };

  // Handle deleting an item
  const handleDeleteItem = (itemId) => {
    const updatedBoards = boards.map(board => {
      if (board.id === selectedBoard.id) {
        return {
          ...board,
          items: board.items.filter(item => item.id !== itemId)
        };
      }
      return board;
    });
    
    setBoards(updatedBoards);
    setSelectedBoard({
      ...selectedBoard,
      items: selectedBoard.items.filter(item => item.id !== itemId)
    });
  };

  // Handle deleting a board
  const handleDeleteBoard = (boardId) => {
    setBoards(boards.filter(board => board.id !== boardId));
    if (selectedBoard && selectedBoard.id === boardId) {
      setSelectedBoard(null);
    }
  };

  // Handle drag start
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetItem.id) return;
    
    const updatedItems = [...selectedBoard.items];
    const draggedIndex = updatedItems.findIndex(item => item.id === draggedItem.id);
    const targetIndex = updatedItems.findIndex(item => item.id === targetItem.id);
    
    updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(targetIndex, 0, draggedItem);
    
    const updatedBoards = boards.map(board => {
      if (board.id === selectedBoard.id) {
        return {
          ...board,
          items: updatedItems
        };
      }
      return board;
    });
    
    setBoards(updatedBoards);
    setSelectedBoard({
      ...selectedBoard,
      items: updatedItems
    });
    setDraggedItem(null);
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
      <motion.div variants={itemVariants} className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Moodboard Builder</h1>
        <p className="text-gray-600">Visualize your travel inspiration</p>
      </motion.div>
      
      {!selectedBoard ? (
        <>
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => setShowAddBoardForm(!showAddBoardForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center"
            >
              {showAddBoardForm ? 'Cancel' : 'Create Moodboard'}
              {!showAddBoardForm && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
          
          {showAddBoardForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl shadow-md p-6 mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">Create New Moodboard</h2>
              <form onSubmit={handleAddBoard}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Board Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newBoard.title}
                    onChange={handleBoardInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="My Travel Inspiration"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={newBoard.description}
                    onChange={handleBoardInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of your moodboard"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Create Board
                  </button>
                </div>
              </form>
            </motion.div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map(board => (
              <motion.div
                key={board.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleSelectBoard(board)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">{board.title}</h2>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBoard(board.id);
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4">{board.description}</p>
                  <div className="text-sm text-gray-500">{board.items.length} items</div>
                </div>
                <div className="h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {board.items.length > 0 ? (
                    <div className="grid grid-cols-3 gap-1 w-full h-full">
                      {board.items.slice(0, 3).map((item, index) => (
                        <div key={item.id} className="overflow-hidden">
                          {item.type === 'image' ? (
                            <img 
                              src={item.content} 
                              alt={item.caption} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-blue-100 flex items-center justify-center p-2 text-xs text-blue-800">
                              {item.content.substring(0, 20)}...
                            </div>
                          )}
                        </div>
                      ))}
                      {[...Array(Math.max(0, 3 - board.items.length))].map((_, index) => (
                        <div key={index} className="bg-gray-200"></div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">No items yet</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mb-8 flex justify-between items-center">
            <button
              onClick={handleBackToBoards}
              className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Boards
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLayout('grid')}
                  className={`p-2 rounded-md ${layout === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setLayout('masonry')}
                  className={`p-2 rounded-md ${layout === 'masonry' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h5v10H5V5zm7 0h3v4h-3V5zm0 6h3v4h-3v-4z" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => setShowAddItemForm(!showAddItemForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center"
              >
                {showAddItemForm ? 'Cancel' : 'Add Item'}
                {!showAddItemForm && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{selectedBoard.title}</h1>
            <p className="text-gray-600">{selectedBoard.description}</p>
          </div>
          
          {showAddItemForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl shadow-md p-6 mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
              <form onSubmit={handleAddItem}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Type</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="image"
                        checked={newItem.type === 'image'}
                        onChange={handleItemInputChange}
                        className="mr-2"
                      />
                      Image
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="text"
                        checked={newItem.type === 'text'}
                        onChange={handleItemInputChange}
                        className="mr-2"
                      />
                      Text Note
                    </label>
                  </div>
                </div>
                
                {newItem.type === 'image' ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="text"
                      name="content"
                      value={newItem.content}
                      onChange={handleItemInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter a URL for your image</p>
                  </div>
                ) : (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
                    <textarea
                      name="content"
                      value={newItem.content}
                      onChange={handleItemInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your note or idea here"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                )}
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                  <input
                    type="text"
                    name="caption"
                    value={newItem.caption}
                    onChange={handleItemInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Add to Board
                  </button>
                </div>
              </form>
            </motion.div>
          )}
          
          {selectedBoard.items.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Your moodboard is empty</h3>
              <p className="text-gray-500 mb-6">Add images and notes to start building your travel inspiration</p>
              <button
                onClick={() => setShowAddItemForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Add First Item
              </button>
            </div>
          ) : (
            <div className={`${layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'}`}>
              {selectedBoard.items.map(item => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={`bg-white rounded-xl shadow-md overflow-hidden ${layout === 'masonry' ? 'break-inside-avoid mb-6' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, item)}
                >
                  {item.type === 'image' ? (
                    <div className="relative group">
                      <img 
                        src={item.content} 
                        alt={item.caption} 
                        className="w-full h-auto"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative p-6 bg-blue-50 group">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-blue-800 whitespace-pre-line">{item.content}</p>
                    </div>
                  )}
                  {item.caption && (
                    <div className="p-4">
                      <p className="text-gray-700">{item.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default MoodboardBuilder;