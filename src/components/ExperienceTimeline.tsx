import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-[#120E17] text-[#F5F1FA] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#C5A6FF] text-sm font-semibold tracking-wider uppercase mb-3 block">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7446F5] to-[#C5A6FF] mx-auto rounded-full mb-6" />
          <p className="text-[#F5F1FA]/80 text-base sm:text-lg leading-relaxed">
            Resume-supported roles spanning digital marketing execution, social media management, and creative multimedia production.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-[#7446F5]/40 ml-4 sm:ml-8 space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 sm:pl-12 group">
              {/* Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#7446F5] border-4 border-[#120E17] group-hover:scale-125 transition-transform shadow-lg shadow-[#7446F5]/50" />

              <div className="bg-[#1D1726]/80 backdrop-blur-xl border border-[#7446F5]/30 rounded-3xl p-6 sm:p-8 shadow-xl group-hover:border-[#7446F5] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#7446F5]/20 text-[#C5A6FF] text-xs font-semibold w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-[#C5A6FF] mb-6 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </span>
                </div>

                <ul className="space-y-3">
                  {exp.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#F5F1FA]/80 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#7446F5] mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
