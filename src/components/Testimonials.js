// src/components/Testimonials.js

import React, { useRef, useEffect } from "react"; // Importation de React + hooks pour références et effets
import CommentCard from "./CommentCard"; // Composant qui affiche une carte de commentaire

// --- Première rangée de commentaires (avatars, noms, étoiles, texte) ---
const row1 = [
  { avatar: "/avatars/avatar1.jpg", name: "Alice", stars: 5, comment: "Amazing!" }, // Élément 1
  { avatar: "/avatars/avatar2.jpg", name: "Bob", stars: 4, comment: "Very calm." }, // Élément 2
  { avatar: "/avatars/avatar3.jpg", name: "Chloe", stars: 5, comment: "Perfect for study." }, // Élément 3
  { avatar: "/avatars/avatar4.jpg", name: "Dan", stars: 4, comment: "I like it." }, // Élément 4
  { avatar: "/avatars/avatar5.jpg", name: "Emma", stars: 5, comment: "Great focus tool." }, // Élément 5
  { avatar: "/avatars/avatar6.jpg", name: "Leo", stars: 5, comment: "So relaxing." }, // Élément 6
];

// --- Deuxième rangée de commentaires ---
const row2 = [
  { avatar: "/avatars/avatar7.webp", name: "Mia", stars: 5, comment: "Very peaceful." }, // Élément 1
  { avatar: "/avatars/avatar8.jpg", name: "Noah", stars: 4, comment: "Helps me concentrate." }, // Élément 2
  { avatar: "/avatars/avatar9.jpg", name: "Olivia", stars: 5, comment: "Excellent!" }, // Élément 3
  { avatar: "/avatars/avatar10.jpg", name: "Paul", stars: 4, comment: "Nice ambience." }, // Élément 4
  { avatar: "/avatars/avatar11.jpg", name: "Quinn", stars: 5, comment: "Love it!" }, // Élément 5
  { avatar: "/avatars/avatar12.jpg", name: "Rose", stars: 5, comment: "So relaxing." }, // Élément 6
];

export default function Testimonials() {
  const r1 = useRef(null); // Référence pour la première rangée animée
  const r2 = useRef(null); // Référence pour la deuxième rangée

  useEffect(() => { // Effet pour lancer l'animation au montage du composant
    let p1 = 0, p2 = 0; // Positions horizontales des deux rangées
    let rafId; // Identifiant de requestAnimationFrame

    const animate = () => { // Fonction d'animation exécutée en boucle
      if (!r1.current || !r2.current) return; // Sécurité : références non prêtes
      p1 -= 0.7; // Déplacement progressif de la rangée 1
      p2 -= 1;   // Déplacement plus rapide de la rangée 2

      r1.current.style.transform = `translateX(${p1}px)`; // Déplace la rangée 1
      r2.current.style.transform = `translateX(${p2}px)`; // Déplace la rangée 2

      // Réinitialise la position quand la moitié de la largeur est dépassée (effet boucle infinie)
      if (Math.abs(p1) > r1.current.scrollWidth / 2) p1 = 0;
      if (Math.abs(p2) > r2.current.scrollWidth / 2) p2 = 0;

      rafId = requestAnimationFrame(animate); // Redemande un nouveau frame
    };

    animate(); // Lance l'animation la première fois
    return () => cancelAnimationFrame(rafId); // Nettoyage à la destruction du composant
  }, []);

  return (
    <div className="py-16 bg-[#EDE0D4]"> {/* Conteneur principal avec fond crème */}
      <div className="overflow-hidden mb-8"> {/* Bloc de la rangée 1 */}
        <div ref={r1} className="flex gap-6"> {/* Rangée animée */}
          {row1.concat(row1).map((c, i) => <CommentCard key={i} {...c} />)} {/* Double la liste pour une boucle fluide */}
        </div>
      </div>

      <div className="overflow-hidden"> {/* Bloc de la deuxième rangée */}
        <div ref={r2} className="flex gap-6"> {/* Rangée animée */}
          {row2.concat(row2).map((c, i) => <CommentCard key={i} {...c} />)} {/* Même technique de duplication */}
        </div>
      </div>
    </div>
  );
}
