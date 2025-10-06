import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
interface CountdownProps {
  targetDate: string;
}
export const Countdown: React.FC<CountdownProps> = ({
  targetDate
}) => {
  const {
    theme
  } = useTheme();
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(difference / (1000 * 60 * 60) % 24),
      minutes: Math.floor(difference / 1000 / 60 % 60),
      seconds: Math.floor(difference / 1000 % 60)
    };
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  const timeUnits = [{
    label: 'DAYS',
    value: timeLeft.days
  }, {
    label: 'HOURS',
    value: timeLeft.hours
  }, {
    label: 'MINUTES',
    value: timeLeft.minutes
  }, {
    label: 'SECONDS',
    value: timeLeft.seconds
  }];
  return <div className="flex flex-wrap justify-center gap-4">
      {timeUnits.map((unit, index) => <motion.div key={unit.label} className={`backdrop-blur-sm border-4 rounded-xl p-4 w-36 text-center transform rotate-${Math.floor(Math.random() * 3) - 1} ${theme === 'dark' ? 'bg-blue-900/50 border-blue-500 border-dashed' : 'bg-blue-100/50 border-blue-400 border-dashed'}`} initial={{
      y: 20,
      opacity: 0,
      rotate: Math.random() * 6 - 3
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.1 * index,
      duration: 0.5
    }} whileHover={{
      scale: 1.1,
      rotate: Math.random() * 6 - 3,
      backgroundColor: theme === 'dark' ? 'rgba(30, 64, 175, 0.6)' : 'rgba(37, 99, 235, 0.2)'
    }}>
          <motion.div className={`text-5xl font-bold font-comic ${theme === 'dark' ? 'text-white' : 'text-blue-600'}`} animate={{
        scale: unit.label === 'SECONDS' ? [1, 1.05, 1] : 1
      }} transition={{
        repeat: unit.label === 'SECONDS' ? Infinity : 0,
        duration: 1
      }}>
            {String(unit.value).padStart(2, '0')}
          </motion.div>
          <div className={`text-sm mt-1 font-comic ${theme === 'dark' ? 'text-blue-300' : 'text-blue-500'}`}>
            {unit.label}
          </div>
        </motion.div>)}
    </div>;
};