import Webcam from "react-webcam";
import { Brain, ArrowRight, Camera } from "lucide-react";
import { RedirectButton } from "../ui/Button";

export interface Card {
  title: string;
  image: string;
  description: string;
}

function App(): JSX.Element {
  const cards: Card[] = [
    {
      title: "Détection en temps réel",
      image:
        "https://images.unsplash.com/photo-1633555338815-b82ee61c8a8d?auto=format&fit=crop&q=80&w=400",
      description: "Analyse instantanée des mouvements",
    },
    {
      title: "IA Avancée",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400",
      description: "Algorithmes d'apprentissage sophistiqués",
    },
    {
      title: "Statistiques détaillées",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
      description: "Suivi précis des performances",
    },
    {
      title: "Analyse de Performance",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
      description: "Suivi détaillé de vos progrès",
    },
    {
      title: "Reconnaissance Gestuelle",
      image:
        "https://images.unsplash.com/photo-1633555338815-b82ee61c8a8d?auto=format&fit=crop&q=80&w=400",
      description: "Détection précise des mouvements",
    },
    {
      title: "Apprentissage Personnalisé",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400",
      description: "Adapté à votre niveau",
    },
  ];

  const handleTraining = (): void => {
    console.log("Starting training...");
  };

  const handleRedirect = (): void => {
    console.log("Redirecting...");
  };

  return (
    <section className="h-screen w-full fixed top-0 left-0 z-10">
      <div className="min-h-screen bg-gray-100 flex">
        {/* Left Side - Scrollable Cards */}
        <div className="w-1/2 h-screen overflow-y-auto">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 sticky top-0 bg-gray-100 py-4 z-10">
              Dashboard d'Entraînement
            </h1>
            <div className="grid gap-6">
              {cards.map((card: Card, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Fixed Camera */}
        <div className="w-1/2 h-screen bg-gray-900 fixed right-0">
          <div className="p-6 h-full flex flex-col">
            <div className="flex-1 rounded-xl overflow-hidden shadow-lg bg-black">
              <Webcam
                audio={false}
                className="w-full h-full object-cover"
                mirrored={true}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Floating Navigation */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
          <button
            onClick={handleTraining}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Brain className="w-5 h-5" />
            <span>Entraîner</span>
          </button>
          <RedirectButton
            to="/Detection"
            label="Redirection"
            useNavigateHook
            refreshOnRedirect
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors shadow-lg"
          ></RedirectButton>
        </div>
      </div>
    </section>
  );
}

export default App;
