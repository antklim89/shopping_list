import { CollectionDrawer } from '@/components/collection-drawer';


export function Header() {
  return (
    <header className="bg-white p-4 mb-8 shadow-lg">
      <div className="container flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shopping List</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <CollectionDrawer />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
