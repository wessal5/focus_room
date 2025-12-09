// src/components/SoundController.js
// Composant permettant de contrôler les volumes des sons de la "Focus Room"

import React, { useContext } from "react";
import { FocusContext } from "../context/FocusContext"; // Import du contexte principal

export default function SoundController() {
  // Récupération des sons et de la fonction pour les mettre à jour depuis le contexte
  const { sounds, setSounds } = useContext(FocusContext);

  // Fonction pour mettre à jour le volume d'un son spécifique
  const update = (key, value) => {
    setSounds({ ...sounds, [key]: value }); 
    // copie de l'objet sounds et modification du son ciblé
  };

  return (
    <div>
      {/* Titre de la section */}
      <h3 className="font-bold mb-2">Nature Sounds</h3>

      {/* Génération des sliders pour chaque son */}
      {Object.keys(sounds).map((s) => (
        <div key={s} className="flex items-center justify-between mb-3">
          {/* Nom du son */}
          <span className="capitalize">{s}</span>

          {/* Slider de volume */}
          <input
            type="range"         // input type slider
            min="0"               // valeur minimale
            max="1"               // valeur maximale
            step="0.01"           // précision du slider
            value={sounds[s]}     // valeur actuelle
            onChange={(e) => update(s, parseFloat(e.target.value))} // mise à jour du contexte
            className="range range-sm" // style du slider (taille petite)
          />
        </div>
      ))}
    </div>
  );
}
