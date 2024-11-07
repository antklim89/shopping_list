import { m } from 'framer-motion';
import { FaCheck, FaO, FaTrash } from 'react-icons/fa6';
import { units } from '@/lib/constants';
import { useStore } from '@/lib/store';
import type { ListItemType } from '@/lib/types';
import { cn } from '@/lib/utils';


export function ListItem({ items, listItemId }: { items: ListItemType; listItemId: string }) {
  const currentListId = useStore(state => state.currentListId);
  const listItemUpdate = useStore(state => state.listItemUpdate);
  const listItemDelete = useStore(state => state.listItemDelete);

  const handleChange = (newData: Partial<ListItemType>) => {
    listItemUpdate(currentListId, listItemId, newData);
  };

  return (
    <m.div
      animate={{ x: 0, opacity: 1 }}
      className={cn('flex gap-2 justify-between flex-wrap sm:flex-nowrap')}
      exit={{ x: 50, opacity: 0 }}
      initial={{ x: -50, opacity: 0 }}
    >
      <div className="flex gap-2 w-full sm:w-auto sm:flex-[2_0_auto]">
        <input
          disabled={items.selected}
          placeholder="Product name..."
          type="text"
          value={items.name}
          onChange={e => handleChange({ name: e.target.value })}
        />
      </div>
      <div className="flex gap-2 flex-[1] justify-end">
        <input
          className="text-center"
          disabled={items.selected}
          max={90000000}
          min={1}
          type="number"
          value={items.qty}
          onChange={e => handleChange({ qty: e.target.valueAsNumber })}
        />
        <select
          className="text-center"
          disabled={items.selected}
          value={items.unit}
          onChange={e => handleChange({ unit: e.target.value as typeof units[number] })}
        >
          {units.map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>

        <button
          className={cn('btn-primary', { 'btn-success': items.selected })}
          type="button"
          onClick={() => handleChange({ selected: !items.selected })}
        >
          {items.selected ? <FaCheck /> : <FaO />}
        </button>

        <button
          className="btn-error"
          type="button"
          onClick={() => listItemDelete(currentListId, listItemId)}
        >
          <FaTrash />
        </button>
      </div>
    </m.div>
  );
}
