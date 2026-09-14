import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only after user has scrolled past hero top (e.g., 100px)
      if (window.scrollY > 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'NOSSA HISTÓRIA', href: '#nossa-historia' },
    { label: 'O EVENTO', href: '#o-evento' },
    { label: 'DRESS CODE', href: '#dress-code' },
    { label: 'PRESENTES', href: '#presentes' },
    { label: 'CONFIRMAR', href: '#confirmar-presenca' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible
          ? 'translate-y-0 opacity-100 shadow-xs backdrop-blur-md bg-[#F7F2E9]/95 border-b border-[#7F9078]/15'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left Monogram */}
        <a
          href="#topo"
          onClick={(e) => handleLinkClick(e, '#topo')}
          className="flex items-center group cursor-pointer"
          aria-label="Ir para o topo"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#7F9078]/40 flex items-center justify-center bg-white/80 shadow-xs group-hover:border-[#7F9078] group-hover:bg-white transition-all p-1 overflow-hidden">
            <img
              src="/monograma.png"
              alt="Monograma Gabriela e Carlos"
              className="w-full h-full object-contain"
            />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-[12px] lg:text-[13px] tracking-[0.18em] font-normal text-[#3E483D] hover:text-[#7F9078] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7F9078] hover:after:w-full after:transition-all after:duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            id="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-[#3E483D] hover:text-[#7F9078] hover:bg-black/5 focus:outline-hidden"
            aria-label="Alternar menu de navegação"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F7F2E9] border-b border-[#7F9078]/20 px-6 py-5 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-[13px] tracking-[0.16em] font-normal text-[#3E483D] hover:text-[#7F9078] py-2 border-b border-[#7F9078]/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
