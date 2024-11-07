import { useLayoutEffect, useState } from 'react';


type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getThemeFromLocalStore() ?? getThemeFromMediaQuery());

  useLayoutEffect(() => {
    localStorage.setItem('COLOR_THEME', theme);

    const html = document.querySelector('html');
    if (html) theme === 'dark' ? html.classList.add('dark') : html.classList.remove('dark');
  }, [theme]);

  function toggleTheme() {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }

  return { theme, toggleTheme };
}

function getThemeFromLocalStore(): Theme {
  const theme = localStorage.getItem('COLOR_THEME') as Theme;
  if (theme === 'dark' || theme === 'light') return theme;
  return 'light';
}

function getThemeFromMediaQuery(): Theme {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (isDark) return 'dark';
  return 'light';
}
