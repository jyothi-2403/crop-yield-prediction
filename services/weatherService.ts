import type { RealTimeWeather } from '../types';

// This is a mock function. In a real application, you would fetch this data
// from a weather API like OpenWeatherMap using the location and an API key
// stored in environment variables (e.g., process.env.WEATHER_API_KEY).
export const getRealTimeWeather = async (location: string): Promise<RealTimeWeather> => {
  console.log(`Fetching weather for ${location}...`);

  // Simulate network delay to mimic a real API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate a possible error for a specific location for testing purposes
  if (location.trim().toLowerCase() === 'error') {
    throw new Error('Invalid location provided. Please try again.');
  }
  
  if (location.trim() === '') {
    throw new Error('Location cannot be empty.');
  }

  // Return mock data. The structure should match what a real API would provide.
  // In a real implementation, you would transform the API response to this structure.
  return {
    temperature: 28.5,
    humidity: 65,
    condition: 'Partly Cloudy',
    windSpeed: 15,
  };
};
