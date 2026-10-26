import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0A12] text-[#F5F1FA] py-16 border-t border-[#7446F5]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7446F5] to-[#C5A6FF] flex items-center justify-center text-white font-bold text-lg shadow-lg">
            SK
          </div>
          <div>
            <span className="text-white font-bold tracking-tight block">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[#C5A6FF] text-xs font-medium">
              Social Media & Digital Marketing Executive
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-[#C5A6FF]/80">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="text-xs text-[#F5F1FA]/60 text-center md:text-right">
          <p>© {currentYear} {PERSONAL_INFO.name}. All rights reserved.</p>
          <p className="mt-1 flex items-center justify-center md:justify-end gap-1">
            <span>Built with editorial precision & Gemini AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
