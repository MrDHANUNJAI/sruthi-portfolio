import React, { useState } from 'react';
import { Play, Pause, Clapperboard, Sparkles } from 'lucide-react';

export const VideoGallery: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const videos = [
    {
      id: 1,
      title: "Luxury Fashion Reel & Brand Teaser",
      client: "Ombrè Attire Dubai",
      duration: "0:30",
      description: "Fast-paced Instagram Reel featuring dynamic luxury fashion styling, strong visual hooks, and trending audio sync.",
      thumbnail: "/assets/aistudio/image_d8fa01ac.png",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-studio-41584-large.mp4",
    },
    {
      id: 2,
      title: "Digital Marketing & Brand Campaign Spotlight",
      client: "Vision 4 U Digital Solution",
      duration: "0:45",
      description: "Promotional video highlighting digital marketing strategy, creative design deliverables, and high-conversion ad funnels.",
      thumbnail: "/assets/aistudio/image_9d2f51eb.png",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphics-41595-large.mp4",
    },
  ];

  return (
    <section id="videos" className="py-24 bg-[#120E17] text-[#F5F1FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#C5A6FF] text-sm font-semibold tracking-wider uppercase mb-3 block">
            Short-Form & Reels
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Instagram Reels & Video Gallery
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7446F5] to-[#C5A6FF] mx-auto rounded-full mb-6" />
          <p className="text-[#F5F1FA]/80 text-base sm:text-lg leading-relaxed">
            High-retention video edits crafted with CapCut featuring hook optimization, professional color grading, and engaging audio rhythms.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-[#1D1726]/80 backdrop-blur-xl border border-[#7446F5]/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#7446F5] transition-all"
            >
              <div className="relative aspect-[9/16] sm:aspect-video bg-black overflow-hidden flex items-center justify-center">
                <video
                  id={`video-${vid.id}`}
                  src={vid.videoUrl}
                  poster={vid.thumbnail}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  controls={isPlaying === vid.id}
                />
                
                {isPlaying !== vid.id && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <button
                      onClick={() => {
                        const el = document.getElementById(`video-${vid.id}`) as HTMLVideoElement;
                        if (el) {
                          if (isPlaying === vid.id) {
                            el.pause();
                            setIsPlaying(null);
                          } else {
                            el.play();
                            setIsPlaying(vid.id);
                          }
                        }
                      }}
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-[#7446F5] to-[#9260F6] text-white flex items-center justify-center shadow-xl shadow-[#7446F5]/50 group-hover:scale-110 transition-transform"
                    >
                      <Play className="w-7 h-7 ml-1 text-white" />
                    </button>
                  </div>
                )}

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#17131F]/90 border border-[#7446F5]/40 text-[#C5A6FF] text-xs font-semibold backdrop-blur-md">
                    {vid.duration}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <span className="text-xs text-[#C5A6FF] font-medium block mb-2">{vid.client}</span>
                <h3 className="text-xl font-bold text-white mb-3">
                  {vid.title}
                </h3>
                <p className="text-[#F5F1FA]/70 text-sm leading-relaxed">
                  {vid.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
