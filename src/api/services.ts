import api from './config';
import type { Service } from './types';

export const servicesApi = {
  // Get all services
  getServices: async (): Promise<Service[]> => {
    const response = await api.get('/services/');
    return response.data.services;
  },

  // Get single service by slug
  getServiceBySlug: async (slug: string): Promise<Service> => {
    const response = await api.get(`/services/${slug}/`);
    return response.data;
  },
};

export default servicesApi;
