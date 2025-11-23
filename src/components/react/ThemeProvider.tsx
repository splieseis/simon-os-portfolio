import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { currentThemeId } from '../../store/theme-store';
import { applyThemeToDocument } from '../../utils/theme';

/**
 * ThemeProvider Component
 * 
 * Initializes and applies the current theme to the document.
 * This component should be mounted once at the root of the app.
 */
export const ThemeProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const themeId = useStore(currentThemeId);

  useEffect(() => {
    // Apply theme on mount and when theme changes
    applyThemeToDocument(themeId);
  }, [themeId]);

  return <>{children}</>;
};

