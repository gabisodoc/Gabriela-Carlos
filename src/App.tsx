import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WelcomeCountdown } from './components/WelcomeCountdown';
import { Timeline } from './components/Timeline';
import { EventDetails } from './components/EventDetails';
import { ScheduleSection } from './components/ScheduleSection';
import { DressCode } from './components/DressCode';
import { GiftsSection } from './components/GiftsSection';
import { RsvpSection } from './components/RsvpSection';
import { PhotoMarquee } from './components/PhotoMarquee';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#3E483D] flex flex-col font-serif selection:bg-[#7F9078]/20 selection:text-[#2E382D]">
      {/* Scroll-activated Navbar */}
      <Navbar onNavigate={scrollToSection} />

      {/* Hero Header */}
      <Hero onRsvpClick={() => scrollToSection('confirmar-presenca')} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Nova Seção: Boas-vindas, Monograma e Contagem Regressiva */}
        <WelcomeCountdown />

        {/* 1. Nossa História (4 Chapters) */}
        <Timeline />

        {/* 2. O Evento (Cerimônia & Recepção) */}
        <EventDetails />

        {/* 2.1. Programação do Nosso Grande Dia */}
        <ScheduleSection />

        {/* 3. Dress Code (Esporte Fino) */}
        <DressCode />

        {/* 4. Lista de Presentes (Pix Direto) */}
        <GiftsSection />

        {/* 5. Confirmação de Presença (RSVP) */}
        <RsvpSection />

        {/* 6. Carrossel Infinito de Fotos Deslizando para a Direita */}
        <PhotoMarquee />
      </main>

      {/* Rodapé Romântico */}
      <Footer />
    </div>
  );
}
