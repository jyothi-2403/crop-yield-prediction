import React from 'react';
import { MicroscopeIcon } from './icons/MicroscopeIcon';

interface CropHealthAnalysisCardProps {
  image: { mimeType: string; data: string };
  analysis: string;
  t: (key: any) => string;
}

export const CropHealthAnalysisCard: React.FC<CropHealthAnalysisCardProps> = ({ image, analysis, t }) => {
  const imageUrl = `data:${image.mimeType};base64,${image.data}`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <MicroscopeIcon className="w-6 h-6 mr-2 text-blue-600" />
        {t('cropHealthAnalysis')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <img src={imageUrl} alt="Analyzed Crop" className="rounded-lg shadow-sm w-full object-cover" />
        </div>
        <div className="md:col-span-2">
            <h4 className="font-semibold text-gray-700">{t('imageAnalysis')}:</h4>
            <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{analysis}</p>
        </div>
      </div>
    </div>
  );
};
