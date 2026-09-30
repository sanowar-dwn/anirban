import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, Share2, ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { ShareModal } from '../components/ui/ShareModal';
import { StoryCard } from '../components/common/StoryCard';
import { AnimalCard } from '../components/common/AnimalCard';
import { storiesService } from '../services/stories';
import { animalsService } from '../services/animals';
import { Story, Animal } from '../types';

export const StoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [relatedStories, setRelatedStories] = useState<Story[]>([]);
  const [featuredAnimal, setFeaturedAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const item = await storiesService.getStoryBySlug(slug);
        setStory(item);
        if (item) {
          const related = await storiesService.getRelatedStories(item.slug, 2);
          setRelatedStories(related);
          if (item.featuredAnimalSlug) {
            const animal = await animalsService.getAnimalBySlug(item.featuredAnimalSlug);
            setFeaturedAnimal(animal);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-[#75837B]">
        Loading article...
      </div>
    );
  }

  if (!story) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold">Story Not Found</h2>
        <Link to="/stories">
          <Button variant="primary" size="md">
            Return to Stories Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* Top Header & Breadcrumbs */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Breadcrumbs
              items={[
                { label: 'Stories', href: '/stories' },
                { label: story.title }
              ]}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShareOpen(true)}
              icon={<Share2 className="w-3.5 h-3.5" />}
            >
              Share
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-[#75837B]">
              <span className="font-bold text-[#C65332] uppercase tracking-wider">
                {story.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {story.publishedDate}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {story.readTime}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1E2421] leading-tight">
              {story.title}
            </h1>

            <p className="text-base sm:text-xl text-[#59655E] font-light leading-relaxed">
              {story.subtitle}
            </p>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#EAE4D7]">
              <img
                src={story.author.avatar}
                alt={story.author.name}
                className="w-11 h-11 rounded-full object-cover border border-[#D8CEBE]"
              />
              <div>
                <p className="text-sm font-bold text-[#1E2421]">{story.author.name}</p>
                <p className="text-xs text-[#75837B]">{story.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Editorial Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-[#D8CEBE] aspect-[16/9] bg-[#EAE4D7]">
          <img src={story.heroImage} alt={story.title} className="w-full h-full object-cover" />
        </div>

        {/* Paragraphs and Pull-quote */}
        <div className="prose prose-lg max-w-none text-[#2C332F] space-y-6 leading-relaxed text-base sm:text-lg font-light">
          {story.content.map((p, idx) => (
            <React.Fragment key={idx}>
              <p>{p}</p>
              {idx === 1 && story.quote && (
                <div className="my-10 p-8 rounded-2xl bg-[#FDF5F2] border-l-4 border-[#C65332] text-[#893720]">
                  <p className="font-serif text-xl sm:text-2xl font-bold italic mb-2">
                    "{story.quote.text}"
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#A74327]">
                    — {story.quote.author}
                  </p>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Featured Animal Mention */}
        {featuredAnimal && (
          <div className="bg-[#FAF8F5] rounded-3xl border border-[#D8CEBE] p-6 sm:p-8 mt-12 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C65332] block">
              Animal Featured in this Story
            </span>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={featuredAnimal.featuredImage}
                alt={featuredAnimal.name}
                className="w-28 h-28 rounded-2xl object-cover shrink-0"
              />
              <div className="flex-1 space-y-1 text-center sm:text-left">
                <h3 className="font-serif text-2xl font-bold text-[#1E2421]">{featuredAnimal.name}</h3>
                <p className="text-xs text-[#75837B]">{featuredAnimal.species} · {featuredAnimal.status} at {featuredAnimal.location}</p>
                <p className="text-xs text-[#59655E] italic mt-1">"{featuredAnimal.shortDescription}"</p>
              </div>
              <Link to={`/animals/${featuredAnimal.slug}`} className="shrink-0">
                <Button variant="terracotta" size="md">
                  Meet {featuredAnimal.name}
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="pt-6 border-t border-[#EAE4D7] flex flex-wrap gap-2">
          {story.tags.map((t, i) => (
            <span key={i} className="text-xs bg-[#F3EFE8] text-[#59655E] px-3 py-1 rounded-full font-medium">
              #{t}
            </span>
          ))}
        </div>
      </section>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <h3 className="font-serif text-2xl font-bold text-[#1E2421] mb-6">
            Continue Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedStories.map((rel) => (
              <StoryCard key={rel.id} story={rel} />
            ))}
          </div>
        </section>
      )}

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={story.title}
        url={window.location.href}
      />
    </div>
  );
};
