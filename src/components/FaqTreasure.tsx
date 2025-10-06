import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { XCircleIcon } from 'lucide-react';
interface FaqTreasureProps {
  treasureId: string;
  onClose?: () => void;
}
export const FaqTreasure: React.FC<FaqTreasureProps> = ({
  treasureId,
  onClose
}) => {
  const {
    theme
  } = useTheme();
  const faqContent = {
    'what-is-tents': {
      question: 'What is TENTS?',
      answer: "TENTS Finance is a crypto payment gateway that allows merchants to accept payments in 100+ cryptocurrencies across multiple blockchains, with the option to settle in crypto or fiat. It's powered by the NEAR Intents protocol for fast, secure, and reliable transactions.",
      icon: '🌐'
    },
    volatility: {
      question: 'How does TENTS handle volatility in crypto payments?',
      answer: 'Merchants can choose dual settlement: receive crypto directly or convert it instantly into fiat. This ensures no exposure to market volatility unless you want to hold crypto.',
      icon: '📊'
    },
    'wrong-amount': {
      question: 'What happens if a customer sends the wrong amount?',
      answer: 'TENTS includes smart refund logic, if the amount received is insufficient or excessive, the system automatically refunds the payment to the customer, reducing disputes and support overhead.',
      icon: '💸'
    },
    reversible: {
      question: 'Are crypto payments reversible with TENTS?',
      answer: 'No, crypto transactions processed through TENTS are final and irreversible, eliminating the risk of chargebacks that plague traditional payment methods.',
      icon: '🔒'
    },
    settlements: {
      question: 'How fast are settlements?',
      answer: 'Thanks to the NEAR Intents protocol, settlements are instant—funds are delivered to the merchant within seconds.',
      icon: '⚡'
    },
    integration: {
      question: 'How can merchants integrate TENTS into their platforms?',
      answer: 'Integration is simple. TENTS provides an embeddable checkout widget, a REST API, and SDKs for multiple programming languages, making it easy for developers to add crypto payment functionality to websites, apps, or platforms.',
      icon: '🔌'
    }
  };
  const content = treasureId ? faqContent[treasureId as keyof typeof faqContent] : null;
  if (!content) return null;
  return <AnimatePresence>
      <motion.div className="absolute inset-0 backdrop-blur-sm z-10 flex items-center justify-center" style={{
      backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(239,246,255,0.9)'
    }} initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }}>
        <motion.div className={`relative border-4 border-dashed rounded-xl p-6 max-w-md mx-4 ${theme === 'dark' ? 'bg-blue-900/50 border-blue-500' : 'bg-blue-100/50 border-blue-400'}`} initial={{
        scale: 0.8,
        y: 20,
        rotate: -2
      }} animate={{
        scale: 1,
        y: 0,
        rotate: 2
      }} exit={{
        scale: 0.8,
        y: 20
      }}>
          <motion.button className={`absolute top-2 right-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-500'}`} whileHover={{
          scale: 1.2,
          rotate: 90
        }} whileTap={{
          scale: 0.9
        }} onClick={onClose}>
            <XCircleIcon size={24} />
          </motion.button>
          <div className="text-5xl mb-4 text-center">{content.icon}</div>
          <h3 className={`text-xl font-bold mb-2 font-comic ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
            {content.question}
          </h3>
          <p className={`font-comic ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {content.answer}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};