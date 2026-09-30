import { impactStatsData, impactBreakdown } from '../data/impact';
import { ImpactStats } from '../types';

export const impactService = {
  async getImpactStats(): Promise<ImpactStats> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return { ...impactStatsData };
  },

  async getImpactBreakdown() {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return [...impactBreakdown];
  }
};
