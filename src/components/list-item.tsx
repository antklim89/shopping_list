import { motion } from 'framer-motion';
import { FaCheck, FaO, FaTrash } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
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
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      className={cn('flex justify-between border bg-white border-slate-400 shadow-xl flex-wrap sm:flex-nowrap', { 'border-green-800': items.selected })}
      exit={{ x: 50, opacity: 0 }}
      initial={{ x: -50, opacity: 0 }}
    >
      <div className="flex w-full sm:w-auto sm:flex-[5_0_auto]">
        <input
          className="w-full p-2"
          disabled={items.selected}
          placeholder="Product name..."
          type="text"
          value={items.name}
          onChange={e => handleChange({ name: e.target.value })}
        />
      </div>
      <div className="flex flex-[1] justify-end">
        <input
          className="p-2 text-center"
          disabled={items.selected}
          max={90000000}
          min={1}
          type="number"
          value={items.qty}
          onChange={e => handleChange({ qty: e.target.valueAsNumber })}
        />
        <select
          className="p-2 text-center"
          disabled={items.selected}
          value={items.unit}
          onChange={e => handleChange({ unit: e.target.value as typeof units[number] })}
        >
          {units.map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>

        <Button
          className={cn('p-2 w-24 flex justify-center', { 'bg-green-800 hover:bg-green-900': items.selected })}
          onClick={() => handleChange({ selected: !items.selected })}
        >
          {items.selected ? <FaCheck /> : <FaO />}
        </Button>

        <Button
          className="bg-red-800 hover:bg-red-900 p-2 w-24 flex justify-center"
          onClick={() => listItemDelete(currentListId, listItemId)}
        >
          <FaTrash />
        </Button>
      </div>
    </motion.div>
  );
}
