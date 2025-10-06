import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
export const AnimatedLogo: React.FC = () => {
  const {
    theme
  } = useTheme();
  return <motion.div className="flex justify-center" initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    type: 'spring',
    stiffness: 100,
    duration: 0.8
  }}>
      <motion.div whileHover={{
      scale: 1.05,
      rotate: [-2, 2, -2],
      transition: {
        duration: 0.5,
        repeat: Infinity
      }
    }} className="relative">
        <motion.img src={theme === 'dark' ? "/bents.png" : "/tents.png"} alt="TENTS Logo" className="h-24 w-auto" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.3,
        duration: 0.5
      }} />
        {/* Logo glow effect */}
        <motion.div className="absolute inset-0 z-[-1]" style={{
        filter: `blur(10px)`,
        background: 'rgba(59, 130, 246, 0.3)',
        borderRadius: '50%'
      }} animate={{
        opacity: [0.3, 0.7, 0.3]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse'
      }} />
      </motion.div>
    </motion.div>;
};