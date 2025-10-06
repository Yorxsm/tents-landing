import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { LinkIcon, ExternalLinkIcon, LoaderIcon } from 'lucide-react';
interface LinkPreviewProps {
  url: string;
}
export const LinkPreview: React.FC<LinkPreviewProps> = ({
  url
}) => {
  const {
    theme
  } = useTheme();
  const [loading, setLoading] = useState(true);
  const [previewData, setPreviewData] = useState<{
    title: string;
    description: string;
    image: string;
    url: string;
  } | null>(null);
  useEffect(() => {
    // Simulate loading preview data
    setLoading(true);
    // This is a mock implementation since we can't actually fetch metadata from external URLs
    // In a real implementation, you would use a backend service to fetch the metadata
    setTimeout(() => {
      setPreviewData({
        title: 'TENTS - Transparent Exchange & Network Transaction System',
        description: 'A crypto payment gateway that allows merchants to accept payments in 100+ cryptocurrencies across multiple blockchains, with the option to settle in crypto or fiat.',
        image: theme === 'dark' ? "/bents.png" : "/tents.png",
        url: url || 'https://tents.finance'
      });
      setLoading(false);
    }, 1500);
  }, [url, theme]);
  if (loading) {
    return <motion.div className={`w-full rounded-xl p-4 flex items-center justify-center ${theme === 'dark' ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-100/50 border border-blue-200'}`} initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        <LoaderIcon className={`animate-spin ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} size={24} />
        <span className={`ml-2 font-comic ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
          Loading preview...
        </span>
      </motion.div>;
  }
  if (!previewData) {
    return <motion.div className={`w-full rounded-xl p-4 ${theme === 'dark' ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-100/50 border border-blue-200'}`} initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        <div className="flex items-center">
          <LinkIcon className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} size={18} />
          <span className={`ml-2 font-comic ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
            Unable to load preview
          </span>
        </div>
        <div className={`text-sm mt-1 ${theme === 'dark' ? 'text-blue-200' : 'text-blue-600'}`}>
          {url}
        </div>
      </motion.div>;
  }
  return <motion.div className={`w-full rounded-xl overflow-hidden border ${theme === 'dark' ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`} initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} whileHover={{
    scale: 1.01
  }} transition={{
    duration: 0.2
  }}>
      <a href={previewData.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative h-40 overflow-hidden">
          <motion.img src={previewData.image} alt={previewData.title} className="w-full h-full object-cover" initial={{
          scale: 1.1
        }} animate={{
          scale: 1
        }} transition={{
          duration: 0.5
        }} />
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-t from-blue-900/80 to-transparent' : 'bg-gradient-to-t from-blue-100/80 to-transparent'}`} />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className={`font-bold text-lg font-comic ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
              {previewData.title}
            </h3>
            <ExternalLinkIcon size={16} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} />
          </div>
          <p className={`mt-2 text-sm font-comic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {previewData.description}
          </p>
          <div className={`mt-3 text-xs flex items-center ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            <LinkIcon size={12} />
            <span className="ml-1 truncate">{previewData.url}</span>
          </div>
        </div>
      </a>
    </motion.div>;
};