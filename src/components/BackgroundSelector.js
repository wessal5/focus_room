import React, { useContext, useState } from "react"; // Import React + hooks
import { FocusContext } from "../context/FocusContext"; // Import du contexte global


// Liste initiale des backgrounds affichés
const initialBackgrounds = [
{ id: 1, src: "backgrounds/forest.jpg" }, // Forêt
{ id: 2, src: "backgrounds/cafe.jpg" }, // Café
{ id: 3, src: "backgrounds/mountain.jpg" }, // Montagne
{ id: 4, src: "backgrounds/night.jpg" }, // Nuit (ajouté)
{ id: 5, src: "backgrounds/room.jpg" }, // Chambre
];


export default function BackgroundSelector() {
const { setBackground } = useContext(FocusContext); // Setter pour changer le fond
const [backgrounds, setBackgrounds] = useState(initialBackgrounds); // États des fonds


// Fonction pour uploader un fond personnalisé
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