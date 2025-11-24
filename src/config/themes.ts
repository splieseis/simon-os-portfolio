import type { ThemeConfig } from '../types/theme';

// Re-export for convenience
export type { ThemeConfig };

/**
 * Theme Configuration
 * 
 * To add a new theme:
 * 1. Create a folder: public/assets/themes/{theme-id}/
 * 2. Add background image: public/assets/themes/{theme-id}/background.png
 * 3. Add icons folder: public/assets/themes/{theme-id}/icons/
 * 4. Add theme config below
 * 5. Export theme ID in availableThemes array
 */

export const themes: Record<string, ThemeConfig> = {
  neon: {
    id: 'neon',
    name: 'Neon Matrix',
    description: 'Default retro-futuristic neon theme with motherboard aesthetic',
    colors: {
      neon: '#85f179',
      'os-black': '#050505',
      'os-dark': '#0a0a0a',
      'os-darker': '#1a1a1a',
    },
    assets: {
      background: 'background.png',
      music: 'music.mp3',
      icons: {
        'about-me': 'about-me.webp',
        'affiliate-link': 'affiliate-link.webp',
        apps: 'apps.webp',
        bookmarks: 'bookmarks.webp',
        code: 'code.webp',
        contact: 'contact.webp',
        cv: 'cv.webp',
        github: 'github.webp',
        json: 'json.webp',
        linkedin: 'linkedin.webp',
        museum: 'museum.webp',
        news: 'news.webp',
        robot: 'robot.webp',
        rocket: 'rocket.webp',
        scroll: 'scroll.webp',
        settings: 'settings.webp',
        'side-hustles': 'side-hustles.webp',
        'simon-os-github': 'simon-os-github.webp',
        software: 'software.webp',
        spotify: 'spotify.webp',
        thoughts: 'thoughts.webp',
        'trophy-first': 'trophy-first.webp',
        work: 'work.webp',
        x: 'x.webp',
      },
    },
  },
  
  // Example: Add more themes here
  // cyberpunk: {
  //   id: 'cyberpunk',
  //   name: 'Cyberpunk 2077',
  //   description: 'High-tech, low-life aesthetic',
  //   colors: {
  //     neon: '#ff0080',
  //     'os-black': '#000000',
  //     'os-dark': '#0d0d0d',
  //     'os-darker': '#1a1a1a',
  //   },
  //   assets: {
  //     background: 'background.png',
  //     icons: {
  //       cv: 'cv.webp',
  //     },
  //   },
  // },
};

/**
 * Default theme ID
 */
export const DEFAULT_THEME_ID = 'neon';

/**
 * Available theme IDs for easy iteration
 */
export const availableThemes = Object.keys(themes) as Array<keyof typeof themes>;

/**
 * Get theme configuration by ID
 */
export const getTheme = (themeId: string): ThemeConfig => {
  return themes[themeId] || themes[DEFAULT_THEME_ID];
};

/**
 * Get default theme
 */
export const getDefaultTheme = (): ThemeConfig => {
  return themes[DEFAULT_THEME_ID];
};

