"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const currentProgress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);
    updateProgress(); // Initial call

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useGSAP(() => {
    if (circleRef.current) {
      const radius = 26; // Rayon réduit
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (progress / 100) * circumference;

      gsap.to(circleRef.current, {
        strokeDashoffset: offset,
        duration: 0.1,
        ease: "none",
      });
    }
  }, [progress]);

  // Initialiser la rotation une seule fois au montage
  useGSAP(() => {
    if (arrowRef.current) {
      gsap.set(arrowRef.current, { rotation: -45 });
    }
  }, []);

  // Animation de la flèche au hover
  useGSAP(() => {
    if (arrowRef.current) {
      if (isHovered) {
        // Flèche vers le haut (rotation de -45° à 0°)
        gsap.to(arrowRef.current, {
          rotation: 0, // Point vers le haut
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Flèche en diagonale vers le bas à droite (retour à -45°)
        gsap.to(arrowRef.current, {
          rotation: -45, // Diagonale vers le bas à droite
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, [isHovered]);

  const handleClick = () => {
    // Toujours remonter en haut avec Lenis pour un scroll smooth
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      // Fallback si Lenis n'est pas disponible
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 right-8 z-50 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <svg width="60" height="60" viewBox="0 0 60 60" className="transform -rotate-90">
        {/* Cercle de fond */}
        <circle
          cx="30"
          cy="30"
          r="26"
          fill="none"
          strokeWidth="2.5"
        />
        
        {/* Cercle de progression */}
        <circle
          ref={circleRef}
          cx="30"
          cy="30"
          r="26"
          fill="none"
          stroke="#FFECD1"
          strokeWidth="2.5"
          strokeDasharray={2 * Math.PI * 26}
          strokeDashoffset={2 * Math.PI * 26}
          strokeLinecap="round"
        />
      </svg>

      {/* Flèche au centre */}
      <div
        ref={arrowRef}
        className="absolute top-1/2 left-1/2 pointer-events-none"
        style={{ transformOrigin: "center", transform: "translate(-50%, -50%)" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 5v14M5 12l7-7 7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#FFECD1]"
          />
        </svg>
      </div>
    </div>
  );
}

