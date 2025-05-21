import React, { useState } from 'react'
import { ArrowUpRight, ArrowDownLeft, X, ChevronDown, User, Clock, Banknote, Link2, Plus, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import profileimg from '../assets/profileimg.png'

const recipientsList = [
  { name: 'Owen F.', img: profileimg },
  { name: 'Faiz Ali', img: profileimg },
  { name: 'Ayesha K.', img: profileimg },
];
const recentsList = [
  { name: 'Ayesha K.', img: profileimg },
  { name: 'Owen F.', img: profileimg },
];

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

const sheetVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { y: '100%', opacity: 0, transition: { duration: 0.3 } },
};

function playSound(url) {
  const audio = new window.Audio(url);
  audio.play();
}

const Keypad = ({ value, setValue, max = 6 }) => (
  <div className="grid grid-cols-3 gap-3 mt-6 w-full max-w-xs mx-auto">
    {[1,2,3,4,5,6,7,8,9,'',0,'del'].map((key, i) => (
      <button
        key={i}
        className="rounded-xl h-14 text-2xl font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 active:bg-[#A6E22E]/30 transition"
        onClick={() => {
          if (key === 'del') setValue(v => v.slice(0, -1));
          else if (key !== '' && value.length < max) setValue(v => v + key);
        }}
      >
        {key === 'del' ? <X size={22} /> : key}
      </button>
    ))}
  </div>
);

const SendModal = ({ show, onClose, balance, setBalance }) => {
  const { isDarkMode } = useTheme();
  const [tab, setTab] = useState('send');
  const [recipient, setRecipient] = useState(recipientsList[0]);
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown on outside click
  React.useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e) {
      if (!e.target.closest('.recipient-dropdown')) setDropdownOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const handleRecipientSelect = (r) => {
    setRecipient(r);
    setTab('send');
    setDropdownOpen(false);
  };

  const handleSend = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0 || Number(amount) > balance) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setBalance(bal => bal - Number(amount));
      playSound('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4c7b.mp3'); // Placeholder send sound
      setTimeout(() => {
        setSuccess(false);
        setAmount('');
        onClose();
      }, 1200);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" initial="hidden" animate="visible" exit="exit" variants={sheetVariants} onClick={onClose}>
          <motion.div
            className={`w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-t-3xl p-0 relative shadow-xl min-h-[70vh] flex flex-col`}
            style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.98 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => { if (info.point.y > 100) onClose(); }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal content with enough bottom padding and scrollable */}
            <div className="flex-1 flex flex-col overflow-y-auto px-6 pt-8 pb-32">
              <div className="flex justify-center mb-4 mt-2">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#A6E22E] flex items-center justify-center">
                  <img src={recipient.img} alt={recipient.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex justify-center mb-2">
                <div className="relative recipient-dropdown">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-medium" onClick={() => setDropdownOpen((v) => !v)}>
                    {recipient.name} <ChevronDown size={18} />
                  </button>
                  {dropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-10">
                      <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-2 text-xs text-gray-500 dark:text-gray-400">Recents</div>
                      {recentsList.map((r, i) => (
                        <button key={i} className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => handleRecipientSelect(r)}>
                          <img src={r.img} alt={r.name} className="w-6 h-6 rounded-full" /> {r.name}
                        </button>
                      ))}
                      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-xs text-gray-500 dark:text-gray-400">All Contacts</div>
                      {recipientsList.map((r, i) => (
                        <button key={i} className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => handleRecipientSelect(r)}>
                          <img src={r.img} alt={r.name} className="w-6 h-6 rounded-full" /> {r.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
              <div className="text-center text-3xl font-bold text-[#005339] dark:text-[#A6E22E] my-2">PKR {amount || '0'}</div>
              <div className="flex justify-center mb-2">
                <div className="rounded-xl px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <Banknote size={18} /> Balance: PKR {balance.toLocaleString()}
                </div>
              </div>
              <Keypad value={amount} setValue={setAmount} max={6} />
              <motion.button whileTap={{ scale: 0.97 }} className={`mt-6 w-full py-3 rounded-xl font-semibold text-lg transition-all duration-200 ${amount && Number(amount) > 0 && Number(amount) <= balance ? 'bg-[#A6E22E] text-gray-900' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} disabled={!amount || Number(amount) <= 0 || Number(amount) > balance || sending} onClick={handleSend}>
                {sending ? 'Sending...' : 'Send'}
              </motion.button>
            </div>
            {success && <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1.1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 rounded-3xl z-20">
              <motion.div initial={{ scale: 0.7 }} animate={{ scale: 1.2 }} className="bg-[#A6E22E] rounded-full p-4 mb-2"><ArrowUpRight size={32} className="text-white" /></motion.div>
              <div className="text-lg font-bold text-[#005339] dark:text-[#A6E22E]">Sent!</div>
            </motion.div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DepositModal = ({ show, onClose, balance, setBalance }) => {
  const { isDarkMode } = useTheme();
  const [amount, setAmount] = useState('');
  const [depositing, setDepositing] = useState(false);
  const [success, setSuccess] = useState(false);
  const dummyBankBalance = 50000;

  const handleDeposit = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;
    setDepositing(true);
    setTimeout(() => {
      setDepositing(false);
      setSuccess(true);
      setBalance(bal => bal + Number(amount));
      playSound('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4c7b.mp3'); // Placeholder deposit sound
      setTimeout(() => {
        setSuccess(false);
        setAmount('');
        onClose();
      }, 1200);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" initial="hidden" animate="visible" exit="exit" variants={sheetVariants}>
          <motion.div className={`w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-t-3xl p-6 relative shadow-xl min-h-[70vh] flex flex-col`} initial={{ scale: 0.98 }} animate={{ scale: 1 }} exit={{ scale: 0.98 }}>
            <button className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700" onClick={onClose} aria-label="Close"><X size={22} /></button>
            <div className="flex items-center gap-3 mb-4">
              <Banknote size={28} className="text-[#A6E22E]" />
              <div>
                <div className="font-semibold text-lg text-gray-800 dark:text-white">Zenbank</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Connected</div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="rounded-xl px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <Banknote size={18} /> Bank Balance: PKR {dummyBankBalance.toLocaleString()}
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg bg-[#A6E22E]/80 text-xs font-medium text-gray-900 flex items-center gap-1"><Plus size={14} /> Add Bank</button>
              </div>
            </div>
            <div className="text-center text-3xl font-bold text-[#005339] dark:text-[#A6E22E] my-2">PKR {amount || '0'}</div>
            <Keypad value={amount} setValue={setAmount} max={6} />
            <motion.button whileTap={{ scale: 0.97 }} className={`mt-6 w-full py-3 rounded-xl font-semibold text-lg transition-all duration-200 ${amount && Number(amount) > 0 ? 'bg-[#A6E22E] text-gray-900' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} disabled={!amount || Number(amount) <= 0 || depositing} onClick={handleDeposit}>
              {depositing ? 'Depositing...' : 'Deposit'}
            </motion.button>
            {success && <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1.1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 rounded-3xl z-20">
              <motion.div initial={{ scale: 0.7 }} animate={{ scale: 1.2 }} className="bg-[#A6E22E] rounded-full p-4 mb-2"><ArrowDownLeft size={32} className="text-white" /></motion.div>
              <div className="text-lg font-bold text-[#005339] dark:text-[#A6E22E]">Deposited!</div>
            </motion.div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SendRecieveCard = ({ balance, setBalance }) => {
  const { isDarkMode } = useTheme();
  const [showSend, setShowSend] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

  return (
    <>
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
              onClick={() => setShowSend(true)}
            />
            <ActionButton
              icon={ArrowDownLeft}
              label="Deposit"
              variant="secondary"
              onClick={() => setShowDeposit(true)}
            />
          </div>
        </div>
      </div>
      <SendModal show={showSend} onClose={() => setShowSend(false)} balance={balance} setBalance={setBalance} />
      <DepositModal show={showDeposit} onClose={() => setShowDeposit(false)} balance={balance} setBalance={setBalance} />
    </>
  );
}

export default SendRecieveCard
