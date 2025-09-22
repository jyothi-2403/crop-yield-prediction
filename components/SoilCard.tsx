
import React from 'react';
import type { SoilHealth } from '../types';
import { LeafIcon } from './icons/LeafIcon';

export const SoilCard: React.FC<{ data: SoilHealth, t: (key: any) => string }> = ({ data, t }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
        <LeafIcon className="w-6 h-6 mr-2 text-lime-600" />
        {t('soilHealth')}
      </h3>
      <div className="space-y-3 text-gray-600">
         <div className="flex justify-between items-center">
          <span className="font-medium">{t('soilStatus')}:</span>
          <span className="font-bold text-lg px-2 py-1 bg-green-100 text-green-800 rounded">{data.status}</span>
        </div>
        <div className="pt-2 border-t">
          <p className="font-medium">{t('soilRecommendation')}:</p>
          <p className="text-sm">{data.recommendation}</p>
        </div>
      </div>
    </div>
  );
};
