// src/components/Header.js
// Composant d'en-tête principal de l'application
// Gère l'affichage du titre, le bouton pour entrer/sortir de la Focus Room, et le fullscreen.

import React, { useContext, useEffect, useState } from "react";
import { Bars3Icon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid"; // icônes
import { FocusContext } from "../context/FocusContext"; // contexte global de l'application

export default function Header() {
  // Récupère l'état de la Focus Room depuis le contexte
  const { inFocusRoom, setInFocusRoom } = useContext(FocusContext);

  // État local pour savoir si on est en plein écran
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Détecte les changements de fullscreen (ex: ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Fonction pour basculer en mode plein écran / quitter
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error entering fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <header className="p-4 bg-[#6B4C3B]/90 backdrop-blur text-white flex justify-between items-center">
      {/* Conteneur principal de l'en-tête */}
      
      {/* Titre "Focus Room" — clique pour revenir à l'accueil */}
      <h1
        className="text-2xl font-bold text-[#FFF8E7] cursor-pointer hover:text-[#FFDDAA]"
        onClick={() => setInFocusRoom(false)}
      >
        Focus Room
      </h1>

      <div className="flex items-center gap-4">
        {/* ===== Avant d'entrer dans la Focus Room ===== */}
        {!inFocusRoom && (
          <button
            onClick={() => setInFocusRoom(true)}
            className="px-4 py-2 bg-[#A67C52] text-[#FFF8E7] rounded-lg 
                       hover:bg-[#855E42] transition-colors 
                       shadow-lg hover:shadow-xl 
                       ring-2 ring-[#FFDDAA] hover:ring-[#FFE7BB]"
          >
            Enter Focus Room
          </button>
        )}

        {/* ===== Une fois dans la Focus Room ===== */}
        {inFocusRoom && (
          <>
            {/* Bouton pour basculer en plein écran */}
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/20 rounded"
              title={isFullscreen ? "Exit Fullscreen (ESC)" : "Enter Fullscreen"}
            >
              <ArrowsPointingOutIcon className="w-6 h-6 text-[#FFF8E7]" />
            </button>

            {/* Bouton pour ouvrir le Drawer (paramètres) */}
            <label htmlFor="drawer-toggle" className="cursor-pointer text-[#FFF8E7]">
              <Bars3Icon className="w-8 h-8" />
            </label>
          </>
        )}
      </div>
    </header>
  );
}
