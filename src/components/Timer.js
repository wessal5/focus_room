// Timer.js — Composant gérant un minuteur + un chronomètre, avec gestion du focus global

import React, { useState, useEffect, useContext } from "react";
import { FocusContext } from "../context/FocusContext"; // Contexte permettant de savoir si le timer/chrono est en cours

const Timer = () => {
  // Récupère l'état global du focus
  const { isFocused, setIsFocused } = useContext(FocusContext);

  // mode = "timer" ou "chrono"
  const [mode, setMode] = useState("timer");

  // Valeur entrée par l'utilisateur (en minutes) pour le minuteur
  const [minutesInput, setMinutesInput] = useState(25);

  // Temps restant pour le minuteur (en secondes)
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  // Temps écoulé pour le chronomètre
  const [chronoTime, setChronoTime] = useState(0);

  // Durée initiale (sert pour Reset mais pas pour Resume)
  const initialDuration = minutesInput * 60;

  useEffect(() => {
    let interval = null; // variable de stockage de l'intervalle

    // Si le timer/chrono est lancé
    if (isFocused) {
      // Mode minuteur (décompte)
      if (mode === "timer") {
        interval = setInterval(() => {
          setTimeLeft(prev => {
            // Si le temps atteint 0 → stop automatique
            if (prev <= 1) {
              setIsFocused(false);
              return 0;
            }
            return prev - 1; // sinon on décrémente
          });
        }, 1000);
      }

      // Mode chrono (compte à la montée)
      if (mode === "chrono") {
        interval = setInterval(() => {
          setChronoTime(prev => prev + 1);
        }, 1000);
      }
    }

    // Nettoyage de l'intervalle lorsque le mode change ou isFocused change
    return () => clearInterval(interval);
  }, [isFocused, mode, setIsFocused]);

  // Formatting HH:MM:SS
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // Démarre le minuteur (sans réinitialiser quand on reprend)
  const handleStartTimer = () => {
    // Si c'est un vrai "nouveau début"
    if (timeLeft === 0 || timeLeft === initialDuration) {
      setTimeLeft(initialDuration);
    }
    setIsFocused(true);
  };

  // Démarre le chrono
  const handleStartChrono = () => {
    if (chronoTime === 0) {
      setChronoTime(0);
    }
    setIsFocused(true);
  };

  // Pause
  const handleStop = () => setIsFocused(false);

  // Reset complet
  const handleReset = () => {
    setIsFocused(false);
    setTimeLeft(initialDuration);
    setChronoTime(0);
  };

  return (
    <div className="w-72 mx-auto mt-4">
      <div
        className="w-72 mx-auto mt-4 rounded-2xl p-6 text-white flex flex-col items-center space-y-4"
        style={{
          backgroundColor: "rgba(30, 20, 15, 0.85)", // Couleur café transparente
          boxShadow: "0 0 20px rgba(255, 200, 150, 0.3), 0 8px 30px rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)", // Effet verre dépoli
        }}
      >
        {/* Sélecteur de mode */}
        <div className="flex gap-2">
          <button
            onClick={() => setMode("timer")}
            className={`px-3 py-1 rounded ${mode === "timer" ? "bg-[#5C3A21]" : "bg-[#3A1E0F]"}`}
          >
            Minuteur
          </button>

          <button
            onClick={() => setMode("chrono")}
            className={`px-3 py-1 rounded ${mode === "chrono" ? "bg-[#5C3A21]" : "bg-[#3A1E0F]"}`}
          >
            Chrono
          </button>
        </div>

        {/* Affichage du temps selon le mode */}
        <h1 className="text-3xl font-bold">
          {mode === "timer" ? formatTime(timeLeft) : formatTime(chronoTime)}
        </h1>

        {/* Contrôles du minuteur */}
        {mode === "timer" && (
          <div className="flex flex-col items-center gap-2">
            {/* Input minutes */}
            <input
              type="number"
              min="1"
              value={minutesInput}
              onChange={(e) => setMinutesInput(Number(e.target.value))}
              className="text-black px-2 py-1 rounded w-20 text-center"
            />

            {/* Start / Resume / Pause */}
            {!isFocused ? (
              <button
                onClick={handleStartTimer}
                className="bg-[#8B4513] px-4 py-1 rounded hover:bg-[#A0522D] transition-colors"
              >
                {timeLeft !== initialDuration ? "Resume" : "Start"}
              </button>
            ) : (
              <button
                onClick={handleStop}
                className="bg-[#5C2A0E] px-4 py-1 rounded hover:bg-[#8B3E20] transition-colors"
              >
                Pause
              </button>
            )}
          </div>
        )}

        {/* Contrôles du chrono */}
        {mode === "chrono" && (
          <div>
            {!isFocused ? (
              <button
                onClick={handleStartChrono}
                className="bg-[#8B4513] px-4 py-1 rounded hover:bg-[#A0522D] transition-colors"
              >
                {chronoTime !== 0 ? "" : "Start"}
              </button>
            ) : (
              <button
                onClick={handleStop}
                className="bg-[#5C2A0E] px-4 py-1 rounded hover:bg-[#8B3E20] transition-colors"
              >
                Pause
              </button>
            )}
          </div>
        )}

        {/* Bouton reset */}
        <button
          onClick={handleReset}
          className="bg-[#3A1E0F] px-3 py-1 rounded hover:bg-[#5C2A21] transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
