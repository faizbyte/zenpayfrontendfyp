import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Gift, Copy, Check } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const ReferCard = () => {
  const { isDarkMode } = useTheme();
  const [copied, setCopied] = useState(false);
  const referralCode = "ZENPAY2024";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferral = async () => {
    try {
      await navigator.share({
        title: 'Join me on ZenPay!',
        text: `Hey! Use my referral code ${referralCode} to sign up on ZenPay and get exciting rewards! 🎁`,
        url: 'https://zenpay.app'
      });
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-3xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}
    >
      {/* Top Pattern */}
      <div className="absolute top-0 right-0 w-full h-24 opacity-10">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#005339] rounded-full transform translate-x-20 -translate-y-20" />
        <div className="absolute top-10 left-0 w-20 h-20 bg-[#00684A] rounded-full transform -translate-x-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className={`text-lg font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Refer & Earn Rewards! 🎁
            </h2>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } mb-4`}>
              Share ZenPay with friends and both get PKR 500 when they join!
            </p>
          </div>
          <Gift className={`w-8 h-8 ${
            isDarkMode ? 'text-[#A6E22E]' : 'text-[#005339]'
          }`} />
        </div>

        {/* Referral Code Section */}
        <div className={`mt-4 p-3 rounded-xl ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
        } flex items-center justify-between`}>
          <div>
            <span className={`text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Your Referral Code
            </span>
            <p className={`font-mono font-bold text-lg ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {referralCode}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className={`p-2 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-600 hover:bg-gray-500' 
                : 'bg-white hover:bg-gray-100'
            } transition-colors duration-200`}
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`} />
            )}
          </motion.button>
        </div>

        {/* Share Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={shareReferral}
          className="mt-4 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#005339] to-[#00684A] text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow duration-200"
        >
          <Share2 size={18} />
          Share with Friends
        </motion.button>

        {/* Progress Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Referral Progress
            </span>
            <span className={`text-sm font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              2/5 Friends
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full w-[40%] bg-gradient-to-r from-[#005339] to-[#00684A]"
              style={{ transition: 'width 0.5s ease-in-out' }}
            />
          </div>
          <p className={`mt-2 text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Invite 3 more friends to unlock PKR 2,500 bonus! 🎯
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default ReferCard
