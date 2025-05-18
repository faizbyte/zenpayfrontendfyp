import React, { useState } from 'react'
import { Camera, QrCode, X, Scan } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const QRPopup = ({ onClose, userId = "ZP123456789" }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-w-sm rounded-3xl p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Your QR Code
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className={`aspect-square w-full rounded-3xl ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        } flex items-center justify-center mb-6`}>
          <QrCode size={200} className={isDarkMode ? 'text-white' : 'text-gray-800'} />
        </div>

        <div className={`text-center ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <p className="text-sm mb-2">Your ZenPay ID</p>
          <p className={`font-mono text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {userId}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const QRCard = () => {
  const [showQR, setShowQR] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <>
      <div className={`rounded-2xl ${
        isDarkMode 
          ? 'bg-gray-800 shadow-none' 
          : 'bg-white shadow-sm border border-gray-100'
      }`}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode
                ? 'bg-[#A6E22E] text-gray-800'
                : 'bg-gradient-to-r from-[#005339] to-[#00684A] text-white'
            }`}>
              <QrCode size={20} />
            </div>
            <div>
              <h2 className={`font-[Montserrat] text-[15px] font-medium ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Quick Scan
              </h2>
              <p className={`text-[11px] mt-0.5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Scan or show QR code
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Scan QR Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isDarkMode
                  ? 'hover:bg-gray-700 active:bg-gray-600'
                  : 'hover:bg-gray-50 active:bg-gray-100'
              }`}
            >
              <Camera size={20} className={
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } />
            </motion.button>

            {/* Show QR Button */}
            <motion.button
              onClick={() => setShowQR(true)}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isDarkMode
                  ? 'hover:bg-gray-700 active:bg-gray-600'
                  : 'hover:bg-gray-50 active:bg-gray-100'
              }`}
            >
              <div className="relative">
                <QrCode size={20} className={
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } />
                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${
                  isDarkMode ? 'bg-[#A6E22E]' : 'bg-[#005339]'
                }`} />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showQR && <QRPopup onClose={() => setShowQR(false)} />}
      </AnimatePresence>
    </>
  )
}

export default QRCard
