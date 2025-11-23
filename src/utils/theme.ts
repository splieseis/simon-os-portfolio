/**
 * Theme utility functions
 * Helper functions for working with themes
 */

import { getTheme } from '../config/themes';
import { getThemeAssetPath, getThemeIconPath } from '../store/theme-store';

/**
 * Re-export theme store utilities for convenience
 */
export { getThemeAssetPath, getThemeIconPath };

/**
 * Apply theme to document
 * Updates CSS variables and background image based on current theme
 */
export const applyThemeToDocument = (themeId: string) => {
  const theme = getTheme(themeId);
  
  const root = document.documentElement;
  
  // Apply color variables
  root.style.setProperty('--color-neon', theme.colors.neon);
  root.style.setProperty('--color-os-black', theme.colors['os-black']);
  root.style.setProperty('--color-os-dark', theme.colors['os-dark']);
  root.style.setProperty('--color-os-darker', theme.colors['os-darker']);
  
  // Apply background image
  const backgroundPath = getThemeAssetPath(theme.assets.background, themeId);
  root.style.setProperty('--theme-background-image', `url('${backgroundPath}')`);
  
  // Apply font overrides if provided
  if (theme.overrides?.fonts?.header) {
    root.style.setProperty('--font-pixel-header', theme.overrides.fonts.header);
  }
  if (theme.overrides?.fonts?.body) {
    root.style.setProperty('--font-pixel-body', theme.overrides.fonts.body);
  }
  
  // Apply shadow overrides if provided
  if (theme.overrides?.shadows?.neon) {
    root.style.setProperty('--shadow-neon', theme.overrides.shadows.neon);
  }
};

