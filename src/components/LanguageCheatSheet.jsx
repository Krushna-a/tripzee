import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LanguageCheatSheet = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish');
  const [travelType, setTravelType] = useState('Leisure');
  const [generatedPhrases, setGeneratedPhrases] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedCheatSheets, setSavedCheatSheets] = useState([
    { id: 1, language: 'Japanese', travelType: 'Business', date: '2023-05-15' },
    { id: 2, language: 'French', travelType: 'Leisure', date: '2023-06-22' }
  ]);

  // Available languages
  const languages = [
    'Spanish', 'French', 'Japanese', 'German', 'Italian', 
    'Mandarin', 'Portuguese', 'Arabic', 'Russian', 'Korean'
  ];

  // Travel types
  const travelTypes = [
    'Leisure', 'Business', 'Family', 'Solo', 'Adventure', 
    'Food & Dining', 'Cultural', 'Medical'
  ];

  // Phrase categories
  const phraseCategories = {
    'Greetings': ['Hello', 'Good morning', 'Good evening', 'Goodbye', 'Thank you', 'You\'re welcome', 'Please', 'Excuse me'],
    'Transportation': ['Where is the train station?', 'How much is a taxi to...?', 'I need to go to...', 'Is this the right bus for...?'],
    'Accommodation': ['I have a reservation', 'Is breakfast included?', 'What time is check-out?', 'Is there WiFi?'],
    'Dining': ['A table for two, please', 'The menu, please', 'I am allergic to...', 'The bill, please'],
    'Emergency': ['Help!', 'I need a doctor', 'Call the police', 'Where is the hospital?'],
    'Shopping': ['How much does this cost?', 'Do you accept credit cards?', 'That\'s too expensive', 'I\'m just looking']
  };

  // Fake translations based on language and travel type
  const fakeTranslations = {
    'Spanish': {
      'Hello': 'Hola',
      'Good morning': 'Buenos días',
      'Good evening': 'Buenas noches',
      'Goodbye': 'Adiós',
      'Thank you': 'Gracias',
      'You\'re welcome': 'De nada',
      'Please': 'Por favor',
      'Excuse me': 'Disculpe',
      'Where is the train station?': '¿Dónde está la estación de tren?',
      'How much is a taxi to...?': '¿Cuánto cuesta un taxi a...?',
      'I need to go to...': 'Necesito ir a...',
      'Is this the right bus for...?': '¿Es este el autobús correcto para...?',
      'I have a reservation': 'Tengo una reserva',
      'Is breakfast included?': '¿Está incluido el desayuno?',
      'What time is check-out?': '¿A qué hora es el check-out?',
      'Is there WiFi?': '¿Hay WiFi?',
      'A table for two, please': 'Una mesa para dos, por favor',
      'The menu, please': 'La carta, por favor',
      'I am allergic to...': 'Soy alérgico/a a...',
      'The bill, please': 'La cuenta, por favor',
      'Help!': '¡Ayuda!',
      'I need a doctor': 'Necesito un médico',
      'Call the police': 'Llame a la policía',
      'Where is the hospital?': '¿Dónde está el hospital?',
      'How much does this cost?': '¿Cuánto cuesta esto?',
      'Do you accept credit cards?': '¿Aceptan tarjetas de crédito?',
      'That\'s too expensive': 'Es demasiado caro',
      'I\'m just looking': 'Solo estoy mirando'
    },
    'French': {
      'Hello': 'Bonjour',
      'Good morning': 'Bonjour',
      'Good evening': 'Bonsoir',
      'Goodbye': 'Au revoir',
      'Thank you': 'Merci',
      'You\'re welcome': 'De rien',
      'Please': 'S\'il vous plaît',
      'Excuse me': 'Excusez-moi',
      'Where is the train station?': 'Où est la gare?',
      'How much is a taxi to...?': 'Combien coûte un taxi pour...?',
      'I need to go to...': 'Je dois aller à...',
      'Is this the right bus for...?': 'Est-ce le bon bus pour...?',
      'I have a reservation': 'J\'ai une réservation',
      'Is breakfast included?': 'Le petit-déjeuner est-il inclus?',
      'What time is check-out?': 'À quelle heure est le départ?',
      'Is there WiFi?': 'Y a-t-il du WiFi?',
      'A table for two, please': 'Une table pour deux, s\'il vous plaît',
      'The menu, please': 'Le menu, s\'il vous plaît',
      'I am allergic to...': 'Je suis allergique à...',
      'The bill, please': 'L\'addition, s\'il vous plaît',
      'Help!': 'Au secours!',
      'I need a doctor': 'J\'ai besoin d\'un médecin',
      'Call the police': 'Appelez la police',
      'Where is the hospital?': 'Où est l\'hôpital?',
      'How much does this cost?': 'Combien ça coûte?',
      'Do you accept credit cards?': 'Acceptez-vous les cartes de crédit?',
      'That\'s too expensive': 'C\'est trop cher',
      'I\'m just looking': 'Je regarde seulement'
    },
    'Japanese': {
      'Hello': 'こんにちは (Konnichiwa)',
      'Good morning': 'おはようございます (Ohayou gozaimasu)',
      'Good evening': 'こんばんは (Konbanwa)',
      'Goodbye': 'さようなら (Sayounara)',
      'Thank you': 'ありがとう (Arigatou)',
      'You\'re welcome': 'どういたしまして (Dou itashimashite)',
      'Please': 'お願いします (Onegaishimasu)',
      'Excuse me': 'すみません (Sumimasen)',
      'Where is the train station?': '駅はどこですか？ (Eki wa doko desu ka?)',
      'How much is a taxi to...?': '...までタクシーはいくらですか？ (... made takushii wa ikura desu ka?)',
      'I need to go to...': '...に行く必要があります (... ni iku hitsuyou ga arimasu)',
      'Is this the right bus for...?': 'これは...行きの正しいバスですか？ (Kore wa ... iki no tadashii basu desu ka?)',
      'I have a reservation': '予約があります (Yoyaku ga arimasu)',
      'Is breakfast included?': '朝食は含まれていますか？ (Choushoku wa fukumarete imasu ka?)',
      'What time is check-out?': 'チェックアウトは何時ですか？ (Chekkuauto wa nanji desu ka?)',
      'Is there WiFi?': 'WiFiはありますか？ (WiFi wa arimasu ka?)',
      'A table for two, please': '二人用のテーブルをお願いします (Futari you no teeburu wo onegaishimasu)',
      'The menu, please': 'メニューをお願いします (Menyuu wo onegaishimasu)',
      'I am allergic to...': '私は...にアレルギーがあります (Watashi wa ... ni arerugii ga arimasu)',
      'The bill, please': '会計をお願いします (Kaikei wo onegaishimasu)',
      'Help!': '助けて！ (Tasukete!)',
      'I need a doctor': '医者が必要です (Isha ga hitsuyou desu)',
      'Call the police': '警察を呼んでください (Keisatsu wo yonde kudasai)',
      'Where is the hospital?': '病院はどこですか？ (Byouin wa doko desu ka?)',
      'How much does this cost?': 'これはいくらですか？ (Kore wa ikura desu ka?)',
      'Do you accept credit cards?': 'クレジットカードは使えますか？ (Kurejitto kaado wa tsukaemasu ka?)',
      'That\'s too expensive': 'それは高すぎます (Sore wa takasugimasu)',
      'I\'m just looking': '見ているだけです (Mite iru dake desu)'
    }
  };

  // Generate phrases based on language and travel type
  const generatePhrases = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const selectedCategories = getRelevantCategories(travelType);
      const phrases = [];
      
      selectedCategories.forEach(category => {
        const categoryPhrases = phraseCategories[category];
        categoryPhrases.forEach(phrase => {
          const translation = fakeTranslations[selectedLanguage]?.[phrase] || `[${phrase} in ${selectedLanguage}]`;
          phrases.push({
            id: Math.random().toString(36).substr(2, 9),
            category,
            phrase,
            translation
          });
        });
      });
      
      setGeneratedPhrases(phrases);
      setIsGenerating(false);
    }, 1500);
  };

  // Get relevant categories based on travel type
  const getRelevantCategories = (type) => {
    switch(type) {
      case 'Business':
        return ['Greetings', 'Transportation', 'Accommodation', 'Dining'];
      case 'Family':
        return ['Greetings', 'Transportation', 'Accommodation', 'Dining', 'Emergency'];
      case 'Adventure':
        return ['Greetings', 'Transportation', 'Emergency'];
      case 'Food & Dining':
        return ['Greetings', 'Dining', 'Shopping'];
      case 'Cultural':
        return ['Greetings', 'Transportation', 'Shopping'];
      case 'Medical':
        return ['Greetings', 'Transportation', 'Emergency', 'Accommodation'];
      case 'Solo':
        return ['Greetings', 'Transportation', 'Accommodation', 'Dining', 'Emergency', 'Shopping'];
      default: // Leisure
        return ['Greetings', 'Transportation', 'Accommodation', 'Dining', 'Shopping'];
    }
  };

  // Save current cheat sheet
  const saveCheatSheet = () => {
    const newCheatSheet = {
      id: Date.now(),
      language: selectedLanguage,
      travelType: travelType,
      date: new Date().toISOString().split('T')[0]
    };
    
    setSavedCheatSheets([newCheatSheet, ...savedCheatSheets]);
  };

  // Load a saved cheat sheet
  const loadCheatSheet = (cheatSheet) => {
    setSelectedLanguage(cheatSheet.language);
    setTravelType(cheatSheet.travelType);
    generatePhrases();
  };

  // Delete a saved cheat sheet
  const deleteCheatSheet = (id) => {
    setSavedCheatSheets(savedCheatSheets.filter(sheet => sheet.id !== id));
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
      <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-8">Language Cheat Sheet Generator</motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Generate Phrases</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Type</label>
                <select
                  value={travelType}
                  onChange={(e) => setTravelType(e.target.value)}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  {travelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={generatePhrases}
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-blue-400"
              >
                {isGenerating ? 'Generating...' : 'Generate Phrases'}
              </button>
            </div>
          </div>
          
          {/* Saved Cheat Sheets */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Saved Cheat Sheets</h2>
              {generatedPhrases.length > 0 && (
                <button
                  onClick={saveCheatSheet}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-1 px-3 rounded-lg transition-colors"
                >
                  Save Current
                </button>
              )}
            </div>
            
            {savedCheatSheets.length > 0 ? (
              <div className="space-y-3">
                {savedCheatSheets.map(sheet => (
                  <div key={sheet.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="font-medium">{sheet.language} - {sheet.travelType}</p>
                      <p className="text-sm text-gray-500">{sheet.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => loadCheatSheet(sheet)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => deleteCheatSheet(sheet.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No saved cheat sheets</p>
            )}
          </div>
        </motion.div>
        
        {/* Generated Phrases */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          {isGenerating ? (
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : generatedPhrases.length > 0 ? (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">{selectedLanguage} Phrases for {travelType} Travel</h2>
                <button
                  onClick={() => window.print()}
                  className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <span>Print</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </button>
              </div>
              
              {/* Group phrases by category */}
              {Object.keys(phraseCategories).map(category => {
                const categoryPhrases = generatedPhrases.filter(p => p.category === category);
                if (categoryPhrases.length === 0) return null;
                
                return (
                  <div key={category} className="mb-8">
                    <h3 className="text-lg font-semibold mb-3 pb-2 border-b">{category}</h3>
                    <div className="space-y-4">
                      {categoryPhrases.map(phrase => (
                        <div key={phrase.id} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium">{phrase.phrase}</p>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="font-medium">{phrase.translation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center items-center h-64">
              <p className="text-gray-500 mb-4">No phrases generated yet</p>
              <p className="text-sm text-gray-400">Select a language and travel type, then click "Generate Phrases"</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LanguageCheatSheet;