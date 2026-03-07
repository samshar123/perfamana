import api from './config';
import type { FAQ } from './types';

export const faqApi = {
  // Get all FAQs
  getFAQs: async (): Promise<FAQ[]> => {
    const response = await api.get('/faq/');
    return response.data;
  },
};

export default faqApi;
