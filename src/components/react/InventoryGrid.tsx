import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { isBooting, openApp, activeGroup, activeCategoryTab, setActiveGroup, setActiveCategoryTab, closeCategoryTab } from '../../store/os-store';
import { getThemeIconPath } from '../../store/theme-store';
import { githubStats, isLoadingGithubStats } from '../../store/github-stats-store';
import { inventory } from '../../config/inventory';
import { groups, tabConfig } from '../../config/groups';
import type { InventoryItem, ItemAction } from '../../types';
import * as LucideIcons from 'lucide-react';
import { calculateLevelInfo, formatXpProgress } from '../../utils/leveling';
import { MusicPlayer } from './MusicPlayer';

const TOTAL_SLOTS = 48;

export const InventoryGrid: React.FC = () => {
  const booting = useStore(isBooting);
  const stats = useStore(githubStats);
  const isLoading = useStore(isLoadingGithubStats);
  const currentGroup = useStore(activeGroup);
  const currentCategoryTab = useStore(activeCategoryTab);
  
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const levelInfo = stats?.totalCommits 
    ? calculateLevelInfo(stats.totalCommits)
    : calculateLevelInfo(0);

  const filteredItems = useMemo(() => {
    let items = inventory;

    if (currentCategoryTab) {
      items = items.filter(item => item.categoryId === currentCategoryTab);
    }

    if (currentGroup) {
      items = items.filter(item => {
        if (!item.group) return true;
        if (typeof item.group === 'string') {
          return item.group === currentGroup;
        }
        return item.group.includes(currentGroup);
      });
    }

    if (!currentCategoryTab) {
      return items;
    }

    return items.filter(item => !item.category);
  }, [currentGroup, currentCategoryTab]);

  const currentCategoryItem = useMemo(() => {
    if (!currentCategoryTab) return null;
    return inventory.find(item => item.category === currentCategoryTab);
  }, [currentCategoryTab]);

  const handleItemClick = (item: InventoryItem) => {
    if (item.category) {
      setActiveCategoryTab(item.category);
      return;
    }

    const action: ItemAction = item.action || (item.componentKey ? 'component' : item.link ? 'link' : 'component');
    
    if (action === 'link' && item.link) {
      window.open(item.link, '_blank');
    } else {
      openApp(item.id);
    }
  };

  const handleGroupClick = (groupId: string | null) => {
    setActiveGroup(groupId);
    if (currentCategoryTab) {
      closeCategoryTab();
    }
  };

  const handleCategoryTabClick = (categoryId: string | null) => {
    setActiveCategoryTab(categoryId);
  };

  const allSlots = [
    ...filteredItems,
    ...Array(Math.max(0, TOTAL_SLOTS - filteredItems.length)).fill(null)
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
      <div className="w-full max-w-[1100px] mx-auto flex flex-col h-full min-h-0 relative">
        <div className="border-2 sm:border-3 md:border-4 border-neon bg-os-black p-2 sm:p-3 md:p-4 relative flex-shrink-0 mb-2 sm:mb-3 md:mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-neon/10 via-transparent to-neon/10 pointer-events-none" />
          <div className="relative flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
            <h1 className="font-pixel-header text-neon text-[9px] sm:text-[10px] md:text-xs lg:text-base tracking-wide leading-tight flex-1 min-w-0">
              <span className="break-words">MY PERSONAL PORTFOLIO & WORKSPACE</span>
            </h1>
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 font-pixel-body text-neon text-[8px] sm:text-[9px] md:text-xs lg:text-sm flex-shrink-0">
              <MusicPlayer />
              <LucideIcons.GitCommit className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-neon" />
              {isLoading ? (
                <span className="whitespace-nowrap animate-pulse">Loading...</span>
              ) : (
                <span className="whitespace-nowrap">{stats?.totalCommits ? formatNumber(stats.totalCommits) : '0'}</span>
              )}
            </div>
          </div>
        </div>

        {tabConfig.style === 'silicon-chip' ? (
          <div className="flex items-end gap-2 overflow-x-auto flex-shrink-0 relative -mb-[2px] sm:-mb-[3px] md:-mb-[4px]">
            <button
              onClick={() => handleGroupClick(null)}
              className={`relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 font-pixel-body text-xs sm:text-sm md:text-base transition-all duration-200 whitespace-nowrap z-10 tab-chip ${
                currentGroup === null
                  ? 'tab-chip-active text-neon'
                  : 'tab-chip-inactive text-neon/70 hover:text-neon'
              }`}
            >
              <span className="relative z-10">All</span>
            </button>
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => handleGroupClick(group.id)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 font-pixel-body text-xs sm:text-sm md:text-base transition-all duration-200 whitespace-nowrap z-10 tab-chip ${
                  currentGroup === group.id
                    ? 'tab-chip-active text-neon'
                    : 'tab-chip-inactive text-neon/70 hover:text-neon'
                }`}
              >
                <span className="relative z-10">{group.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-end gap-0 overflow-x-auto flex-shrink-0 relative">
            <div className="flex items-end gap-0">
              <button
                onClick={() => handleGroupClick(null)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 font-pixel-body text-xs sm:text-sm md:text-base transition-all duration-200 whitespace-nowrap z-10 tab-shape-first ${
                  currentGroup === null
                    ? 'bg-os-black text-neon border-t-2 border-l-2 border-r-2 border-neon border-b-0 shadow-neon -mb-[2px] sm:-mb-[3px] md:-mb-[4px]'
                    : 'bg-os-dark text-neon/70 border-t-2 border-l-2 border-r-2 border-neon/50 border-b-2 hover:text-neon hover:border-neon mb-0'
                }`}
              >
                <span className="relative z-10">All</span>
                {currentGroup === null && (
                  <div className="absolute inset-0 bg-gradient-to-b from-neon/10 to-transparent pointer-events-none" />
                )}
              </button>
              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => handleGroupClick(group.id)}
                  className={`relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 font-pixel-body text-xs sm:text-sm md:text-base transition-all duration-200 whitespace-nowrap z-10 tab-shape-middle ${
                    currentGroup === group.id
                      ? 'bg-os-black text-neon border-t-2 border-l-2 border-r-2 border-neon border-b-0 shadow-neon -mb-[2px] sm:-mb-[3px] md:-mb-[4px]'
                      : 'bg-os-dark text-neon/70 border-t-2 border-l-2 border-r-2 border-neon/50 border-b-2 hover:text-neon hover:border-neon mb-0'
                  }`}
                >
                  <span className="relative z-10">{group.label}</span>
                  {currentGroup === group.id && (
                    <div className="absolute inset-0 bg-gradient-to-b from-neon/10 to-transparent pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentCategoryTab && currentCategoryItem && (
          <div className={`flex items-end ${tabConfig.style === 'silicon-chip' ? 'gap-2' : 'gap-0'} overflow-x-auto flex-shrink-0 relative mt-2 -mb-[2px] sm:-mb-[3px] md:-mb-[4px]`}>
            {tabConfig.style === 'silicon-chip' ? (
              <>
                <button
                  onClick={() => handleCategoryTabClick(null)}
                  className="relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 font-pixel-body text-xs sm:text-sm md:text-base transition-all duration-200 whitespace-nowrap z-10 tab-chip tab-chip-inactive text-neon/70 hover:text-neon"
                >
                  <span className="relative z-10">Main</span>
                </button>
                <button
                  className="relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 font-pixel-body text-xs sm:text-sm md:text-base transition-all duration-200 whitespace-nowrap z-10 tab-chip tab-chip-active text-neon flex items-center gap-2"
                >
                  <span className="relative z-10">{currentCategoryItem.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeCategoryTab();
                    }}
                    className="relative z-10 hover:bg-neon/20 rounded px-1 transition-colors duration-200"
                    aria-label="Close category tab"
                  >
                    <LucideIcons.X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </button>
              </>
            ) : (
              <div className="flex items-end gap-0">
                <button
                  onClick={() => handleCategoryTabClick(null)}
                  className="relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 font-pixel-body text-xs sm:text-sm md:text-base transition-all duration-200 whitespace-nowrap z-10 bg-os-dark text-neon/70 border-t-2 border-l-2 border-r-2 border-neon/50 border-b-2 hover:text-neon hover:border-neon tab-shape-first"
                >
                  <span className="relative z-10">Main</span>
                </button>
                <button
                  className="relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 font-pixel-body text-xs sm:text-sm md:text-base transition-all duration-200 whitespace-nowrap z-10 bg-os-black text-neon border-t-2 border-l-2 border-r-2 border-neon border-b-0 shadow-neon flex items-center gap-2 tab-shape-middle -mb-[2px] sm:-mb-[3px] md:-mb-[4px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-neon/10 to-transparent pointer-events-none" />
                  <span className="relative z-10">{currentCategoryItem.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeCategoryTab();
                    }}
                    className="relative z-10 hover:bg-neon/20 rounded px-1 transition-colors duration-200"
                    aria-label="Close category tab"
                  >
                    <LucideIcons.X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </button>
              </div>
            )}
          </div>
        )}

        <div className={`border-2 sm:border-3 md:border-4 border-neon bg-os-black p-2 sm:p-3 md:p-4 lg:p-6 overflow-y-auto overflow-x-hidden flex-1 min-h-0 border-t-0`}>
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
                  onClick={() => handleItemClick(item)}
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
                {isLoading ? (
                  <span className="font-pixel-body text-neon text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wide text-glow whitespace-nowrap animate-pulse">
                    Loading...
                  </span>
                ) : (
                  <span className="font-pixel-body text-neon text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wide text-glow whitespace-nowrap">
                    {stats?.totalCommits ? formatNumber(stats.totalCommits) : '0'}
                  </span>
                )}
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
              {isLoading ? (
                <span className="font-pixel-body text-neon/75 text-[10px] sm:text-[11px] md:text-xs lg:text-sm whitespace-nowrap animate-pulse">
                  Loading...
                </span>
              ) : stats?.lastCommit ? (
                <span className="font-pixel-body text-neon/75 text-[10px] sm:text-[11px] md:text-xs lg:text-sm whitespace-nowrap">
                  Last: {stats.lastCommit.timeAgo}
                </span>
              ) : null}
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
            <div 
              role="progressbar"
              aria-valuenow={Math.round(levelInfo.progressToNextLevel)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Level progress"
              className="w-full sm:w-28 md:w-36 lg:w-40 xl:w-44 h-2.5 sm:h-3 md:h-3.5 lg:h-4 bg-os-dark border-2 sm:border-3 md:border-4 border-neon relative overflow-hidden shadow-neon"
            >
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
