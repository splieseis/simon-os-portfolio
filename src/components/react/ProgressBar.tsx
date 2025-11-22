import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full space-y-3">
      <div className="relative w-full bg-black progress-bar-container">
        <div className="absolute inset-0 flex" style={{ zIndex: 1 }}>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className={`flex-1 ${i < 19 ? 'progress-bar-tier-divider' : ''}`}
            />
          ))}
        </div>

        <motion.div 
          className="absolute top-0 left-0 h-full bg-[#39ff14]"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "tween", ease: "linear", duration: 0.3 }}
          style={{ zIndex: 2 }}
        >
          <div className="absolute inset-0 w-full h-full progress-bar-stripes" />
        </motion.div>

        <div className="absolute inset-0 flex pointer-events-none" style={{ zIndex: 3 }}>
          {[...Array(20)].map((_, i) => (
            <div 
              key={`top-${i}`}
              className={`flex-1 ${i < 19 ? 'progress-bar-tier-divider' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between text-[#39ff14] uppercase tracking-wider progress-label">
        <span>LOADING ASSETS...</span>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;