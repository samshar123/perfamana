import api from './config';
import type { Event } from './types';

export const eventsApi = {
  // Get all events
  getEvents: async (): Promise<Event[]> => {
    const response = await api.get('/events/');
    return response.data;
  },

  // Get single event by slug
  getEventBySlug: async (slug: string): Promise<Event> => {
    const response = await api.get(`/events/${slug}/`);
    return response.data;
  },
};

export default eventsApi;
