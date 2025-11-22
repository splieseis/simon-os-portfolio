import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { setBootStatus } from '../../store/os-store';
import { ProgressBar } from './ProgressBar';

const BOOT_LOGS = [
  "Booting SimonOS Kernel...",
  "Initializing Astro Shell...",
  "Loading React Components...",
  "Mounting Nano Stores State...",
  "Scanning Cartridge Shelf...",
  "Launching Window Manager...",
  "Establishing Satellite iFrame Connection...",
  "System Ready. Welcome to SimonOS."
];

export const BootSequence = () => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const hasBooted = useRef(false);

  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    let currentProgress = 0;
    let logIndex = 0;

    const interval = setInterval(() => {
      const jump = Math.random() * 8;
      currentProgress = Math.min(currentProgress + jump, 100);
      setProgress(currentProgress);

      const thresholdIndex = Math.floor((currentProgress / 100) * (BOOT_LOGS.length - 1));
      if (thresholdIndex > logIndex) {
        setLogs(prev => [...prev, BOOT_LOGS[logIndex]]);
        logIndex++;
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setLogs(BOOT_LOGS);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setBootStatus(false), 1000);
        }, 2000);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-black text-[#39ff14] z-[9999] flex items-center justify-center h-screen w-screen overflow-hidden boot-container"
        >
          <div className="absolute inset-0 pointer-events-none crt-frame" />
          <div className="absolute inset-0 z-50 crt-overlay opacity-20 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none boot-glow" />
          
          <div className="relative z-40 w-[80%] max-w-6xl p-12 flex flex-col items-center justify-center gap-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center w-full"
            >
               <h1 className="simonos-logo">
                 SimonOS
               </h1>
            </motion.div> 

            <ProgressBar progress={progress} />

            <div className="w-full flex flex-col gap-1.5 font-pixel-body text-sm text-[#39ff14] leading-relaxed">
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2 boot-log-text"
                >
                  <span className="text-[#39ff14] flex-shrink-0">{">"}</span>
                  <span>{log}</span>
                </motion.div>
              ))}
              <div className="flex items-start gap-2 mt-0.5">
                <span className="text-[#39ff14] flex-shrink-0">{">"}</span>
                <motion.span 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2.5 h-5 bg-[#39ff14] inline-block boot-cursor"
                />
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;