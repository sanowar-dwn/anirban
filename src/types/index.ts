export type AnimalStatus = 
  | 'Available for Adoption' 
  | 'Under Care' 
  | 'Sanctuary Resident' 
  | 'Recently Rescued' 
  | 'Adopted';

export type AnimalSpecies = 'Cat' | 'Dog' | 'Other';
export type AnimalGender = 'Male' | 'Female';
export type AnimalAgeGroup = 'Kitten/Puppy' | 'Young' | 'Adult' | 'Senior';

export interface MedicalTimelineEvent {
  step: 'Rescued' | 'Assessment' | 'Treatment' | 'Recovery' | 'Current Status';
  date: string;
  title: string;
  description: string;
  location?: string;
  completed: boolean;
}

export interface CareRequirements {
  indoorOnly: boolean;
  specialDiet?: string;
  dailyMedication?: string;
  catFriendly?: boolean;
  dogFriendly?: boolean;
  kidFriendly?: boolean;
  notes: string[];
}

export interface Animal {
  id: string;
  slug: string;
  name: string;
  species: AnimalSpecies;
  breed: string;
  gender: AnimalGender;
  age: string;
  ageGroup: AnimalAgeGroup;
  status: AnimalStatus;
  location: string;
  isBiraalBariResident: boolean;
  yearsInCare?: string;
  specialNeeds?: string[];
  personality: string[];
  shortDescription: string;
  fullStory: string;
  rescueStorySummary: string;
  images: string[];
  featuredImage: string;
  medicalHistory: MedicalTimelineEvent[];
  careRequirements: CareRequirements;
  isFeatured?: boolean;
  monthlySponsorshipNeededBDT?: number;
  currentSponsorsCount?: number;
  rescueDate: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Rescue Stories' | 'Sanctuary' | 'Adoption Stories' | 'News' | 'Community' | 'Education';
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  heroImage: string;
  images?: string[];
  summary: string;
  content: string[]; // paragraph blocks
  quote?: {
    text: string;
    author: string;
  };
  featuredAnimalSlug?: string;
  relatedAnimals?: string[];
  tags: string[];
  isFeatured?: boolean;
}

export interface ImpactStats {
  animalsInCare: number;
  totalRescues: number;
  successfulAdoptions: number;
  sterilizationsTNR: number;
  activeVolunteers: number;
  emergencyTreatmentsThisMonth: number;
  lastUpdated: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Leadership' | 'Veterinary & Care' | 'Sanctuary Team' | 'Rescue Operations';
  bio: string;
  image: string;
}

export interface RescueReport {
  id: string;
  ticketId: string;
  animalType: string;
  locationArea: string;
  exactAddress: string;
  city: string;
  condition: string;
  injuryDetails: string;
  numberOfAnimals: number;
  priority: 'Critical' | 'Urgent' | 'Non-emergency';
  reporterName: string;
  reporterPhone: string;
  reporterEmail?: string;
  notes?: string;
  photoSimulationUrls?: string[];
  createdAt: string;
  status: 'Pending Review' | 'Dispatched' | 'Rescued' | 'In Treatment';
}

export interface AdoptionApplication {
  id: string;
  submittedAt: string;
  animalSlug: string;
  animalName: string;
  applicant: {
    fullName: string;
    email: string;
    phone: string;
    occupation: string;
    nidOrPassport: string;
    address: string;
    city: string;
  };
  home: {
    housingType: 'Apartment' | 'Independent House' | 'Other';
    ownOrRent: 'Own' | 'Rent';
    landlordAllowsPets: boolean;
    hasBalconyNetting: boolean;
    familyMembersCount: number;
    familyAllAgree: boolean;
  };
  experience: {
    hasPetsCurrently: boolean;
    hadPetsPast: boolean;
    veterinarianContact?: string;
    dailyHoursAlone: string;
    emergencyPlan: string;
  };
  notes: string;
  status: 'Under Review' | 'Interview Scheduled' | 'Home Visit' | 'Approved';
}

export interface DonationRecord {
  id: string;
  receiptNumber: string;
  amountBDT: number;
  frequency: 'one-time' | 'monthly';
  purpose: 'General Care' | 'Medical Care' | 'Biraal Bari' | 'Rescue Operations' | 'Animal Sponsorship';
  animalSlug?: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  paymentMethod: 'bKash' | 'Nagad' | 'Visa/Mastercard' | 'Bank Transfer';
  date: string;
  status: 'Completed';
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  occupation: string;
  selectedRoles: string[];
  availableDays: string[];
  hoursPerWeek: string;
  priorAnimalExperience: string;
  motivation: string;
  submittedAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Rescue' | 'Biraal Bari' | 'Adoption' | 'Volunteers' | 'Events';
  imageUrl: string;
  caption: string;
  date: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}
