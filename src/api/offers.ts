import api from './config';
import type { Brand, OffersData, Inquiry } from './types';

export const offersApi = {
  // Get all brands with their models and offers
  getOffersData: async (): Promise<OffersData> => {
    const response = await api.get('/offers-data/');
    return response.data;
  },

  // Get brands list (ViewSet endpoint)
  getBrands: async (): Promise<Brand[]> => {
    const response = await api.get('/brands/');
    return response.data;
  },

  // Get single brand by slug
  getBrandBySlug: async (slug: string): Promise<Brand> => {
    const response = await api.get(`/brands/${slug}/`);
    return response.data;
  },

  // Submit inquiry form
  submitInquiry: async (inquiryData: Omit<Inquiry, 'id' | 'created_at'>): Promise<Inquiry> => {
    const response = await api.post('/inquiries/', inquiryData);
    return response.data;
  },
};

export default offersApi;
