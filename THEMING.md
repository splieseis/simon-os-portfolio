# Theming Guide

SimonOS Portfolio supports a flexible theming system that allows you to customize colors, backgrounds, icons, and more. This guide explains how to use and create themes.

## Quick Start

### Using the Default Theme

The default "Neon Matrix" theme is automatically applied. No configuration needed!

### Changing Themes

To switch themes programmatically:

```typescript
import { setTheme } from './store/theme-store';

// Switch to a different theme
setTheme('cyberpunk');
```

## Creating a New Theme

### Step 1: Create Theme Folder Structure

Create a new folder for your theme in `public/assets/themes/`:

```
public/assets/themes/
  └── your-theme-name/
      ├── background.png    (required)
      └── icons/
          ├── cv.webp       (optional, theme-specific icons)
          └── ...
```

### Step 2: Add Theme Configuration

Edit `src/config/themes.ts` and add your theme:

```typescript
export const themes: Record<string, ThemeConfig> = {
  // ... existing themes ...
  
  'your-theme-name': {
    id: 'your-theme-name',
    name: 'Your Theme Name',
    description: 'A brief description of your theme',
    colors: {
      neon: '#ff0080',           // Primary accent color
      'os-black': '#000000',     // Darkest background
      'os-dark': '#0d0d0d',      // Dark background
      'os-darker': '#1a1a1a',    // Border/darker elements
    },
    assets: {
      background: 'background.png',  // Filename in theme folder
      icons: {
        cv: 'cv.webp',              // Map icon names to files
        // Add more custom icons here
      },
    },
    // Optional: Override fonts or shadows
    overrides: {
      fonts: {
        header: '"Your Font", sans-serif',
        body: '"Another Font", monospace',
      },
      shadows: {
        neon: '0 0 30px rgba(255, 0, 128, 0.5)',
      },
    },
  },
};
```

### Step 3: Update Available Themes

Add your theme ID to the `availableThemes` array (this happens automatically, but you can reference it):

```typescript
export const availableThemes = Object.keys(themes);
```

### Step 4: Use Your Theme

```typescript
import { setTheme } from './store/theme-store';

setTheme('your-theme-name');
```

## Theme Structure

### Required Files

- **Background Image**: `public/assets/themes/{theme-id}/background.png`
  - Recommended size: 1920x1080 or larger
  - Formats: PNG, JPG, WebP

### Optional Files

- **Icons**: `public/assets/themes/{theme-id}/icons/{icon-name}.{ext}`
  - Use theme-specific icons when you want different visuals per theme
  - If an icon isn't found in the theme folder, it falls back to Lucide icons

## Icon System

Icons can be specified in two ways:

### 1. Lucide Icons (Built-in)

Use Lucide icon names directly in `inventory.ts`:

```typescript
{ id: 'my-item', type: 'project', title: 'My Project', icon: 'github' }
```

Available icons: `user`, `github`, `mail`, `code`, `terminal`, `book-open`, etc.
See [Lucide Icons](https://lucide.dev/icons/) for full list.

### 2. Custom Image Icons

Use theme-specific image icons:

1. Add the icon file to your theme's `icons/` folder
2. Map it in the theme config:

```typescript
assets: {
  icons: {
    'my-custom-icon': 'my-custom-icon.webp',
  },
}
```

3. Reference it in `inventory.ts`:

```typescript
{ id: 'my-item', type: 'project', title: 'My Project', icon: 'my-custom-icon' }
```

The theme system will automatically resolve the path to:
`/assets/themes/{current-theme}/icons/my-custom-icon.webp`

## Color System

All colors are centralized in the theme configuration. The CSS automatically uses these values via CSS variables:

- `--color-neon`: Primary accent color (used for borders, text, glows)
- `--color-os-black`: Darkest background
- `--color-os-dark`: Dark background (inventory items, etc.)
- `--color-os-darker`: Darker elements (borders, frames)

These are applied automatically when you change themes.

## Advanced: Theme Overrides

You can override fonts and shadows per theme:

```typescript
overrides: {
  fonts: {
    header: '"Custom Header Font", sans-serif',
    body: '"Custom Body Font", monospace',
  },
  shadows: {
    neon: '0 0 30px rgba(255, 0, 128, 0.5)',
  },
}
```

## Best Practices

1. **Naming**: Use kebab-case for theme IDs (e.g., `cyberpunk-2077`)
2. **Assets**: Optimize images (use WebP when possible, compress PNGs)
3. **Colors**: Ensure sufficient contrast for accessibility
4. **Icons**: Keep icon sizes consistent (recommended: 64x64 to 128x128px)
5. **Testing**: Test your theme with different screen sizes

## Example: Complete Theme

```typescript
cyberpunk: {
  id: 'cyberpunk',
  name: 'Cyberpunk 2077',
  description: 'High-tech, low-life aesthetic',
  colors: {
    neon: '#ff0080',
    'os-black': '#000000',
    'os-dark': '#0d0d0d',
    'os-darker': '#1a1a1a',
  },
  assets: {
    background: 'background.png',
    icons: {
      cv: 'cv.webp',
      github: 'github-icon.png',
    },
  },
  overrides: {
    fonts: {
      header: '"Orbitron", sans-serif',
      body: '"Share Tech Mono", monospace',
    },
  },
},
```

## Troubleshooting

### Theme not applying?
- Check that the theme ID exists in `themes.ts`
- Verify asset paths are correct
- Check browser console for errors

### Icons not showing?
- Verify icon file exists in theme's `icons/` folder
- Check icon mapping in theme config
- Ensure icon name matches in `inventory.ts`

### Colors not updating?
- Clear browser cache
- Check that CSS variables are being set (inspect element)
- Verify theme is being applied (check `currentThemeId` in store)

## Contributing Themes

If you create a great theme, consider:
1. Documenting it in this file
2. Adding a preview screenshot
3. Sharing it with the community!

Happy theming! 🎨

