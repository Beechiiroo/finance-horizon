import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { WhyChooseSection } from '@/components/landing/WhyChooseSection';
import { ModulesSection } from '@/components/landing/ModulesSection';
import { WorkflowSection } from '@/components/landing/WorkflowSection';
import { UIUXSection } from '@/components/landing/UIUXSection';
import { TeamSection } from '@/components/landing/TeamSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { BlogSection } from '@/components/landing/BlogSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { Footer } from '@/components/landing/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <section id="features">
          <WhyChooseSection />
        </section>
        <section id="modules">
          <ModulesSection />
        </section>
        <section id="workflow">
          <WorkflowSection />
        </section>
        <UIUXSection />
        <section id="about">
          <TeamSection />
        </section>
        <TestimonialsSection />
        <BlogSection />
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
