import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';


export function CollectionDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open</Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col">
        <DrawerTitle>
          Your Collection of Lists
        </DrawerTitle>
        <div className="flex-1">
          CONTENT
        </div>
        <DrawerClose asChild>
          <Button>Close</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
