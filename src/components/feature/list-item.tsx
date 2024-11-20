import { Reorder } from 'framer-motion';
import { FaCheck, FaO, FaTrash } from 'react-icons/fa6';
import { units } from '@/lib/constants';
import { useStore } from '@/lib/store';
import type { ListItemType } from '@/lib/types';


export function ListItem({ items, listItemId }: { items: ListItemType; listItemId: string }) {
  const currentListId = useStore(state => state.currentListId);
  const listItemUpdate = useStore(state => state.listItemUpdate);
  const listItemDelete = useStore(state => state.listItemDelete);

  const handleChange = (newData: Partial<ListItemType>) => {
    listItemUpdate(currentListId, listItemId, newData);
  };

  return (
    <Reorder.Item
      animate={{ x: 0, opacity: 1 }}
      as="div"
      className="flex gap-2 justify-between flex-wrap sm:flex-nowrap"
      dragListener={false}
      exit={{ x: 20, opacity: 0 }}
      initial={{ x: -20, opacity: 0 }}
      transition={{
        duration: 0.18,
      }}
      value={listItemId}
    >
      <div className="flex gap-2 w-full sm:w-auto sm:flex-[2_0_auto]">
        <input
          placeholder="Product name..."
          type="text"
          value={items.name}
          onChange={e => handleChange({ name: e.target.value })}
        />
      </div>
      <div className="flex gap-2 flex-[1] justify-end">
        <input
          className="text-center"
          max={90000000}
          min={1}
          type="number"
          value={items.qty}
          onChange={e => handleChange({ qty: e.target.valueAsNumber })}
        />
        <select
          className="text-center"
          value={items.unit}
          onChange={e => handleChange({ unit: e.target.value as typeof units[number] })}
        >
          {units.map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>

        <button
          className={`btn-primary ${items.selected ? 'btn-success' : ''}`}
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
    </Reorder.Item>
  );
}
