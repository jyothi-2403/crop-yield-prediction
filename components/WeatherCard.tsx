
import React from 'react';
import type { Weather } from '../types';
import { SunIcon } from './icons/SunIcon';

export const WeatherCard: React.FC<{ data: Weather, t: (key: any) => string }> = ({ data, t }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
        <SunIcon className="w-6 h-6 mr-2 text-yellow-500" />
        {t('weatherForecast')}
      </h3>
      <div className="space-y-3 text-gray-600">
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('temperature')}:</span>
          <span className="font-bold text-lg">{data.temperature}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('humidity')}:</span>
          <span className="font-bold text-lg">{data.humidity}</span>
        </div>
         <div className="pt-2 border-t">
          <p className="font-medium">{t('forecast')}:</p>
          <p className="text-sm">{data.forecast}</p>
        </div>
      </div>
    </div>
  );
};
