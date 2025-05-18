import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AIIcon = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="currentColor"/>
    <path d="M2 23L16 30L30 23L16 16L2 23Z" fill="currentColor"/>
    <path d="M2 16L16 23L30 16L16 9L2 16Z" fill="currentColor" fillOpacity="0.6"/>
  </svg>
);

const AIChatButton = () => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Hide tooltip after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-24 right-4 z-50">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`absolute right-16 top-2 rounded-2xl py-2 px-4 text-sm font-medium shadow-lg ${
                isDarkMode 
                  ? 'bg-gray-800 text-gray-200' 
                  : 'bg-white text-gray-800'
              }`}
            >
              Ask ZenAI for help! ✨
              <div className={`absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 rotate-45 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
            isDarkMode 
              ? 'bg-[#005339] text-white' 
              : 'bg-gradient-to-r from-[#005339] to-[#00684A] text-white'
          }`}
          initial={false}
          animate={{ 
            rotate: isOpen ? 90 : 0,
            scale: isOpen ? 0.8 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <AIIcon />}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`fixed left-4 right-4 bottom-24 rounded-3xl shadow-2xl overflow-hidden ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              style={{ maxHeight: 'calc(100vh - 180px)' }}
            >
              <div className={`p-4 flex items-center justify-between ${
                isDarkMode 
                  ? 'bg-gray-700' 
                  : 'bg-gradient-to-r from-[#005339] to-[#00684A]'
              }`}>
                <h3 className="text-white font-medium flex items-center gap-2">
                  <AIIcon />
                  Chat with ZenAI
                </h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 active:bg-white/20"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              <div className="flex flex-col h-[calc(100vh-280px)]">
                <div className="flex-1 overflow-y-auto p-4">
                  <div className={`inline-flex max-w-[85%] rounded-2xl py-2 px-4 mb-4 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      Hi! I'm ZenAI, your personal financial assistant. I can help you with:
                      <ul className="list-disc ml-4 mt-2 space-y-1">
                        <li>Budgeting advice</li>
                        <li>Spending analysis</li>
                        <li>Financial goals</li>
                        <li>Money-saving tips</li>
                      </ul>
                      How can I assist you today?
                    </p>
                  </div>
                </div>

                <div className={`p-4 border-t ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <div className="flex items-center gap-3 max-w-3xl mx-auto">
                    <input
                      type="text"
                      placeholder="Ask anything about your finances..."
                      className={`flex-1 p-3 rounded-2xl text-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                          : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                      } border outline-none`}
                    />
                    <button 
                      className={`px-5 rounded-2xl text-sm font-medium active:scale-95 transition-transform ${
                        isDarkMode
                          ? 'bg-[#A6E22E] text-gray-800'
                          : 'bg-[#005339] text-white'
                      }`}
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AIChatButton; 