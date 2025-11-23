/**
 * Leveling System Configuration
 * 
 * This file defines the XP requirements for each level in the commit-based leveling system.
 * Each commit counts as 1 XP.
 * 
 * To customize the leveling system, modify the `LEVEL_THRESHOLDS` array.
 * Each entry represents the total XP needed to reach that level.
 * 
 * Example:
 * - Level 1: 0-50 XP (50 XP needed)
 * - Level 2: 50-150 XP (100 more XP needed, 150 total)
 * - Level 3: 150-300 XP (150 more XP needed, 300 total)
 */

export interface LevelThreshold {
  /** The level number */
  level: number;
  /** Total XP required to reach this level */
  totalXpRequired: number;
  /** XP needed specifically for this level (difference from previous level) */
  xpForThisLevel: number;
}

/**
 * Level thresholds configuration
 * 
 * IMPORTANT INDEXING CONVENTION:
 * - Array is 0-indexed (standard JavaScript)
 * - Level numbers are 1-indexed (standard for games/leveling systems)
 * - Array index 0 corresponds to Level 1, index 1 to Level 2, etc.
 * - To access threshold for level N, use: LEVEL_THRESHOLDS[N - 1]
 * 
 * Each entry defines the total XP needed to reach that level.
 * The system will automatically calculate XP needed per level.
 * 
 * You can customize this array to change the leveling curve:
 * - Steeper curve: Larger gaps between levels (harder to level up)
 * - Gentler curve: Smaller gaps between levels (easier to level up)
 * - Exponential: Use formulas like `Math.floor(50 * Math.pow(1.5, level - 1))`
 */
export const LEVEL_THRESHOLDS: number[] = [
  0,    // Level 1: 0 XP (starting level) - index 0
  50,   // Level 2: 50 XP - index 1
  150,  // Level 3: 150 XP - index 2
  300,  // Level 4: 300 XP - index 3
  600,  // Level 5: 600 XP - index 4
  1000, // Level 6: 1000 XP - index 5
  1500, // Level 7: 1500 XP - index 6
  2500, // Level 8: 2500 XP - index 7
  4000, // Level 9: 4000 XP - index 8
  6000, // Level 10: 6000 XP - index 9
  // Add more levels as needed...
  // Note: This file contains only static configuration. Any automatic extension
  // of thresholds beyond the defined levels is implemented in the consumer code
  // at runtime, specifically in src/utils/leveling.ts via the getTotalXpForLevel function.
];

/**
 * Default XP per commit (usually 1, but can be customized)
 */
export const XP_PER_COMMIT = 1;

/**
 * Maximum level to calculate (prevents infinite loops)
 * Set to null for unlimited levels
 */
export const MAX_LEVEL: number | null = null;

/**
 * Pattern for generating additional levels beyond the defined thresholds
 * 
 * Options:
 * - 'linear': Add a fixed amount per level (e.g., +2000 XP per level)
 * - 'exponential': Multiply by a factor (e.g., 1.5x per level)
 * - 'custom': Use a custom function
 */
export type LevelPattern = 'linear' | 'exponential' | 'custom';

export const LEVEL_PATTERN: LevelPattern = 'exponential';

/**
 * Pattern configuration
 */
export const LEVEL_PATTERN_CONFIG = {
  /** For linear: XP to add per level beyond defined thresholds */
  linearIncrement: 2000,
  /** For exponential: Multiplier per level (e.g., 1.5 means 50% increase per level) */
  exponentialMultiplier: 1.5,
  /** For exponential: Starting increment per level beyond defined thresholds */
  exponentialBaseIncrement: 2000,
  /** For custom: Function that takes level number and returns total XP required */
  customFunction: (level: number): number => {
    // Example: Level 11+ uses exponential growth
    // baseLevel is the count of defined levels, so the last defined level is at index (baseLevel - 1)
    const baseLevel = LEVEL_THRESHOLDS.length;
    // Validate bounds: baseLevel - 1 must be a valid index (guaranteed if array has at least 1 element)
    if (baseLevel === 0) {
      return 0; // Fallback if array is empty
    }
    const baseXp = LEVEL_THRESHOLDS[baseLevel - 1];
    return Math.floor(baseXp * Math.pow(1.5, level - baseLevel));
  },
};

