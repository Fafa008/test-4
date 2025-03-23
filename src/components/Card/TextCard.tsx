"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface TextCardProps {
  features: string[]
  deficiencyType: string
  badgeIcon: React.ReactNode
  imageSrc: string
  imageAlt?: string
}

const TextCard: React.FC<TextCardProps> = ({ 
  features, 
  deficiencyType, 
  badgeIcon, 
  imageSrc,
  imageAlt = "Visualisation du projet" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animation d'entrée principale
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Animation de l'image
    tl.fromTo(
      imageRef.current,
      {
        x: -100,
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
      },
    )

    // Animation du titre
    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "back.out(1.7)" },
      "-=0.5",
    )

    // Animation des fonctionnalités une par une
    featureRefs.current.forEach((feature, index) => {
      tl.fromTo(
        feature,
        {
          x: 50,
          opacity: 0,
          scale: 0.95,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3",
      )
    })

    // Animation du chemin SVG
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength()

      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      })

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      })
    }

    // Nettoyage
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col md:flex-row bg-white dark:bg-gray-900 overflow-hidden shadow-xl p-6 md:p-8 my-12 w-full h-full mx-auto"
    >
      {/* Côté gauche - Image */}
      <div className="flex-1 mb-8 md:mb-0">
        <div className="rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-[1.02] duration-300">
          <img
            ref={imageRef}
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Badge d'accessibilité avec icône personnalisée */}
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full inline-flex items-center mt-4 font-medium">
          <span className="mr-2">
            {badgeIcon}
          </span>
          {deficiencyType}
        </div>
      </div>     

      {/* Séparateur avec animation SVG */}
      <div className="hidden md:block relative mx-6">
        <svg
          width="100"
          height="100%"
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
          viewBox="0 0 100 400"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M50 0 V400"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="50" cy="0" r="6" className="fill-primary" />
          <circle cx="50" cy="400" r="6" className="fill-primary" />
        </svg>
      </div>

      {/* Côté droit - Liste des fonctionnalités */}
      <div className="flex-1 pl-0 md:pl-8">
        <h2
          ref={titleRef}
          className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 border-b pb-4 border-primary/30"
        >
          Fonctionnalités du projet
        </h2>
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} ref={(el) => (featureRefs.current[index] = el)} className="feature-item">
              <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <span className="font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-200 text-lg">{feature}</p>
              </div>
              {index < features.length - 1 && <div className="h-px bg-gray-200 dark:bg-gray-700 my-2 ml-14" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TextCard