import React, { useState } from 'react';
import type { FormData } from '../types';
import { CROP_OPTIONS, SOIL_TYPES, IRRIGATION_METHODS } from '../constants';
import { ImageUpload } from './ImageUpload';

interface InputFormProps {
  onPredict: (formData: FormData) => void;
  isLoading: boolean;
  t: (key: any) => string;
}

const initialFormData: FormData = {
  crop: '',
  location: '',
  soilPh: 6.5,
  nitrogen: 120,
  phosphorus: 50,
  potassium: 80,
  soilMoisture: 60,
  soilType: '',
  irrigationMethod: '',
  cropImage: null,
};

export const InputForm: React.FC<InputFormProps> = ({ onPredict, isLoading, t }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'crop' || name === 'location' || name === 'soilType' || name === 'irrigationMethod' ? value : parseFloat(value),
    }));
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleImageChange = (image: { mimeType: string; data: string } | null) => {
    setFormData((prev) => ({ ...prev, cropImage: image }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };
  
  const FormRow: React.FC<{ label: string; name: keyof FormData; children: React.ReactNode }> = ({ label, name, children }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1">{children}</div>
    </div>
  );
  
  const Slider: React.FC<{ label: string; name: keyof FormData; min: number; max: number; step: number; value: number; unit?: string }> = ({ label, name, min, max, step, value, unit}) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center mt-1 space-x-4">
        <input
          type="range"
          id={name}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <span className="text-sm font-semibold text-gray-700 w-20 text-center">{value}{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="mt-8 bg-white p-8 shadow-lg rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormRow label={t('crop')} name="crop">
                <select id="crop" name="crop" value={formData.crop} onChange={handleChange} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md" >
                  <option value="" disabled>{t('selectCrop')}</option>
                  {CROP_OPTIONS.map((crop) => (<option key={crop} value={crop}>{crop}</option>))}
                </select>
            </FormRow>
            <FormRow label={t('location')} name="location">
                 <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder={t('enterLocation')} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </FormRow>
            <FormRow label={t('soilType')} name="soilType">
                <select id="soilType" name="soilType" value={formData.soilType} onChange={handleChange} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                  <option value="" disabled>{t('selectSoilType')}</option>
                  {SOIL_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </FormRow>
             <FormRow label={t('irrigationMethod')} name="irrigationMethod">
                <select id="irrigationMethod" name="irrigationMethod" value={formData.irrigationMethod} onChange={handleChange} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                  <option value="" disabled>{t('selectIrrigationMethod')}</option>
                  {IRRIGATION_METHODS.map(method => <option key={method} value={method}>{method}</option>)}
                </select>
            </FormRow>
        </div>
        
        <div className="space-y-4">
           <Slider label={t('soilPh')} name="soilPh" min={4} max={9} step={0.1} value={formData.soilPh} />
           <Slider label={t('soilMoisture')} name="soilMoisture" min={10} max={100} step={1} value={formData.soilMoisture} unit="%" />
           <Slider label={t('nitrogen')} name="nitrogen" min={0} max={300} step={5} value={formData.nitrogen} unit=" kg/ha" />
           <Slider label={t('phosphorus')} name="phosphorus" min={0} max={150} step={5} value={formData.phosphorus} unit=" kg/ha" />
           <Slider label={t('potassium')} name="potassium" min={0} max={200} step={5} value={formData.potassium} unit=" kg/ha" />
        </div>

        <div>
            <ImageUpload onImageChange={handleImageChange} t={t} />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (formData.cropImage ? t('analyzingImage') : t('loadingPrediction')) : t('predictYield')}
          </button>
        </div>
      </form>
    </div>
  );
};