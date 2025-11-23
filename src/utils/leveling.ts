import { 
  LEVEL_THRESHOLDS, 
  XP_PER_COMMIT, 
  MAX_LEVEL, 
  LEVEL_PATTERN, 
  LEVEL_PATTERN_CONFIG 
} from '../config/leveling';

/**
 * Level information for a given XP amount
 */
export interface LevelInfo {
  /** Current level */
  level: number;
  /** Current XP within the current level */
  currentXp: number;
  /** XP needed to reach the next level */
  xpNeededForNextLevel: number;
  /** Progress percentage to next level (0-100) */
  progressToNextLevel: number;
  /** Total XP required to reach the next level */
  nextLevelTotalXp: number;
  /** Total XP required for current level */
  currentLevelTotalXp: number;
}

/**
 * Calculate the total XP required for a given level
 * 
 * @param level - The level number (1-based)
 * @returns Total XP required to reach that level
 */
function getTotalXpForLevel(level: number): number {
  // Level 1 is always 0 XP
  if (level <= 1) {
    return 0;
  }

  // Convert 1-based level to 0-based array index
  // Level 1 -> index 0, Level 2 -> index 1, etc.
  const arrayIndex = level - 1;

  // Validate array bounds before access
  if (arrayIndex < 0 || arrayIndex >= LEVEL_THRESHOLDS.length) {
    // Level is beyond defined thresholds, calculate it
    const baseLevel = LEVEL_THRESHOLDS.length;
    
    // Safety check: ensure array is not empty
    if (baseLevel === 0) {
      return 0; // Fallback if array is empty
    }
    
    // baseLevel is the count of defined levels, so the last defined level is at index (baseLevel - 1)
    const baseXp = LEVEL_THRESHOLDS[baseLevel - 1];
    const levelsBeyond = level - baseLevel;

    switch (LEVEL_PATTERN) {
      case 'linear':
        return baseXp + (levelsBeyond * LEVEL_PATTERN_CONFIG.linearIncrement);
      
      case 'exponential': {
        const multiplier = LEVEL_PATTERN_CONFIG.exponentialMultiplier;
        const baseIncrement = LEVEL_PATTERN_CONFIG.exponentialBaseIncrement;
        let totalXp = baseXp;
        let currentIncrement = baseIncrement;
        for (let i = 0; i < levelsBeyond; i++) {
          totalXp += Math.floor(currentIncrement);
          currentIncrement *= multiplier;
        }
        return totalXp;
      }
      
      case 'custom':
        return LEVEL_PATTERN_CONFIG.customFunction(level);
      
      default:
        // Fallback to linear
        return baseXp + (levelsBeyond * 1000);
    }
  }

  // Level is within defined thresholds, return it directly
  // arrayIndex is guaranteed to be valid at this point
  return LEVEL_THRESHOLDS[arrayIndex];
}

/**
 * Calculate level information based on total commits/XP
 * 
 * @param totalCommits - Total number of commits (will be converted to XP)
 * @returns Level information including current level, XP progress, and next level requirements
 */
export function calculateLevelInfo(totalCommits: number): LevelInfo {
  const totalXp = totalCommits * XP_PER_COMMIT;
  
  // Find the current level
  let level = 1;
  let currentLevelTotalXp = 0;
  let nextLevelTotalXp = getTotalXpForLevel(2);

  // Check if MAX_LEVEL is set and respect it
  const maxLevelToCheck = MAX_LEVEL || 1000; // Default to 1000 if null

  while (level < maxLevelToCheck && totalXp >= nextLevelTotalXp) {
    level++;
    currentLevelTotalXp = nextLevelTotalXp;
    nextLevelTotalXp = getTotalXpForLevel(level + 1);
  }

  // Calculate XP within current level
  const currentXp = totalXp - currentLevelTotalXp;
  const xpNeededForNextLevel = nextLevelTotalXp - currentLevelTotalXp;
  const progressToNextLevel = xpNeededForNextLevel > 0
    ? Math.min(100, Math.round((currentXp / xpNeededForNextLevel) * 100))
    : 100;

  return {
    level,
    currentXp,
    xpNeededForNextLevel,
    progressToNextLevel,
    nextLevelTotalXp,
    currentLevelTotalXp,
  };
}

/**
 * Get a formatted string for level display
 * 
 * @param levelInfo - Level information from calculateLevelInfo
 * @returns Formatted string like "Level 5" or "Lv. 5"
 */
export function formatLevel(levelInfo: LevelInfo, prefix: string = 'Level'): string {
  return `${prefix} ${levelInfo.level}`;
}

/**
 * Get a formatted string for XP progress display
 * 
 * @param levelInfo - Level information from calculateLevelInfo
 * @returns Formatted string like "250 / 500 XP"
 */
export function formatXpProgress(levelInfo: LevelInfo): string {
  return `${levelInfo.currentXp.toLocaleString()} / ${levelInfo.xpNeededForNextLevel.toLocaleString()} XP`;
}

