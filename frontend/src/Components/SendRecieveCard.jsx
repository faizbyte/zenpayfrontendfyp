import React from 'react'
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const ActionButton = ({ icon: Icon, label, onClick, variant }) => {
  const { isDarkMode } = useTheme();
  
  const variants = {
    primary: {
      button: isDarkMode
        ? 'bg-[#A6E22E] text-gray-800 hover:bg-[#B6F23E]'
        : 'bg-gradient-to-r from-[#005339] to-[#00684A] text-white hover:shadow-lg',
      icon: isDarkMode
        ? 'bg-black/10'
        : 'bg-white/20'
    },
    secondary: {
      button: isDarkMode
        ? 'bg-gray-700 hover:bg-gray-600'
        : 'bg-gray-50 hover:bg-gray-100',
      icon: isDarkMode
        ? 'bg-[#A6E22E]/10'
        : 'bg-[#005339]/10'
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex-1 relative group overflow-hidden rounded-2xl transition-all duration-200 ${variants[variant].button}`}
    >
      <div className="p-3 flex flex-col items-center">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-1.5 transition-transform duration-200 group-hover:scale-110 ${variants[variant].icon}`}>
          <Icon size={24} className={variant === 'secondary' && !isDarkMode ? 'text-[#005339]' : undefined} />
        </div>
        <span className={`text-sm font-medium tracking-tight ${
          variant === 'secondary' 
            ? (isDarkMode ? 'text-gray-200' : 'text-gray-800')
            : undefined
        }`}>
          {label}
        </span>
      </div>
      {/* Hover effect overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
        isDarkMode 
          ? 'bg-white/5'
          : 'bg-black/5'
      }`} />
    </motion.button>
  );
};

const SendRecieveCard = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`rounded-2xl p-4 h-[170px] transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800 shadow-none' 
        : 'bg-white shadow-sm border border-gray-100'
    }`}>
      <div className="h-full flex flex-col">
        <h2 className={`font-[Montserrat] text-[15px] font-medium mb-2.5 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Money Transfer
        </h2>
        
        <div className="flex-1 flex items-center gap-3">
          <ActionButton
            icon={ArrowUpRight}
            label="Send"
            variant="primary"
            onClick={() => {}}
          />
          
          <ActionButton
            icon={ArrowDownLeft}
            label="Deposit"
            variant="secondary"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  )
}

export default SendRecieveCard
