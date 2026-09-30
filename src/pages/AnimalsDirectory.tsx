import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  SlidersHorizontal, 
  X,
  RotateCcw
} from 'lucide-react';
import { AnimalCard } from '../components/common/AnimalCard';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { AnimalCardSkeleton } from '../components/ui/LoadingSkeleton';
import { animalsService } from '../services/animals';
import { Animal, AnimalStatus } from '../types';
import { useFavorites } from '../context/FavoritesContext';

export const AnimalsDirectory: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const { isFavorite, favorites } = useFavorites();

  // Filters State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'All');
  const [speciesFilter, setSpeciesFilter] = useState<string>(searchParams.get('species') || 'All');
  const [genderFilter, setGenderFilter] = useState<string>('All');
  const [ageGroupFilter, setAgeGroupFilter] = useState<string>('All');
  const [specialNeedsOnly, setSpecialNeedsOnly] = useState<boolean>(false);
  const [biraalBariOnly, setBiraalBariOnly] = useState<boolean>(searchParams.get('sanctuary') === 'true');
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(searchParams.get('favorites') === 'true');
  const [sortBy, setSortBy] = useState<'newest' | 'name' | 'urgency'>('newest');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await animalsService.getAnimals();
        setAnimals(res);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Update favorites if query changes
  useEffect(() => {
    if (searchParams.get('favorites') === 'true') {
      setFavoritesOnly(true);
    }
  }, [searchParams]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setSpeciesFilter('All');
    setGenderFilter('All');
    setAgeGroupFilter('All');
    setSpecialNeedsOnly(false);
    setBiraalBariOnly(false);
    setFavoritesOnly(false);
    setSortBy('newest');
    setSearchParams({});
  };

  const filteredAnimals = useMemo(() => {
    let list = [...animals];

    if (favoritesOnly) {
      list = list.filter(a => isFavorite(a.slug));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.breed.toLowerCase().includes(q) ||
        a.species.toLowerCase().includes(q) ||
        a.personality.some(p => p.toLowerCase().includes(q)) ||
        a.location.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'All') {
      list = list.filter(a => a.status === statusFilter);
    }

    if (speciesFilter !== 'All') {
      list = list.filter(a => a.species.toLowerCase() === speciesFilter.toLowerCase());
    }

    if (genderFilter !== 'All') {
      list = list.filter(a => a.gender === genderFilter);
    }

    if (ageGroupFilter !== 'All') {
      list = list.filter(a => a.ageGroup === ageGroupFilter);
    }

    if (specialNeedsOnly) {
      list = list.filter(a => a.specialNeeds && a.specialNeeds.length > 0);
    }

    if (biraalBariOnly) {
      list = list.filter(a => a.isBiraalBariResident);
    }

    if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.rescueDate).getTime() - new Date(a.rescueDate).getTime());
    } else if (sortBy === 'urgency') {
      list.sort((a, b) => (b.specialNeeds?.length || 0) - (a.specialNeeds?.length || 0));
    }

    return list;
  }, [
    animals,
    searchQuery,
    statusFilter,
    speciesFilter,
    genderFilter,
    ageGroupFilter,
    specialNeedsOnly,
    biraalBariOnly,
    favoritesOnly,
    sortBy,
    favorites,
    isFavorite
  ]);

  const hasActiveFilters = 
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    speciesFilter !== 'All' ||
    genderFilter !== 'All' ||
    ageGroupFilter !== 'All' ||
    specialNeedsOnly ||
    biraalBariOnly ||
    favoritesOnly;

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE4D7] pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Animal Directory' }]} className="mb-6" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#C65332] mb-2 block">
                Directory & Profiles
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#1E2421]">
                {favoritesOnly ? 'Your Saved Animals' : 'Our Rescued Residents'}
              </h1>
              <p className="text-sm sm:text-base text-[#59655E] mt-2 max-w-2xl">
                Browse our courageous cats, dogs, and sanctuary residents. Filter by adoption readiness, sanctuary status, age, or special needs.
              </p>
            </div>

            {/* Quick Favorites Toggle */}
            <button
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                favoritesOnly
                  ? 'bg-[#FDF5F2] border-[#C65332] text-[#893720]'
                  : 'bg-[#FAF8F5] border-[#D8CEBE] text-[#3E4742] hover:bg-[#F3EFE8]'
              }`}
            >
              <Heart className={`w-4 h-4 ${favoritesOnly ? 'text-[#C65332] fill-[#C65332]' : ''}`} />
              <span>Saved Animals ({favorites.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-[#FAF8F5] rounded-2xl border border-[#D8CEBE] p-6 space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE4D7]">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1E2421]">
                  <SlidersHorizontal className="w-4 h-4 text-[#1A382B]" />
                  <span>Filter Animals</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-[#C65332] hover:underline flex items-center gap-1 font-medium"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#75837B] mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3 py-2 text-xs text-[#1E2421] outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Available for Adoption">Available for Adoption</option>
                  <option value="Sanctuary Resident">Sanctuary Resident (Biraal Bari)</option>
                  <option value="Under Care">Under Medical Care</option>
                  <option value="Recently Rescued">Recently Rescued</option>
                </select>
              </div>

              {/* Species Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#75837B] mb-2">
                  Species
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['All', 'Cat', 'Dog'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeciesFilter(s)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                        speciesFilter === s
                          ? 'bg-[#1A382B] text-white border-[#1A382B]'
                          : 'bg-[#FDFCF9] border-[#D8CEBE] text-[#59655E] hover:bg-[#F3EFE8]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Group */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#75837B] mb-2">
                  Age
                </label>
                <select
                  value={ageGroupFilter}
                  onChange={(e) => setAgeGroupFilter(e.target.value)}
                  className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3 py-2 text-xs text-[#1E2421] outline-none"
                >
                  <option value="All">Any Age</option>
                  <option value="Kitten/Puppy">Kitten / Puppy</option>
                  <option value="Young">Young (1-2 years)</option>
                  <option value="Adult">Adult (2-6 years)</option>
                  <option value="Senior">Senior (6+ years)</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#75837B] mb-2">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['All', 'Female', 'Male'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGenderFilter(g)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                        genderFilter === g
                          ? 'bg-[#1A382B] text-white border-[#1A382B]'
                          : 'bg-[#FDFCF9] border-[#D8CEBE] text-[#59655E] hover:bg-[#F3EFE8]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-[#EAE4D7] space-y-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1E2421] font-medium">
                  <input
                    type="checkbox"
                    checked={biraalBariOnly}
                    onChange={(e) => setBiraalBariOnly(e.target.checked)}
                    className="rounded border-[#D8CEBE] text-[#1A382B] focus:ring-[#1A382B]"
                  />
                  <span>Biraal Bari Sanctuary Only</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1E2421] font-medium">
                  <input
                    type="checkbox"
                    checked={specialNeedsOnly}
                    onChange={(e) => setSpecialNeedsOnly(e.target.checked)}
                    className="rounded border-[#D8CEBE] text-[#1A382B] focus:ring-[#1A382B]"
                  />
                  <span>Special Needs (Amputee/Blind/Deaf)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Main Grid */}
          <div className="lg:col-span-9 space-y-6">
            {/* Search bar & Controls Bar */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-[#D8CEBE] p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#75837B]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, personality, breed..."
                  className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-[#1E2421] outline-none focus:border-[#1A382B]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#75837B] hover:text-[#1E2421]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Right tools */}
              <div className="flex items-center justify-between sm:justify-end gap-2">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#D8CEBE] bg-[#FDFCF9] text-xs font-semibold text-[#1E2421]"
                >
                  <Filter className="w-3.5 h-3.5 text-[#1A382B]" />
                  <span>Filters {hasActiveFilters ? '•' : ''}</span>
                </button>

                {/* Sort selector */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl px-3 py-2 text-xs font-medium text-[#1E2421] outline-none"
                >
                  <option value="newest">Sort: Recently Rescued</option>
                  <option value="name">Sort: Alphabetical (A-Z)</option>
                  <option value="urgency">Sort: Special Needs First</option>
                </select>

                {/* Grid / List toggle */}
                <div className="flex items-center p-1 bg-[#F3EFE8] rounded-xl border border-[#D8CEBE]">
                  <button
                    onClick={() => setLayout('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${layout === 'grid' ? 'bg-white shadow-xs text-[#1A382B]' : 'text-[#75837B]'}`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayout('list')}
                    className={`p-1.5 rounded-lg transition-colors ${layout === 'list' ? 'bg-white shadow-xs text-[#1A382B]' : 'text-[#75837B]'}`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-[#75837B]">Active filters:</span>
                {statusFilter !== 'All' && (
                  <span className="inline-flex items-center gap-1 text-xs bg-[#FAF8F5] border border-[#D8CEBE] px-2.5 py-1 rounded-full text-[#1E2421]">
                    Status: {statusFilter}
                    <X className="w-3 h-3 cursor-pointer text-[#75837B] hover:text-[#1E2421]" onClick={() => setStatusFilter('All')} />
                  </span>
                )}
                {speciesFilter !== 'All' && (
                  <span className="inline-flex items-center gap-1 text-xs bg-[#FAF8F5] border border-[#D8CEBE] px-2.5 py-1 rounded-full text-[#1E2421]">
                    Species: {speciesFilter}
                    <X className="w-3 h-3 cursor-pointer text-[#75837B] hover:text-[#1E2421]" onClick={() => setSpeciesFilter('All')} />
                  </span>
                )}
                {biraalBariOnly && (
                  <span className="inline-flex items-center gap-1 text-xs bg-[#FDF5F2] border border-[#FACFC2] px-2.5 py-1 rounded-full text-[#893720]">
                    Biraal Bari Only
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setBiraalBariOnly(false)} />
                  </span>
                )}
                {specialNeedsOnly && (
                  <span className="inline-flex items-center gap-1 text-xs bg-[#FDF5F2] border border-[#FACFC2] px-2.5 py-1 rounded-full text-[#893720]">
                    Special Needs Only
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSpecialNeedsOnly(false)} />
                  </span>
                )}
                {favoritesOnly && (
                  <span className="inline-flex items-center gap-1 text-xs bg-[#FDF5F2] border border-[#FACFC2] px-2.5 py-1 rounded-full text-[#893720]">
                    Favorites Only
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setFavoritesOnly(false)} />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#C65332] hover:underline font-semibold ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="flex items-center justify-between text-xs text-[#75837B]">
              <span>Showing <strong>{filteredAnimals.length}</strong> animals</span>
            </div>

            {/* Animals Display */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(n => <AnimalCardSkeleton key={n} />)}
              </div>
            ) : filteredAnimals.length === 0 ? (
              <EmptyState
                title="No animals match your filters"
                description="Try clearing some filter criteria, broadening your search term, or browsing all available animals."
                actionText="Reset All Filters"
                onAction={handleResetFilters}
              />
            ) : layout === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnimals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAnimals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} layout="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE4D7]">
              <h3 className="font-serif text-lg font-bold text-[#1E2421]">Filters & Categories</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-[#75837B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter controls inside mobile sheet */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#75837B] mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-[#FDFCF9] border border-[#D8CEBE] rounded-xl p-2 text-sm"
                >
                  <option value="All">All Statuses</option>
                  <option value="Available for Adoption">Available for Adoption</option>
                  <option value="Sanctuary Resident">Sanctuary Resident</option>
                  <option value="Under Care">Under Medical Care</option>
                  <option value="Recently Rescued">Recently Rescued</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#75837B] mb-1">Species</label>
                <div className="grid grid-cols-3 gap-2">
                  {['All', 'Cat', 'Dog'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSpeciesFilter(s)}
                      className={`p-2 rounded-xl text-xs font-medium border text-center ${
                        speciesFilter === s ? 'bg-[#1A382B] text-white' : 'bg-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={biraalBariOnly}
                    onChange={(e) => setBiraalBariOnly(e.target.checked)}
                  />
                  <span>Biraal Bari Sanctuary Only</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={specialNeedsOnly}
                    onChange={(e) => setSpecialNeedsOnly(e.target.checked)}
                  />
                  <span>Special Needs Only</span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={handleResetFilters}
                className="flex-1"
              >
                Reset
              </Button>
              <Button
                variant="terracotta"
                size="md"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
