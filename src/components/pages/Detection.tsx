import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const Detection = () => {
  const webcamRef = useRef(null);
  const [signDetected, setSignDetected] = useState("");

  // Fonction pour simuler la détection de signes
  const detectSign = (sign: React.SetStateAction<string>) => {
    setSignDetected(sign);
  };
  return (
    <div className="flex flex-col items-center justify-center p-5 font-sans">
      <h1 className="text-2xl font-bold mb-5">Détection de Signes</h1>

      {/* Affichage de la webcam */}
      <div className="w-[640px] h-[480px] border-2 border-gray-300 rounded-lg overflow-hidden mb-5">
        <Webcam
          ref={webcamRef}
          mirrored={true}
          screenshotFormat="image/jpeg"
          className="w-full h-full"
        />
      </div>

      {/* Affichage du signe détecté */}
      <div className="mb-5">
        <h2 className="text-xl">
          Signe détecté : {signDetected || "Aucun signe détecté"}
        </h2>
      </div>

      {/* Boutons pour simuler la détection de signes */}
      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => detectSign("Bonjour")}
        >
          Détecter "Bonjour"
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => detectSign("Merci")}
        >
          Détecter "Merci"
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => detectSign("Aide")}
        >
          Détecter "Aide"
        </button>
      </div>
    </div>
  );
};

export default Detection;
