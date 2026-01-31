
import React from 'react';
import { ICONS } from '../constants';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#2F2F2F] transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <ICONS.Moon className="w-5 h-5 text-gray-600" />
      ) : (
        <ICONS.Sun className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
};
