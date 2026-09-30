import { ImpactStats } from '../types';

export const impactStatsData: ImpactStats = {
  animalsInCare: 78,
  totalRescues: 412,
  successfulAdoptions: 247,
  sterilizationsTNR: 680,
  activeVolunteers: 64,
  emergencyTreatmentsThisMonth: 38,
  lastUpdated: 'Updated weekly'
};

export const impactBreakdown = [
  {
    title: 'Emergency Medical Interventions',
    stat: '100%',
    description: 'Every rescue undergoes prompt clinical triage, rabies vaccination, and diagnostic evaluation regardless of condition.'
  },
  {
    title: 'Biraal Bari Lifelong Sanctuary',
    stat: '40+',
    description: 'Permanent sanctuary residents with amputations, blindness, or chronic needs provided loving lifelong care.'
  },
  {
    title: 'Adoption Matching Protocol',
    stat: '96%',
    description: 'Successful forever placements sustained through pre-adoption home safety reviews and follow-up care guidance.'
  },
  {
    title: 'Community TNR & Vaccination',
    stat: '680+',
    description: 'Humane street animal population stabilization and rabies control across Dhaka neighborhoods.'
  }
];
