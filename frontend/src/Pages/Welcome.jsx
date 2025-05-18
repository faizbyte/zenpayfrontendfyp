import React from 'react';
import zenpaylogo from '../assets/zenpaylogo.svg';
import bgimg from '../assets/bgimg.jpg';
import bgobject from '../assets/bgobject.png';
import coin from '../assets/coin.png';
import welcomebtn from '../assets/welcomebtn.png'; // Correct path to the button image
import { ArrowRight } from 'lucide-react'; // Import the right arrow from lucide-react

const Welcome = () => {
  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      
      {/* Background image */}
      <img 
        src={bgimg} 
        alt="ZenPay Background" 
        className="h-[100vh] w-full object-cover filter brightness-30 z-0 absolute top-0 left-0"
      />
      
      {/* Object image at top-right */}
      <img 
        src={bgobject} 
        alt="Object" 
        className="absolute top-[-5px] right-[-5px] brightness-100 z-10"
      />

      {/* ZenPay logo at top-left */}
      <img 
        src={zenpaylogo} 
        alt="ZenPay Logo" 
        className="absolute top-4 left-4 p-2 z-20"
      />
      
      {/* Coins with float animation */}
      <img 
        src={coin} 
        alt="Coin 1" 
        className="absolute top-16 right-[-50px] w-[100px] z-20 animate-float"
      />
      <img 
        src={coin} 
        alt="Coin 2" 
        className="absolute top-[140px] left-[-50px] w-[100px] z-20 opacity-80 animate-float delay-200"
      />
      <img 
        src={coin} 
        alt="Coin 3" 
        className="absolute top-[500px] right-[-50px] w-[100px] z-20 opacity-60 animate-float delay-500"
      />

      {/* Heading with pulse */}
      <h1
        className="absolute top-1/2 mt-[105px] left-6 transform -translate-y-50 text-white z-30 text-left font-[Montserrat]"
        style={{ fontSize: '50px', lineHeight: '58px', fontWeight: 600 }}
      >
        Empowering<br />
        Your <span style={{ color: '#A6E22E', fontStyle: 'italic', fontWeight: 800 }}>Finances</span><br />
        Simplifying<br />
        Your Life.
      </h1>

      {/* Paragraph below heading */}
      <p className="absolute left-6 top-[calc(50%+200px)] z-40 text-white text-left font-light opacity-80 mb-5"
        style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 300, maxWidth: '400px', fontFamily: 'Montserrat' }}>
        Secure your financial future with our banking services.
      </p>

      {/* Welcome button at the bottom of the page with right arrow */}
      <div className="absolute bottom-15 left-1/6 transform -translate-x-1/2 z-30 flex items-center justify-center" 
           style={{ width: '80px', height: '80px', backgroundImage: `url(${welcomebtn})`, backgroundSize: 'cover' }}>
        <ArrowRight color="white" size={54} />
      </div>
      <img 
        src={bgobject} 
        alt="Object" 
        className="absolute bottom-[-5px] left-[-5px] brightness-70 z-10 transform scale-x-[-1] transform scale-y-[-1]"
      />
    </div>
  );
}

export default Welcome;
