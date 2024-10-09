import { CollectionDrawer } from '@/components/layout/collection-drawer';
import { Button } from '@/components/ui/button';


export function Header() {
  return (
    <header className="container flex items-center justify-between p-4">
      <h1 className="text-2xl font-bold">Shopping List</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Button>
              Create New List
            </Button>
          </li>
          <li>
            <CollectionDrawer />
          </li>
        </ul>
      </nav>
    </header>
  );
}
