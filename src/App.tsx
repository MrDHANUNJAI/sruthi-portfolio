/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { VideoGallery } from './components/VideoGallery';
import { CampaignCaseStudies } from './components/CampaignCaseStudies';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const handleExplore = () => {
    const el = document.querySelector('#portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#17131F] text-[#F5F1FA] font-sans selection:bg-[#7446F5] selection:text-white">
      <Navbar onOpenContact={handleOpenContact} />
      <Hero3D onExplore={handleExplore} onOpenContact={handleOpenContact} />
      <AboutSection />
      <ServicesSection onOpenContact={handleOpenContact} />
      <PortfolioGallery />
      <VideoGallery />
      <CampaignCaseStudies />
      <ExperienceTimeline />
      <ContactSection />
      <Footer />
    </div>
  );
}
