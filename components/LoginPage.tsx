import React from 'react';
import type { Language } from '../types';
import { LANGUAGES } from '../constants';

interface LoginPageProps {
  onLoginSuccess: () => void;
  t: (key: any) => string;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const LeafIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.25 4.5A6.75 6.75 0 0 0 4.5 11.25v2.643a.75.75 0 0 0 .75.75h2.643A6.75 6.75 0 0 0 18 11.25a.75.75 0 0 0-.75-.75h-2.643A6.75 6.75 0 0 0 11.25 4.5Z" />
      <path d="M12.75 16.5a.75.75 0 0 0-.75-.75h-2.643a6.75 6.75 0 0 0-6.75 6.75v.001A.75.75 0 0 0 3.357 24h1.992A6.75 6.75 0 0 0 12 17.25a.75.75 0 0 0 .75-.75Z" />
    </svg>
);

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, t, currentLanguage, onLanguageChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd have validation and an API call here.
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center items-center p-4">
       <div className="absolute top-4 right-4">
            <label htmlFor="language-select-login" className="sr-only">{t('language')}</label>
            <select
              id="language-select-login"
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              {LANGUAGES.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
        </div>
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
            <LeafIcon className="h-16 w-16 text-green-600 mx-auto" />
            <h1 className="mt-4 text-3xl font-bold text-gray-800 tracking-tight">{t('appTitle')}</h1>
            <h2 className="mt-2 text-2xl font-semibold text-gray-700">{t('welcomeBack')}</h2>
            <p className="mt-1 text-gray-500">{t('loginPrompt')}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              defaultValue="farmer@agroyield.ai"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-700">{t('password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              defaultValue="password123"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {t('login')}
            </button>
          </div>
        </form>
      </div>
       <footer className="text-center p-4 text-sm text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} {t('footerText')}</p>
      </footer>
    </div>
  );
};