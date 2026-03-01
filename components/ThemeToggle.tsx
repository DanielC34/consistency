'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:opacity-80 transition-all font-medium"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
    );
}
