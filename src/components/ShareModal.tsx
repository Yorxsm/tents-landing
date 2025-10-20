import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { XIcon, TwitterIcon } from 'lucide-react';
import { useTheme } from './ThemeContext';
interface ShareModalProps {
  treasureId: string;
  onClose: () => void;
}
export const ShareModal: React.FC<ShareModalProps> = ({
  treasureId,
  onClose
}) => {
  const {
    theme
  } = useTheme();
  const treasureMessages = {
    'what-is-tents': 'I just discovered what TENTS is! A crypto payment gateway powered by NEAR Intents. Join the countdown at',
    volatility: 'Did you know TENTS solves crypto volatility for merchants? I just found this treasure! Check out',
    'wrong-amount': 'TENTS has smart refund logic for wrong payment amounts! Just discovered this at',
    reversible: 'No more chargebacks! TENTS crypto payments are irreversible. Join the hunt at',
    settlements: 'TENTS settlements are instant thanks to NEAR Intents! Found this treasure at',
    integration: 'For merchants TENTS is super easy to integrate with widgets, APIs and SDKs! Join the countdown at'
  };
  const message = treasureMessages[treasureId as keyof typeof treasureMessages] || 'I just found a treasure on the TENTS countdown page! Check it out at tents.finance';
  const shareUrl = window.location.href;
  const shareText = `${message} ${shareUrl} #TENTS #NEAR #Crypto`;
  const handleShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };
  return <motion.div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4" style={{
    backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(239,246,255,0.8)'
  }} initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }}>
      <motion.div className={`border-2 rounded-xl p-6 max-w-md relative ${theme === 'dark' ? 'bg-gradient-to-b from-blue-900 to-black border-blue-400' : 'bg-gradient-to-b from-blue-200 to-blue-50 border-blue-400'}`} initial={{
      scale: 0.8,
      y: 20
    }} animate={{
      scale: 1,
      y: 0
    }} exit={{
      scale: 0.8,
      y: 20
    }}>
        <button onClick={onClose} className={`absolute top-2 right-2 ${theme === 'dark' ? 'text-blue-300 hover:text-white' : 'text-blue-500 hover:text-blue-700'}`}>
          <XIcon size={20} />
        </button>
        <div className="text-center">
          <motion.div className="text-5xl mb-4" animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }} transition={{
          duration: 1,
          repeat: 3,
          repeatType: 'reverse'
        }}>
            🎉
          </motion.div>
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
            Treasure Found!
          </h2>
          <motion.div className={`py-6 px-4 rounded-lg mb-6 border ${theme === 'dark' ? 'bg-blue-900/30 border-blue-500/50' : 'bg-blue-100/30 border-blue-300/50'}`} initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.3
        }}>
            <p className={theme === 'dark' ? 'text-white' : 'text-gray-700'}>
              {message}
            </p>
          </motion.div>
          <motion.button className="bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 w-full" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={handleShare}>
            <TwitterIcon size={20} />
            Share on X
          </motion.button>
          <p className={`text-sm mt-4 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
            Keep exploring!
          </p>
        </div>
      </motion.div>
    </motion.div>;
};