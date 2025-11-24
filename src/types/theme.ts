/**
 * Theme configuration interface
 * Defines all themeable aspects of the OS
 */
export interface ThemeConfig {
  id: string;
  name: string;
  description?: string;
  
  // Color palette
  colors: {
    neon: string;
    'os-black': string;
    'os-dark': string;
    'os-darker': string;
  };
  
  // Asset paths (relative to public/assets/themes/{theme-id}/)
  assets: {
    background: string; // e.g., 'background.png'
    music?: string; // e.g., 'music.mp3'
    icons?: {
      [iconName: string]: string; // e.g., { 'cv': 'cv.webp', 'custom-icon': 'custom.png' }
    };
  };
  
  // Optional theme-specific overrides
  overrides?: {
    fonts?: {
      header?: string;
      body?: string;
    };
    shadows?: {
      neon?: string;
    };
  };
}

/**
 * Theme metadata for display/selection
 */
export interface ThemeMetadata {
  id: string;
  name: string;
  description?: string;
  preview?: string; // Path to preview image
}

