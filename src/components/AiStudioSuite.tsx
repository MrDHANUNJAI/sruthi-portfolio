import React, { useState } from 'react';
import { Sparkles, Bot, Image as ImageIcon, Video, Send, Loader2, Download, Upload } from 'lucide-react';

export const AiStudioSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'advisor' | 'generator' | 'animator'>('advisor');

  // 1. Advisor State
  const [advisorPrompt, setAdvisorPrompt] = useState('');
  const [businessType, setBusinessType] = useState('Luxury Fashion Boutique');
  const [advisorLoading, setAdvisorLoading] = useState(false);
  const [advisorResult, setAdvisorResult] = useState('');

  // 2. Image Generator State
  const [imagePrompt, setImagePrompt] = useState('High-end luxury fashion social media campaign creative, editorial purple and ivory aesthetic, 8k');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [imageLoading, setImageLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [imageDescription, setImageDescription] = useState('');

  // 3. Animator State
  const [uploadedImageBase64, setUploadedImageBase64] = useState('');
  const [uploadedMimeType, setUploadedMimeType] = useState('image/png');
  const [animatorPrompt, setAnimatorPrompt] = useState('Animate this marketing graphic into a dynamic Instagram Reel with cinematic lighting and particle motion.');
  const [animatorRatio, setAnimatorRatio] = useState('9:16');
  const [animatorLoading, setAnimatorLoading] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState('');

  // Handle Advisor Submit
  const handleAdvisorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorPrompt.trim()) return;
    setAdvisorLoading(true);
    setAdvisorResult('');
    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: advisorPrompt, businessType, goal: 'Engagement & Lead Gen' }),
      });
      const data = await res.json();
      if (data.success) {
        setAdvisorResult(data.text);
      } else {
        setAdvisorResult(data.error || 'Failed to generate advisory.');
      }
    } catch (err: any) {
      setAdvisorResult('Network error connecting to AI advisor.');
    } finally {
      setAdvisorLoading(false);
    }
  };

  // Handle Image Gen Submit
  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePrompt.trim()) return;
    setImageLoading(true);
    setGeneratedImageUrl('');
    setImageDescription('');
    try {
      const res = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imagePrompt, aspectRatio, imageSize }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedImageUrl(data.imageUrl);
        setImageDescription(data.text);
      } else {
        alert(data.error || 'Failed to generate image.');
      }
    } catch (err: any) {
      alert('Network error connecting to image generator.');
    } finally {
      setImageLoading(false);
    }
  };

  // Handle File Upload for Animator
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      setUploadedImageBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  // Handle Video Animate Submit
  const handleAnimatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnimatorLoading(true);
    setGeneratedVideoUrl('');
    try {
      const res = await fetch('/api/ai/animate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: uploadedImageBase64,
          mimeType: uploadedMimeType,
          prompt: animatorPrompt,
          aspectRatio: animatorRatio,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedVideoUrl(data.videoUrl);
      } else {
        alert(data.error || 'Failed to animate video.');
      }
    } catch (err: any) {
      alert('Network error connecting to video animator.');
    } finally {
      setAnimatorLoading(false);
    }
  };

  return (
    <section id="aistudio" className="py-24 bg-[#17131F] text-[#F5F1FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#C5A6FF] text-sm font-semibold tracking-wider uppercase mb-3 block">
            Powered by Gemini AI
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            AI Marketing & Creative Studio
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7446F5] to-[#C5A6FF] mx-auto rounded-full mb-6" />
          <p className="text-[#F5F1FA]/80 text-base sm:text-lg leading-relaxed">
            Experience Sruthi's interactive AI marketing strategist (gemini-4-argon), high-res brand creative generator (gemini-nano-banana-2.1), and photo-to-video reel animator (gemini-omni-1.1-flash).
          </p>
        </div>

        {/* Studio Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab('advisor')}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'advisor'
                ? 'bg-gradient-to-r from-[#7446F5] to-[#9260F6] text-white shadow-xl shadow-[#7446F5]/40 scale-105'
                : 'bg-[#231B30] text-[#C5A6FF] hover:bg-[#7446F5]/20 border border-[#7446F5]/30'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Marketing Strategy Advisor</span>
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'generator'
                ? 'bg-gradient-to-r from-[#7446F5] to-[#9260F6] text-white shadow-xl shadow-[#7446F5]/40 scale-105'
                : 'bg-[#231B30] text-[#C5A6FF] hover:bg-[#7446F5]/20 border border-[#7446F5]/30'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>AI Brand Creative Generator</span>
          </button>
          <button
            onClick={() => setActiveTab('animator')}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'animator'
                ? 'bg-gradient-to-r from-[#7446F5] to-[#9260F6] text-white shadow-xl shadow-[#7446F5]/40 scale-105'
                : 'bg-[#231B30] text-[#C5A6FF] hover:bg-[#7446F5]/20 border border-[#7446F5]/30'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Photo-to-Video Reel Animate</span>
          </button>
        </div>

        {/* Tab 1: AI Marketing Strategy Advisor */}
        {activeTab === 'advisor' && (
          <div className="bg-[#231B30]/70 backdrop-blur-xl border border-[#7446F5]/30 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#7446F5]/20 flex items-center justify-center text-[#C5A6FF]">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Ask Sruthi's AI Marketing Advisor</h3>
                <p className="text-xs text-[#C5A6FF]">Powered by gemini-4-argon with High Thinking level</p>
              </div>
            </div>

            <form onSubmit={handleAdvisorSubmit} className="space-y-4 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#C5A6FF] uppercase mb-2">Business / Industry</label>
                  <input
                    type="text"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#17131F] border border-[#7446F5]/30 text-white text-sm focus:outline-none focus:border-[#7446F5]"
                    placeholder="e.g. Luxury Fashion Boutique"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#C5A6FF] uppercase mb-2">Inquiry / Challenge</label>
                  <input
                    type="text"
                    value={advisorPrompt}
                    onChange={(e) => setAdvisorPrompt(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#17131F] border border-[#7446F5]/30 text-white text-sm focus:outline-none focus:border-[#7446F5]"
                    placeholder="e.g. How to scale Instagram Reels engagement for a Dubai launch?"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={advisorLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7446F5] to-[#9260F6] text-white font-semibold text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {advisorLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing with High Thinking...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Generate Marketing Strategy</span>
                  </>
                )}
              </button>
            </form>

            {advisorResult && (
              <div className="bg-[#17131F]/90 border border-[#7446F5]/40 rounded-2xl p-6 text-[#F5F1FA]/90 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                <h4 className="text-xs font-bold text-[#C5A6FF] uppercase mb-3">AI Strategic Advisory Report</h4>
                {advisorResult}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: AI Brand Creative Generator */}
        {activeTab === 'generator' && (
          <div className="bg-[#231B30]/70 backdrop-blur-xl border border-[#7446F5]/30 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#7446F5]/20 flex items-center justify-center text-[#C5A6FF]">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">AI Brand Creative Generator</h3>
                <p className="text-xs text-[#C5A6FF]">Powered by gemini-nano-banana-2.1 with 1K, 2K, 4K resolution picker</p>
              </div>
            </div>

            <form onSubmit={handleImageSubmit} className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-semibold text-[#C5A6FF] uppercase mb-2">Creative Prompt</label>
                <textarea
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[#17131F] border border-[#7446F5]/30 text-white text-sm focus:outline-none focus:border-[#7446F5]"
                  placeholder="Describe your marketing visual..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#C5A6FF] uppercase mb-2">Aspect Ratio</label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#17131F] border border-[#7446F5]/30 text-white text-sm focus:outline-none focus:border-[#7446F5]"
                  >
                    <option value="1:1">1:1 Square</option>
                    <option value="16:9">16:9 Landscape</option>
                    <option value="9:16">9:16 Portrait (Reel)</option>
                    <option value="3:4">3:4 Portrait</option>
                    <option value="4:3">4:3 Standard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#C5A6FF] uppercase mb-2">Resolution Size</label>
                  <select
                    value={imageSize}
                    onChange={(e) => setImageSize(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#17131F] border border-[#7446F5]/30 text-white text-sm focus:outline-none focus:border-[#7446F5]"
                  >
                    <option value="1K">1K Standard</option>
                    <option value="2K">2K High Definition</option>
                    <option value="4K">4K Ultra HD</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={imageLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7446F5] to-[#9260F6] text-white font-semibold text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {imageLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating High-Res Creative...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Brand Creative</span>
                  </>
                )}
              </button>
            </form>

            {generatedImageUrl && (
              <div className="bg-[#17131F]/90 border border-[#7446F5]/40 rounded-2xl p-6 text-center">
                <img src={generatedImageUrl} alt="Generated brand creative" className="max-h-[500px] mx-auto rounded-xl mb-4 shadow-2xl" />
                <a
                  href={generatedImageUrl}
                  download="sruthi-marketing-creative.png"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7446F5] text-white font-semibold text-sm shadow-lg hover:bg-[#6232d1] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Creative ({imageSize})</span>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Photo-to-Video Reel Animate */}
        {activeTab === 'animator' && (
          <div className="bg-[#231B30]/70 backdrop-blur-xl border border-[#7446F5]/30 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#7446F5]/20 flex items-center justify-center text-[#C5A6FF]">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Animate Photo into Video Reel</h3>
                <p className="text-xs text-[#C5A6FF]">Powered by gemini-omni-1.1-flash via Interactions API</p>
              </div>
            </div>

            <form onSubmit={handleAnimatorSubmit} className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-semibold text-[#C5A6FF] uppercase mb-2">Upload Source Photo</label>
                <div className="flex items-center gap-4 bg-[#17131F] border border-dashed border-[#7446F5]/40 rounded-xl p-4">
                  <Upload className="w-6 h-6 text-[#C5A6FF]" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#7446F5] file:text-white hover:file:bg-[#6232d1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C5A6FF] uppercase mb-2">Motion Prompt</label>
                <textarea
                  value={animatorPrompt}
                  onChange={(e) => setAnimatorPrompt(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-[#17131F] border border-[#7446F5]/30 text-white text-sm focus:outline-none focus:border-[#7446F5]"
                  placeholder="Describe motion..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C5A6FF] uppercase mb-2">Aspect Ratio</label>
                <select
                  value={animatorRatio}
                  onChange={(e) => setAnimatorRatio(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#17131F] border border-[#7446F5]/30 text-white text-sm focus:outline-none focus:border-[#7446F5]"
                >
                  <option value="9:16">9:16 Vertical Reel</option>
                  <option value="16:9">16:9 Landscape Video</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={animatorLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7446F5] to-[#9260F6] text-white font-semibold text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {animatorLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Animating Photo into Reel (Omni Flash)...</span>
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4" />
                    <span>Generate Video Reel</span>
                  </>
                )}
              </button>
            </form>

            {generatedVideoUrl && (
              <div className="bg-[#17131F]/90 border border-[#7446F5]/40 rounded-2xl p-6 text-center">
                <video src={generatedVideoUrl} controls autoPlay className="max-h-[500px] mx-auto rounded-xl mb-4 shadow-2xl" />
                <a
                  href={generatedVideoUrl}
                  download="sruthi-ai-reel.mp4"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7446F5] text-white font-semibold text-sm shadow-lg hover:bg-[#6232d1] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Video Reel</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
