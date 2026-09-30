import { AdoptionApplication } from '../types';

const STORAGE_KEY = 'anirban_adoption_applications';

export const adoptionsService = {
  async submitAdoptionApplication(
    data: Omit<AdoptionApplication, 'id' | 'submittedAt' | 'status'>
  ): Promise<AdoptionApplication> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newApplication: AdoptionApplication = {
      ...data,
      id: `adopt-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'Under Review'
    };

    try {
      const existingStr = localStorage.getItem(STORAGE_KEY);
      const existing: AdoptionApplication[] = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(newApplication);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage error while saving adoption application', e);
    }

    return newApplication;
  },

  async getStoredApplications(): Promise<AdoptionApplication[]> {
    try {
      const existingStr = localStorage.getItem(STORAGE_KEY);
      return existingStr ? JSON.parse(existingStr) : [];
    } catch (e) {
      console.warn('LocalStorage retrieval error', e);
      return [];
    }
  }
};
