import { api } from './config';
import type { WhyUsFeature } from './types';

export const whyusApi = {
  // Get all Why Us features
  getWhyUsFeatures: async (): Promise<WhyUsFeature[]> => {
    const response = await api.get('/whyus/');
    return response.data;
  },
};
