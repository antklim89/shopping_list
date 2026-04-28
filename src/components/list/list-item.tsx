import { Reorder } from 'framer-motion';
import { FaCheck, FaTrash } from 'react-icons/fa6';

import { units } from '@/lib/constants';
import { listItemDelete, listItemUpdate, useStore } from '@/lib/store';
import type { ListItemType } from '@/lib/types';

export function ListItem({ listItem, listItemId }: { listItem: ListItemType; listItemId: string }) {
  const currentListId = useStore(state => state.currentListId);

  const handleChange = (newData: Partial<ListItemType>) => {
    listItemUpdate(currentListId, listItemId, newData);
  };

  return (
    <Reorder.Item
      animate={{ x: 0, opacity: 1 }}
      as="div"
      className="flex flex-wrap justify-between gap-2 sm:flex-nowrap"
      dragListener={false}
      exit={{ x: 20, opacity: 0 }}
      initial={{ x: -20, opacity: 0 }}
      transition={{
        duration: 0.18,
      }}
      value={listItemId}
    >
      <div className="flex w-full gap-2 sm:w-auto sm:flex-[2_0_auto]">
        <input
          placeholder="Enter product name..."
          type="text"
          value={listItem.name}
          onChange={e => handleChange({ name: e.target.value })}
        />
      </div>
      <div className="flex flex-1 justify-end gap-2">
        <input
          className="text-center"
          max={1000000}
          min={1}
          type="text"
          inputMode="numeric"
          value={listItem.qty}
          onChange={e =>
            handleChange({
              qty: Number.isNaN(Number.parseFloat(e.target.value)) ? 0 : Number.parseFloat(e.target.value),
            })
          }
        />
        <select
          className="text-center text-sm uppercase"
          value={listItem.unit}
          onChange={e => handleChange({ unit: e.target.value as (typeof units)[number] })}
        >
          {units.map(unit => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        <button
          className={listItem.selected ? 'btn-success' : 'btn-primary'}
          type="button"
          onClick={() => handleChange({ selected: !listItem.selected })}
        >
          <FaCheck />
        </button>

        <button className="btn-error" type="button" onClick={() => listItemDelete(currentListId, listItemId)}>
          <FaTrash />
        </button>
      </div>
    </Reorder.Item>
  );
}
