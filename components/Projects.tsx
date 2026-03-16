"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useModal } from "@/contexts/ModalContext";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  figmaUrl?: string;
  videoUrl?: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "DASHBOARD",
    description: "Une application web interactive permettant d'explorer la consommation et la production d'énergie dans la région Grand-Est à travers des graphiques dynamiques construits avec Chart.js, PHP et MySQL.",
    technologies: ["HTML", "JS", "CSS", "Chart.js", "PHP", "MySQL"],
    githubUrl: "https://github.com/username/projet1",
    liveUrl: "https://projet1.com",
    image: "images/project_dashboard_php/cover_dashboard_php.webp",
  },
  {
    id: 2,
    title: "BUGTRACKER",
    description: "BugTracker est une application web de gestion de tickets pensée pour suivre et traiter les bugs d'un projet logiciel, avec trois espaces distincts pour le testeur, le développeur et l'administrateur.",
    technologies: ["PHP","HTML"],
    githubUrl: "https://github.com/borges-aymeric/Bugtracker",
    image: "images/project_bugtracker/cover_bugtracker.webp",
  },
  {
    id: 3,
    title: "GUARDIAN OF ÆTHERIA",
    description: "GUARDIAN OF ÆTHERIA : Jeu en 3D réalisé dans le moteur de jeu Unity avec des modèles 3D créés sous le logiciel Blender.",
    technologies: ["Blender", "Unity","C#"],
    liveUrl: "https://projet3.com",
    image: "/images/project_GoA/cover_goa.webp",
  },
  {
    id: 4,
    title: "CRÉATIONS PHOTOSHOP",
    description: "Quelques créations visuelles réalisées sous Adobe Photoshop, explorant différents effets (flous, jeux de plans, ombres) pour mettre en valeur les visuels.",
    technologies: ["Photoshop"],
    image: "/images/project_photoshop/cover_photoshop.webp",
  },
  {
    id: 7,
    title: "ILLUSTRATOR",
    description: "Quelques créations réalisées sous Adobe Illustrator, conception de logos pour différents projets.",
    technologies: ["Illustrator"],
    image: "/images/project_illustrator/cover_illustrator.webp",
  },
  {
    id: 8,
    title: "JE MONTE MA BOITE",
    description: "« Je monte ma boîte » est une maquette d'application mobile conçue sur Figma pour accompagner pas à pas les futurs entrepreneurs, de l'idée à la création de leur entreprise.",
    technologies: ["Figma"],
    image: "/images/project_jemontemaboite/cover_jemontemaboite.webp",
    figmaUrl: "https://www.figma.com/proto/322sK8w56RCLA8xHDeicir/Je-monte-ma-boite?node-id=106-696&t=VwaGwL0LR8Qg8kTg-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=106%3A696",
  },
  {
    id: 6,
    title: "DASHBOARD FIGMA",
    description: "Application fictive dun dashboard de gestion de projets fonctionnant comme une to‑do list sur différents projets.",
    technologies: ["Figma"],
    liveUrl: "https://dashboard.com",
    figmaUrl: "https://www.figma.com/proto/OiSL36wvLPuQPhkqOlPZU8/but32425-aymeric-borges?page-id=324%3A1899&node-id=1474-1937&p=f&viewport=700%2C1021%2C0.17&t=yezZXpvR7lB4AlGj-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1474%3A1937",
    image: "/images/project_dashboard_figma/cover_dashboard_figma.webp",
  },
  {
    id: 5,
    title: "BREAKING BAD",
    description: "Motion design reproduisant l'introduction de la série Breaking Bad sous le logiciel After Effects.",
    technologies: ["After Effects"],
    videoUrl: "/videos/breaking_bad_intro.mp4",
    image: "/images/project_breaking_bad/cover_breakingbad.webp",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const projectsWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const { setIsModalOpen } = useModal(); 

  useGSAP(() => {
    if (!sectionRef.current || !horizontalContainerRef.current || !projectsWrapperRef.current) return;

    const projectElements = projectsWrapperRef.current.querySelectorAll(".project-item");
    const projectWidth = window.innerWidth * 0.95; 
    const gap = window.innerWidth >= 768 ? 128 : 80;
    const totalWidth = projects.length * projectWidth + (projects.length - 1) * gap;
    
    gsap.set(horizontalContainerRef.current, {
      width: `${totalWidth}px`,
    });

    let scrollTween: gsap.core.Tween | null = null;
    let timeoutId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      const firstProject = projectElements[0] as HTMLElement;
      const lastProject = projectElements[projectElements.length - 1] as HTMLElement;
      
      if (firstProject && lastProject) {
        const firstProjectLeft = firstProject.offsetLeft;
        const lastProjectLeft = lastProject.offsetLeft;
        const scrollDistance = lastProjectLeft - firstProjectLeft;
        
        scrollTween = gsap.to(horizontalContainerRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        projectElements.forEach((projectItem, index) => {
          const titleEl = projectItem.querySelector(".project-title");
          
          if (titleEl && scrollTween) {
            gsap.fromTo(
              titleEl,
              {
                opacity: 0,
                y: 50,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: projectItem,
                  containerAnimation: scrollTween,
                  start: "left center",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (scrollTween) scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) trigger.kill();
      });
    };
  }, { scope: sectionRef });

  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      scrollPositionRef.current = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if ((window as any).lenis) (window as any).lenis.stop();
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = "100%";
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.overflow = "hidden";
      ScrollTrigger.refresh();
    } else {
      const savedPosition = scrollPositionRef.current || 0;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.overflow = "";
      if ((window as any).lenis) (window as any).lenis.start();
      window.scrollTo(0, savedPosition);
      ScrollTrigger.refresh();
    }
  }, [selectedProject]);

  useEffect(() => {
    setIsModalOpen(selectedProject !== null);
  }, [selectedProject, setIsModalOpen]);

  useGSAP(() => {
    if (!modalRef.current) return;
    const modalContent = modalRef.current.querySelector("div > div");
    if (selectedProject && modalContent) {
      gsap.set(modalRef.current, { opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' });
      gsap.set(modalContent, { scale: 0.95, y: 20, opacity: 0, transformOrigin: 'center center' });
      gsap.to(modalRef.current, { opacity: 1, duration: 0.2, ease: "power2.out" });
      gsap.to(modalContent, { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "power3.out", delay: 0.05, clearProps: "transformOrigin" });
    } else if (modalContent) {
      gsap.set(modalContent, { clearProps: "all" });
    }
  }, [selectedProject]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative w-screen overflow-hidden bg-[#1C0207] min-h-screen"
    >
      <div className="pt-4 sm:py-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-center text-[#FFECD1] uppercase" style={{ fontFamily: "'Boldonse', sans-serif" }}>
          Projets
        </h2>
      </div>

      <div
        ref={horizontalContainerRef}
        className="flex items-start min-h-screen pt-4"
      >
        <div
          ref={projectsWrapperRef}
          className="flex items-center gap-20 md:gap-32 px-6 md:px-12"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-item flex-shrink-0 w-[95vw] max-w-[1800px] px-6 md:px-12"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="flex flex-col h-full justify-between">
                <h3 
                  className="project-title text-3xl md:text-5xl lg:text-6xl font-bold text-[#FFECD1] uppercase mb-4 md:mb-6 break-words leading-snug"
                  style={{ lineHeight: "1.35", opacity: 0 }}
                >
                  {project.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6">
                  <div className="relative order-1 md:order-none">
                    <div className="project-image w-full h-[250px] sm:h-[350px] md:h-[500px] rounded-xl md:rounded-2xl overflow-hidden bg-indigo-900/30 border border-[#9abbbb]/20">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>

                  <div className="flex flex-col justify-start space-y-4 sm:space-y-6 order-2 md:order-none">
                    <div className="space-y-2 sm:space-y-3">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFECD1] uppercase tracking-wider">Introduction du projet</h4>
                      <p className="project-description text-[#FFECD1] text-xs sm:text-sm md:text-base leading-relaxed">{project.description}</p>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFECD1] uppercase tracking-wider">Technologies utilisées</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="tech-pill px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs md:text-sm border-2 border-[#FFECD1] text-[#FFECD1] rounded-full font-medium hover:bg-[#FFECD1]/10 transition-colors duration-300">{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-6">
                      <button onClick={() => setSelectedProject(project)} className="project-button-curtain w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-[#FFECD1] text-[#FFECD1] rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 group">
                        <span className="flex items-center justify-center sm:justify-start gap-2">
                          VOIR + EN DÉTAILS
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" /></svg>
                        </span>
                      </button>
                    </div>

                    {project.githubUrl && (
                      <div className="mt-4 sm:mt-6">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-button-curtain inline-flex items-center justify-center sm:justify-start gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-[#FFECD1] text-[#FFECD1] rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 group w-full sm:w-auto">
                          <span className="flex items-center gap-2 sm:gap-3">
                            DÉPOT GITHUB
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" /></svg>
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          ref={modalRef}
          className="fixed z-[200] bg-[#1A0005]/80 backdrop-blur-sm p-2 md:p-4"
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, boxSizing: 'border-box' }}
          onClick={(e) => { if (e.target === modalRef.current) setSelectedProject(null); }}
        >
          <div 
            className="relative bg-[#1A0005] border-2 border-[#9a0002]/30 rounded-xl md:rounded-2xl w-[70vw] sm:w-[75vw] md:w-full max-w-full md:max-w-3xl max-h-[95vh] md:max-h-[85vh] overflow-y-auto modal-scrollbar"
            style={{ margin: 'auto', position: 'relative', transform: 'translateZ(0)' }}
            data-lenis-prevent="true"
            onWheel={(e) => { e.stopPropagation(); }}
          >
            <button onClick={() => setSelectedProject(null)} className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-[#FFECD1] hover:text-[#FFECD1] transition-colors duration-300 z-10 bg-[#1A0005]/50 md:bg-transparent rounded-full md:rounded-none" aria-label="Fermer la modal">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="p-4 sm:p-6 md:p-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-[#FFECD1] uppercase mb-4 md:mb-6 leading-snug" style={{ lineHeight: "1.35" }}>{selectedProject.title}</h2>
              <div className="mb-6 md:mb-8 rounded-lg md:rounded-xl overflow-hidden relative group">
                {(selectedProject.id === 6 || selectedProject.id === 8) && selectedProject.figmaUrl ? (
                  <a 
                    href={selectedProject.figmaUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block relative w-full h-full"
                  >
                    <img 
                      src={selectedProject.id === 8 ? "/images/project_jemontemaboite/vue_global.webp" : selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full h-auto object-contain transition-all duration-300 group-hover:blur-sm" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-[#1A0005]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[#FFECD1] text-xl md:text-2xl font-bold uppercase tracking-wider">
                        Voir la maquette
                      </span>
                    </div>
                  </a>
                ) : selectedProject.id === 5 && selectedProject.videoUrl ? (
                  <video 
                    src={selectedProject.videoUrl}
                    controls
                    className="w-full h-auto rounded-lg md:rounded-xl"
                    preload="metadata"
                  >
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                ) : selectedProject.id === 3 ? (
                  <div className="relative w-full aspect-video rounded-lg md:rounded-xl overflow-hidden">
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/ADvJUbgkbFY?si=SXa4ztdU_ncCsGQl"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                ) : (
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-auto object-cover" />
                )}
              </div>
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFECD1] uppercase mb-3 md:mb-4">Description</h3>
                <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed mb-3 md:mb-4">{selectedProject.description}</p>
              </div>
              {selectedProject.id === 2 && (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFECD1] uppercase mb-3 md:mb-4">Description détaillée</h3>
                  <div className="space-y-4">
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      L&apos;espace Testeur permet de déclarer un bug via un formulaire dédié (titre, tag, description), puis de visualiser la liste de ses tickets avec leur priorité, leur statut et le développeur associé. L&apos;objectif est de simplifier la remontée d&apos;incidents et de donner au testeur une visibilité claire sur la prise en charge de ses signalements.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      L&apos;espace Développeur affiche uniquement les tickets qui lui sont assignés, sous forme de tableau détaillé (date, titre, tag, description, priorité, statut). Le développeur peut modifier le statut du ticket (Résolu, Rejeté, Non bloquant, Vérification, etc.) afin de suivre l&apos;avancement du traitement des bugs.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      L&apos;espace Admin offre une vue globale sur l&apos;ensemble des tickets, tous utilisateurs confondus, avec la possibilité de définir la priorité, le statut et surtout d&apos;assigner chaque bug à un développeur via un menu déroulant et un bouton d&apos;action. Cette interface centralise la gestion des bugs et permet d&apos;organiser le travail de l&apos;équipe en fonction des urgences et des responsabilités.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      Ce projet met en avant ma capacité à concevoir un flux complet de gestion de support, à structurer des interfaces adaptées à chaque rôle et à manipuler les données de manière cohérente côté front et back‑end.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-6 md:mt-8">
                    <figure>
                      <a
                        href="/images/project_bugtracker/admin.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img src="/images/project_bugtracker/admin.webp" alt="Page admin - BUGTRACKER" className="w-full h-auto object-cover rounded-lg md:rounded-xl" />
                      </a>
                      <figcaption className="text-[#FFECD1]/60 text-xs sm:text-sm mt-2 text-center italic">Page Admin — BUGTRACKER</figcaption>
                    </figure>
                    <figure>
                      <a
                        href="/images/project_bugtracker/dev.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img src="/images/project_bugtracker/dev.webp" alt="Page dev - BUGTRACKER" className="w-full h-auto object-cover rounded-lg md:rounded-xl" />
                      </a>
                      <figcaption className="text-[#FFECD1]/60 text-xs sm:text-sm mt-2 text-center italic">Page Developpeur — BUGTRACKER</figcaption>
                    </figure>
                    <figure>
                      <a
                        href="/images/project_bugtracker/testeur.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img src="/images/project_bugtracker/testeur.webp" alt="Page testeur - BUGTRACKER" className="w-full h-auto object-cover rounded-lg md:rounded-xl" />
                      </a>
                      <figcaption className="text-[#FFECD1]/60 text-xs sm:text-sm mt-2 text-center italic">Page Testeur — BUGTRACKER</figcaption>
                    </figure>
                  </div>
                </div>
              )}
              {selectedProject.id === 3 && (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFECD1] uppercase mb-3 md:mb-4">Détails du projet</h3>
                  <div className="space-y-4">
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      Lors de ce projet d&apos;étude en 3ème année de cette formation, j&apos;ai participé à la création de Guardian of Aetheria, un jeu 3D mêlant exploration, aventure et résolution d&apos;énigmes.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      J&apos;ai d&apos;abord créé plusieurs assets 3D sous Blender (éléments de décor, structures d&apos;énigmes, objets interactifs), puis je les ai importés dans Unity en veillant à la bonne échelle, aux matériaux et à l&apos;optimisation pour l&apos;intégration en temps réel. Cela m&apos;a permis de travailler concrètement sur le lien entre modélisation 3D et moteur de jeu.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      Sur le plan technique, j&apos;ai conçu l&apos;une des énigmes principales en C# : détection des interactions du joueur, activation de mécanismes, validation des conditions de réussite et retour visuel. Ce travail m&apos;a aidé à me perfectionner dans le développement de mécaniques de jeu interactives, la gestion des triggers, des états et la coordination entre scripts et éléments de la scène Unity.
                    </p>
                  </div>
                  <figure className="mt-6 md:mt-8">
                    <a
                      href="/images/project_GoA/enigme_feu.webp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img src="/images/project_GoA/enigme_feu.webp" alt="Énigme du feu - Guardian of Aetheria" className="w-full h-auto object-cover rounded-lg md:rounded-xl" />
                    </a>
                    <figcaption className="text-[#FFECD1]/60 text-xs sm:text-sm mt-2 text-center italic">Énigme du feu — Guardian of Aetheria</figcaption>
                  </figure>
                </div>
              )}
              {selectedProject.id === 4 && (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFECD1] uppercase mb-3 md:mb-4">
                    Détails du projet
                  </h3>
                  <div className="space-y-4">
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      Lors de ma formation, j&apos;ai pu expérimenter en profondeur Adobe Photoshop à travers différents exercices de création graphique. J&apos;ai travaillé sur des compositions visuelles complètes en jouant avec les flous, les jeux de plans, les ombres portées et les éclairages, afin de donner du relief et de la cohérence aux visuels.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      Ces projets m&apos;ont permis de développer un sens du détail et de la mise en scène, pour obtenir des visuels adaptés à une communication professionnelle (packaging, promotion de produits, etc.).
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 md:mt-8">
                    <figure>
                      <a
                        href="/images/project_photoshop/jus.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src="/images/project_photoshop/jus.webp"
                          alt="Création Photoshop - visuel jus"
                          className="w-full h-auto object-cover rounded-lg md:rounded-xl"
                        />
                      </a>
                      <figcaption className="text-[#FFECD1]/60 text-xs sm:text-sm mt-2 text-center italic">
                        Création Photoshop — visuel jus
                      </figcaption>
                    </figure>
                    <figure>
                      <a
                        href="/images/project_photoshop/kit.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src="/images/project_photoshop/kit.webp"
                          alt="Création Photoshop - visuel kit"
                          className="w-full h-auto object-cover rounded-lg md:rounded-xl"
                        />
                      </a>
                      <figcaption className="text-[#FFECD1]/60 text-xs sm:text-sm mt-2 text-center italic">
                        Création Photoshop — visuel kit
                      </figcaption>
                    </figure>
                    <figure>
                      <a
                        href="/images/project_photoshop/produits.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src="/images/project_photoshop/produits.webp"
                          alt="Création Photoshop - visuel produits"
                          className="w-full h-auto object-cover rounded-lg md:rounded-xl"
                        />
                      </a>
                      <figcaption className="text-[#FFECD1]/60 text-xs sm:text-sm mt-2 text-center italic">
                        Création Photoshop — visuel produits
                      </figcaption>
                    </figure>
                  </div>
                </div>
              )}
              {selectedProject.id === 1 && (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFECD1] uppercase mb-3 md:mb-4">Détails du projet</h3>
                  <div className="space-y-4">
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      Lors de ma deuxième année de Bachelor Universitaire de Technologie – Métiers du Multimédia et de l'Internet, j'ai conçu un site web de dashboard (tableau de bord) destiné à visualiser des données énergétiques. L'objectif principal était de créer une interface intuitive permettant d'analyser la consommation et la production d'énergie de la région Grand-Est et du département des Ardennes.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      J'ai d'abord récupéré et structuré les données issues d'une base MySQL, avant de les traiter avec PHP afin de générer dynamiquement les requêtes nécessaires aux graphiques. L'utilisation de la bibliothèque Chart.js m'a permis de mettre en place plusieurs types de visualisations (courbes, diagrammes en barres, secteurs) adaptées à la nature de chaque donnée.
                    </p>
                  
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      Ce projet m'a permis de consolider mes compétences en développement web dynamique, intégration de données et visualisation d'informations complexes. Il m'a aussi fait prendre conscience de l'importance de la visualisation dans la communication des données et de l'expérience utilisateur dans les projets de data-driven design.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-6 md:mt-8">
                    <figure>
                      <a
                        href="/images/project_dashboard_php/bdd.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img src="/images/project_dashboard_php/bdd.webp" alt="Base de données - Dashboard" className="w-full h-auto object-cover rounded-lg md:rounded-xl" />
                      </a>
                      <figcaption className="text-[#FFECD1]/60 text-xs sm:text-sm mt-2 text-center italic">Base de données — Dashboard</figcaption>
                    </figure>
                    <figure>
                      <a
                        href="/images/project_dashboard_php/dashboard.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img src="/images/project_dashboard_php/dashboard.webp" alt="Interface dashboard" className="w-full h-auto object-cover rounded-lg md:rounded-xl" />
                      </a>
                      <figcaption className="text-[#FFECD1]/60 text-xs sm:text-sm mt-2 text-center italic">Interface dashboard</figcaption>
                    </figure>
                  </div>
                </div>
              )}
              {selectedProject.id === 6 && (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFECD1] uppercase mb-3 md:mb-4">Détails du projet</h3>
                  <div className="space-y-4">
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      Lors de ma 3ᵉ année de Bachelor Universitaire de Technologie – Métiers du Multimédia et de l'Internet, j'ai conçu sur Figma un dashboard de gestion de projets fonctionnant comme une to‑do list interactive. L'interface met en avant une vue "Today's", qui sert de vue globale des projets : elle regroupe les tâches importantes de la journée pour chaque projet, ce qui permet de voir immédiatement ce qui est en cours, à faire ou déjà terminé.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      Le tableau principal est organisé en colonnes par projet, chacune contenant des cartes de tâches avec un titre, une description courte, un statut (TODO, DOING, DONE), un avatar d'utilisateur et une date. Cette structure s'inspire des tableaux kanban afin de rendre la lecture et la priorisation des tâches à la fois simples et visuelles.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      Une barre latérale permet d'accéder rapidement aux différents projets, de créer une nouvelle tâche et d'accéder aux paramètres et au profil utilisateur. L'objectif était de proposer une interface fluide, claire et ergonomique, où l'utilisateur comprend immédiatement l'état d'avancement de ses projets.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      Ce projet m'a permis de travailler sur la cohérence visuelle (couleurs, typographie, composants réutilisables), la structure de l'information et le parcours utilisateur, tout en exploitant les fonctionnalités de Figma pour créer un prototype interactif réaliste. Il illustre ma capacité à concevoir une interface complète de gestion de projets centrée sur les besoins quotidiens des utilisateurs.
                    </p>
                  </div>
                  {selectedProject.figmaUrl && (
                    <div className="mt-6 md:mt-8">
                      <a 
                        href={selectedProject.figmaUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-button-curtain inline-flex items-center justify-center sm:justify-start gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-[#FFECD1] text-[#FFECD1] rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 group w-full sm:w-auto"
                      >
                        <span className="flex items-center gap-2 sm:gap-3">
                          VOIR LA MAQUETTE
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" /></svg>
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              )}
              {selectedProject.id === 7 && (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFECD1] uppercase mb-3 md:mb-4">
                    Créations Illustrator
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 md:mt-8">
                    <figure>
                      <a
                        href="/images/project_illustrator/ab-odyssee.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="w-full aspect-square overflow-hidden rounded-lg md:rounded-xl bg-[#1A0005]">
                          <img
                            src="/images/project_illustrator/ab-odyssee.webp"
                            alt="Création Illustrator 3"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </a>
                      <figcaption className="text-[#FFECD1]/60 text-xs sm:text-sm mt-2 text-center italic">
                        Logo AB Odyssée
                      </figcaption>
                    </figure>
                    <figure>
                      <a
                        href="/images/project_illustrator/lobodis.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="w-full aspect-square overflow-hidden rounded-lg md:rounded-xl bg-[#1A0005]">
                          <img
                            src="/images/project_illustrator/lobodis.webp"
                            alt="Création Illustrator 5"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </a>
                      <figcaption className="text-[#FFECD1]/60 text-xs sm:text-sm mt-2 text-center italic">
                        Logo Lobodis
                      </figcaption>
                    </figure>
                    <figure>
                      <a
                        href="/images/project_illustrator/goa.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="w-full aspect-square overflow-hidden rounded-lg md:rounded-xl bg-[#1A0005]">
                          <img
                            src="/images/project_illustrator/goa.webp"
                            alt="Création Illustrator 7"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </a>
                      <figcaption className="text-[#FFECD1]/60 text-xs sm:text-sm mt-2 text-center italic">
                        Logo Guardian of Aetheria
                      </figcaption>
                    </figure>
                  </div>
                </div>
              )}
              {selectedProject.id === 5 && (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFECD1] uppercase mb-3 md:mb-4">Détails du projet</h3>
                  <div className="space-y-4">
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      Dans le cadre de ce projet, j'ai dû reproduire l'introduction de la série Breaking Bad en utilisant Adobe After Effects. L'objectif n'était pas seulement de copier le générique, mais de comprendre comment il est construit : choix des couleurs, animations, transitions, effets de fumée et apparition progressive des éléments issus du tableau périodique.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      J'ai d'abord analysé la séquence originale pour en dégager la structure (durée, rythme, moments clés) et la direction artistique : fond vert texturé, fumée, typographie condensée, apparition des symboles chimiques, etc. J'ai ensuite recréé la composition en travaillant sur les calques de texte, les solides de couleur et les masques, puis en animant l'ensemble avec des keyframes (opacité, position, flou, échelle).
                    </p>
                  </div>
                </div>
              )}
              {selectedProject.id === 8 && (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFECD1] uppercase mb-3 md:mb-4">Détails du projet</h3>
                  <div className="space-y-4">
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      Dans le cadre de ce projet, j&apos;ai conçu sur Figma l&apos;interface d&apos;une application mobile fictive intitulée « Je monte ma boîte », destinée à accompagner les futurs entrepreneurs dans la création de leur entreprise. L&apos;objectif était de proposer un parcours simple et guidé pour des utilisateurs souvent éloignés des dispositifs d&apos;accompagnement classiques, en mettant l&apos;accent sur l&apos;expérience utilisateur plutôt que sur la multiplication des fonctionnalités.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      L&apos;application s&apos;articule autour de plusieurs sections clés :
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      <strong className="text-[#FFECD1]">Actualités</strong> : une sélection d&apos;articles, de conseils et d&apos;infos pratiques sur la création d&apos;entreprise (aides, nouveautés, témoignages), pour rester informé sans chercher partout.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      <strong className="text-[#FFECD1]">Checklist</strong> : une liste d&apos;étapes à cocher (idée, étude de marché, statut juridique, business plan, démarches administratives…) afin de visualiser clairement sa progression et savoir ce qu&apos;il reste à faire.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      <strong className="text-[#FFECD1]">Dashboard</strong> : un écran d&apos;accueil synthétique qui regroupe l&apos;avancement de la checklist, les prochaines tâches importantes et des raccourcis vers les principaux contenus.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      <strong className="text-[#FFECD1]">Parcours</strong> : un chemin guidé étape par étape, qui transforme le projet en petites actions concrètes, avec des explications simples pour chaque phase.
                    </p>
                    <p className="text-[#FFECD1] text-sm sm:text-base md:text-lg leading-relaxed">
                      <strong className="text-[#FFECD1]">Réseau / Forum</strong> : un espace d&apos;échanges pour poser des questions, partager son expérience et commencer à construire son réseau professionnel.
                    </p>
                  </div>
                  {selectedProject.figmaUrl && (
                    <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <a
                        href={selectedProject.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-button-curtain inline-flex items-center justify-center sm:justify-start gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-[#FFECD1] text-[#FFECD1] rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 group w-full sm:w-auto"
                      >
                        <span className="flex items-center gap-2 sm:gap-3">
                          MAQUETTE - ACCUEIL
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" /></svg>
                        </span>
                      </a>
                      <a
                        href={selectedProject.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-button-curtain inline-flex items-center justify-center sm:justify-start gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-[#FFECD1] text-[#FFECD1] rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 group w-full sm:w-auto"
                      >
                        <span className="flex items-center gap-2 sm:gap-3">
                          MAQUETTE - CONNEXION
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" /></svg>
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}