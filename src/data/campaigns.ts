export interface Campaign {
  id: string;
  slug: string;
  title: string;
  goalBDT: number;
  raisedBDT: number;
  donorsCount: number;
  tagline: string;
  description: string;
  image: string;
  urgency: 'Critical' | 'Ongoing' | 'Seasonal';
}

export const campaignsData: Campaign[] = [
  {
    id: 'camp-1',
    slug: 'biraal-bari-winter-warmth-medical',
    title: 'Winter Warmth & Medical Care for Biraal Bari',
    goalBDT: 350000,
    raisedBDT: 245000,
    donorsCount: 118,
    tagline: 'Providing heating pads, orthopedic beds, and specialized therapeutic diets for 40+ permanent residents.',
    description: 'During damp winter months, our senior and arthritic sanctuary cats require supplemental ceramic heaters, fleece bedding, and extra joint medication.',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80',
    urgency: 'Seasonal'
  },
  {
    id: 'camp-2',
    slug: 'emergency-veterinary-trauma-fund',
    title: 'Emergency Veterinary Trauma Fund',
    goalBDT: 500000,
    raisedBDT: 380000,
    donorsCount: 204,
    tagline: 'Life-saving surgical interventions and diagnostic X-rays for severe road traffic accident victims.',
    description: 'Every week, AniRBan receives reports of animals with fractured limbs or internal trauma. This fund ensures no animal is turned away for lack of surgical funding.',
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
    urgency: 'Critical'
  },
  {
    id: 'camp-3',
    slug: 'dhaka-citywide-tnr-vaccine-drive',
    title: 'Dhaka Citywide TNR & Rabies Vaccine Drive',
    goalBDT: 250000,
    raisedBDT: 195000,
    donorsCount: 92,
    tagline: 'Sterilizing and immunizing 150 community cats and dogs to prevent cruelty and disease.',
    description: 'A humane, scientific solution to urban stray animal overpopulation and rabies eradication in Dhaka.',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    urgency: 'Ongoing'
  }
];
