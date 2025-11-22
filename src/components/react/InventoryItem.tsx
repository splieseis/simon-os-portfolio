import * as LucideIcons from 'lucide-react';
import type { InventoryItem } from '../../types';

interface InventoryItemProps {
  item: InventoryItem;
}

export default function InventoryItemComponent({ item }: InventoryItemProps) {
  const IconComponent = (LucideIcons as Record<string, typeof LucideIcons.Circle>)[item.icon] || LucideIcons.Circle;

  return (
    <div className="border border-[#39ff14] p-4 rounded bg-[#050505] hover:bg-[#0a0a0a] transition-colors cursor-pointer">
      <div className="flex items-center gap-2 mb-2">
        <IconComponent className="w-5 h-5 text-[#39ff14]" />
        <h3 className="text-[#39ff14] font-mono">{item.title}</h3>
      </div>
      {item.description && (
        <p className="text-[#39ff14]/70 text-sm font-mono">{item.description}</p>
      )}
    </div>
  );
}
