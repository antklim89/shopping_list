import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaList, FaPlus } from 'react-icons/fa6';
import { RemoveList } from '@/components/actions/remove-list';
import { useStore } from '@/lib/store';


export function ListSelect() {
  const [open, setOpen] = useState(false);
  const currentListId = useStore(state => state.currentListId);
  const lists = useStore(state => state.lists);
  const listSetName = useStore(state => state.listSetName);
  const listSetCurrentId = useStore(state => state.listSetCurrentId);
  const list = useStore(state => state.lists[currentListId]);
  const listCreate = useStore(state => state.listCreate);

  useEffect(() => {
    if (open === false) return;
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    addEventListener('keydown', listener);
    return () => removeEventListener('keydown', listener);
  }, [open]);

  if (!list) return null;

  return (
    <div className="flex gap-1 md:gap-4 items-center">
      <div className="relative my-4 w-full max-w-[50rem]">
        <input
          className="text-2xl font-bold border p-2 w-full"
          placeholder="List name"
          type="text"
          value={list.name}
          onChange={e => listSetName(currentListId, e.target.value)}
        />

        <AnimatePresence>
          {open && (
            <div className="z-50">
              <motion.div
                animate={{ opacity: 0.5 }}
                className="fixed inset-0 bg-gray-400"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              <motion.div
                animate="animate"
                className="fixed w-full max-w-[50rem] flex flex-col gap-2 my-8"
                exit="exit"
                initial="initial"
              >
                {Object.entries(lists).map(([id, listItem], idx) => (
                  <motion.button
                    className="btn-primary"
                    custom={idx}
                    key={id}
                    transition={{ type: 'spring', bounce: 0.15 }}
                    type="button"
                    variants={{
                      animate: () => ({
                        y: 0,
                        opacity: 1,
                      }),
                      exit: (custom: number) => ({
                        y: -(custom + 0.5) * 38,
                        opacity: 0,
                      }),
                      initial: (custom: number) => ({
                        y: -(custom + 0.5) * 38,
                        opacity: 0,
                      }),
                    }}
                    onClick={() => listSetCurrentId(id)}
                  >
                    {listItem.name || 'List'}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <button className="btn-primary" type="button" onClick={() => setOpen(p => !p)}>
        <FaList />
        <span className="ml-2 hidden md:inline">Show lists</span>
      </button>

      <button className="btn-primary" type="button" onClick={() => listCreate()}>
        <FaPlus />
        <span className="ml-2 hidden md:inline">Add New List</span>
      </button>

      <RemoveList />
    </div>
  );
}
