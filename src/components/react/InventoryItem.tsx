import * as LucideIcons from 'lucide-react';
import { getThemeIconPath } from '../../store/theme-store';
import type { InventoryItem } from '../../types';

interface InventoryItemProps {
  item: InventoryItem;
}

export default function InventoryItemComponent({ item }: InventoryItemProps) {
  const themeIconPath = getThemeIconPath(item.icon);
  const isImageIcon = themeIconPath && (themeIconPath.startsWith('/') || /\.(webp|png|jpg|jpeg|svg|gif)$/i.test(themeIconPath));
  const IconComponent = !isImageIcon && themeIconPath 
    ? (LucideIcons as Record<string, typeof LucideIcons.Circle>)[themeIconPath] || LucideIcons.Circle
    : null;

  return (
    <div className="border border-neon p-4 rounded bg-os-black hover:bg-os-dark transition-colors cursor-pointer">
      <div className="flex items-center gap-2 mb-2">
        {isImageIcon ? (
          <img 
            src={themeIconPath} 
            alt={`${item.title} icon`}
            className="w-5 h-5 object-contain"
          />
        ) : IconComponent ? (
          <IconComponent className="w-5 h-5 text-neon" />
        ) : (
          <LucideIcons.Circle className="w-5 h-5 text-neon" />
        )}
        <h3 className="text-neon font-mono">{item.title}</h3>
      </div>
      {item.description && (
        <p className="text-neon/70 text-sm font-mono">{item.description}</p>
      )}
    </div>
  );
}
