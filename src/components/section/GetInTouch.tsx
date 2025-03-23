import React, { useState } from "react";

const TeamSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const teamMembers = [
    {
      name: "Fanantenana",
      role: "Développeur Full Stack",
      image: "/assets/img/fafa.png",
      description:
        "Expert en développement frontend et backend, passionné par la création de solutions évolutives.",
    },
    {
      name: "Mandrindra",
      role: "Développeur IA",
      image: "/assets/img/",
      description:
        "Passionné par l'apprentissage automatique et l'intelligence artificielle, axé sur la création de solutions innovantes en IA.",
    },
    {
      name: "FANEVA",
      role: "Ingénieur Logiciel",
      image: "/assets/img/neva.png",
      description:
        "Ingénieur logiciel qualifié, spécialisé dans le développement full-stack et la création de sites web responsives.",
    },
    {
      name: "Daniella",
      role: "Développeur Backend, IA",
      image: "https://via.placeholder.com/150",
      description:
        "Spécialiste backend avec de l'expérience dans la création d'applications serveur hautement évolutives.",
    },
    {
      name: "Manjaka",
      role: "Développeur Backend, IA",
      image: "https://via.placeholder.com/150",
      description:
        "Développeur frontend passionné par l'UI/UX, avec une solide expérience en React et en conception responsive.",
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <h2 className="text-6xl text-center md:text-9xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent animate-pulse">
        Equipe
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`w-72 transform transition-all duration-300 ${
              hoveredIndex !== null && hoveredIndex !== index
                ? "blur-sm"
                : "blur-0"
            } ${hoveredIndex === index ? "scale-105" : "scale-100"}`} // Scale animation on hover
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full transition-all duration-300"
            />
            <div className="p-6 bg-transparent">
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{member.role}</p>
              <p className="text-gray-700">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <TeamSection />
    </div>
  );
};

export default App;
