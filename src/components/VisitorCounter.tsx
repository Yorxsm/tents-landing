import React from 'react';
import { motion } from 'framer-motion';
import { UsersIcon } from 'lucide-react';
import { useTheme } from './ThemeContext';
interface VisitorCounterProps {
  count: number;
}
export const VisitorCounter: React.FC<VisitorCounterProps> = ({
  count
}) => {
  const {
    theme
  } = useTheme();
  return <motion.div className={`fixed top-4 right-4 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 ${theme === 'dark' ? 'bg-blue-800/70' : 'bg-blue-600/70'}`} initial={{
    x: 100,
    opacity: 0
  }} animate={{
    x: 0,
    opacity: 1
  }} transition={{
    delay: 1,
    duration: 0.5
  }} whileHover={{
    scale: 1.05
  }}>
      <UsersIcon size={16} className={theme === 'dark' ? 'text-blue-300' : 'text-blue-100'} />
      <span className="text-white font-bold">{count}</span>
      <span className={theme === 'dark' ? 'text-blue-300 text-sm' : 'text-blue-100 text-sm'}>
        explorers
      </span>
    </motion.div>;
};