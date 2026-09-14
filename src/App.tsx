import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { EventDetails } from './components/EventDetails';
import { DressCode } from './components/DressCode';
import { GiftsSection } from './components/GiftsSection';
import { RsvpSection } from './components/RsvpSection';
import { PhotoMarquee } from './components/PhotoMarquee';
import { Footer } from './components/Footer';
import { AdminSheetsModal } from './components/AdminSheetsModal';
import { initAuth, getStoredSpreadsheetId } from './services/googleSheets';

export default function App() {
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string | null>(null);

  useEffect(() => {
    // Check if a spreadsheet ID was previously stored
    const existingId = getStoredSpreadsheetId();
    if (existingId) {
      setSpreadsheetUrl(`https://docs.google.com/spreadsheets/d/${existingId}/edit`);
    }

    // Listen to Firebase Auth state
    const unsubscribe = initAuth(
      (user) => {
        setCurrentUser(user);
        const sheetId = getStoredSpreadsheetId();
        if (sheetId) {
          setSpreadsheetUrl(`https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
        }
      },
      () => {
        setCurrentUser(null);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2E9] text-[#3E483D] flex flex-col font-serif selection:bg-[#7F9078]/20 selection:text-[#2E382D]">
      {/* Scroll-activated Navbar */}
      <Navbar onNavigate={scrollToSection} />

      {/* Hero Header */}
      <Hero onRsvpClick={() => scrollToSection('confirmar-presenca')} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Nossa História (4 Chapters) */}
        <Timeline />

        {/* 2. O Evento (Cerimônia & Recepção) */}
        <EventDetails />

        {/* 3. Dress Code (Esporte Fino) */}
        <DressCode />

        {/* 4. Lista de Presentes (Pix Direto) */}
        <GiftsSection />

        {/* 5. Confirmação de Presença (RSVP com Google Sheets) */}
        <RsvpSection
          onOpenSheetsModal={() => setIsSheetsModalOpen(true)}
          spreadsheetUrl={spreadsheetUrl}
        />

        {/* 6. Carrossel Infinito de Fotos Deslizando para a Direita */}
        <PhotoMarquee />
      </main>

      {/* Rodapé Romântico */}
      <Footer onOpenSheetsModal={() => setIsSheetsModalOpen(true)} />

      {/* Modal de Gestão de Presenças e Conexão Google Sheets */}
      <AdminSheetsModal
        isOpen={isSheetsModalOpen}
        onClose={() => setIsSheetsModalOpen(false)}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
        spreadsheetUrl={spreadsheetUrl}
        onSpreadsheetUrlChange={setSpreadsheetUrl}
      />
    </div>
  );
}
