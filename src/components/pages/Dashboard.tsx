"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Search,
  Menu,
  ShoppingCart,
  X,
  Eye,
  Hand,
  Brain,
  Ear,
  Settings,
  VolumeX,
  Volume2,
} from "lucide-react";

import { Button } from "../ui/button-ma";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import axios from "axios";

// Define Product type for better type safety
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  isNew: boolean;
  rewardPoints: number;
  description?: string;
}

// Define disability types
type DisabilityType = "none" | "visual" | "motor" | "cognitive" | "hearing";

export default function Dashboard() {
  // State for selected product and popup
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // State for accessibility settings
  const [disabilityType, setDisabilityType] = useState<DisabilityType>("none");

  // State for audio playback
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Animation controls
  const controls = useAnimation();
  const { scrollY } = useScroll();

  // Refs for scroll animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const productsRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const productsInView = useInView(productsRef, { once: true, amount: 0.1 });

  // Parallax effect for header
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  // Trigger animations when elements come into view
  useEffect(() => {
    if (statsInView) {
      controls.start("visible");
    }
  }, [controls, statsInView]);

  // Apply accessibility changes when disability type changes
  useEffect(() => {
    // This would typically be more comprehensive in a real application
    const htmlElement = document.documentElement;

    // Reset all classes first
    htmlElement.classList.remove(
      "text-base",
      "text-lg",
      "text-xl",
      "high-contrast",
      "simplified-ui",
      "reduced-motion"
    );

    // Apply specific adaptations based on disability type
    switch (disabilityType) {
      case "visual":
        htmlElement.classList.add("text-xl", "high-contrast");
        break;
      case "motor":
        htmlElement.classList.add("text-lg", "simplified-ui");
        break;
      case "cognitive":
        htmlElement.classList.add("text-lg", "simplified-ui");
        break;
      case "hearing":
        // No specific HTML/CSS changes needed for hearing impairments in this demo
        break;
      default:
        htmlElement.classList.add("text-base");
    }
  }, [disabilityType]);

  // Function to read product description aloud
  const readDescription = async (text: string) => {
    if (!text) return;

    console.log("-------------test-----------------");

    try {
      const response = await axios.post(
        "http://192.168.88.216:8000/api/text-to-speech/",
        { text }
      );

      console.log("Réponse reçue:", response.data);

      // Utiliser directement le Blob pour éviter les problèmes CORS
      const audioBlob = await fetch(response.data.audio_url, {
        // Ajoutez des options si nécessaire pour l'authentification
        // credentials: 'include', // Si vous avez besoin de cookies d'authentification
        mode: "cors", // Explicitement demander CORS
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      });

      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audioRef.current = audio;
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl); // Nettoyer l'URL après utilisation
      };

      audio.play();
      setIsPlaying(true);

      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'accès au fichier audio:", error);
      throw error;
    }
  };

  // Stop audio playback
  const stopAudio = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
  };

  // Clean up audio on component unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const productVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  // Popup animation variants
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  // Get CSS classes based on current disability type
  const getAccessibilityClasses = () => {
    switch (disabilityType) {
      case "visual":
        return "text-lg md:text-xl font-medium leading-relaxed";
      case "motor":
        return "space-y-8";
      case "cognitive":
        return "space-y-6 leading-relaxed";
      default:
        return "";
    }
  };

  // Get button size based on current disability type
  const getButtonSize = () => {
    return disabilityType === "motor" || disabilityType === "visual"
      ? "lg"
      : "default";
  };

  // Product data with accessibility features
  const products: Product[] = [
    {
      id: 1,
      name: "Couverts ergonomiques adaptés",
      price: "€29,99",
      image: "/assets/img/test.jpg",
      isNew: true,
      rewardPoints: 10,
      description:
        "Ensemble de couverts ergonomiques spécialement conçus pour les personnes ayant une mobilité réduite des mains. La forme unique facilite la prise en main et réduit l'effort nécessaire pour s'alimenter de façon autonome.",
    },
    {
      id: 2,
      name: "Aide à la préhension télescopique",
      price: "€24,99",
      image: "/assets/img/test1.jpg",
      isNew: true,
      rewardPoints: 10,
      description:
        "Outil télescopique léger permettant d'atteindre et de saisir des objets sans effort. Idéal pour les personnes à mobilité réduite ou en fauteuil roulant, cet accessoire favorise l'autonomie dans les tâches quotidiennes.",
    },
    {
      id: 3,
      name: "Coussin d'assise anti-escarres premium",
      price: "€79,99",
      image: "/assets/img/test2.jpg",
      isNew: true,
      rewardPoints: 15,
      description:
        "Coussin thérapeutique de haute qualité conçu pour prévenir les escarres et améliorer le confort en position assise prolongée. Sa mousse à mémoire de forme répartit la pression de manière optimale et s'adapte à la morphologie de chaque utilisateur.",
    },
    {
      id: 4,
      name: "Système d'aide à la communication",
      price: "€149,99",
      image: "/assets/img/test3.jpg",
      isNew: true,
      rewardPoints: 20,
      description:
        "Appareil innovant facilitant la communication pour les personnes ayant des difficultés d'élocution. Interface intuitive avec symboles et synthèse vocale permettant d'exprimer facilement ses besoins et de communiquer avec l'entourage.",
    },
  ];

  // Handle product click
  const handleProductClick = (product: Product, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    setSelectedProduct(product);
    setShowPopup(true);

    // Automatically read description for visually impaired users
    if (disabilityType === "visual" && product.description) {
      setTimeout(() => {
        readDescription(product.description || "");
      }, 500);
    }
  };

  // Close popup
  const closePopup = () => {
    // Stop any audio playing
    stopAudio();
    setShowPopup(false);
    // Reset selected product after animation completes
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // Get icon for disability type
  const getDisabilityIcon = () => {
    switch (disabilityType) {
      case "visual":
        return <Eye className="h-4 w-4 mr-2" />;
      case "motor":
        return <Hand className="h-4 w-4 mr-2" />;
      case "cognitive":
        return <Brain className="h-4 w-4 mr-2" />;
      case "hearing":
        return <Ear className="h-4 w-4 mr-2" />;
      default:
        return <Settings className="h-4 w-4 mr-2" />;
    }
  };

  // Get label for current disability type
  const getDisabilityLabel = () => {
    switch (disabilityType) {
      case "visual":
        return "Déficience visuelle";
      case "motor":
        return "Déficience motrice";
      case "cognitive":
        return "Déficience cognitive";
      case "hearing":
        return "Déficience auditive";
      default:
        return "Accessibilité";
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 dark:text-white ${
        disabilityType === "visual" ? "text-lg" : ""
      }`}
    >
      {/* Header */}
      <motion.header
        style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}
        className={`sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-blue-100 dark:border-slate-700 ${
          disabilityType === "visual" ? "py-4" : ""
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden border-blue-200 dark:border-slate-700"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Accessibility Middleware Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size={getButtonSize()}
                  className={`ml-2 ${
                    disabilityType !== "none"
                      ? "bg-blue-100 dark:bg-blue-900"
                      : ""
                  }`}
                >
                  {getDisabilityIcon()}
                  <span className="hidden sm:inline">
                    {getDisabilityLabel()}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Type de handicap</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={
                    disabilityType === "none"
                      ? "bg-blue-50 dark:bg-blue-900/30"
                      : ""
                  }
                  onClick={() => setDisabilityType("none")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Standard</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    disabilityType === "visual"
                      ? "bg-blue-50 dark:bg-blue-900/30"
                      : ""
                  }
                  onClick={() => setDisabilityType("visual")}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  <span>Déficience visuelle</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    disabilityType === "motor"
                      ? "bg-blue-50 dark:bg-blue-900/30"
                      : ""
                  }
                  onClick={() => setDisabilityType("motor")}
                >
                  <Hand className="h-4 w-4 mr-2" />
                  <span>Déficience motrice</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    disabilityType === "cognitive"
                      ? "bg-blue-50 dark:bg-blue-900/30"
                      : ""
                  }
                  onClick={() => setDisabilityType("cognitive")}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  <span>Déficience cognitive</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    disabilityType === "hearing"
                      ? "bg-blue-50 dark:bg-blue-900/30"
                      : ""
                  }
                  onClick={() => setDisabilityType("hearing")}
                >
                  <Ear className="h-4 w-4 mr-2" />
                  <span>Déficience auditive</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400 dark:text-blue-300" />
              <Input
                placeholder="Rechercher des produits..."
                className={`pl-10 bg-blue-50 dark:bg-slate-800 border-blue-100 dark:border-slate-700 focus-visible:ring-blue-300 dark:focus-visible:ring-blue-500 ${
                  disabilityType === "visual"
                    ? "text-lg py-6"
                    : disabilityType === "motor"
                    ? "py-5"
                    : ""
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size={
                disabilityType === "motor" || disabilityType === "visual"
                  ? "lg"
                  : "icon"
              }
              className="relative text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800"
            >
              <ShoppingCart
                className={`${
                  disabilityType === "motor" || disabilityType === "visual"
                    ? "h-5 w-5 mr-2"
                    : "h-5 w-5"
                }`}
              />
              {(disabilityType === "motor" || disabilityType === "visual") && (
                <span>Panier</span>
              )}
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-teal-500 dark:bg-teal-400 text-white">
                2
              </Badge>
            </Button>
          </div>
        </div>
      </motion.header>

      <main
        className={`container mx-auto px-4 py-8 ${getAccessibilityClasses()}`}
      >
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={heroVariants}
          className="mb-12 py-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <motion.h1
                variants={heroItemVariants}
                className={`text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-100 leading-tight ${
                  disabilityType === "visual" ? "text-5xl md:text-6xl" : ""
                }`}
              >
                Solutions{" "}
                <span className="text-teal-500 dark:text-teal-300">
                  adaptées
                </span>{" "}
                pour l'autonomie
              </motion.h1>

              <motion.p
                variants={heroItemVariants}
                className={`text-lg text-blue-700 dark:text-blue-300 ${
                  disabilityType === "visual" ? "text-xl md:text-2xl" : ""
                } ${disabilityType === "cognitive" ? "leading-relaxed" : ""}`}
              >
                Des produits spécialement conçus pour améliorer le quotidien des
                personnes en situation de handicap et favoriser leur
                indépendance.
              </motion.p>

              <motion.div
                variants={heroItemVariants}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size={getButtonSize()}
                  className={`bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white ${
                    disabilityType === "motor" ? "py-6 text-lg" : ""
                  }`}
                >
                  Découvrir nos solutions
                </Button>
                <Button
                  size={getButtonSize()}
                  variant="outline"
                  className={`border-blue-300 dark:border-blue-500 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800 ${
                    disabilityType === "motor" ? "py-6 text-lg" : ""
                  }`}
                >
                  Conseil personnalisé
                </Button>
              </motion.div>
            </div>

            <motion.div
              variants={heroItemVariants}
              className="bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 p-8 rounded-2xl shadow-lg"
            >
              <img
                src="/assets/img/heroSection.png"
                alt="Personne en situation de handicap utilisant un produit adapté dans son quotidien"
                className="w-full h-auto rounded-lg object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Products Section */}
        <div
          ref={productsRef}
          className={`grid grid-cols-1 ${
            disabilityType === "motor" || disabilityType === "cognitive"
              ? "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
              : "sm:grid-cols-2 lg:grid-cols-4"
          } gap-6 ${disabilityType === "motor" ? "gap-8" : ""}`}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              initial="hidden"
              animate={productsInView ? "visible" : "hidden"}
              variants={productVariants}
              whileHover={{
                y: disabilityType === "motor" ? -4 : -8,
                transition: { duration: 0.3 },
              }}
              className="group"
              onClick={(e) => handleProductClick(product, e)}
            >
              <div className="cursor-pointer">
                <Card
                  className={`overflow-hidden border-none rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 ${
                    disabilityType === "motor"
                      ? "border-2 border-blue-200 dark:border-blue-700"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30">
                      <div className="relative w-full h-full">
                        <img
                          src={product.image || "/assets/img/test"}
                          alt={product.name}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        />
                        <div
                          className={`absolute top-2 left-2 bg-teal-500 text-white ${
                            disabilityType === "visual"
                              ? "text-base px-3 py-1.5"
                              : "text-xs"
                          } font-medium px-2 py-1 rounded-full`}
                        >
                          Adapté
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-5 ${
                        disabilityType === "visual" ? "p-6" : ""
                      }`}
                    >
                      <div
                        className={`text-xs text-blue-500 dark:text-blue-300 mb-2 font-medium ${
                          disabilityType === "visual" ? "text-sm" : ""
                        }`}
                      >
                        {product.rewardPoints} Points de fidélité
                      </div>
                      <h3
                        className={`font-medium mb-3 line-clamp-2 ${
                          disabilityType === "visual"
                            ? "text-lg h-14"
                            : "text-sm h-10"
                        } text-blue-900 dark:text-blue-100`}
                      >
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <p
                          className={`font-bold ${
                            disabilityType === "visual" ? "text-2xl" : "text-lg"
                          } text-blue-800 dark:text-blue-200`}
                        >
                          {product.price}
                        </p>
                      </div>
                      <Button
                        className={`w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-all duration-300 transform group-hover:scale-105 ${
                          disabilityType === "motor" ? "py-6 text-lg mt-6" : ""
                        } ${disabilityType === "visual" ? "text-lg py-5" : ""}`}
                      >
                        {disabilityType === "cognitive"
                          ? "ACHETER"
                          : "ACHETER MAINTENANT"}
                      </Button>
                      <p
                        className={`text-xs text-blue-500 dark:text-blue-400 mt-3 text-center ${
                          disabilityType === "visual" ? "text-sm" : ""
                        }`}
                      >
                        Livraison adaptée et installation à domicile disponible
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Product Popup */}
      <AnimatePresence>
        {showPopup && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={popupVariants}
              className={`relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden ${
                disabilityType === "motor"
                  ? "border-4 border-blue-300 dark:border-blue-700"
                  : ""
              }`}
            >
              <Button
                variant="ghost"
                size={
                  disabilityType === "motor" || disabilityType === "visual"
                    ? "lg"
                    : "icon"
                }
                className={`absolute right-2 top-2 z-10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 ${
                  disabilityType === "motor" ? "right-4 top-4" : ""
                }`}
                onClick={closePopup}
              >
                <X
                  className={`${
                    disabilityType === "motor" || disabilityType === "visual"
                      ? "h-6 w-6"
                      : "h-5 w-5"
                  }`}
                />
                {disabilityType === "motor" && (
                  <span className="ml-2">Fermer</span>
                )}
              </Button>

              <div
                className={`grid ${
                  disabilityType === "motor" || disabilityType === "cognitive"
                    ? "grid-cols-1"
                    : "md:grid-cols-2"
                } gap-0`}
              >
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30">
                  <img
                    src={
                      selectedProduct.image ||
                      "/placeholder.svg?height=600&width=600"
                    }
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className={`p-6 ${
                    disabilityType === "visual" ? "p-8" : ""
                  } flex flex-col`}
                >
                  <div className="mb-2">
                    <div
                      className={`text-xs text-blue-500 dark:text-blue-300 mb-1 font-medium ${
                        disabilityType === "visual" ? "text-base" : ""
                      }`}
                    >
                      {selectedProduct.rewardPoints} Points de fidélité
                    </div>
                    <h2
                      className={`font-bold text-blue-900 dark:text-blue-100 mb-2 ${
                        disabilityType === "visual" ? "text-2xl" : "text-xl"
                      }`}
                    >
                      {selectedProduct.name}
                    </h2>
                    <p
                      className={`font-bold text-blue-800 dark:text-blue-200 mb-4 ${
                        disabilityType === "visual" ? "text-3xl" : "text-2xl"
                      }`}
                    >
                      {selectedProduct.price}
                    </p>
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`font-medium text-blue-700 dark:text-blue-300 ${
                          disabilityType === "visual" ? "text-lg" : ""
                        }`}
                      >
                        Description
                      </h3>

                      {/* Audio controls for description */}
                      {disabilityType === "visual" &&
                        selectedProduct.description && (
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 text-blue-600 dark:text-blue-400"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isPlaying) {
                                  stopAudio();
                                } else {
                                  readDescription(
                                    selectedProduct.description || ""
                                  );
                                }
                              }}
                            >
                              {isPlaying ? (
                                <>
                                  <VolumeX className="h-4 w-4" />
                                  <span>Arrêter</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="h-4 w-4" />
                                  <span>Écouter</span>
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                    </div>

                    <p
                      className={`text-blue-700 dark:text-blue-300 mb-6 ${
                        disabilityType === "visual" ? "text-lg" : ""
                      } ${
                        disabilityType === "cognitive" ? "leading-relaxed" : ""
                      }`}
                    >
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="mt-auto space-y-4">
                    <Button
                      className={`w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white ${
                        disabilityType === "motor" ? "py-6 text-lg" : ""
                      } ${disabilityType === "visual" ? "text-lg py-5" : ""}`}
                    >
                      {disabilityType === "cognitive"
                        ? "ACHETER"
                        : "AJOUTER AU PANIER"}
                    </Button>
                    <p
                      className={`text-xs text-blue-500 dark:text-blue-400 text-center ${
                        disabilityType === "visual" ? "text-sm" : ""
                      }`}
                    >
                      Livraison adaptée et assistance à l'installation
                      disponibles
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
