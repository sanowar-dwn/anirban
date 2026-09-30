import { animalsData } from '../data/animals';
import { Animal, AnimalStatus } from '../types';

export interface AnimalFilterOptions {
  species?: string;
  status?: AnimalStatus | 'All';
  ageGroup?: string;
  gender?: string;
  specialNeedsOnly?: boolean;
  biraalBariOnly?: boolean;
  searchQuery?: string;
  sortBy?: 'newest' | 'name' | 'urgency';
}

export const animalsService = {
  async getAnimals(filters?: AnimalFilterOptions): Promise<Animal[]> {
    // Simulate slight asynchronous fetch (like a Django REST API)
    await new Promise((resolve) => setTimeout(resolve, 60));

    let result = [...animalsData];

    if (!filters) return result;

    if (filters.species && filters.species !== 'All') {
      result = result.filter(a => a.species.toLowerCase() === filters.species!.toLowerCase());
    }

    if (filters.status && filters.status !== 'All') {
      result = result.filter(a => a.status === filters.status);
    }

    if (filters.ageGroup && filters.ageGroup !== 'All') {
      result = result.filter(a => a.ageGroup === filters.ageGroup);
    }

    if (filters.gender && filters.gender !== 'All') {
      result = result.filter(a => a.gender === filters.gender);
    }

    if (filters.specialNeedsOnly) {
      result = result.filter(a => a.specialNeeds && a.specialNeeds.length > 0);
    }

    if (filters.biraalBariOnly) {
      result = result.filter(a => a.isBiraalBariResident);
    }

    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.breed.toLowerCase().includes(q) ||
        a.shortDescription.toLowerCase().includes(q) ||
        a.personality.some(p => p.toLowerCase().includes(q))
      );
    }

    if (filters.sortBy) {
      if (filters.sortBy === 'name') {
        result.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filters.sortBy === 'newest') {
        result.sort((a, b) => new Date(b.rescueDate).getTime() - new Date(a.rescueDate).getTime());
      } else if (filters.sortBy === 'urgency') {
        result.sort((a, b) => (b.specialNeeds?.length || 0) - (a.specialNeeds?.length || 0));
      }
    }

    return result;
  },

  async getAnimalBySlug(slug: string): Promise<Animal | null> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    const animal = animalsData.find(a => a.slug === slug);
    return animal || null;
  },

  async getFeaturedAnimals(): Promise<Animal[]> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    return animalsData.filter(a => a.isFeatured);
  },

  async getSanctuaryResidents(): Promise<Animal[]> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    return animalsData.filter(a => a.isBiraalBariResident);
  },

  async getRelatedAnimals(slug: string, limit: number = 3): Promise<Animal[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return animalsData.filter(a => a.slug !== slug).slice(0, limit);
  }
};
