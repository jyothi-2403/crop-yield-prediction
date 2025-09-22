
import React from 'react';
import type { Recommendation } from '../types';
import { RecommendationType } from '../types';
import { DropIcon } from './icons/DropIcon';
import { BugIcon } from './icons/BugIcon';
import { SproutIcon } from './icons/SproutIcon';
import { InfoIcon } from './icons/InfoIcon';


const getIconForType = (type: RecommendationType) => {
  switch (type) {
    case RecommendationType.IRRIGATION:
      return <DropIcon className="w-8 h-8 text-blue-500" />;
    case RecommendationType.FERTILIZATION:
      return <SproutIcon className="w-8 h-8 text-green-500" />;
    case RecommendationType.PEST_CONTROL:
      return <BugIcon className="w-8 h-8 text-red-500" />;
    default:
      return <InfoIcon className="w-8 h-8 text-gray-500" />;
  }
};

export const Recommendations: React.FC<{ recommendations: Recommendation[], t: (key: any) => string }> = ({ recommendations, t }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{t('actionableRecommendations')}</h3>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 mr-4">
              {getIconForType(rec.type)}
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{rec.title}</h4>
              <p className="text-gray-600 mt-1">{rec.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
