import { api } from './config';
import type { Project } from './types';

export const projectsApi = {
  // Get all projects
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get('/projects/');
    return response.data;
  },

  // Get featured projects (first 4)
  getFeaturedProjects: async (): Promise<Project[]> => {
    const response = await api.get('/projects/featured/');
    return response.data;
  },

  // Get single project by slug
  getProjectBySlug: async (slug: string): Promise<Project> => {
    const response = await api.get(`/projects/${slug}/`);
    return response.data;
  },
};
