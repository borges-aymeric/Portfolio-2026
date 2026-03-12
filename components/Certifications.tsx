"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Certification {
  name: string;
  description: string;
  score: number;
  maxScore: number;
  certificateUrl?: string;
  certificatePreview?: string; // URL de l'image de preview (JPG)
  logo?: string; // URL du logo
  date?: string;
}

const certifications: Certification[] = [
  {
    name: "Certification Opquast",
    description: "Intégrer les règles et le vocabulaire assurance qualité web dans sa pratique professionnelle",
    score: 850,
    maxScore: 1000,
    certificateUrl: "/documents/opquast_certification.pdf", // URL du PDF
    certificatePreview: "/images/opquast_certification.webp", // Image de preview (WebP)
    logo: "/images/opquast.webp", // Logo Opquast
    date: "2024",
  },
];

export default function Certifications() {
  const container = useRef<HTMLDivElement>(null);
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (container.current) {
      gsap.from(".certification-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }
  }, { scope: container });

  const getScorePercentage = (score: number, maxScore: number) => {
    return (score / maxScore) * 100;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 85) return "text-green-400";
    if (percentage >= 70) return "text-yellow-400";
    return "text-orange-400";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    if (previewRef.current) {
      previewRef.current.style.left = `${e.clientX + 20}px`;
      previewRef.current.style.top = `${e.clientY + 20}px`;
    }
  };

  return (
    <section
      ref={container}
      className="pt-32 px-6 container mx-auto"
      style={{ paddingBottom: '20.5rem' }}
      id="certifications"
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 md:mb-12 text-center" style={{ fontFamily: "'Boldonse', sans-serif"}}>
        Certifications
      </h2>

      <div className="max-w-4xl mx-auto space-y-6 relative">
        {/* Preview de la certification qui suit le curseur */}
        {hoveredCert !== null && certifications[hoveredCert]?.certificatePreview && (
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
                src={certifications[hoveredCert].certificatePreview}
                alt="Preview certification"
                className="w-full h-auto max-h-64 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          </div>
        )}

        {certifications.map((cert, index) => {
          const percentage = getScorePercentage(cert.score, cert.maxScore);
          return (
            <div
              key={index}
              className="certification-card bg-[#1A0005]/80 border border-[#FFECD1]/30 rounded-2xl p-6 md:p-8 hover:border-[#FFECD1]/50 transition-all duration-300"
              style={{ opacity: 1 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    {cert.logo && (
                      <img
                        src={cert.logo}
                        alt={`${cert.name} logo`}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    )}
                    <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Boldonse', sans-serif" }}>
                      {cert.name}
                    </h3>
                  </div>
                  <p className="text-[#FFECD1]/80 mb-4 text-sm md:text-base">
                    {cert.description}
                  </p>
                  
                  {/* Score */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#FFECD1]/60">Score</span>
                        <span className={`text-lg font-bold ${getScoreColor(percentage)}`}>
                          {cert.score}/{cert.maxScore}
                        </span>
                      </div>
                      {/* Barre de progression */}
                      <div className="w-full bg-[#FFECD1]/20 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            percentage >= 85
                              ? "bg-gradient-to-r from-green-500 to-green-400"
                              : percentage >= 70
                              ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                              : "bg-gradient-to-r from-orange-500 to-orange-400"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {cert.date && (
                    <p className="text-xs text-[#FFECD1]/60">Obtenue en {cert.date}</p>
                  )}
                </div>

                {/* Flèche pour voir la certification */}
                {cert.certificateUrl && (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 text-[#FFECD1]/80 hover:text-[#FFECD1] transition-colors duration-300"
                    onMouseEnter={() => {
                      setHoveredCert(index);
                    }}
                    onMouseLeave={() => {
                      setHoveredCert(null);
                    }}
                    onMouseMove={handleMouseMove}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            
          );
          
        })}
      </div>
      
    </section>
  );
}

