import { type ReactNode, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function Dialog({ children, isOpen, close }: { children: ReactNode; isOpen: boolean; close: () => void }) {
  useEffect(() => {
    if (isOpen === false) return;
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    addEventListener('keydown', listener);
    return () => removeEventListener('keydown', listener);
  }, [isOpen, close]);

  return (
    <AnimatePresence propagate>
      {isOpen && (
        <>
          <motion.div
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-800"
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => close()}
          />
          <motion.div
            className="fixed top-26 left-1/2 mx-4 w-full max-w-md -translate-x-1/2 rounded-default bg-background p-4"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
