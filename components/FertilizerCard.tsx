import React from 'react';
import type { FertilizerSuggestions } from '../types';
import { FlaskIcon } from './icons/FlaskIcon';

interface FertilizerCardProps {
    data: FertilizerSuggestions;
    t: (key: any) => string;
}

export const FertilizerCard: React.FC<FertilizerCardProps> = ({ data, t }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FlaskIcon className="w-6 h-6 mr-2 text-teal-600" />
                {t('fertilizerSuggestions')}
            </h3>
            <p className="text-sm text-gray-600 mb-6 italic">{data.overallRecommendation}</p>
            
            <div className="space-y-6">
                {data.stages.map((stage, index) => (
                    <div key={index} className="border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-bold text-lg text-gray-800">{stage.stage}</h4>
                        <p className="text-sm text-gray-500 mt-1 mb-4">{stage.recommendation}</p>
                        
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('nutrient')}</th>
                                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('recommendedProduct')}</th>
                                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('applicationRate')}</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {stage.nutrients.map((nutrient, nutrientIndex) => (
                                        <tr key={nutrientIndex}>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{nutrient.nutrient}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{nutrient.product}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-semibold">{nutrient.rate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};