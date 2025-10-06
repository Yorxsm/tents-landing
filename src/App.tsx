import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Countdown } from './components/Countdown';
import { VisitorCounter } from './components/VisitorCounter';
import { TreasureHunt } from './components/TreasureHunt';
import { ShareModal } from './components/ShareModal';
import { RocketIcon, LinkIcon } from 'lucide-react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { AnimatedLogo } from './components/AnimatedLogo';
import { LinkPreview } from './components/LinkPreview';
import { Footer } from './components/Footer';
// Add custom fonts
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap');
  :root {
    --font-comic: 'Comic Neue', cursive;
    --font-bangers: 'Bangers', cursive;
  }
  .font-comic {
    font-family: var(--font-comic);
  }
  .font-bangers {
    font-family: var(--font-bangers);
    letter-spacing: 1px;
  }
`;
const AppContent = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [foundTreasure, setFoundTreasure] = useState<string | null>(null);
  const {
    theme
  } = useTheme();
  useEffect(() => {
    // Simulate visitor count increasing
    const storedCount = localStorage.getItem('visitorCount');
    const newCount = storedCount ? parseInt(storedCount) + 1 : 1;
    localStorage.setItem('visitorCount', newCount.toString());
    setVisitorCount(newCount);
  }, []);
  const handleTreasureFound = (treasureId: string) => {
    setFoundTreasure(treasureId);
    setShowShareModal(true);
  };
  return <div className={`min-h-screen w-full overflow-hidden relative font-comic ${theme === 'dark' ? 'bg-black text-white' : 'bg-gradient-to-b from-blue-50 to-white text-gray-800'}`}>
      {/* Custom Font Styles */}
      <style dangerouslySetInnerHTML={{
      __html: fontStyles
    }} />
      {/* Background elements */}
      <div className={`absolute inset-0 bg-[url('https://uploadthingy.s3.us-west-1.amazonaws.com/9LLvYK6exfzSGgXCVirWAG/tents.png')] bg-no-repeat bg-contain bg-center opacity-10 z-0`}></div>
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-blue-900/20 to-black/50' : 'bg-gradient-to-b from-blue-100/20 to-blue-50/30'} z-0`}></div>
      {/* Comic style dots */}
      {[...Array(20)].map((_, i) => <motion.div key={`dot-${i}`} className={`absolute w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-blue-500/40' : 'bg-blue-500/40'}`} style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`
    }} animate={{
      scale: [1, 1.5, 1],
      opacity: [0.4, 0.7, 0.4]
    }} transition={{
      duration: 2 + Math.random() * 3,
      repeat: Infinity,
      repeatType: 'reverse'
    }} />)}
      {/* Theme toggle */}
      <ThemeToggle />
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header - Repositioned */}
        <motion.div className="flex flex-col items-center mb-10" initial={{
        y: -100,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        duration: 1
      }}>
          <AnimatedLogo />
          <motion.div className="mt-4 relative" initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          delay: 0.5,
          type: 'spring',
          stiffness: 200
        }}>
            <motion.div className={`px-8 py-4 rounded-full font-bold flex items-center gap-2 transform rotate-3 font-bangers text-xl ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`} whileHover={{
            scale: 1.05,
            rotate: -3,
            backgroundColor: theme === 'dark' ? '#1E40AF' : '#1E40AF'
          }}>
              <RocketIcon size={24} className="animate-bounce" />
              <span className="tracking-wider">GTENTS from INTERN</span>
            </motion.div>
            {/* Comic speech bubble */}
            <motion.div className="absolute -top-12 -right-4 bg-white text-black p-3 rounded-xl font-comic transform rotate-12" style={{
            borderRadius: '18px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }} initial={{
            opacity: 0,
            scale: 0
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 1.2
          }}>
              <div className="absolute w-6 h-6 bg-white transform rotate-45" style={{
              bottom: '-6px',
              right: '20px'
            }}></div>
              <p className="relative z-10">It's super easy!</p>
            </motion.div>
          </motion.div>
        </motion.div>
        {/* Countdown section */}
        <motion.div initial={{
        scale: 0.8,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} transition={{
        delay: 0.3,
        duration: 0.8
      }} className="mb-16 text-center">
          <h2 className={`text-2xl mb-4 font-bangers tracking-wider ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
            LAUNCHING IN
          </h2>
          <Countdown targetDate="2025-10-30T12:00:00Z" />
        </motion.div>
        {/* Visitor counter */}
        <VisitorCounter count={visitorCount} />
        {/* Link Preview */}
        
        {/* Game area */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.6,
        duration: 1
      }} className="mt-12 relative">
          <motion.div className="text-center mb-8" initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.8
        }}>
            <h2 className={`text-3xl font-bold mb-2 font-bangers tracking-wider ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
              DISCOVER THE TENTS UNIVERSE
            </h2>
            <p className={`font-comic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Find hidden treasures to learn about TENTS!
            </p>
          </motion.div>

          <TreasureHunt onTreasureFound={handleTreasureFound} />
        </motion.div>
      </div>
      {/* Footer */}
      <Footer />
      {/* Share modal */}
      {showShareModal && <ShareModal treasureId={foundTreasure!} onClose={() => setShowShareModal(false)} />}
    </div>;
};
export function App() {
  return <ThemeProvider>
      <AppContent />
    </ThemeProvider>;
}