import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaList } from 'react-icons/fa6';

import { ListCreate } from '@/components/actions/list-create';
import { RemoveList } from '@/components/actions/remove-list';
import { listSetCurrentId, listSetName, useStore } from '@/lib/store';
import { Dialog } from '../ui/dialog';

export function ListSelect() {
  const [open, setOpen] = useState(false);
  const currentListId = useStore(state => state.currentListId);
  const lists = useStore(state => state.lists);
  const list = useStore(state => state.lists[currentListId]);

  if (!list) return null;

  return (
    <div className="flex items-center gap-1 md:gap-4">
      <div className="relative my-4 w-full max-w-200">
        <input
          className="w-full border p-2 font-bold text-2xl"
          placeholder="List name"
          type="text"
          value={list.name}
          onChange={e => listSetName(currentListId, e.target.value)}
        />

        <Dialog isOpen={open} close={() => setOpen(false)}>
          <motion.div animate="animate" className="flex-col gap-4" exit="exit" initial="initial">
            <h3 className="mb-4 text-xl">List collection</h3>
            {Object.entries(lists).map(([id, listItem], idx) => (
              <motion.button
                className="btn-primary w-full"
                custom={idx}
                key={id}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
                type="button"
                variants={{
                  animate: () => ({ y: 0 }),
                  initial: (i: number) => ({ y: -i * 38 }),
                }}
                onClick={() => {
                  listSetCurrentId(id);
                  setOpen(false);
                }}
              >
                {listItem.name || 'List'}
              </motion.button>
            ))}
          </motion.div>
        </Dialog>
      </div>

      <button className="btn-primary" type="button" onClick={() => setOpen(p => !p)}>
        <FaList />
        <span className="ml-2 hidden md:inline">Show lists</span>
      </button>

      <ListCreate />
      <RemoveList />
    </div>
  );
}
