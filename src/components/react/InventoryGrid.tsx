import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { isBooting, openApp } from '../../store/os-store';
import { getThemeIconPath } from '../../store/theme-store';
import { inventory } from '../../config/inventory';
import * as LucideIcons from 'lucide-react';
import type { InventoryItem } from '../../types';
import type { GithubStats } from '../../utils/github-stats';

const TOTAL_SLOTS = 48;

interface InventoryGridProps {
  githubStats?: GithubStats;
}

export const InventoryGrid: React.FC<InventoryGridProps> = ({ githubStats: initialStats }) => {
  const booting = useStore(isBooting);
  const [githubStats, setGithubStats] = useState<GithubStats | undefined>(initialStats);
  
  useEffect(() => {
    const fetchFreshStats = async () => {
      try {
        const response = await fetch('/api/github-stats');
        if (response.ok) {
          const freshStats = await response.json();
          setGithubStats(freshStats);
        }
      } catch (error) {
        // Keep using initial stats on error
      }
    };

    const timer = setTimeout(fetchFreshStats, 1000);
    return () => clearTimeout(timer);
  }, [initialStats]);
  
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };
  
  const COMMIT_GOAL = 2000;
  const progressPercentage = githubStats?.totalCommits 
    ? Math.min(100, Math.round((githubStats.totalCommits / COMMIT_GOAL) * 100))
    : 0;

  const handleItemClick = (itemId: string, link?: string) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      openApp(itemId);
    }
  };

  const allSlots = [
    ...inventory,
    ...Array(Math.max(0, TOTAL_SLOTS - inventory.length)).fill(null)
  ];

  return (
    <AnimatePresence>
      {!booting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full h-screen flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden"
        >
      <div className="w-full max-w-[1100px] flex flex-col gap-2 sm:gap-3 md:gap-4">
        <div className="border-2 sm:border-3 md:border-4 border-neon bg-os-black p-2 sm:p-3 md:p-4 relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-neon/10 via-transparent to-neon/10 pointer-events-none" />
          <div className="relative flex items-center justify-between gap-2 sm:gap-4">
            <h1 className="font-pixel-header text-neon text-[10px] sm:text-xs md:text-base tracking-wide leading-tight">
              MY PERSONAL PORTFOLIO & WORKSPACE
            </h1>
            <div className="flex items-center gap-1 sm:gap-2 font-pixel-body text-neon text-[8px] sm:text-xs md:text-sm flex-shrink-0">
              <span className="text-sm sm:text-base md:text-lg">◆</span>
              <span className="whitespace-nowrap">COMMITS: {githubStats?.totalCommits ? formatNumber(githubStats.totalCommits) : '0'}</span>
            </div>
          </div>
        </div>

        <div className="border-2 sm:border-3 md:border-4 border-neon bg-os-black p-3 sm:p-4 md:p-6 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-240px)] md:max-h-[calc(100vh-280px)]">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {allSlots.map((item, index) => {
              const isEmpty = item === null;
              
              if (isEmpty) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="aspect-square flex flex-col items-center justify-center bg-os-dark border border-neutral-900/50 relative overflow-hidden min-h-0"
                  >
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                      <div className="w-full h-full inventory-grid-pattern" />
                    </div>
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 border border-neutral-800/30 rounded" />
                  </div>
                );
              }

              const themeIconPath = getThemeIconPath(item.icon);
              const isImageIcon = themeIconPath && (themeIconPath.startsWith('/') || /\.(webp|png|jpg|jpeg|svg|gif)$/i.test(themeIconPath));
              const IconComponent = !isImageIcon && themeIconPath 
                ? (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[themeIconPath] || LucideIcons.Circle
                : null;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id, item.link)}
                  className="group aspect-square flex flex-col items-center justify-center gap-0.5 sm:gap-1 bg-os-dark border border-neon cursor-pointer transition-all duration-200 hover:bg-neon/20 hover:scale-105 hover:shadow-neon relative overflow-hidden p-0.5 sm:p-1 min-h-0"
                >
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="w-full h-full inventory-grid-pattern" />
                  </div>

                  <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center flex-shrink-0">
                    {isImageIcon ? (
                      <img 
                        src={themeIconPath} 
                        alt={`${item.title} icon`}
                        className="w-full h-full object-contain"
                      />
                    ) : IconComponent ? (
                      <IconComponent className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-neon group-hover:text-neon transition-colors duration-200" />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-neon/20 group-hover:bg-neon/40 transition-colors duration-200" />
                    )}
                  </div>

                  <div className="relative z-10 text-center px-0.5 w-full">
                    <h3 className="font-pixel-body text-neon text-xs sm:text-sm md:text-base group-hover:text-glow transition-all duration-200 line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <div className="absolute top-0 left-0 w-1 h-1 sm:w-1.5 sm:h-1.5 border-t border-l border-neon opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute top-0 right-0 w-1 h-1 sm:w-1.5 sm:h-1.5 border-t border-r border-neon opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute bottom-0 left-0 w-1 h-1 sm:w-1.5 sm:h-1.5 border-b border-l border-neon opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute bottom-0 right-0 w-1 h-1 sm:w-1.5 sm:h-1.5 border-b border-r border-neon opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-8 bg-os-black px-3 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 border-2 sm:border-3 md:border-4 border-neon">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex flex-col gap-0.5">
              <span className="font-pixel-body text-neon text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider">
                LAST COMMIT
              </span>
              <span className="font-pixel-body text-neon/70 text-[8px] sm:text-[9px] md:text-[10px]">
                {githubStats?.lastCommit 
                  ? `LAST COMMIT: ${githubStats.lastCommit.timeAgo}`
                  : 'LAST COMMIT: N/A'
                }
              </span>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center bg-neon/20 border border-neon sm:border-2">
              <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 bg-neon/40" />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto justify-center flex-wrap">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 text-neon hover:text-neon/80 transition-colors duration-200 group"
            >
              <img 
                src={getThemeIconPath('github')} 
                alt="GitHub"
                className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-[22px] md:h-[22px] group-hover:scale-110 transition-transform duration-200 object-contain"
              />
              <span className="font-pixel-body text-[10px] sm:text-xs md:text-sm">GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 text-neon hover:text-neon/80 transition-colors duration-200 group"
            >
              <img 
                src={getThemeIconPath('linkedin')} 
                alt="LinkedIn"
                className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-[22px] md:h-[22px] group-hover:scale-110 transition-transform duration-200 object-contain"
              />
              <span className="font-pixel-body text-[10px] sm:text-xs md:text-sm">LinkedIn</span>
            </a>
            <button
              onClick={() => openApp('about-me')}
              className="flex items-center gap-1 sm:gap-2 text-neon hover:text-neon/80 transition-colors duration-200 group"
            >
              <img 
                src={getThemeIconPath('about-me')} 
                alt="About Me"
                className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-[22px] md:h-[22px] group-hover:scale-110 transition-transform duration-200 object-contain"
              />
              <span className="font-pixel-body text-[10px] sm:text-xs md:text-sm">About Me</span>
            </button>
            <button
              onClick={() => openApp('contact')}
              className="flex items-center gap-1 sm:gap-2 text-neon hover:text-neon/80 transition-colors duration-200 group"
            >
              <img 
                src={getThemeIconPath('contact')} 
                alt="Contact"
                className="w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-[22px] md:h-[22px] group-hover:scale-110 transition-transform duration-200 object-contain"
              />
              <span className="font-pixel-body text-[10px] sm:text-xs md:text-sm">Contact</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end">
            <span className="font-pixel-body text-neon text-[10px] sm:text-xs md:text-sm uppercase tracking-wide whitespace-nowrap">
              COMMITS: {githubStats?.totalCommits ? formatNumber(githubStats.totalCommits) : '0'}
            </span>
            <div className="w-24 sm:w-28 md:w-36 h-2.5 sm:h-3 bg-os-dark border border-neon sm:border-2 relative overflow-hidden">
              <div 
                className="h-full bg-neon relative transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InventoryGrid;
