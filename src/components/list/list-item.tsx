import type { ChangeEvent } from 'react';
import { Reorder } from 'motion/react';
import { FaCheck, FaTrash } from 'react-icons/fa6';

import { units } from '@/lib/constants';
import { listItemDelete, listItemUpdate } from '@/lib/store';
import type { ListItemType, Unit } from '@/lib/types';

export function ListItem({ listItem, listItemId }: { listItem: ListItemType; listItemId: string }) {
  function handleQtyChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = Number.parseFloat(e.target.value);
    listItemUpdate(listItemId, { qty: Number.isNaN(newValue) ? 0 : newValue });
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    listItemUpdate(listItemId, { name: e.target.value });
  }

  function handleUnitChange(e: ChangeEvent<HTMLSelectElement>) {
    listItemUpdate(listItemId, { unit: e.target.value as Unit });
  }

  function handleSelectedChange() {
    listItemUpdate(listItemId, { selected: !listItem.selected });
  }

  function handleListItemDelete() {
    listItemDelete(listItemId);
  }

  return (
    <Reorder.Item
      animate={{ x: 0, opacity: 1 }}
      as="div"
      className="flex flex-wrap justify-between gap-2 rounded-default border border-border bg-secondary p-2 shadow sm:flex-nowrap"
      dragListener={false}
      exit={{ x: 20, opacity: 0 }}
      initial={{ x: -20, opacity: 0 }}
      transition={{
        duration: 0.18,
      }}
      value={listItemId}
    >
      <div className="flex w-full gap-2 sm:w-auto sm:flex-[2_0_auto]">
        <input placeholder="Enter product name..." type="text" value={listItem.name} onChange={handleNameChange} />
      </div>
      <div className="flex flex-1 justify-end gap-2">
        <input
          className="text-center"
          max={1000000}
          min={1}
          type="text"
          inputMode="numeric"
          value={listItem.qty}
          onChange={handleQtyChange}
        />
        <select className="text-center text-sm uppercase" value={listItem.unit} onChange={handleUnitChange}>
          {units.map(unit => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        <button
          className={listItem.selected ? 'btn-success' : 'btn-primary'}
          type="button"
          onClick={handleSelectedChange}
        >
          <FaCheck />
        </button>

        <button className="btn-error" type="button" onClick={handleListItemDelete}>
          <FaTrash />
        </button>
      </div>
    </Reorder.Item>
  );
}
