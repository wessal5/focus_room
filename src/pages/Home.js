// src/pages/Home.js
// Page principale de l'application qui affiche soit l'accueil (avant Focus Room), 
// soit la Focus Room avec le timer et le drawer de paramètres

import React, { useContext } from "react";
import Header from "../components/Header";           // Barre en haut (titre, entrée Focus Room)
import Footer from "../components/Footer";           // Footer avec liens et réseaux sociaux
import Drawer from "../components/Drawer";           // Menu latéral pour préférences et sons
import Timer from "../components/Timer";             // Minuteur / Chrono
import Testimonials from "../components/Testimonials"; // Témoignages utilisateurs
import WelcomeMessage from "../components/WelcomeMessage"; // Message d'accueil animé
import { FocusContext } from "../context/FocusContext";   // Contexte global

export default function Home() {
  // Récupération des états globaux depuis le contexte
  const { background, showTimer, inFocusRoom } = useContext(FocusContext);

  return (
    <div
      className="min-h-screen flex flex-col bg-[#EDE0D4]" // structure principale : hauteur écran, flex-col
      style={{
        backgroundImage: inFocusRoom ? `url(${background})` : "none", // arrière-plan uniquement dans la Focus Room
        backgroundSize: "cover",          // image de fond couvre tout
        backgroundPosition: "center",     // centrée
      }}
    >
      <Header /> {/* Barre du haut */}

      {/* ======= AVANT L'ENTRÉE DANS LA FOCUS ROOM ======= */}
      {!inFocusRoom && (
        <div className="flex-1 flex flex-col">
          <WelcomeMessage />  {/* Message d'accueil animé lettre par lettre */}
          <Testimonials />    {/* Témoignages utilisateurs */}
          <Footer />          {/* Footer avec liens et réseaux sociaux */}
        </div>
      )}

      {/* ======= APRÈS L'ENTRÉE DANS LA FOCUS ROOM ======= */}
      {inFocusRoom && (
        <div className="flex-1 flex flex-col w-full h-full">
          <Drawer /> {/* Menu latéral pour paramètres (sons, background, etc.) */}

          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Minuteur / Chronomètre */}
            {showTimer && <Timer />}
          </div>
        </div>
      )}
    </div>
  );
}
