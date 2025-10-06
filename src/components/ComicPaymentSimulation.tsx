import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { WalletIcon, ShoppingCartIcon, CreditCardIcon, CheckCircleIcon, ArrowRightIcon } from 'lucide-react';
export const ComicPaymentSimulation: React.FC = () => {
  const {
    theme
  } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [{
    title: 'PROBLEM: Crypto Payment Struggle',
    description: 'CZ wants to buy a cool gadget but only has crypto in his wallet!',
    speechBubble: 'I only have crypto! How can I pay for this awesome gadget?',
    characterPosition: 'left'
  }, {
    title: 'TRADITIONAL SOLUTION: Slow & Complex',
    description: 'The old way requires multiple steps and takes days to complete',
    speechBubble: "I have to transfer to an exchange, convert to fiat, withdraw to my bank, then pay? That'll take eternity!",
    characterPosition: 'left'
  }, {
    title: 'TENTS SOLUTION: Quick & Easy',
    description: 'With TENTS, CZ can pay directly with his crypto wallet',
    speechBubble: 'Wow! I can just copy wallet address and pay with Near intents directly!',
    characterPosition: 'left'
  }, {
    title: 'INSTANT SETTLEMENT',
    description: 'The merchant receives payment instantly - in crypto or fiat',
    speechBubble: 'Payment confirmed! Thanks for shopping with US!',
    characterPosition: 'right'
  }];
  const currentStepData = steps[currentStep];
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0); // Loop back to the beginning
    }
  };
  return <motion.div className={`border-4 border-dashed rounded-2xl p-6 overflow-hidden ${theme === 'dark' ? 'border-blue-500 bg-black/60' : 'border-blue-500 bg-blue-50/60'}`} initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }}>
      {/* Comic Header */}
      <motion.div className={`text-center mb-6 font-comic ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`} initial={{
      y: -20
    }} animate={{
      y: 0
    }} transition={{
      type: 'spring',
      stiffness: 300
    }}>
        <h2 className="text-2xl font-bold">HOW TENTS WORKS</h2>
        <p className="text-sm">A comic adventure in crypto payments!</p>
      </motion.div>
      {/* Comic Strip */}
      <div className="relative">
        {/* Comic Panel */}
        <motion.div className={`relative border-4 p-4 rounded-xl min-h-[300px] ${theme === 'dark' ? 'border-blue-500 bg-blue-900/30' : 'border-blue-500 bg-blue-100/30'}`} initial={{
        scale: 0.9,
        rotate: -2
      }} animate={{
        scale: 1,
        rotate: currentStep % 2 === 0 ? 1 : -1
      }} transition={{
        type: 'spring',
        stiffness: 100
      }}>
          {/* Step Title */}
          <motion.div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full font-bold ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`} initial={{
          y: -10
        }} animate={{
          y: 0
        }} key={`title-${currentStep}`}>
            {currentStepData.title}
          </motion.div>
          {/* Comic Scene */}
          <div className="flex items-center justify-between mt-6 px-4">
            {/* Left Character */}
            <motion.div className={`w-1/3 ${currentStepData.characterPosition === 'left' ? 'order-1' : 'order-3'}`} animate={{
            x: currentStepData.characterPosition === 'left' ? [0, 5, 0] : 0,
            scale: currentStepData.characterPosition === 'left' ? [1, 1.05, 1] : 0.9
          }} transition={{
            duration: 2,
            repeat: Infinity
          }}>
              <motion.div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'}`} animate={{
              rotate: [0, 5, -5, 0]
            }} transition={{
              duration: 5,
              repeat: Infinity
            }}>
                <motion.div animate={{
                scale: [1, 1.1, 1]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }}>
                  {currentStep === 3 ? <CheckCircleIcon size={48} /> : <WalletIcon size={48} />}
                </motion.div>
              </motion.div>
              <p className="text-center mt-2 font-comic">CZ</p>
            </motion.div>
            {/* Middle Action */}
            <motion.div className="w-1/3 flex flex-col items-center order-2" animate={{
            y: [0, -5, 0]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }}>
              {currentStep < 3 ? <motion.div className={`w-16 h-16 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`} animate={{
              rotate: 360,
              transition: {
                duration: 10,
                repeat: Infinity,
                ease: 'linear'
              }
            }}>
                  <ArrowRightIcon size={32} />
                </motion.div> : <motion.div className={`text-5xl`} animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }}>
                  🚀
                </motion.div>}
            </motion.div>
            {/* Right Character - Store/Merchant */}
            <motion.div className={`w-1/3 ${currentStepData.characterPosition === 'right' ? 'order-1' : 'order-3'}`} animate={{
            x: currentStepData.characterPosition === 'right' ? [0, -5, 0] : 0,
            scale: currentStepData.characterPosition === 'right' ? [1, 1.05, 1] : 0.9
          }} transition={{
            duration: 2,
            repeat: Infinity
          }}>
              <motion.div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-purple-700 text-white' : 'bg-blue-700 text-white'}`} animate={{
              rotate: [0, -5, 5, 0]
            }} transition={{
              duration: 5,
              repeat: Infinity
            }}>
                <motion.div animate={{
                scale: [1, 1.1, 1]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }}>
                  <ShoppingCartIcon size={48} />
                </motion.div>
              </motion.div>
              <p className="text-center mt-2 font-comic">Store</p>
            </motion.div>
          </div>
          {/* Speech Bubble */}
          <motion.div className={`relative mt-8 mx-auto max-w-md p-4 rounded-xl ${theme === 'dark' ? 'bg-white text-black' : 'bg-white text-black'}`} style={{
          borderRadius: '18px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} key={`speech-${currentStep}`} transition={{
          delay: 0.3
        }}>
            {/* Speech bubble pointer */}
            <div className="absolute w-6 h-6 bg-white transform rotate-45" style={{
            top: currentStepData.characterPosition === 'left' ? '-12px' : '-12px',
            left: currentStepData.characterPosition === 'left' ? '15%' : '85%',
            marginLeft: '-12px'
          }}></div>
            <p className="relative z-10 font-comic text-center">
              {currentStepData.speechBubble}
            </p>
          </motion.div>
          {/* Description */}
          <motion.p className={`text-center mt-8 font-comic ${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`} initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} key={`desc-${currentStep}`} transition={{
          delay: 0.5
        }}>
            {currentStepData.description}
          </motion.p>
        </motion.div>
        {/* Next Button */}
        <motion.button className={`absolute -bottom-5 right-4 px-6 py-3 rounded-full font-bold font-comic flex items-center gap-2 ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`} whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={nextStep}>
          {currentStep < steps.length - 1 ? 'Next' : 'Restart'}
          <ArrowRightIcon size={16} />
        </motion.button>
        {/* Step Indicator */}
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          {steps.map((_, index) => <motion.div key={index} className={`w-3 h-3 rounded-full ${index === currentStep ? theme === 'dark' ? 'bg-blue-500' : 'bg-blue-500' : theme === 'dark' ? 'bg-blue-900' : 'bg-blue-200'}`} animate={{
          scale: index === currentStep ? [1, 1.3, 1] : 1
        }} transition={{
          duration: 1,
          repeat: index === currentStep ? Infinity : 0
        }} onClick={() => setCurrentStep(index)} style={{
          cursor: 'pointer'
        }} />)}
        </div>
      </div>
    </motion.div>;
};