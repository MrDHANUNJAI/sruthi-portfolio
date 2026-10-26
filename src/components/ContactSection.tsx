import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Job Opportunity',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', inquiryType: 'Job Opportunity', message: '' });
      } else {
        setErrorMessage(data.error || 'Failed to send message.');
      }
    } catch (err: any) {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#120E17] text-[#F5F1FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#C5A6FF] text-sm font-semibold tracking-wider uppercase mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Let's Collaborate
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7446F5] to-[#C5A6FF] mx-auto rounded-full mb-6" />
          <p className="text-[#F5F1FA]/80 text-base sm:text-lg leading-relaxed">
            Recruiters, brands, and prospective clients are invited to reach out for career opportunities, freelance projects, or brand collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 bg-[#1D1726]/80 backdrop-blur-xl border border-[#7446F5]/30 rounded-3xl p-8 shadow-2xl space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Contact Information</h3>
              <p className="text-[#F5F1FA]/70 text-sm leading-relaxed">
                Reach out directly via email, phone, or connect on professional networks.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#17131F]/80 border border-white/5 hover:border-[#7446F5] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#7446F5]/20 flex items-center justify-center text-[#C5A6FF] group-hover:bg-[#7446F5] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#C5A6FF] block font-medium">Email Address</span>
                  <span className="text-sm font-semibold text-white">{PERSONAL_INFO.email}</span>
                </div>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#17131F]/80 border border-white/5 hover:border-[#7446F5] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#7446F5]/20 flex items-center justify-center text-[#C5A6FF] group-hover:bg-[#7446F5] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#C5A6FF] block font-medium">Phone Number</span>
                  <span className="text-sm font-semibold text-white">{PERSONAL_INFO.phone}</span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#17131F]/80 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-[#7446F5]/20 flex items-center justify-center text-[#C5A6FF]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#C5A6FF] block font-medium">Location</span>
                  <span className="text-sm font-semibold text-white">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 bg-[#1D1726]/80 backdrop-blur-xl border border-[#7446F5]/30 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#C5A6FF] uppercase mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#17131F] border border-[#7446F5]/30 text-white text-sm focus:outline-none focus:border-[#7446F5]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#C5A6FF] uppercase mb-2">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#17131F] border border-[#7446F5]/30 text-white text-sm focus:outline-none focus:border-[#7446F5]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C5A6FF] uppercase mb-2">Inquiry Type</label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#17131F] border border-[#7446F5]/30 text-white text-sm focus:outline-none focus:border-[#7446F5]"
                >
                  <option value="Job Opportunity">Job Opportunity (Recruiter)</option>
                  <option value="Freelance Project">Freelance Project</option>
                  <option value="Brand Collaboration">Brand Collaboration</option>
                  <option value="Other">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C5A6FF] uppercase mb-2">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#17131F] border border-[#7446F5]/30 text-white text-sm focus:outline-none focus:border-[#7446F5]"
                  placeholder="Tell me about your project or role..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7446F5] to-[#9260F6] text-white font-semibold text-base shadow-xl shadow-[#7446F5]/40 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message to Sruthi</span>
                  </>
                )}
              </button>

              {successMessage && (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-sm">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
