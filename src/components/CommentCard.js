// src/components/CommentCard.js
// Composant représentant une carte individuelle de commentaire/testimonial

export default function CommentCard({ avatar, name, stars = 0, comment }) {
  // avatar : URL de l’image de l’utilisateur
  // name : nom de l’utilisateur
  // stars : nombre d’étoiles (par défaut 0)
  // comment : texte du commentaire

  // s : sécurise le nombre d’étoiles pour qu’il soit entre 0 et 5 et convertit en nombre
  const s = Math.max(0, Math.min(5, Number(stars) || 0));

  return (
    <div 
      className="min-w-[220px] bg-[#a67c52]/90 shadow-lg p-5 rounded-2xl text-center text-[#3e2f23]"
      // min-w-[220px] : largeur minimale pour la carte
      // bg-[#a67c52]/90 : fond brun clair semi-transparent
      // shadow-lg : ombre portée
      // p-5 : padding autour du contenu
      // rounded-2xl : coins arrondis
      // text-center : texte centré
      // text-[#3e2f23] : couleur texte sombre
    >
      {/* Avatar */}
      <img
        src={avatar} // image de l’utilisateur
        alt={name}   // nom pour accessibilité
        className="w-16 h-16 object-cover rounded-full mx-auto mb-3 border-2 border-[#3e2f23]"
        // w-16 h-16 : largeur et hauteur fixes
        // object-cover : conserve le ratio de l’image
        // rounded-full : rend l’image ronde
        // mx-auto : centré horizontalement
        // mb-3 : marge en bas
        // border-2 border-[#3e2f23] : bordure fine sombre
      />

      {/* Nom */}
      <h3 className="font-bold text-lg">
        {name}
        {/* Nom affiché en gras (font-bold) et taille lg */}
      </h3>

      {/* Affichage des étoiles */}
      <div className="text-yellow-400 mb-2">
        {"★".repeat(s)}
        {/* Étoiles : répète le caractère ★ selon le nombre s */}
        {/* text-yellow-400 : couleur jaune pour les étoiles */}
        {/* mb-2 : espace sous les étoiles */}
      </div>

      {/* Commentaire */}
      <p className="text-[#3e2f23]/90">
        {comment}
        {/* Texte du commentaire affiché en sombre léger (/90 pour transparence) */}
        {/* Lisible tout en restant discret par rapport au nom et aux étoiles */}
      </p>
    </div>
  );
}
