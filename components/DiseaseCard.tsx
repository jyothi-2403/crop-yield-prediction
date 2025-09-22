import React from 'react';
import type { DiseaseAndPestControl } from '../types';
import { VirusIcon } from './icons/VirusIcon';

interface DiseaseCardProps {
    data: DiseaseAndPestControl[];
    t: (key: any) => string;
}

const ConfidenceBadge: React.FC<{ value: number }> = ({ value }) => {
    const percentage = Math.round(value * 100);
    // FIX: Corrected a typo in the function declaration from 'constgetColor' to 'const getColor'.
    const getColor = () => {
        if (percentage > 70) return 'bg-red-100 text-red-800';
        if (percentage > 40) return 'bg-yellow-100 text-yellow-800';
        return 'bg-blue-100 text-blue-800';
    }
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getColor()}`}>
            {percentage}%
        </span>
    );
};

export const DiseaseCard: React.FC<DiseaseCardProps> = ({ data, t }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <VirusIcon className="w-6 h-6 mr-2 text-amber-600" />
                {t('diseaseAndPestControl')}
            </h3>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {data.length > 0 ? data.map((item, index) => (
                    <div key={index} className="border-b pb-2">
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-md text-gray-800">{item.threat}</h4>
                            <ConfidenceBadge value={item.confidence} />
                        </div>
                        <p className="text-sm text-gray-600"><span className="font-semibold">{t('symptoms')}:</span> {item.symptoms}</p>
                        <p className="text-sm text-gray-600 mt-1"><span className="font-semibold">{t('controlMethod')}:</span> {item.controlMethod}</p>
                    </div>
                )) : <p className="text-sm text-gray-500">No significant threats detected.</p>}
            </div>
        </div>
    );
};