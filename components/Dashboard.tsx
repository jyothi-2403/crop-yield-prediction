import React, { useState } from 'react';
import type { FormData, PredictionData } from '../types';
import { InputForm } from './InputForm';
import { PredictionCard } from './PredictionCard';
import { WeatherCard } from './WeatherCard';
import { SoilCard } from './SoilCard';
import { Recommendations } from './Recommendations';
import { LoadingSpinner } from './LoadingSpinner';
import { Calendar } from './Calendar';
import { DiseaseCard } from './DiseaseCard';
import { FertilizerCard } from './FertilizerCard';
import { CropHealthAnalysisCard } from './CropHealthAnalysisCard';


interface DashboardProps {
  onPredict: (formData: FormData) => void;
  predictionData: PredictionData | null;
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
  t: (key: any) => string;
}

export const Dashboard: React.FC<DashboardProps> = ({ onPredict, predictionData, isLoading, loadingMessage, error, t }) => {
  const [formVisible, setFormVisible] = useState(true);

  const handlePredict = (formData: FormData) => {
    onPredict(formData);
    setFormVisible(false);
  }

  const handleClear = () => {
    setFormVisible(true);
  }

  return (
    <div className="container mx-auto">
      {formVisible && !isLoading && !predictionData && !error && (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900">{t('cropYieldPrediction')}</h2>
            <p className="mt-2 text-lg text-center text-gray-600">{t('cropYieldPredictionDesc')}</p>
            <InputForm onPredict={handlePredict} isLoading={isLoading} t={t} />
        </div>
      )}

      {isLoading && <LoadingSpinner message={loadingMessage} />}

      {error && (
        <div className="text-center p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-red-800">{t('errorWeather')}</h3>
            <p className="mt-2 text-md text-gray-600">{error.replace(`${t('errorWeather')}: `, '')}</p>
            <p className="mt-2 text-sm text-gray-500">{t('tryAgain')}</p>
            <button
              onClick={() => { setFormVisible(true); }}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {t('clear')}
            </button>
        </div>
      )}

      {predictionData && !isLoading && !error && (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <PredictionCard data={predictionData.yieldPrediction} t={t} />
                <WeatherCard data={predictionData.weather} t={t}/>
                <SoilCard data={predictionData.soilHealth} t={t} />
                <DiseaseCard data={predictionData.diseaseAndPestControl} t={t} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {predictionData.cropImageAnalysis && predictionData.cropImage && (
                <div className="lg:col-span-1">
                  <CropHealthAnalysisCard 
                    analysis={predictionData.cropImageAnalysis} 
                    image={predictionData.cropImage} 
                    t={t} 
                  />
                </div>
              )}

              <div className={predictionData.cropImageAnalysis ? "lg:col-span-2 space-y-6" : "lg:col-span-3 space-y-6"}>
                  <FertilizerCard data={predictionData.fertilizerSuggestions} t={t} />
                  <Recommendations recommendations={predictionData.recommendations} t={t} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <Calendar events={predictionData.calendarEvents} t={t} />
            </div>
            
             <div className="text-center mt-8">
               <button
                  onClick={handleClear}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {t('clear')}
                </button>
            </div>
        </div>
      )}
    </div>
  );
};