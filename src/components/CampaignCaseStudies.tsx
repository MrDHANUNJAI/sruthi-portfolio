import React from 'react';
import { Target, Users, Lightbulb, CheckCircle2, TrendingUp } from 'lucide-react';

export const CampaignCaseStudies: React.FC = () => {
  const campaigns = [
    {
      id: "dubai-luxury-fashion",
      title: "Dubai Luxury Fashion Brand Scaling & Meta Ads Campaign",
      client: "Ombrè Attire Fashion Boutique Trading LLC",
      overview: "Strategic planning and execution of multi-channel digital campaigns tailored for Dubai's high-end fashion clientele.",
      objective: "Scale qualified customer acquisition and brand visibility across the UAE luxury retail market.",
      audience: "Affluent fashion enthusiasts, trendsetters, and boutique shoppers in Dubai and surrounding emirates.",
      strategy: "Leveraged hyper-segmented Meta Ads combined with high-aesthetic Instagram Reels and carousel graphics.",
      channels: ["Instagram", "Facebook", "Meta Ads Manager"],
    },
    {
      id: "digital-solution-branding",
      title: "Digital Solution Brand Promotion & Lead Pipeline",
      client: "Vision 4 U Digital Solution",
      overview: "Comprehensive content creation, promotional graphic design, and social media management for B2B and B2C clients.",
      objective: "Establish professional authority and drive consistent inbound inquiries through creative storytelling.",
      audience: "Small business owners, startups, and digital brands seeking marketing excellence.",
      strategy: "Rolled out structured monthly content calendars, engaging video reels, and striking visual posters crafted in Canva and Photoshop.",
      channels: ["LinkedIn", "Instagram", "Facebook"],
    },
  ];

  return (
    <section id="campaigns" className="py-24 bg-[#17131F] text-[#F5F1FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#C5A6FF] text-sm font-semibold tracking-wider uppercase mb-3 block">
            Strategic Storytelling
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Campaign Case Studies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7446F5] to-[#C5A6FF] mx-auto rounded-full mb-6" />
          <p className="text-[#F5F1FA]/80 text-base sm:text-lg leading-relaxed">
            In-depth breakdowns of objectives, target audience demographics, creative execution, and platform strategies.
          </p>
        </div>

        {/* Case Studies List */}
        <div className="space-y-12">
          {campaigns.map((camp, index) => (
            <div
              key={camp.id}
              className="bg-[#231B30]/70 backdrop-blur-xl border border-[#7446F5]/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7446F5]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs text-[#C5A6FF] font-semibold tracking-wider uppercase mb-2 block">
                    Case Study #{index + 1} — {camp.client}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {camp.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {camp.channels.map((ch, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-xl bg-[#7446F5]/20 border border-[#7446F5]/40 text-[#C5A6FF] text-xs font-semibold">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#17131F]/60 p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-[#C5A6FF] font-semibold text-sm mb-2">
                    <Target className="w-4 h-4" />
                    <span>Objective</span>
                  </div>
                  <p className="text-[#F5F1FA]/80 text-sm leading-relaxed">{camp.objective}</p>
                </div>

                <div className="bg-[#17131F]/60 p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-[#C5A6FF] font-semibold text-sm mb-2">
                    <Users className="w-4 h-4" />
                    <span>Target Audience</span>
                  </div>
                  <p className="text-[#F5F1FA]/80 text-sm leading-relaxed">{camp.audience}</p>
                </div>

                <div className="bg-[#17131F]/60 p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-[#C5A6FF] font-semibold text-sm mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>Creative Strategy</span>
                  </div>
                  <p className="text-[#F5F1FA]/80 text-sm leading-relaxed">{camp.strategy}</p>
                </div>

                <div className="bg-[#17131F]/60 p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-[#C5A6FF] font-semibold text-sm mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Overview</span>
                  </div>
                  <p className="text-[#F5F1FA]/80 text-sm leading-relaxed">{camp.overview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
