import { FaMoon, FaSun } from 'react-icons/fa6';
import { useTheme } from '@/lib/hooks';


export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-primary p-4 mb-8 shadow-lg">
      <div className="container flex items-center justify-between">
        <h1 className="text-primary-foreground text-2xl font-bold uppercase">
          Shopping List
        </h1>
        <div className="flex space-x-4">
          <button
            aria-label="Toggle dark mode"
            className="btn-primary"
            type="button"
            onClick={() => toggleTheme()}
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </header>
  );
}
