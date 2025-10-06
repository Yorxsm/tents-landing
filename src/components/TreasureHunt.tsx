import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaqTreasure } from './FaqTreasure';
import { useTheme } from './ThemeContext';
import { ComicPaymentSimulation } from './ComicPaymentSimulation';
import { SearchIcon, LinkIcon } from 'lucide-react';
interface TreasureHuntProps {
  onTreasureFound: (treasureId: string) => void;
}
export const TreasureHunt: React.FC<TreasureHuntProps> = ({
  onTreasureFound
}) => {
  const {
    theme
  } = useTheme();
  const [foundTreasures, setFoundTreasures] = useState<string[]>([]);
  const [showFaq, setShowFaq] = useState(false);
  const [currentTreasureId, setCurrentTreasureId] = useState('');
  const handleTreasureClick = (treasureId: string) => {
    if (!foundTreasures.includes(treasureId)) {
      setFoundTreasures([...foundTreasures, treasureId]);
      setCurrentTreasureId(treasureId);
      setShowFaq(true);
      onTreasureFound(treasureId);
    } else {
      setCurrentTreasureId(treasureId);
      setShowFaq(true);
    }
  };
  const treasureItems = [{
    id: 'what-is-tents',
    title: 'What is TENTS?',
    position: 'top-1/4 left-1/4'
  }, {
    id: 'volatility',
    title: 'Handling Volatility',
    position: 'top-1/3 right-1/4'
  }, {
    id: 'wrong-amount',
    title: 'Wrong Amount?',
    position: 'bottom-1/4 left-1/3'
  }, {
    id: 'reversible',
    title: 'Reversible Payments?',
    position: 'bottom-1/3 right-1/3'
  }, {
    id: 'settlements',
    title: 'Settlement Speed',
    position: 'top-2/3 left-1/2'
  }, {
    id: 'integration',
    title: 'Integration',
    position: 'bottom-1/2 right-1/5'
  }];
  return <div>
      {/* Comic Payment Simulation */}
      <ComicPaymentSimulation />
      <div>
      <motion.div className={`flex items-center justify-center gap-2 mt-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-blue-500'}`} animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }} transition={{
                  repeat: Infinity,
                  duration: 2,
                  repeatType: 'reverse'
                }}>
                    <SearchIcon size={24} />
                    <span className="font-comic">
                      Hint: Click on glowing objects!
                    </span>
        </motion.div>
      </div>
      {/* Treasure Hunt Game */}
      <div className={`relative h-[600px] border-4 border-dashed rounded-2xl overflow-hidden mt-8 ${theme === 'dark' ? 'border-blue-500/30 bg-black/60' : 'border-blue-500/30 bg-blue-50/60'}`}>
        {/* Comic style background elements */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20">
          {[...Array(9)].map((_, i) => <div key={i} className={`border-2 ${theme === 'dark' ? 'border-blue-400' : 'border-blue-400'}`}></div>)}
        </div>
        {/* Comic style dots */}
        {[...Array(40)].map((_, i) => <motion.div key={i} className={`absolute w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-500'}`} initial={{
        x: Math.random() * 100 + '%',
        y: Math.random() * 100 + '%',
        opacity: Math.random() * 0.7 + 0.3
      }} animate={{
        opacity: [0.3, 1, 0.3],
        scale: [1, 1.5, 1]
      }} transition={{
        duration: 2 + Math.random() * 3,
        repeat: Infinity,
        repeatType: 'reverse'
      }} />)}
        {/* Treasure items */}
        {treasureItems.map(treasure => <motion.div key={treasure.id} className={`absolute ${treasure.position} transform -translate-x-1/2 -translate-y-1/2`} whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.95
      }}>
            <motion.div className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg transform rotate-${Math.floor(Math.random() * 6) - 3} ${theme === 'dark' ? 'bg-blue-600 shadow-blue-500/50' : 'bg-blue-600 shadow-blue-500/50'}`} animate={{
          boxShadow: ['0 0 5px 2px #3B82F6', '0 0 15px 5px #3B82F6', '0 0 5px 2px #3B82F6'],
          scale: [1, 1.05, 1],
          rotate: [Math.floor(Math.random() * 6) - 3, Math.floor(Math.random() * 6) - 3, Math.floor(Math.random() * 6) - 3]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse'
        }} onClick={() => handleTreasureClick(treasure.id)}>
              <span className="text-xs text-white font-bold text-center font-comic">
                {foundTreasures.includes(treasure.id) ? '✓' : '?'}
              </span>
            </motion.div>
            <motion.div className={`mt-2 text-xs font-bold text-center font-comic ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`} initial={{
          opacity: 0
        }} animate={{
          opacity: foundTreasures.includes(treasure.id) ? 1 : 0.5
        }}>
              {treasure.title}
            </motion.div>
          </motion.div>)}
        {/* Instructions */}
        <motion.div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center font-comic ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`} initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 1.5
      }}>
          <p>
            Found: {foundTreasures.length}/{treasureItems.length} treasures
          </p>
          {foundTreasures.length === treasureItems.length && <p className="text-green-400 font-bold mt-2">
              Congratulations! You've found all treasures!
            </p>}
        </motion.div>
        {/* FAQ Content (hidden until treasure clicked) */}
        {showFaq && <FaqTreasure treasureId={currentTreasureId} onClose={() => setShowFaq(false)} />}
      </div>
    </div>;
};