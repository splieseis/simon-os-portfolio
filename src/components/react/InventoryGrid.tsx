import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { isBooting, openApp } from '../../store/os-store';
import { getThemeIconPath } from '../../store/theme-store';
import { inventory } from '../../config/inventory';
import * as LucideIcons from 'lucide-react';
import type { InventoryItem } from '../../types';
import type { GithubStats } from '../../utils/github-stats';
import { calculateLevelInfo, formatXpProgress } from '../../utils/leveling';

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

  const levelInfo = githubStats?.totalCommits 
    ? calculateLevelInfo(githubStats.totalCommits)
    : calculateLevelInfo(0);

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
          className="w-full h-screen flex flex-col p-2 sm:p-3 md:p-4 lg:p-6 overflow-hidden"
        >
      <div className="w-full max-w-[1100px] mx-auto flex flex-col h-full min-h-0 gap-2 sm:gap-3 md:gap-4">
        <div className="border-2 sm:border-3 md:border-4 border-neon bg-os-black p-2 sm:p-3 md:p-4 relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-neon/10 via-transparent to-neon/10 pointer-events-none" />
          <div className="relative flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
            <h1 className="font-pixel-header text-neon text-[9px] sm:text-[10px] md:text-xs lg:text-base tracking-wide leading-tight flex-1 min-w-0">
              <span className="break-words">MY PERSONAL PORTFOLIO & WORKSPACE</span>
            </h1>
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 font-pixel-body text-neon text-[8px] sm:text-[9px] md:text-xs lg:text-sm flex-shrink-0">
              <LucideIcons.GitCommit className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-neon" />
              <span className="whitespace-nowrap">{githubStats?.totalCommits ? formatNumber(githubStats.totalCommits) : '0'}</span>
            </div>
          </div>
        </div>

        <div className="border-2 sm:border-3 md:border-4 border-neon bg-os-black p-2 sm:p-3 md:p-4 lg:p-6 overflow-y-auto overflow-x-hidden flex-1 min-h-0">
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

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-4 md:gap-5 lg:gap-6 bg-os-black px-3 py-4 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-7 lg:py-5 border-2 sm:border-3 md:border-4 border-neon relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-neon/5 via-transparent to-neon/5 pointer-events-none" />
          
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full sm:w-auto justify-center sm:justify-start relative z-10">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-neon/20 border-2 sm:border-3 md:border-4 border-neon shadow-neon relative group flex-shrink-0">
              <LucideIcons.GitCommit className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-neon group-hover:text-glow transition-all duration-200" />
              <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-1 md:gap-1.5 min-w-0">
              <div className="flex items-baseline gap-1.5 sm:gap-2 md:gap-3 flex-wrap">
                <span className="font-pixel-body text-neon text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wide text-glow whitespace-nowrap">
                  {githubStats?.totalCommits ? formatNumber(githubStats.totalCommits) : '0'}
                </span>
                <span className="font-pixel-body text-neon/90 text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-wider whitespace-nowrap">
                  COMMITS
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-wrap">
                <span className="font-pixel-body text-neon text-xs sm:text-sm md:text-base lg:text-lg font-bold whitespace-nowrap">
                  LV.{levelInfo.level}
                </span>
                <span className="font-pixel-body text-neon/85 text-[10px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap">
                  {formatXpProgress(levelInfo)}
                </span>
              </div>
              {githubStats?.lastCommit && (
                <span className="font-pixel-body text-neon/75 text-[10px] sm:text-[11px] md:text-xs lg:text-sm whitespace-nowrap">
                  Last: {githubStats.lastCommit.timeAgo}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-3 md:gap-4 lg:gap-5 w-full sm:w-auto flex-wrap relative z-10">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 text-neon hover:text-neon/80 transition-colors duration-200 group flex-shrink-0"
            >
              <img 
                src={getThemeIconPath('github')} 
                alt="GitHub"
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-200 object-contain"
              />
              <span className="font-pixel-body text-[10px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap">GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 text-neon hover:text-neon/80 transition-colors duration-200 group flex-shrink-0"
            >
              <img 
                src={getThemeIconPath('linkedin')} 
                alt="LinkedIn"
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-200 object-contain"
              />
              <span className="font-pixel-body text-[10px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap">LinkedIn</span>
            </a>
            <button
              onClick={() => openApp('about-me')}
              className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 text-neon hover:text-neon/80 transition-colors duration-200 group flex-shrink-0"
            >
              <img 
                src={getThemeIconPath('about-me')} 
                alt="About Me"
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-200 object-contain"
              />
              <span className="font-pixel-body text-[10px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap">About Me</span>
            </button>
            <button
              onClick={() => openApp('contact')}
              className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 text-neon hover:text-neon/80 transition-colors duration-200 group flex-shrink-0"
            >
              <img 
                src={getThemeIconPath('contact')} 
                alt="Contact"
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform duration-200 object-contain"
              />
              <span className="font-pixel-body text-[10px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap">Contact</span>
            </button>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-1.5 md:gap-2.5 w-full sm:w-auto relative z-10">
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-wrap justify-center sm:justify-end">
              <span className="font-pixel-body text-neon/90 text-[10px] sm:text-xs md:text-sm lg:text-base uppercase tracking-wider whitespace-nowrap">
                NEXT LV.{levelInfo.level + 1}
              </span>
              <span className="font-pixel-body text-neon text-xs sm:text-sm md:text-base lg:text-lg font-bold whitespace-nowrap">
                {levelInfo.progressToNextLevel}%
              </span>
            </div>
            <div className="w-full sm:w-28 md:w-36 lg:w-40 xl:w-44 h-2.5 sm:h-3 md:h-3.5 lg:h-4 bg-os-dark border-2 sm:border-3 md:border-4 border-neon relative overflow-hidden shadow-neon">
              <div 
                className="h-full bg-neon relative transition-all duration-500 ease-out"
                style={{ width: `${levelInfo.progressToNextLevel}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-b from-neon/50 to-transparent" />
              </div>
            </div>
            <span className="font-pixel-body text-neon/75 text-[10px] sm:text-[11px] md:text-xs lg:text-sm whitespace-nowrap">
              {formatNumber(levelInfo.nextLevelTotalXp)} XP
            </span>
          </div>
        </div>
      </div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InventoryGrid;
