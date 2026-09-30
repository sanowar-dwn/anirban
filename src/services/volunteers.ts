import { VolunteerApplication } from '../types';

const STORAGE_KEY = 'anirban_volunteer_applications';

export const volunteersService = {
  async submitVolunteerApplication(
    data: Omit<VolunteerApplication, 'id' | 'submittedAt'>
  ): Promise<VolunteerApplication> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const application: VolunteerApplication = {
      ...data,
      id: `vol-${Date.now()}`,
      submittedAt: new Date().toISOString()
    };

    try {
      const existingStr = localStorage.getItem(STORAGE_KEY);
      const existing: VolunteerApplication[] = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(application);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage error while saving volunteer application', e);
    }

    return application;
  }
};
