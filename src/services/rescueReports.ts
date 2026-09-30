import { RescueReport } from '../types';

const STORAGE_KEY = 'anirban_rescue_reports';

export const rescueReportsService = {
  async submitRescueReport(
    reportData: Omit<RescueReport, 'id' | 'ticketId' | 'createdAt' | 'status'>
  ): Promise<RescueReport> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const ticketId = `EMERGENCY-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReport: RescueReport = {
      ...reportData,
      id: `report-${Date.now()}`,
      ticketId,
      createdAt: new Date().toISOString(),
      status: 'Pending Review'
    };

    try {
      const existingStr = localStorage.getItem(STORAGE_KEY);
      const existing: RescueReport[] = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(newReport);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage error while saving rescue report', e);
    }

    return newReport;
  },

  async getStoredRescueReports(): Promise<RescueReport[]> {
    try {
      const existingStr = localStorage.getItem(STORAGE_KEY);
      return existingStr ? JSON.parse(existingStr) : [];
    } catch {
      return [];
    }
  }
};
