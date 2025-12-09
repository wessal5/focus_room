// src/components/WelcomeMessage.js
// Composant qui affiche un message de bienvenue animé comme un effet "machine à écrire"

import React, { useEffect, useState } from "react";

export default function WelcomeMessage() {
  const text = "Welcome to Focus Room "; // texte à afficher progressivement
  const [displayed, setDisplayed] = useState(""); // état pour le texte actuellement affiché

  useEffect(() => {
    const speed = 80; // vitesse d'apparition des lettres (ms)

    // intervalle pour ajouter progressivement les lettres
    const interval = setInterval(() => {
      setDisplayed((prev) => {
        if (prev.length < text.length) {
          // ajoute la lettre suivante en se basant sur la longueur actuelle
          return prev + text[prev.length];
        } else {
          // si tout le texte est affiché, on arrête l'intervalle
          clearInterval(interval);
          return prev;
        }
      });
    }, speed);

    // nettoyage à la destruction du composant
    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1
      className="text-3xl md:text-4xl font-bold mb-6 text-center my-20"
      style={{
        color: "#C89F77", // couleur principale du texte
        textShadow: `
          0 0 10px rgba(255, 220, 180, 0.85),
          0 0 18px rgba(255, 200, 150, 0.55),
          0 0 32px rgba(217, 160, 102, 0.40)
        `, // ombres lumineuses pour effet "glow"
        letterSpacing: "1.5px", // espacement des lettres pour lisibilité
      }}
    >
      {displayed} {/* texte animé affiché lettre par lettre */}
    </h1>
  );
}
