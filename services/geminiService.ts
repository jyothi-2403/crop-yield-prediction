import { GoogleGenAI, Type, GenerateContentResponse, Part } from "@google/genai";
import type { FormData, PredictionData, Recommendation, RealTimeWeather } from '../types';
import { RecommendationType } from '../types';


const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    yieldPrediction: {
      type: Type.OBJECT,
      properties: {
        predictedYield: { type: Type.STRING },
        unit: { type: Type.STRING },
        confidence: { type: Type.NUMBER },
      },
    },
    weather: {
      type: Type.OBJECT,
      properties: {
        condition: { type: Type.STRING },
        temperature: { type: Type.STRING },
        humidity: { type: Type.STRING },
        forecast: { type: Type.STRING },
      },
    },
    soilHealth: {
      type: Type.OBJECT,
      properties: {
        status: { type: Type.STRING },
        recommendation: { type: Type.STRING },
      },
    },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, enum: Object.values(RecommendationType) },
          title: { type: Type.STRING },
          details: { type: Type.STRING },
        },
      },
    },
    calendarEvents: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING, description: "Date of the event in YYYY-MM-DD format." },
          title: { type: Type.STRING },
          details: { type: Type.STRING },
        }
      }
    },
    diseaseAndPestControl: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                threat: { type: Type.STRING, description: "Name of the potential disease or pest." },
                confidence: { type: Type.NUMBER, description: "Confidence score (0.0 to 1.0) of this threat occurring."},
                symptoms: { type: Type.STRING },
                controlMethod: { type: Type.STRING },
            }
        }
    },
    fertilizerSuggestions: {
        type: Type.OBJECT,
        properties: {
            overallRecommendation: { type: Type.STRING },
            stages: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        stage: { type: Type.STRING, description: "e.g., 'Basal Application (At Planting)' or 'Top Dressing (45 Days After Sowing)'" },
                        recommendation: { type: Type.STRING, description: "A brief recommendation for this specific stage." },
                        nutrients: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    nutrient: { type: Type.STRING, description: "e.g., Nitrogen (N)" },
                                    product: { type: Type.STRING, description: "e.g., Urea, DAP, MOP" },
                                    rate: { type: Type.STRING, description: "e.g., '50 kg/ha'" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    cropImageAnalysis: { type: Type.STRING, description: "A detailed analysis of the provided crop image, focusing on visible signs of disease, pests, or nutrient deficiencies. If no image was provided, this should be null." },
  },
};

export const getAIEnhancedCropPrediction = async (
  formData: FormData,
  weatherData: RealTimeWeather,
  language: string
): Promise<PredictionData> => {
  const { crop, location, soilPh, nitrogen, phosphorus, potassium, soilMoisture, soilType, irrigationMethod, cropImage } = formData;

  const prompt = `
    Act as an expert agricultural AI assistant named AgroYield AI.
    Your task is to provide a detailed crop yield prediction and actionable recommendations for a farmer based on their input, real-time weather data, and an optional crop image.

    **Farmer's Input Data:**
    - Crop: ${crop}
    - Location: ${location}
    - Soil pH: ${soilPh}
    - Current Nitrogen Level: ${nitrogen} kg/ha
    - Current Phosphorus Level: ${phosphorus} kg/ha
    - Current Potassium Level: ${potassium} kg/ha
    - Soil Moisture: ${soilMoisture}%
    - Soil Type: ${soilType}
    - Irrigation Method: ${irrigationMethod}

    **Real-time Weather Data:**
    - Condition: ${weatherData.condition}
    - Temperature: ${weatherData.temperature}°C
    - Humidity: ${weatherData.humidity}%
    - Wind Speed: ${weatherData.windSpeed} km/h

    **Your Instructions:**
    1.  **Analyze**: Based on all provided data (farmer's input, real-time weather, and the attached image if available), and your vast knowledge of historical agricultural data, weather patterns, and soil science.
    2.  **Image Analysis (If image provided)**: The user has uploaded an image of their crop. Analyze it closely for any visible signs of disease, pest infestation, or nutrient deficiencies. Your analysis should be detailed and directly inform the 'diseaseAndPestControl' and 'fertilizerSuggestions' sections. Populate the 'cropImageAnalysis' field with your findings. If no issues are visible, state that the plant appears healthy.
    3.  **Predict Yield**: Estimate the potential crop yield. Provide a numerical value and a unit (e.g., "tonnes/ha"). Also provide a confidence score (0.0 to 1.0).
    4.  **Disease & Pest Control**: Identify 1-2 major potential diseases or pests. If an image was provided, this section MUST be primarily based on the visual analysis. If not, base it on general knowledge for the crop/location. For each, provide the threat name, a confidence score of it appearing, common symptoms, and a recommended control method.
    5.  **Fertilizer Suggestions**: Provide a multi-stage fertilizer plan. Start with an 'overallRecommendation'. Then, define 2-3 distinct 'stages' (e.g., "Basal Dose at Planting", "Top Dressing at 30 days"). For each stage, provide a brief 'recommendation' and a list of 'nutrients'. Each nutrient entry must specify the 'nutrient' (e.g., "Nitrogen (N)"), a specific fertilizer 'product' to use (e.g., "Urea", "DAP"), and the application 'rate' (e.g., "50 kg/ha"). Base this on the soil data, crop type, and image analysis if available.
    6.  **Soil Health & Irrigation**: Generate a soil health analysis and a specific irrigation recommendation, taking into account the soil type, moisture, and irrigation method provided.
    7.  **Generate Calendar Events**: Create a list of important agricultural events for the next 3 months.
    8.  **Language**: All text output MUST be in ${language}.

    Provide your response in a structured JSON format. If no image was provided, the 'cropImageAnalysis' field must be null. Do not include any text outside of the JSON object.
  `;

  try {
    const textPart = { text: prompt };
    const parts: Part[] = [textPart];

    if (cropImage) {
        const imagePart = {
            inlineData: {
                mimeType: cropImage.mimeType,
                data: cropImage.data,
            },
        };
        parts.push(imagePart);
    }
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: parts },
        config: {
            responseMimeType: 'application/json',
            responseSchema: responseSchema,
        },
    });

    const jsonString = response.text.trim();
    const parsedData = JSON.parse(jsonString) as PredictionData;

    // Ensure recommendations have valid types, falling back to General if not.
    const validatedRecommendations = (parsedData.recommendations || []).map((rec: Recommendation) => ({
        ...rec,
        type: Object.values(RecommendationType).includes(rec.type) ? rec.type : RecommendationType.GENERAL,
    }));
    
    const validatedCalendarEvents = parsedData.calendarEvents || [];
    const validatedDiseaseAndPestControl = parsedData.diseaseAndPestControl || [];
    const validatedFertilizerSuggestions = parsedData.fertilizerSuggestions || { overallRecommendation: '', stages: []};


    return { 
        ...parsedData, 
        recommendations: validatedRecommendations, 
        calendarEvents: validatedCalendarEvents,
        diseaseAndPestControl: validatedDiseaseAndPestControl,
        fertilizerSuggestions: validatedFertilizerSuggestions,
        cropImageAnalysis: parsedData.cropImageAnalysis || null
    };
  } catch (error) {
    console.error("Error fetching crop prediction:", error);
    throw new Error("Failed to get a valid prediction from the AI model.");
  }
};