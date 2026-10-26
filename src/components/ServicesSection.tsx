import React from 'react';
import { 
  Share2, TrendingUp, Video, Palette, Sparkles, 
  Target, Calendar, Clapperboard, Cpu, Compass, Check 
} from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

const iconMap: Record<string, React.ReactNode> = {
  Share2: <Share2 className="w-6 h-6 text-[#C5A6FF]" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-[#C5A6FF]" />,
  Video: <Video className="w-6 h-6 text-[#C5A6FF]" />,
  Palette: <Palette className="w-6 h-6 text-[#C5A6FF]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#C5A6FF]" />,
  Target: <Target className="w-6 h-6 text-[#C5A6FF]" />,
  Calendar: <Calendar className="w-6 h-6 text-[#C5A6FF]" />,
  Clapperboard: <Clapperboard className="w-6 h-6 text-[#C5A6FF]" />,
  Cpu: <Cpu className="w-6 h-6 text-[#C5A6FF]" />,
  Compass: <Compass className="w-6 h-6 text-[#C5A6FF]" />,
};

interface ServicesSectionProps {
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="services" className="py-24 bg-[#120E17] text-[#F5F1FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#C5A6FF] text-sm font-semibold tracking-wider uppercase mb-3 block">
            Expertise & Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Professional Services
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7446F5] to-[#C5A6FF] mx-auto rounded-full mb-6" />
          <p className="text-[#F5F1FA]/80 text-base sm:text-lg leading-relaxed">
            Ten core marketing and creative disciplines delivered with professional precision and aesthetic excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-[#1D1726]/80 backdrop-blur-xl border border-[#7446F5]/20 rounded-3xl p-8 hover:border-[#7446F5] hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between shadow-xl group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#7446F5]/20 border border-[#7446F5]/40 flex items-center justify-center mb-6 group-hover:bg-[#7446F5] transition-colors">
                  {iconMap[service.iconName] || <Sparkles className="w-6 h-6 text-[#C5A6FF]" />}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C5A6FF] transition-colors">
                  {service.title}
                </h3>

                <p className="text-[#F5F1FA]/70 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <span className="text-xs font-semibold text-[#C5A6FF] uppercase tracking-wider block mb-3">
                  Key Deliverables
                </span>
                <ul className="space-y-2">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#F5F1FA]/90">
                      <Check className="w-3.5 h-3.5 text-[#7446F5]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenContact}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#7446F5] to-[#9260F6] text-white font-semibold text-base shadow-xl shadow-[#7446F5]/40 hover:scale-105 transition-all"
          >
            Inquire About Custom Projects
          </button>
        </div>
      </div>
    </section>
  );
};
