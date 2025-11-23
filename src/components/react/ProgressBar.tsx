import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full space-y-2 sm:space-y-3">
      <div className="relative w-full bg-black progress-bar-container">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-neon z-[2]"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "tween", ease: "linear", duration: 0.3 }}
        >
          <div className="absolute inset-0 w-full h-full progress-bar-stripes" />
        </motion.div>
      </div>

      <div className="flex justify-between text-neon uppercase tracking-wider progress-label">
        <span className="text-[11px] sm:text-sm md:text-base">LOADING ASSETS...</span>
        <span className="text-[11px] sm:text-sm md:text-base">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;