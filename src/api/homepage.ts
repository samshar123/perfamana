import api from './config';
import type { PartnerBrand } from './types';

export const homepageApi = {
  // Get partner brands
  getPartnerBrands: async (): Promise<PartnerBrand[]> => {
    const response = await api.get('/homepage/partner-brands/');
    return response.data;
  },
};

export default homepageApi;
