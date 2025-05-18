import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import logomini from "../assets/zenpaymini.png";
import { useTheme } from '../context/ThemeContext';

const BalanceCard = ({
  balance = 20340,
  userName = "Faiz Ali",
  expiry = "06/26",
  lastDigits = "69",
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const { isDarkMode } = useTheme();

  const toggleBalance = () => setShowBalance((prev) => !prev);

  // Placeholder functions for each button
  const handleSend = () => alert("Send button clicked");
  const handleReceive = () => alert("Receive button clicked");
  const handleAdd = () => alert("Add button clicked");
  const handleMenu = () => alert("Menu button clicked");

  return (
    <motion.div
      className="my-4 rounded-[24px] text-white relative overflow-hidden mx-auto"
      style={{
        width: "94%",
        maxWidth: "380px",
        height: "180px",
        background: isDarkMode 
          ? "linear-gradient(135deg, #1a4332 0%, #1c5c41 100%)"
          : "linear-gradient(135deg, #005339 0%, #00684A 100%)",
        boxShadow: isDarkMode 
          ? "0 10px 20px rgba(0, 0, 0, 0.3)"
          : "0 10px 20px rgba(0, 83, 57, 0.15)",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-32 translate-y-32" />
      </div>

      {/* Top Row with Animation */}
      <motion.div
        className="flex justify-between items-center px-6 pt-5 relative z-20"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <img src={logomini} alt="Logo" className="w-8 h-8" />
        <span className="text-sm font-mono tracking-widest opacity-90">•••• {lastDigits}</span>
      </motion.div>

      {/* Balance Section with Pop Effect */}
      <motion.div
        className="flex flex-col items-start px-6 mt-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-xs opacity-80 font-[Montserrat] mb-1">Available Balance</p>

        <div className="flex items-center space-x-3 mt-1">
          <div className="flex items-baseline space-x-2">
            <motion.span
              className="text-base font-[Montserrat] opacity-90"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              PKR
            </motion.span>
            <motion.h2
              className="text-3xl font-semibold font-[Montserrat]"
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {showBalance ? balance.toLocaleString() : "••••••"}
            </motion.h2>
          </div>

          <motion.button 
            onClick={toggleBalance} 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
              isDarkMode 
                ? 'bg-white/20 hover:bg-white/30' 
                : 'bg-black/10 hover:bg-black/20'
            }`}
          >
            {showBalance ? (
              <Eye size={16} className="text-white" />
            ) : (
              <EyeOff size={16} className="text-white" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom Row with Sliding Animation */}
      <motion.div
        className="flex justify-between items-center px-6 absolute bottom-5 w-full text-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <span className="font-[Montserrat] text-sm opacity-90">{userName}</span>
        <span className="font-[Montserrat] text-xs opacity-70">Valid Thru {expiry}</span>
      </motion.div>
    </motion.div>
  );
};

export default BalanceCard;
