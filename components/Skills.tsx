"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  logo: string;
}

const skills: Skill[] = [
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",},
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"},
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"},
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"},
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"},
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"},
  { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"},
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"},
  { name: "WordPress", logo: "https://skillicons.dev/icons?i=wordpress"},
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"},
  { name: "Tailwind CSS", logo: "https://skillicons.dev/icons?i=tailwind"},
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"},
  { name: "Photoshop", logo: "https://skillicons.dev/icons?i=ps"},
  { name: "Illustrator", logo: "https://skillicons.dev/icons?i=ai"},
  { name: "InDesign", logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg"},
  { name: "Premiere Pro", logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg"},
  { name: "After Effects", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg"},
];

export default function Skills() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".skill-card", {
      scale: 0.8,
      opacity: 0,
      rotationY: -90,
      duration: 0.6,
      stagger: 0.05,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: container.current,
        start: "top 30%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      className="min-h-screen py-32 px-6 container mx-auto"
      id="skills"
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 sm:mb-12 md:mb-16 text-center" style={{ fontFamily: "'Boldonse', sans-serif" }}>
        Compétences
      </h2>
      
      <div className="w-full">
        <div className="bg-[#1A0005]/80 border border-[#FFECD1]/30 rounded-2xl p-6 md:p-8 mx-6 md:mx-8 lg:mx-12">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 md:gap-4 ">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-card aspect-square"
                style={{ perspective: "1000px" }}
              >
                <div className="skill-card-inner relative w-full h-full transition-transform duration-500 preserve-3d">
                  <div
                    className="skill-card-front absolute inset-0 w-full h-full backface-hidden flex items-center justify-center p-2 rounded-lg border border-[#FFECD1]/30 hover:border-[#FFECD1]/50 transition-colors"
                    style={{
                      backgroundColor: `#FFECD120`,
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-sm md:text-base lg:text-lg font-bold text-[#FFECD1]">${skill.name}</span>`;
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className="skill-card-back absolute inset-0 w-full h-full backface-hidden flex items-center justify-center p-2 rounded-lg border border-[#FFECD1]/30 hover:border-[#FFECD1]/50 transition-colors rotate-y-180"
                    style={{
                      backgroundColor: `#1A0005`,
                    }}
                  >
                    <span className="text-sm md:text-base lg:text-lg font-bold text-[#FFECD1] text-center px-2">
                      {skill.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
