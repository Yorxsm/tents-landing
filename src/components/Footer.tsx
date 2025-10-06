import React from 'react';
import { motion } from 'framer-motion';
import { Unplug, SparklesIcon } from 'lucide-react';
import { useTheme } from './ThemeContext';
export const Footer: React.FC = () => {
  const {
    theme
  } = useTheme();
  return <motion.footer className={`mt-20 py-8 px-4 ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-100/50'} backdrop-blur-sm`} initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          {/* Connect with us */}
          <motion.a href="https://x.com/tentsfi" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-6 py-3 rounded-full mb-6 font-comic font-bold ${theme === 'dark' ? 'bg-blue-800 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <Unplug size={18} />
            Connect with us on X @tentsfi
          </motion.a>
          {/* Cryptic message */}
          <motion.div className={`max-w-lg text-center font-comic ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`} initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.3
        }}>
            <div className="flex justify-center mb-4">
              <SparklesIcon className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} mr-2`} size={18} />
              <h3 className="font-bangers tracking-wider text-lg">
                THE HIDDEN PATH TO CLARITY
              </h3>
              <SparklesIcon className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} ml-2`} size={18} />
            </div>
            <p className="mb-4">
              Seek wisdom in the digital realm where the bird of blue once flew.
              Cast your questions into the void with{' '}
              <span className="font-bold">@tentsfi</span> as your beacon.
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} italic`}>
              Those who ask shall find answers in the stream of time. The
              keepers of the gateway await your call.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>;
};