import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaList, FaX } from 'react-icons/fa6';

import { ListCreate } from '@/components/list/list-create';
import { ListRemove } from '@/components/list/list-remove';
import { listSetCurrentId, useStore } from '@/lib/store';
import { Dialog } from '../ui/dialog';

export function ListDialog() {
  const [open, setOpen] = useState(false);
  const lists = useStore(state => state.lists);
  const toggleOpen = () => setOpen(p => !p);

  function handleListSelect(id: string) {
    return () => {
      listSetCurrentId(id);
      setOpen(false);
    };
  }

  return (
    <div className="flex items-center gap-1 md:gap-4">
      <Dialog isOpen={open} close={() => setOpen(false)}>
        <motion.div animate="animate" className="flex flex-col gap-4" exit="exit" initial="initial">
          <h3 className="text-xl">List collection</h3>

          <ListCreate />

          <div className="flex flex-col gap-1">
            {Object.entries(lists).map(([id, listItem], idx) => (
              <motion.div
                key={id}
                className="flex items-center gap-2"
                custom={idx}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
                variants={{
                  animate: { y: 0 },
                  initial: (i: number) => ({ y: -i * 38 }),
                }}
              >
                <button onClick={handleListSelect(id)} type="button" className="btn-primary w-full">
                  {listItem.name || 'Nameless list'}
                </button>
                <FaX className="m-0 leading-0" /> {Object.values(listItem.items).length}
                <ListRemove listId={id} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Dialog>

      <button className="btn-primary" type="button" onClick={toggleOpen}>
        <FaList />
        <span className="hidden sm:inline">Show lists</span>
      </button>
    </div>
  );
}
