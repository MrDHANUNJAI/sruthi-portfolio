import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Videos', href: '#videos' },
    { name: 'Campaigns', href: '#campaigns' },
    { name: 'Experience', href: '#experience' },
    { name: 'AI Studio', href: '#aistudio' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#17131F]/90 backdrop-blur-md border-b border-[#7446F5]/20 py-3 shadow-xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo / Name */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7446F5] to-[#C5A6FF] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#7446F5]/40 group-hover:scale-105 transition-transform">
            SK
          </div>
          <div>
            <span className="text-white font-bold tracking-tight text-lg sm:text-xl block leading-tight">
              Sruthi Kristipati
            </span>
            <span className="text-[#C5A6FF] text-xs font-medium tracking-wide">
              Digital Marketing Executive
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[#F5F1FA]/80 hover:text-[#C5A6FF] text-sm font-medium transition-colors hover:scale-105 transform"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7446F5] to-[#9260F6] text-white font-medium text-sm shadow-lg shadow-[#7446F5]/30 hover:shadow-[#7446F5]/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C5A6FF]" />
            Let's Collaborate
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-[#231B30] text-[#C5A6FF] hover:bg-[#7446F5]/20 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#17131F]/95 backdrop-blur-xl border-b border-[#7446F5]/30 py-6 px-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[#F5F1FA] hover:text-[#C5A6FF] text-base font-medium py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-[#7446F5]" />
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7446F5] to-[#9260F6] text-white font-semibold text-sm shadow-lg shadow-[#7446F5]/40 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C5A6FF]" />
                Let's Collaborate
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
