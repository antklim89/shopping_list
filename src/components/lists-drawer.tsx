import { motion } from 'framer-motion';
import { Lists } from '@/components/lists';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';


export function ListsDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Lists</Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col justify-between">
        <DrawerTitle>
          Your Collection of Lists
        </DrawerTitle>
        <DrawerDescription className="hidden">
          Here you can see all of your lists
        </DrawerDescription>
        <motion.div
          animate={{ x: 0 }}
          className=""
          initial={{ x: 400 }}
          transition={{ duration: 0.5 }}
        >
          <Lists />
        </motion.div>
        <DrawerClose asChild>
          <Button>Close</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
