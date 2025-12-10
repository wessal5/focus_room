// Drawer.js — version entièrement commentée

import React, { useContext } from "react";
import { FocusContext } from "../context/FocusContext";
import BackgroundSelector from "./BackgroundSelector";

// Le composant Drawer est le panneau latéral contenant toutes les préférences
export default function Drawer() {
  // showTimer : booléen indiquant si le timer est affiché
  // setShowTimer : fonction pour afficher/cacher le timer
  // sounds : objet contenant le volume de chaque son
  // setSounds : fonction pour modifier le volume
  // useContext(FocusContext) : permet d’accéder à ces valeurs globales depuis n’importe quel composant.
  const { showTimer, setShowTimer, sounds, setSounds } =
    useContext(FocusContext);

  return (
    <div className="drawer">
      {/* drawer : wrapper global (DaisyUI) */}

      {/* input checkbox : contrôle l’ouverture/fermeture du drawer */}
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />

      {/* drawer-content : zone principale (vide ici) */}
      <div className="drawer-content"></div>

      {/* drawer-side : panneau latéral */}
      <aside className="drawer-side z-50 flex flex-col justify-start">
        {/* drawer-overlay : clic sur overlay = fermeture du drawer */}
        <label htmlFor="drawer-toggle" className="drawer-overlay"></label>

        {/* Conteneur principal du drawer */}
        <div
          className="relative w-80 h-full flex flex-col rounded-r-2xl"
          // w-80 : largeur 20rem
          // rounded-r-2xl : coins arrondis à droite
          // Styles inline pour glassmorphism et couleurs chaudes
          style={{
            backgroundColor: "rgba(30, 20, 15, 0.9)", // Fond chocolat sombre semi-transparent
            color: "#FFF8E7", // Texte beige clair
            boxShadow:
              "0 0 20px rgba(255,200,150,0.3), 0 8px 30px rgba(0,0,0,0.5)", // Effet lumineux chaud
            backdropFilter: "blur(12px)", // Effet glassmorphism
          }}
        >
          {/* Header : contient le titre "Preferences" */}
          <div className="flex justify-between items-center p-6 flex-shrink-0">
            {/* flex justify-between items-center : titre à gauche, bouton à droite */}
            {/* flex-shrink-0 : header ne se rétrécit pas lors du scroll */}
            <h2 className="text-2xl font-bold text-[#D9A066]">Preferences</h2>

            {/* Bouton pour fermer le drawer */}
            <label
              htmlFor="drawer-toggle"
              className="cursor-pointer"
              title="Close Drawer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#D9A066]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          </div>

          {/* Zone scrollable contenant toutes les options */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
            {/* Sélecteur d'arrière-plan */}
            <div
              className="p-3 rounded-xl"
              // Conteneur stylé avec fond semi-transparent
              // maxHeight: 250px et overflowY: auto : scroll si trop d’images
              style={{
                backgroundColor: "rgba(60,40,30,0.7)",
                maxHeight: "250px",
                overflowY: "auto",
              }}
            >
              {/* Contient le composant BackgroundSelector pour changer le fond */}
              <BackgroundSelector />
            </div>

            {/* Contrôles des sons */}
            <div className="space-y-3">
              {/* Parcourt chaque son de l’objet sounds */}
              {Object.keys(sounds).map((soundName) => (
                <div key={soundName} className="flex items-center gap-3">
                  {/* Affiche badge du nom du son */}
                  <div
                    className="px-3 py-1 rounded-full text-sm font-medium flex-shrink-0"
                    style={{
                      backgroundColor: "#D9A066",
                      color: "#FFF8E7",
                      border: "1px solid rgba(255,200,150,0.5)",
                    }}
                  >
                    {soundName.charAt(0).toUpperCase() + soundName.slice(1)}
                  </div>

                  {/* Slider pour ajuster le volume (0 à 100) */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sounds[soundName] * 100}
                    // onChange met à jour le contexte global
                    onChange={(e) =>
                      setSounds({
                        ...sounds,
                        [soundName]: Number(e.target.value) / 100,
                      })
                    }
                    className="range [--range-bg:#A67C52] [--range-thumb:#D9A066] [--range-fill:0.5] flex-1 h-2 rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
