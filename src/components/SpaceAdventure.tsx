import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { RocketIcon, ZapIcon, ShieldIcon } from 'lucide-react';
interface SpacecraftPosition {
  x: number;
  y: number;
}
export const SpaceAdventure: React.FC = () => {
  const {
    theme
  } = useTheme();
  const [position, setPosition] = useState<SpacecraftPosition>({
    x: 50,
    y: 50
  });
  const [showBoost, setShowBoost] = useState(false);
  const [score, setScore] = useState(0);
  const [collectibles, setCollectibles] = useState<{
    x: number;
    y: number;
    collected: boolean;
  }[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const spacecraftControls = useAnimation();
  const messageControls = useAnimation();
  // Generate collectibles
  useEffect(() => {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        x: Math.random() * 90 + 5,
        y: Math.random() * 70 + 15,
        collected: false
      });
    }
    setCollectibles(items);
  }, []);
  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = e.shiftKey ? 5 : 2;
      if (e.shiftKey) {
        setShowBoost(true);
        setTimeout(() => setShowBoost(false), 500);
      }
      switch (e.key) {
        case 'ArrowUp':
          setPosition(prev => ({
            ...prev,
            y: Math.max(prev.y - speed, 10)
          }));
          break;
        case 'ArrowDown':
          setPosition(prev => ({
            ...prev,
            y: Math.min(prev.y + speed, 90)
          }));
          break;
        case 'ArrowLeft':
          setPosition(prev => ({
            ...prev,
            x: Math.max(prev.x - speed, 5)
          }));
          break;
        case 'ArrowRight':
          setPosition(prev => ({
            ...prev,
            x: Math.min(prev.x + speed, 95)
          }));
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  // Check for collectible collisions
  useEffect(() => {
    const checkCollisions = () => {
      const updatedCollectibles = collectibles.map((item, index) => {
        if (!item.collected && Math.abs(item.x - position.x) < 5 && Math.abs(item.y - position.y) < 5) {
          setScore(prev => prev + 100);
          displayMessage(`+100 TENTS Collected!`);
          return {
            ...item,
            collected: true
          };
        }
        return item;
      });
      setCollectibles(updatedCollectibles);
    };
    checkCollisions();
  }, [position, collectibles]);
  const displayMessage = (text: string) => {
    setMessage(text);
    setShowMessage(true);
    messageControls.start({
      opacity: [0, 1, 1, 0],
      y: [0, -20, -20, -40],
      transition: {
        duration: 2
      }
    });
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };
  return <div className={`relative w-full h-[400px] rounded-xl overflow-hidden border-2 ${theme === 'dark' ? 'border-blue-500/30 bg-black/60' : 'border-amber-500/30 bg-sky-100/60'}`}>
      {/* Space background */}
      <div className="absolute inset-0">
        {theme === 'dark' ?
      // Dark mode - stars
      [...Array(50)].map((_, i) => <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-white" initial={{
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.3
      }} animate={{
        opacity: [0.3, 1, 0.3],
        scale: [1, 1.5, 1]
      }} transition={{
        duration: 2 + Math.random() * 3,
        repeat: Infinity,
        repeatType: 'reverse'
      }} />) :
      // Light mode - clouds
      [...Array(10)].map((_, i) => <motion.div key={i} className="absolute rounded-full bg-white/80" style={{
        width: `${30 + Math.random() * 70}px`,
        height: `${20 + Math.random() * 30}px`
      }} initial={{
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`
      }} animate={{
        x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
      }} transition={{
        duration: 30 + Math.random() * 20,
        repeat: Infinity,
        repeatType: 'reverse'
      }} />)}
      </div>
      {/* Instructions */}
      <div className={`absolute top-2 left-2 p-2 rounded-md ${theme === 'dark' ? 'bg-blue-900/40' : 'bg-amber-100/60'}`}>
        <p className={`text-xs ${theme === 'dark' ? 'text-blue-200' : 'text-amber-800'}`}>
          Use arrow keys to fly! Hold SHIFT to boost
        </p>
      </div>
      {/* Score */}
      <div className={`absolute top-2 right-2 p-2 rounded-md font-bold ${theme === 'dark' ? 'bg-blue-900/40 text-blue-200' : 'bg-amber-100/60 text-amber-800'}`}>
        {score} TENTS
      </div>
      {/* Collectibles */}
      {collectibles.map((item, index) => !item.collected && <motion.div key={index} className={`absolute w-6 h-6 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' : 'bg-amber-500 text-white shadow-lg shadow-amber-500/50'}`} style={{
      left: `${item.x}%`,
      top: `${item.y}%`,
      transform: 'translate(-50%, -50%)'
    }} animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0]
    }} transition={{
      duration: 2,
      repeat: Infinity
    }}>
              <ShieldIcon size={14} />
            </motion.div>)}
      {/* Spacecraft */}
      <motion.div className="absolute w-12 h-12 flex items-center justify-center" style={{
      left: `${position.x}%`,
      top: `${position.y}%`,
      transform: 'translate(-50%, -50%)',
      zIndex: 10
    }} animate={spacecraftControls}>
        <motion.div className={`relative ${theme === 'dark' ? 'text-blue-400' : 'text-amber-600'}`} animate={{
        rotate: [0, 5, -5, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity
      }}>
          <RocketIcon size={32} />
          {/* Boost effect */}
          {showBoost && <motion.div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 ${theme === 'dark' ? 'text-blue-500' : 'text-amber-500'}`} initial={{
          opacity: 1,
          scale: 1
        }} animate={{
          opacity: 0,
          scale: 0.5
        }} transition={{
          duration: 0.5
        }}>
              <ZapIcon size={20} />
            </motion.div>}
        </motion.div>
      </motion.div>
      {/* Floating message */}
      {showMessage && <motion.div className={`absolute text-lg font-bold ${theme === 'dark' ? 'text-green-400' : 'text-emerald-600'}`} style={{
      left: `${position.x}%`,
      top: `${position.y}%`,
      transform: 'translate(-50%, -50%)'
    }} animate={messageControls}>
          {message}
        </motion.div>}
    </div>;
};