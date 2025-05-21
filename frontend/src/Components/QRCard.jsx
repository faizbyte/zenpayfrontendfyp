import React, { useState, useRef, useEffect } from 'react'
import { Camera, QrCode, X, Scan, Share2, Copy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import jsQR from 'jsqr'

const QRPopup = ({ onClose, userId = "ZP123456789" }) => {
  const { isDarkMode } = useTheme();
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My ZenPay QR Code',
          text: 'Scan my ZenPay QR code to send me money!',
          url: `https://zenpay.com/pay/${userId}`
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(`https://zenpay.com/pay/${userId}`);
        alert('Payment link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userId);
    alert('ZenPay ID copied to clipboard!');
  };
  
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <p className={`font-mono text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {userId}
            </p>
            <button
              onClick={handleCopy}
              className={`p-2 rounded-full ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={handleShare}
          className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-medium ${
            isDarkMode
              ? 'bg-[#A6E22E] text-gray-800 hover:bg-[#8BC34A]'
              : 'bg-[#005339] text-white hover:bg-[#003D2A]'
          } transition-colors duration-200`}
        >
          <Share2 size={20} />
          Share QR Code
        </button>
      </motion.div>
    </motion.div>
  );
};

const CameraPopup = ({ onClose }) => {
  const { isDarkMode } = useTheme();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  const scanQRCode = () => {
    if (videoRef.current && canvasRef.current && isStreaming) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame on the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the image data from the canvas
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      // Scan for QR code
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        setScannedCode(code.data);
        // Handle the scanned QR code
        handleScannedCode(code.data);
      }
    }
  };

  const handleScannedCode = (code) => {
    // Here you can handle the scanned QR code
    // For example, you could navigate to a payment page
    console.log('Scanned QR Code:', code);
    alert(`Scanned QR Code: ${code}`);
    stopCamera();
    onClose();
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  useEffect(() => {
    let scanInterval;
    if (isStreaming) {
      scanInterval = setInterval(scanQRCode, 100); // Scan every 100ms
    }
    return () => {
      if (scanInterval) {
        clearInterval(scanInterval);
      }
    };
  }, [isStreaming]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col"
    >
      <div className="flex items-center justify-between p-4 bg-black">
        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="p-2 rounded-full text-white"
        >
          <X size={24} />
        </button>
        <h3 className="text-white font-medium">Scan QR Code</h3>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      <div className="flex-1 relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="hidden"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-white rounded-lg relative">
            <div className="absolute inset-0 border-2 border-white rounded-lg animate-pulse" />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-black">
        <p className="text-white text-center text-sm">
          Position the QR code within the frame
        </p>
      </div>
    </motion.div>
  );
};

const QRCard = () => {
  const [showQR, setShowQR] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
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
              onClick={() => setShowCamera(true)}
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
        {showCamera && <CameraPopup onClose={() => setShowCamera(false)} />}
      </AnimatePresence>
    </>
  )
}

export default QRCard
