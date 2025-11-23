import { atom } from 'nanostores';
import { getTheme, DEFAULT_THEME_ID, type ThemeConfig } from '../config/themes';

/**
 * Theme Store
 * Manages the current active theme
 */

// Current theme ID
export const currentThemeId = atom<string>(DEFAULT_THEME_ID);

// Current theme configuration (computed)
export const currentTheme = atom<ThemeConfig>(getTheme(DEFAULT_THEME_ID));

// Subscribe to theme ID changes and update theme config
currentThemeId.subscribe((themeId) => {
  currentTheme.set(getTheme(themeId));
});

/**
 * Actions
 */
export const setTheme = (themeId: string) => {
  currentThemeId.set(themeId);
};

export const resetTheme = () => {
  currentThemeId.set(DEFAULT_THEME_ID);
};

/**
 * Get theme-aware asset path
 * @param assetPath - Relative path from theme folder (e.g., 'background.png' or 'icons/cv.webp')
 * @param themeId - Optional theme ID, defaults to current theme
 * @returns Full public path to the asset
 */
export const getThemeAssetPath = (assetPath: string, themeId?: string): string => {
  const theme = themeId ? getTheme(themeId) : currentTheme.get();
  return `/assets/themes/${theme.id}/${assetPath}`;
};

/**
 * Get theme-aware icon path
 * @param iconName - Icon name (e.g., 'cv' or full path like '/assets/icons/cv.webp')
 * @param themeId - Optional theme ID, defaults to current theme
 * @returns Full public path to the icon, or original path if it's already absolute
 */
export const getThemeIconPath = (iconName: string, themeId?: string): string => {
  // If it's already an absolute path or external URL, return as-is
  if (iconName.startsWith('/') || iconName.startsWith('http://') || iconName.startsWith('https://')) {
    return iconName;
  }
  
  // If it contains an image extension, treat as filename
  if (/\.(webp|png|jpg|jpeg|svg|gif)$/i.test(iconName)) {
    const theme = themeId ? getTheme(themeId) : currentTheme.get();
    const iconFile = theme.assets.icons?.[iconName] || iconName;
    return `/assets/themes/${theme.id}/icons/${iconFile}`;
  }
  
  // Otherwise, try to find in theme icons
  const theme = themeId ? getTheme(themeId) : currentTheme.get();
  const iconFile = theme.assets.icons?.[iconName];
  
  if (iconFile) {
    return `/assets/themes/${theme.id}/icons/${iconFile}`;
  }
  
  // Fallback: return as-is (likely a Lucide icon name)
  return iconName;
};

