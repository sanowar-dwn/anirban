import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Heart, 
  Search, 
  Menu, 
  X, 
  AlertTriangle, 
  PhoneCall,
  PawPrint,
  Home,
  Sparkles
} from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { Button } from '../ui/Button';
import { GlobalSearchModal } from './GlobalSearchModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { favoritesCount } = useFavorites();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'About', path: '/about' },
    { label: 'Our Work', path: '/our-work' },
    { label: 'Animals', path: '/animals' },
    { 
      label: 'Biraal Bari', 
      path: '/biraal-bari',
      highlight: true
    },
    { label: 'Stories', path: '/stories' },
    { label: 'Get Involved', path: '/get-involved' },
    { label: 'Contact', path: '/contact' }
  ];

  const isAnimalProfilePage = location.pathname.startsWith('/animals/') && location.pathname !== '/animals';

  return (
    <>
      {/* Emergency rescue top mini-bar */}
      <div className="bg-[#132E22] text-[#FAF8F5] text-xs py-2 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E88667] animate-ping" />
            <span className="font-medium text-white/90 hidden sm:inline">
              Emergency Rescue Helpline (Dhaka):
            </span>
            <a 
              href="tel:+8801700000000" 
              className="font-bold text-[#F2B73B] hover:underline flex items-center gap-1 text-[11px] sm:text-xs"
            >
              <PhoneCall className="w-3 h-3 inline" /> +880 1700-000000
            </a>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              to="/report-rescue" 
              className="hover:text-[#F2B73B] transition-colors flex items-center gap-1 font-medium text-[11px] sm:text-xs"
            >
              <AlertTriangle className="w-3 h-3 text-[#E88667]" />
              <span>Report Injured</span>
            </Link>
            <span className="text-white/40 hidden md:inline">|</span>
            <Link to="/volunteer" className="hover:text-white/80 transition-colors hidden md:inline text-xs">
              Volunteer
            </Link>
          </div>
        </div>
      </div>

      {/* Main sticky navigation bar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-[#D8CEBE]/80 py-2.5 sm:py-3'
            : 'bg-[#FAF8F5] border-b border-[#EAE4D7] py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1A382B] text-[#FAF8F5] flex items-center justify-center shadow-xs group-hover:bg-[#132E22] transition-colors shrink-0">
                <PawPrint className="w-4 h-4 sm:w-5 sm:h-5 text-[#F2B73B]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1E2421] leading-none group-hover:text-[#1A382B] transition-colors">
                  AniRBan<span className="text-[#C65332]">.</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-widest text-[#75837B] mt-0.5">
                  Trust Bangladesh
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'text-[#1A382B] bg-[#EDF8F3] font-semibold'
                        : link.highlight
                        ? 'text-[#C65332] hover:bg-[#FDF5F2]'
                        : 'text-[#3E4742] hover:text-[#1E2421] hover:bg-[#F3EFE8]'
                    }`
                  }
                >
                  {link.label}
                  {link.highlight && (
                    <span className="ml-1 text-[10px] bg-[#FACFC2] text-[#893720] px-1.5 py-0.2 rounded-full">
                      Sanctuary
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Search button */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="p-2 rounded-full text-[#3E4742] hover:text-[#1E2421] hover:bg-[#F3EFE8] transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
                aria-label="Open search dialog"
                title="Search (Ctrl + K)"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Saved animals counter */}
              <Link
                to="/animals?favorites=true"
                className="relative p-2 rounded-full text-[#3E4742] hover:text-[#C65332] hover:bg-[#F3EFE8] transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
                aria-label="View saved favorite animals"
                title="Saved Animals"
              >
                <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-[#C65332] fill-[#C65332]' : ''}`} />
                {favoritesCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#C65332] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Prominent Donate Button on Desktop */}
              <Link to="/donate" className="hidden sm:inline-block">
                <Button variant="terracotta" size="md">
                  Donate Now
                </Button>
              </Link>

              {/* Mobile hamburger menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="lg:hidden p-2 rounded-xl text-[#1E2421] hover:bg-[#F3EFE8] active:bg-[#EAE4D7] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer touch-manipulation relative z-10"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#C65332]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer MOUNTED TO DOCUMENT BODY VIA PORTAL */}
      {/* This guarantees no backdrop-filter or sticky parent can trap or break fixed positioning when scrolled! */}
      {typeof document !== 'undefined' && mobileMenuOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] lg:hidden flex flex-col bg-[#FAF8F5] animate-in fade-in duration-200"
          style={{ height: '100dvh', width: '100vw' }}
        >
          {/* Drawer Top Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAE4D7] bg-[#FAF8F5] shrink-0">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#1A382B] text-white flex items-center justify-center shadow-xs">
                <PawPrint className="w-4 h-4 text-[#F2B73B]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-[#1E2421]">
                  AniRBan<span className="text-[#C65332]">.</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#75837B]">Trust Bangladesh</span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-full text-[#1E2421] hover:bg-[#F3EFE8] active:bg-[#EAE4D7] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-[#1E2421]" />
            </button>
          </div>

          {/* Drawer Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 pb-24">
            <Link to="/donate" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="terracotta" size="lg" className="w-full justify-center shadow-md">
                Donate to AniRBan Trust
              </Button>
            </Link>

            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-2xl text-base font-semibold text-[#1E2421] hover:bg-[#F3EFE8] active:bg-[#EAE4D7] transition-colors"
                >
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="text-xs bg-[#FACFC2] text-[#893720] px-2.5 py-0.5 rounded-full font-bold">
                      Sanctuary
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Emergency & Hotline Card */}
            <div className="border-t border-[#EAE4D7] pt-5 space-y-3">
              <Link
                to="/report-rescue"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-4 rounded-2xl bg-[#FDF5F2] border border-[#FACFC2] text-[#893720] active:scale-[0.99] transition-transform"
              >
                <AlertTriangle className="w-6 h-6 text-[#C65332] shrink-0" />
                <div>
                  <p className="text-sm font-bold">Report an Injured Animal</p>
                  <p className="text-xs text-[#A74327]">24/7 emergency rescue triage dispatch</p>
                </div>
              </Link>

              <div className="p-4 rounded-2xl bg-[#EDF8F3] border border-[#B0DECB] text-[#1D4336]">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#2F624D]">Direct Rescue Hotline</p>
                <a href="tel:+8801700000000" className="text-xl font-bold font-serif text-[#1A382B] block mt-1">
                  +880 1700-000000
                </a>
                <p className="text-xs text-[#3C7D63] mt-1">Serving Greater Dhaka Division</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      {/* Mobile Floating Bottom Bar */}
      {!isAnimalProfilePage && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#D8CEBE] px-4 py-2 flex items-center justify-around pb-safe shadow-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-3 text-[10px] font-medium transition-colors ${
                isActive ? 'text-[#1A382B] font-bold' : 'text-[#75837B]'
              }`
            }
          >
            <Home className="w-4 h-4 mb-0.5" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/animals"
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-3 text-[10px] font-medium transition-colors ${
                isActive ? 'text-[#1A382B] font-bold' : 'text-[#75837B]'
              }`
            }
          >
            <PawPrint className="w-4 h-4 mb-0.5" />
            <span>Animals</span>
          </NavLink>

          <Link
            to="/report-rescue"
            className="flex flex-col items-center py-1 px-2 text-[10px] font-bold text-[#C65332]"
          >
            <div className="w-7 h-7 rounded-full bg-[#FACFC2] flex items-center justify-center mb-0.5 text-[#893720]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span>Report</span>
          </Link>

          <Link
            to="/biraal-bari"
            className="flex flex-col items-center py-1 px-3 text-[10px] font-medium text-[#75837B]"
          >
            <Sparkles className="w-4 h-4 mb-0.5 text-[#1A382B]" />
            <span>Sanctuary</span>
          </Link>

          <Link
            to="/donate"
            className="flex flex-col items-center py-1 px-3 text-[10px] font-bold text-[#C65332]"
          >
            <Heart className="w-4 h-4 mb-0.5 fill-[#C65332]" />
            <span>Donate</span>
          </Link>
        </div>
      )}
    </>
  );
};
