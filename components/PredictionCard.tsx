
import React from 'react';
import type { YieldPrediction } from '../types';

interface PredictionCardProps {
  data: YieldPrediction;
  t: (key: any) => string;
}

const Gauge: React.FC<{ value: number }> = ({ value }) => {
  const percentage = Math.max(0, Math.min(100, value * 100));
  const dashArray = 2 * Math.PI * 45;
  const dashOffset = dashArray - (dashArray * percentage) / 100;
  const colorClass = percentage > 75 ? 'stroke-green-500' : percentage > 50 ? 'stroke-yellow-500' : 'stroke-red-500';

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
        ></circle>
        <circle
          className={`transform -rotate-90 origin-center ${colorClass}`}
          strokeWidth="10"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
        ></circle>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-700">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};


export const PredictionCard: React.FC<PredictionCardProps> = ({ data, t }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('yieldPrediction')}</h3>
      <p className="text-4xl font-bold text-green-600">
        {data.predictedYield}
      </p>
      <p className="text-md text-gray-500">{data.unit}</p>
      <div className="mt-4 text-center">
        <p className="text-sm font-medium text-gray-500 mb-2">{t('predictionConfidence')}</p>
        <Gauge value={data.confidence} />
      </div>
    </div>
  );
};
