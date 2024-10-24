import { FaCheck, FaO, FaTrash } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { units } from '@/lib/constants';
import { type ListItem as ListItemType, useStore } from '@/lib/store';
import { cn } from '@/lib/utils';


export function ListItem({ items, listItemId }: { items: ListItemType; listItemId: string }) {
  const currentListId = useStore(state => state.currentListId);
  const listItemUpdate = useStore(state => state.listItemUpdate);
  const listItemDelete = useStore(state => state.listItemDelete);

  const handleChange = (newData: Partial<ListItemType>) => {
    listItemUpdate(currentListId, listItemId, newData);
  };

  return (
    <div className={cn('flex border border-slate-400 shadow-xl', { 'border-green-800': items.checked })}>
      <input
        className="flex-[5] p-2"
        disabled={items.checked}
        placeholder="Product name..."
        type="text"
        value={items.name}
        onChange={e => handleChange({ name: e.target.value })}
      />
      <input
        className="flex-[1] p-2 text-center"
        disabled={items.checked}
        max={90000000}
        min={1}
        type="number"
        value={items.qty}
        onChange={e => handleChange({ qty: e.target.valueAsNumber })}
      />
      <select
        className="flex-[1] p-2 text-center"
        disabled={items.checked}
        value={items.unit}
        onChange={e => handleChange({ unit: e.target.value as typeof units[number] })}
      >
        {units.map(unit => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </select>

      <Button
        className={cn(' p-2 w-24 flex justify-center', { 'bg-green-800 hover:bg-green-900': items.checked })}
        onClick={() => handleChange({ checked: !items.checked })}
      >
        {items.checked ? <FaCheck /> : <FaO />}
      </Button>

      <Button
        className="bg-red-800 hover:bg-red-900 p-2 w-24 flex justify-center"
        onClick={() => listItemDelete(currentListId, listItemId)}
      >
        <FaTrash />
      </Button>
    </div>
  );
}
