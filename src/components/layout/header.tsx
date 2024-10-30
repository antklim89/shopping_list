import { ListsDrawer } from '@/components/feature/lists-drawer';


export function Header() {
  return (
    <header className="bg-primary-700 p-4 mb-8 shadow-lg">
      <div className="container flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">Shopping List</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <ListsDrawer />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
