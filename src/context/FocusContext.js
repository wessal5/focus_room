// src/context/FocusContext.js
// Contexte global pour gérer l'état de la Focus Room, le timer, les sons et l'arrière-plan

import { createContext, useState, useEffect, useRef } from "react";

// Création du contexte
export const FocusContext = createContext();

// Provider qui englobe l'application et fournit les états et fonctions
export function FocusProvider({ children }) {
  // État pour l'arrière-plan sélectionné
  const [background, setBackground] = useState("/backgrounds/cafe.jpg");

  // État pour afficher ou non le timer
  const [showTimer, setShowTimer] = useState(true);

  // État pour savoir si le timer est en cours (focus activé)
  const [isFocused, setIsFocused] = useState(false);

  // État pour savoir si l'utilisateur est dans la Focus Room
  const [inFocusRoom, setInFocusRoom] = useState(false);

  // États des sons avec volumes initiaux (0 = silencieux)
  const [sounds, setSounds] = useState({
    rain: 0,
    fireplace: 0,
    birds: 0,
    thunder: 0,
  });

  // Références vers les objets Audio pour chaque son
  const audiosRef = useRef({});

  // Initialisation des objets Audio une fois au montage
  useEffect(() => {
    audiosRef.current.rain = new Audio("/sounds/rain.wav");
    audiosRef.current.rain.loop = true; // boucle infinie

    audiosRef.current.fireplace = new Audio("/sounds/fireplace.mp3");
    audiosRef.current.fireplace.loop = true;

    audiosRef.current.birds = new Audio("/sounds/birds.mp3");
    audiosRef.current.birds.loop = true;

    audiosRef.current.thunder = new Audio("/sounds/thunder.mp3");
    audiosRef.current.thunder.loop = true;
  }, []); // ne se déclenche qu'une seule fois

  // Gestion automatique des lectures/pause selon les volumes
  useEffect(() => {
    Object.keys(sounds).forEach((key) => {
      const audio = audiosRef.current[key];
      if (!audio) return;

      audio.volume = Number(sounds[key]); // applique le volume actuel

      if (sounds[key] > 0 && audio.paused) {
        // si volume > 0 et audio en pause → jouer
        audio.play().catch(() => {}); // ignore les erreurs
      } else if (sounds[key] === 0 && !audio.paused) {
        // si volume = 0 et audio en cours → pause et reset
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }, [sounds]); // se déclenche à chaque changement de volume

  // Fourniture de toutes les données et fonctions via le contexte
  return (
    <FocusContext.Provider
      value={{
        background,        // arrière-plan actuel
        setBackground,     // fonction pour changer l'arrière-plan
        showTimer,         // booléen pour afficher le timer
        setShowTimer,      // fonction pour toggle timer
        sounds,            // volumes des sons
        setSounds,         // fonction pour modifier volumes
        audiosRef,         // références vers les objets Audio
        isFocused,         // état du timer
        setIsFocused,      // fonction pour activer/désactiver focus
        inFocusRoom,       // booléen Focus Room
        setInFocusRoom,    // fonction pour entrer/sortir Focus Room
      }}
    >
      {children} {/* rend tous les composants enfants */}
    </FocusContext.Provider>
  );
}
