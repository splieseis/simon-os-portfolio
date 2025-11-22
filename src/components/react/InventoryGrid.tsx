import { inventory } from '../../config/inventory';
import InventoryItemComponent from './InventoryItem';

export default function InventoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {inventory.map((item) => (
        <InventoryItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
}
