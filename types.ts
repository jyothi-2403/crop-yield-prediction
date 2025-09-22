export type Language = 'en' | 'es' | 'hi';

export interface FormData {
  crop: string;
  location: string;
  soilPh: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  soilMoisture: number;
  soilType: string;
  irrigationMethod: string;
  cropImage: { mimeType: string; data: string } | null;
}

export interface RealTimeWeather {
  temperature: number; // in Celsius
  humidity: number; // in percentage
  condition: string;
  windSpeed: number; // in km/h
}

export interface YieldPrediction {
  predictedYield: string;
  unit: string;
  confidence: number;
}

export interface Weather {
  condition: string;
  temperature: string;
  humidity: string;
  forecast: string;
}

export interface SoilHealth {
  status: string;
  recommendation: string;
}

export enum RecommendationType {
    IRRIGATION = "Irrigation",
    FERTILIZATION = "Fertilization",
    PEST_CONTROL = "Pest Control",
    GENERAL = "General"
}

export interface Recommendation {
  type: RecommendationType;
  title: string;
  details: string;
}

export interface CalendarEvent {
  date: string; // YYYY-MM-DD
  title: string;
  details: string;
}

export interface DiseaseAndPestControl {
  threat: string;
  confidence: number;
  symptoms: string;
  controlMethod: string;
}

export interface FertilizerStageNutrient {
    nutrient: string; // e.g., "Nitrogen (N)"
    product: string; // e.g., "Urea"
    rate: string; // e.g., "50 kg/ha"
}

export interface FertilizerStage {
    stage: string; // e.g., "Basal Application (At Planting)"
    recommendation: string; // e.g., "Apply a foundational dose..."
    nutrients: FertilizerStageNutrient[];
}

export interface FertilizerSuggestions {
    overallRecommendation: string;
    stages: FertilizerStage[];
}


export interface PredictionData {
  yieldPrediction: YieldPrediction;
  weather: Weather;
  soilHealth: SoilHealth;
  recommendations: Recommendation[];
  calendarEvents: CalendarEvent[];
  diseaseAndPestControl: DiseaseAndPestControl[];
  fertilizerSuggestions: FertilizerSuggestions;
  cropImageAnalysis: string | null;
  cropImage?: { mimeType: string; data: string } | null;
}

export type TranslationKey = 
  | 'appTitle'
  | 'language'
  | 'cropYieldPrediction'
  | 'cropYieldPredictionDesc'
  | 'crop'
  | 'location'
  | 'soilPh'
  | 'nitrogen'
  | 'phosphorus'
  | 'potassium'
  | 'predictYield'
  | 'loadingPrediction'
  | 'loadingWeather'
  | 'yieldPrediction'
  | 'weatherForecast'
  | 'soilHealth'
  | 'actionableRecommendations'
  | 'errorPrefix'
  | 'errorWeather'
  | 'unknownError'
  | 'footerText'
  | 'selectCrop'
  | 'enterLocation'
  | 'predictionConfidence'
  | 'soilStatus'
  | 'soilRecommendation'
  | 'temperature'
  | 'humidity'
  | 'forecast'
  | 'tryAgain'
  | 'clear'
  | 'login'
  | 'welcomeBack'
  | 'loginPrompt'
  | 'email'
  | 'password'
  | 'logout'
  | 'agriculturalCalendar'
  | 'noEvents'
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december'
  | 'sun'
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat'
  | 'diseaseAndPestControl'
  | 'potentialThreat'
  | 'confidence'
  | 'symptoms'
  | 'controlMethod'
  | 'fertilizerSuggestions'
  | 'nutrient'
  | 'recommendedApplication'
  | 'reasoning'
  | 'soilMoisture'
  | 'soilType'
  | 'irrigationMethod'
  | 'selectSoilType'
  | 'selectIrrigationMethod'
  | 'uploadCropImage'
  | 'uploadCropImageDesc'
  | 'useCamera'
  | 'or'
  | 'uploadFile'
  | 'analyzingImage'
  | 'cropHealthAnalysis'
  | 'imageAnalysis'
  | 'removeImage'
  | 'capture'
  | 'fertilizerStage'
  | 'recommendedProduct'
  | 'applicationRate'
  ;