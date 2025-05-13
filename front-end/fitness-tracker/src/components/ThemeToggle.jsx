import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.theme === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.theme = dark ? 'dark' : 'light';
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)} className="text-sm">
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}