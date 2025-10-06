import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from './ThemeContext';
export const ThemeToggle: React.FC = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <motion.button className="fixed top-4 left-4 p-2 rounded-full z-50 flex items-center justify-center" onClick={toggleTheme} whileHover={{
    scale: 1.1
  }} whileTap={{
    scale: 0.9
  }} style={{
    background: theme === 'dark' ? 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
    boxShadow: theme === 'dark' ? '0 0 15px rgba(37, 99, 235, 0.7)' : '0 0 15px rgba(59, 130, 246, 0.7)'
  }}>
      {theme === 'dark' ? <SunIcon size={24} className="text-white" /> : <MoonIcon size={24} className="text-white" />}
    </motion.button>;
};