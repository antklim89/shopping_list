import { FaMoon, FaSun } from 'react-icons/fa6';

import { useTheme } from '@/lib/hooks';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="mb-8 bg-primary p-4 shadow-lg">
      <div className="container flex items-center justify-between">
        <h1 className="font-bold text-2xl text-primary-foreground uppercase">Shopping List</h1>
        <div className="flex space-x-4">
          <button aria-label="Toggle dark mode" className="btn-primary" type="button" onClick={() => toggleTheme()}>
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </header>
  );
}
