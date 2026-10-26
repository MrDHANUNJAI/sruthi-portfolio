import React, { useState } from 'react';
import { Filter, ExternalLink, Eye, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

export const PortfolioGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'social', label: 'Social Media' },
    { id: 'branding', label: 'Branding & Design' },
    { id: 'reels', label: 'Reels & Video' },
    { id: 'campaign', label: 'Campaign Creatives' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-[#17131F] text-[#F5F1FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#C5A6FF] text-sm font-semibold tracking-wider uppercase mb-3 block">
            Creative Portfolio
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Selected Real-Work Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7446F5] to-[#C5A6FF] mx-auto rounded-full mb-6" />
          <p className="text-[#F5F1FA]/80 text-base sm:text-lg leading-relaxed">
            Explore authentic social media campaigns, brand identity designs, Meta Ads creatives, and multimedia content.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#7446F5] to-[#9260F6] text-white shadow-lg shadow-[#7446F5]/40 scale-105'
                  : 'bg-[#231B30] text-[#C5A6FF] hover:bg-[#7446F5]/20 border border-[#7446F5]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#231B30]/70 backdrop-blur-xl border border-[#7446F5]/30 rounded-3xl overflow-hidden group shadow-2xl hover:border-[#7446F5] transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-black/40">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17131F] via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#17131F]/90 border border-[#7446F5]/50 text-[#C5A6FF] text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-6 py-3 rounded-xl bg-[#7446F5] text-white font-semibold text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Case Study</span>
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-xs text-[#C5A6FF] font-medium block mb-2">{project.client}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#C5A6FF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#F5F1FA]/70 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.platforms.map((p, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#7446F5]/20 text-[#C5A6FF] text-xs font-medium">
                        {p}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-sm font-semibold text-[#C5A6FF] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Details</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#1D1726] border border-[#7446F5]/40 rounded-3xl max-w-3xl w-full p-6 sm:p-10 relative shadow-2xl my-8 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-[#231B30] text-[#C5A6FF] hover:bg-[#7446F5] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs text-[#C5A6FF] uppercase tracking-wider font-semibold block mb-1">
              {selectedProject.client}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {selectedProject.title}
            </h3>

            <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-black/40 border border-white/10">
              <img
                src={selectedProject.thumbnail}
                alt={selectedProject.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setLightboxImage(selectedProject.thumbnail)}
              />
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-[#C5A6FF] uppercase tracking-wider mb-2">Project Objective</h4>
                <p className="text-[#F5F1FA]/80 text-sm sm:text-base leading-relaxed">{selectedProject.objective}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#C5A6FF] uppercase tracking-wider mb-2">Strategy & Execution</h4>
                <p className="text-[#F5F1FA]/80 text-sm sm:text-base leading-relaxed">{selectedProject.strategy}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#C5A6FF] uppercase tracking-wider mb-2">Deliverables</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[#231B30] p-2.5 rounded-xl text-xs text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#7446F5]" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedProject.metrics && (
                <div className="bg-[#7446F5]/20 border border-[#7446F5]/40 rounded-2xl p-4">
                  <h4 className="text-xs font-bold text-[#C5A6FF] uppercase tracking-wider mb-1">Impact & Performance</h4>
                  <p className="text-sm font-semibold text-white">{selectedProject.metrics}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img src={lightboxImage} alt="Fullscreen preview" className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" />
        </div>
      )}
    </section>
  );
};
