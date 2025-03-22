"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Search, Menu, ShoppingCart, X } from "lucide-react"

import { Button } from "../ui/button-ma"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"

// Define Product type for better type safety
interface Product {
  id: number
  name: string
  price: string
  image: string
  isNew: boolean
  rewardPoints: number
  description?: string
}

export default function Dashboard() {
  // State for selected product and popup
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  // Animation controls
  const controls = useAnimation()
  const { scrollY } = useScroll()

  // Refs for scroll animations
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const productsRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 })
  const productsInView = useInView(productsRef, { once: true, amount: 0.1 })

  // Parallax effect for header
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.9])
  const headerY = useTransform(scrollY, [0, 100], [0, -10])
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98])

  // Trigger animations when elements come into view
  useEffect(() => {
    if (statsInView) {
      controls.start("visible")
    }
  }, [controls, statsInView])

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
  }

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
  }

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
  }

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
  }

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
  }

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
  ]

  // Handle product click
  const handleProductClick = (product: Product, e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation
    setSelectedProduct(product)
    setShowPopup(true)
  }

  // Close popup
  const closePopup = () => {
    setShowPopup(false)
    // Reset selected product after animation completes
    setTimeout(() => setSelectedProduct(null), 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 dark:text-white">
      {/* Header */}
      <motion.header
        style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-blue-100 dark:border-slate-700"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="md:hidden border-blue-200 dark:border-slate-700">
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400 dark:text-blue-300" />
              <Input
                placeholder="Rechercher des produits..."
                className="pl-10 bg-blue-50 dark:bg-slate-800 border-blue-100 dark:border-slate-700 focus-visible:ring-blue-300 dark:focus-visible:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800"
            >
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-teal-500 dark:bg-teal-400 text-white">
                2
              </Badge>
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
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
                className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-100 leading-tight"
              >
                Solutions <span className="text-teal-500 dark:text-teal-300">adaptées</span> pour l'autonomie
              </motion.h1>

              <motion.p variants={heroItemVariants} className="text-lg text-blue-700 dark:text-blue-300">
                Des produits spécialement conçus pour améliorer le quotidien des personnes en situation de handicap et
                favoriser leur indépendance.
              </motion.p>

              <motion.div variants={heroItemVariants} className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                >
                  Découvrir nos solutions
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-300 dark:border-blue-500 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800"
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
        <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              initial="hidden"
              animate={productsInView ? "visible" : "hidden"}
              variants={productVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
              onClick={(e) => handleProductClick(product, e)}
            >
              <div className="cursor-pointer">
                <Card className="overflow-hidden border-none rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30">
                      <div className="relative w-full h-full">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        />
                        <div className="absolute top-2 left-2 bg-teal-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                          Adapté
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-blue-500 dark:text-blue-300 mb-2 font-medium">
                        Earn {product.rewardPoints} Reward Points
                      </div>
                      <h3 className="font-medium text-sm mb-3 line-clamp-2 h-10 text-blue-900 dark:text-blue-100">
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-lg text-blue-800 dark:text-blue-200">{product.price}</p>
                      </div>
                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-all duration-300 transform group-hover:scale-105">
                        SHOP NOW
                      </Button>
                      <p className="text-xs text-blue-500 dark:text-blue-400 mt-3 text-center">
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
              className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700"
                onClick={closePopup}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col">
                  <div className="mb-2">
                    <div className="text-xs text-blue-500 dark:text-blue-300 mb-1 font-medium">
                      Earn {selectedProduct.rewardPoints} Reward Points
                    </div>
                    <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">{selectedProduct.name}</h2>
                    <p className="font-bold text-2xl text-blue-800 dark:text-blue-200 mb-4">{selectedProduct.price}</p>
                  </div>

                  <div className="flex-grow">
                    <p className="text-blue-700 dark:text-blue-300 mb-6">{selectedProduct.description}</p>
                  </div>

                  <div className="mt-auto space-y-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                      AJOUTER AU PANIER
                    </Button>
                    <p className="text-xs text-blue-500 dark:text-blue-400 text-center">
                      Livraison adaptée et assistance à l'installation disponibles
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

