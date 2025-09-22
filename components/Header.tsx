import React from 'react';
import type { Language } from '../types';
import { LANGUAGES } from '../constants';
import { LogoutIcon } from './icons/LogoutIcon';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
  t: (key: any) => string;
}

const LeafIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.25 4.5A6.75 6.75 0 0 0 4.5 11.25v2.643a.75.75 0 0 0 .75.75h2.643A6.75 6.75 0 0 0 18 11.25a.75.75 0 0 0-.75-.75h-2.643A6.75 6.75 0 0 0 11.25 4.5Z" />
      <path d="M12.75 16.5a.75.75 0 0 0-.75-.75h-2.643a6.75 6.75 0 0 0-6.75 6.75v.001A.75.75 0 0 0 3.357 24h1.992A6.75 6.75 0 0 0 12 17.25a.75.75 0 0 0 .75-.75Z" />
    </svg>
);


export const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange, onLogout, t }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <LeafIcon className="h-8 w-8 text-green-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-800 tracking-tight">{t('appTitle')}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div>
                <label htmlFor="language-select" className="sr-only">{t('language')}</label>
                <select
                  id="language-select"
                  value={currentLanguage}
                  onChange={(e) => onLanguageChange(e.target.value as Language)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  {LANGUAGES.map(({ code, label }) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
            </div>
            <button
                onClick={onLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
                <LogoutIcon className="w-5 h-5 mr-2 text-gray-500" />
                {t('logout')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
