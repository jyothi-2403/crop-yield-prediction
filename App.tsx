import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './components/LoginPage';
import type { FormData, PredictionData } from './types';
import { getAIEnhancedCropPrediction } from './services/geminiService';
import { getRealTimeWeather } from './services/weatherService';
import { Language } from './types';
import { useLocalization } from './hooks/useLocalization';
import { TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('en');
  const { t } = useLocalization(language);
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handlePrediction = useCallback(async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setPredictionData(null);
    try {
      setLoadingMessage(t('loadingWeather'));
      const weatherData = await getRealTimeWeather(formData.location);
      
      if (formData.cropImage) {
        setLoadingMessage(t('analyzingImage'));
      } else {
        setLoadingMessage(t('loadingPrediction'));
      }
      const languageName = TRANSLATIONS[language].name;
      const result = await getAIEnhancedCropPrediction(formData, weatherData, languageName);
      setPredictionData({ ...result, cropImage: formData.cropImage });
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('location')) {
          setError(`${t('errorWeather')}: ${err.message}`);
        } else {
          setError(`${t('errorPrefix')}: ${err.message}`);
        }
      } else {
        setError(t('unknownError'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [language, t]);
  
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setPredictionData(null);
    setError(null);
  }

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPredictionData(null);
    setError(null);
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLogin} t={t} currentLanguage={language} onLanguageChange={handleLanguageChange} />;
  }

  return (
    <div className="min-h-screen bg-stone-100 text-gray-800 font-sans">
      <Header 
        currentLanguage={language} 
        onLanguageChange={handleLanguageChange} 
        onLogout={handleLogout}
        t={t} 
      />
      <main className="p-4 sm:p-6 md:p-8">
        <Dashboard
          onPredict={handlePrediction}
          predictionData={predictionData}
          isLoading={isLoading}
          loadingMessage={loadingMessage}
          error={error}
          t={t}
        />
      </main>
      <footer className="text-center p-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} {t('footerText')}</p>
      </footer>
    </div>
  );
};

export default App;