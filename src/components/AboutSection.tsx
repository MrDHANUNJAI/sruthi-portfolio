import React from 'react';
import { User, Briefcase, GraduationCap, Globe, CheckCircle2, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#17131F] text-[#F5F1FA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#C5A6FF] text-sm font-semibold tracking-wider uppercase mb-3 block">
            Professional Profile
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            About Sruthi Kristipati
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7446F5] to-[#C5A6FF] mx-auto rounded-full mb-6" />
          <p className="text-[#F5F1FA]/80 text-base sm:text-lg leading-relaxed">
            Combining editorial design precision, social media strategy, and advanced AI workflows to elevate brand presence globally.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Card / Stats */}
          <div className="lg:col-span-5 bg-[#231B30]/60 backdrop-blur-xl border border-[#7446F5]/30 rounded-3xl p-8 shadow-2xl relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#7446F5]/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7446F5] to-[#C5A6FF] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-[#7446F5]/40">
                SK
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{PERSONAL_INFO.name}</h3>
                <p className="text-[#C5A6FF] text-xs font-medium">Digital Marketing & Creative Lead</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-[#C5A6FF] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-[#C5A6FF]/70 block font-medium">Experience</span>
                  <span className="text-sm font-semibold text-white">~3 Years in Social Media, Meta Ads & Content</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#C5A6FF] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-[#C5A6FF]/70 block font-medium">Education</span>
                  <span className="text-sm font-semibold text-white">{PERSONAL_INFO.education}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-[#C5A6FF] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-[#C5A6FF]/70 block font-medium">Languages</span>
                  <span className="text-sm font-semibold text-white">{PERSONAL_INFO.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <span className="text-xs font-semibold text-[#C5A6FF] uppercase tracking-wider block mb-3">
                Core Toolkit
              </span>
              <div className="flex flex-wrap gap-2">
                {PERSONAL_INFO.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-xl bg-[#7446F5]/20 border border-[#7446F5]/40 text-[#F5F1FA] text-xs font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F1FA] leading-snug">
              Crafting Digital Narratives & Driving Measurable Brand Growth
            </h3>
            
            <p className="text-[#F5F1FA]/80 leading-relaxed text-base sm:text-lg">
              As a dedicated <strong className="text-[#C5A6FF]">Social Media & Digital Marketing Executive</strong> based in Dubai and India, I specialize in building resonant brand identities, executing high-converting Meta Ads campaigns, and producing engaging short-form video content like Instagram Reels.
            </p>

            <p className="text-[#F5F1FA]/80 leading-relaxed text-base sm:text-lg">
              My professional journey includes key roles at <strong className="text-white">Ombrè Attire Fashion Boutique Trading LLC (Dubai)</strong> and <strong className="text-white">Vision 4 U Digital Solution</strong>, alongside extensive freelance creative execution. I seamlessly merge human creative direction with advanced AI workflows (ChatGPT, prompt engineering) to optimize content calendars, copywriting, and market research.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                "Meta Ads Setup & Lead Generation",
                "Instagram Reels & Video Editing",
                "Brand Promotion & Graphic Design",
                "AI-Assisted Creative Workflows",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-[#231B30]/40 p-3.5 rounded-2xl border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A6FF] shrink-0" />
                  <span className="text-sm font-medium text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
