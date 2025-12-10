// useContext : permet de consommer le FocusContext pour accéder au setter du background.
// useState : gère la liste des backgrounds affichés.
import React, { useContext, useState } from "react"; // Import React + hooks

// initialBackgrounds : liste de backgrounds prédéfinis avec id unique et src.
import { FocusContext } from "../context/FocusContext"; // Import du contexte global


// Liste initiale des backgrounds affichés
const initialBackgrounds = [
  { id: 1, src: "backgrounds/forest.jpg" }, // Forêt
  { id: 2, src: "backgrounds/cafe.jpg" },   // Café
  { id: 3, src: "backgrounds/mountain.jpg" }, // Montagne
  { id: 4, src: "backgrounds/night.jpg" },  // Nuit (ajouté)
];


export default function BackgroundSelector() {
  // setBackground : méthode provenant du context global pour changer le fond de l’application.
  const { setBackground } = useContext(FocusContext); // Setter pour changer le fond

  // backgrounds : état local du composant pour gérer la liste des fonds.
  // setBackgrounds : permet d’ajouter de nouveaux backgrounds après un upload.
  const [backgrounds, setBackgrounds] = useState(initialBackgrounds); // États des fonds


  // Fonction pour uploader un fond personnalisé
  // Récupère le fichier sélectionné par l’utilisateur.
  // Transforme le fichier en URL utilisable dans l’img.
  // Crée un nouvel objet background avec un id unique (Date.now()).
  // Ajoute ce fond à la liste locale (setBackgrounds).
  // Change le fond global immédiatement via setBackground.
  const handleUpload = (event) => {
    const file = event.target.files[0]; // Récupère le fichier
    if (!file) return; // Sécurité

    const newBgUrl = URL.createObjectURL(file); // Transforme le fichier en URL
    const newBg = { id: Date.now(), src: newBgUrl }; // Crée un nouvel objet background

    setBackgrounds((prev) => [...prev, newBg]); // Ajoute le nouveau dans la liste
    setBackground(newBgUrl); // Change le fond actuel
  };


  return (
    <div>
      <h3 className="font-bold mb-2">Backgrounds</h3> {/* Titre */}

      {/* 
        Affiche tous les backgrounds dans une grille 2 colonnes.
        Chaque image est cliquable, met à jour le fond via setBackground.
        hover:opacity-80 : léger effet visuel au survol.
        rounded-lg : coins arrondis pour un style moderne.
      */}
      <div className="grid grid-cols-2 gap-3 mb-3"> {/* Grille d'images */}
        {backgrounds.map((bg) => (
          <img
            key={bg.id} // Identifiant unique
            src={bg.src} // Source de l'image
            alt=""
            className="rounded-lg cursor-pointer hover:opacity-80" // Style
            onClick={() => setBackground(bg.src)} // Définit le background choisi
          />
        ))}
      </div>

      {/* 
        Utilise un label stylisé pour remplacer l’input classique.
        input[type="file"] est caché (hidden) mais fonctionne via le label.
        onChange={handleUpload} déclenche la fonction pour ajouter le fond personnalisé.
        Styles inline + Tailwind pour une apparence harmonieuse.
      */}
      {/* Bouton d'upload */}
      <label
        className="px-4 py-2 rounded-xl text-white font-semibold shadow-md transition-colors transform active:scale-95 hover:brightness-90"
        style={{
          backgroundColor: "#D9A066", // caramel
          border: "2px solid #FFF8E7", // beige clair
          cursor: "pointer",
        }}
      >
        Upload Background
        <input
          type="file" // Input fichier
          accept="image/*" // Accepte images uniquement
          onChange={handleUpload} // Appelle la fonction
          className="hidden" // Caché
        />
      </label>
    </div>
  );
}
