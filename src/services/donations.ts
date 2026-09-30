import { DonationRecord } from '../types';

const STORAGE_KEY = 'anirban_donations_history';

export const donationsService = {
  async processDonation(
    donationData: Omit<DonationRecord, 'id' | 'receiptNumber' | 'date' | 'status'>
  ): Promise<DonationRecord> {
    // Simulate payment processing latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    const receiptNumber = `ABT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const record: DonationRecord = {
      ...donationData,
      id: `don-${Date.now()}`,
      receiptNumber,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: 'Completed'
    };

    try {
      const existingStr = localStorage.getItem(STORAGE_KEY);
      const existing: DonationRecord[] = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage error while saving donation', e);
    }

    return record;
  },

  async getDonationHistory(): Promise<DonationRecord[]> {
    try {
      const existingStr = localStorage.getItem(STORAGE_KEY);
      return existingStr ? JSON.parse(existingStr) : [];
    } catch {
      return [];
    }
  }
};
