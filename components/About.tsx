"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Animation du texte gérée par le composant SplitText
  // Gestion de la preview du CV au survol du bouton
  const previewRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    if (previewRef.current) {
      previewRef.current.style.left = `${e.clientX + 20}px`;
      previewRef.current.style.top = `${e.clientY + 20}px`;
    }
  };

  // Effet parallaxe sur la carte au mouvement de la souris (même en dehors de la carte)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageContainerRef.current || !container.current) return;

      // Calculer la position du curseur par rapport à la section entière
      const sectionRect = container.current.getBoundingClientRect();
      const centerX = sectionRect.left + sectionRect.width / 2;
      const centerY = sectionRect.top + sectionRect.height / 2;
      
      // Calculer le déplacement relatif au centre de la section
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Normaliser et appliquer un facteur de déplacement (max 40px)
      const maxDistance = Math.max(sectionRect.width, sectionRect.height) / 2;
      const moveX = (deltaX / maxDistance) * 40;
      const moveY = (deltaY / maxDistance) * 40;

      // Animer la carte entière pour suivre le curseur
      gsap.to(imageContainerRef.current, {
        x: moveX,
        y: moveY,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!imageContainerRef.current) return;
      
      // Remettre la carte au centre quand la souris quitte la section
      gsap.to(imageContainerRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const sectionContainer = container.current;
    
    if (sectionContainer) {
      sectionContainer.addEventListener("mousemove", handleMouseMove);
      sectionContainer.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (sectionContainer) {
        sectionContainer.removeEventListener("mousemove", handleMouseMove);
        sectionContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={container}
      className="min-h-screen py-32 px-6 container mx-auto"
    >
      <div className="space-y-16">
        {/* Titre centré sans animation */}
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold" style={{ fontFamily: "'Boldonse', sans-serif" }}>
            About Me
          </h2>
        </div>
        
        {/* Image et texte côte à côte */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Image en format carte (panoramique) */}
          <div 
            ref={imageContainerRef}
            className="relative w-full max-w-xl mx-auto md:mx-0 h-[500px] sm:h-[500px] md:h-[550px] lg:h-[650px] rounded-lg overflow-hidden bg-gradient-to-br from-[#1A0005]/60 to-[#1A0005]/80 border border-[#FFECD1]/30"
            style={{ transform: "translate(0, 0)" }}
          >
            <Image
              src="/images/aymeric.png"
              alt="Aymeric Borges"
              fill
              className="object-cover object-top md:object-center"
              priority
            />
          </div>
          
          {/* Texte - prend toute la place libre avec police fine mais texte gros */}
          <div className="w-full space-y-6">
            <div className="space-y-4">
              <SplitText
                text="Je m'appelle Borges Aymeric, je suis passionné par le développement web et le graphisme. Diplômé d'un BUT MMI (Métiers du Multimédia et de l'Internet), j'ai acquis une solide base en conception et développement de projets numériques, tout en affinant mon sens de l'esthétique et de l'ergonomie."
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl font-light leading-relaxed max-w-[900px] text-[#FFECD1]"
                delay={150}
                duration={1.5}
                ease="power3.out"
                splitType="lines"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
                tag="p"
              />
              <SplitText
                text="Bienvenue sur mon portfolio !"
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl font-light leading-relaxed max-w-[900px] text-[#FFECD1]"
                delay={150}
                duration={1.5}
                ease="power3.out"
                splitType="lines"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
                tag="p"
              />
            </div>
            {/* Bouton Voir mon CV avec preview */}
            <div className="relative">
              {/* Preview du CV qui suit le curseur */}
              {showPreview && (
                <div
                  ref={previewRef}
                  className="fixed z-50 pointer-events-none"
                  style={{
                    left: `${mousePosition.x + 20}px`,
                    top: `${mousePosition.y + 20}px`,
                    transform: "rotate(2deg)",
                    animation: "fadeInScale 0.3s ease-out",
                  }}
                >
                  <div className="shadow-2xl max-w-xs">
                    <img
                      src="/images/opquast_certification.webp"
                      alt="CV Preview"
                      className="w-full h-auto max-h-64 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}
              
              <a
                href="/cv.pdf"
                download
                onMouseEnter={() => setShowPreview(true)}
                onMouseLeave={() => setShowPreview(false)}
                onMouseMove={handleMouseMove}
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#FFECD1]/10 border-2 border-[#FFECD1] text-[#FFECD1] rounded-full font-semibold text-sm md:text-base hover:bg-[#FFECD1]/20 transition-all duration-300 group"
              >
                <span>Voir mon CV</span>
                <svg 
                  className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

