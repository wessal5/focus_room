// src/components/CommentCard.js
// Composant représentant une carte individuelle de commentaire/testimonial

export default function CommentCard({ avatar, name, stars = 0, comment }) {
  // Sécurisation du nombre d'étoiles : entre 0 et 5
  const s = Math.max(0, Math.min(5, Number(stars) || 0));

  return (
    <div 
      className="min-w-[220px] bg-[#a67c52]/90 shadow-lg p-5 rounded-2xl text-center text-[#3e2f23]"
      // min-w-[220px] : largeur minimale
      // bg-[#a67c52]/90 : fond brun clair semi-transparent
      // shadow-lg : ombre portée
      // p-5 : padding
      // rounded-2xl : coins arrondis
      // text-center : texte centré
      // text-[#3e2f23] : couleur texte sombre
    >
      {/* Avatar */}
      <img
        src={avatar} // image de l'utilisateur
        alt={name}   // description alternative
        className="w-16 h-16 object-cover rounded-full mx-auto mb-3 border-2 border-[#3e2f23]"
        // w-16 h-16 : taille
        // object-cover : conserver ratio
        // rounded-full : cercle
        // mx-auto : centré horizontalement
        // mb-3 : marge en bas
        // border-2 : bordure
        // border-[#3e2f23] : couleur bordure
      />

      {/* Nom */}
      <h3 className="font-bold text-lg">{name}</h3>

      {/* Affichage des étoiles */}
      <div className="text-yellow-400 mb-2">
        {"★".repeat(s)} {/* répète le caractère "★" selon le nombre d'étoiles */}
      </div>

      {/* Commentaire */}
      <p className="text-[#3e2f23]/90">{comment}</p>
      {/* text-[#3e2f23]/90 : couleur texte légèrement transparente pour lisibilité */}
    </div>
  );
}
