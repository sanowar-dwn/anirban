import { storiesData } from '../data/stories';
import { Story } from '../types';

export const storiesService = {
  async getStories(category?: string): Promise<Story[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    if (!category || category === 'All') {
      return [...storiesData];
    }
    return storiesData.filter(s => s.category.toLowerCase() === category.toLowerCase());
  },

  async getStoryBySlug(slug: string): Promise<Story | null> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    const story = storiesData.find(s => s.slug === slug);
    return story || null;
  },

  async getFeaturedStory(): Promise<Story | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    const featured = storiesData.find(s => s.isFeatured);
    return featured || storiesData[0] || null;
  },

  async getRelatedStories(currentSlug: string, limit: number = 2): Promise<Story[]> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return storiesData.filter(s => s.slug !== currentSlug).slice(0, limit);
  }
};
