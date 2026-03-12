"use client";

import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { isModalOpen } = useModal();
  
  // Refs pour animations du menu
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const socialRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  const menuItems = ["Home", "About", "Works", "Contact"];
  const socialLinks = [
    { icon: Github, href: "https://github.com/borges-aymeric", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/aymeric-borges-898825229/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:aymeric.borges@protonmail.fr", label: "Email" },
  ];

  // Smooth scroll function
  const smoothScrollTo = (targetId: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    
    // Si c'est Home, scroll vers le haut
    if (targetId === "#home" || targetId === "#") {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.scrollTo(0, {
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setIsMenuOpen(false);
      return;
    }
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.scrollTo(targetElement, {
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          offset: -80,
        });
      } else {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsMenuOpen(false);
  };

  // Scroll detection avec effet rideau
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      // Toujours visible en haut de la page
      if (currentScrollY < 50) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      
      // Effet rideau : cache en scrollant vers le bas, affiche en remontant
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scroll vers le bas - cache la navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scroll vers le haut - affiche la navbar
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Menu animations (Overlay, Links, etc.)
  useEffect(() => {
    if (!menuOverlayRef.current) return;

    if (isMenuOpen) {
      // Open sequence
      const overlay = menuOverlayRef.current;
      overlay.style.display = "block";
      overlay.style.pointerEvents = "auto";

      // 0ms: Overlay fade in
      setTimeout(() => {
        overlay.style.opacity = "1";
      }, 10);

      // 200ms: Menu items appear
      menuItemsRef.current.forEach((item, index) => {
        if (item) {
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateX(0) rotateY(0)";
          }, 200 + index * 120);
        }
      });

      // 400ms: Bottom line
      if (bottomLineRef.current) {
        setTimeout(() => {
          bottomLineRef.current!.style.transform = "scaleX(1)";
        }, 400);
      }

      // 500ms: Social icons
      socialRef.current.forEach((icon, index) => {
        if (icon) {
          setTimeout(() => {
            icon.style.opacity = "1";
            icon.style.transform = "translateY(0) scale(1)";
          }, 500 + index * 80);
        }
      });

      // 700ms: Contact info
      if (contactInfoRef.current) {
        setTimeout(() => {
          contactInfoRef.current!.style.opacity = "1";
          contactInfoRef.current!.style.transform = "translateY(0)";
        }, 700);
      }
    } else {
      // Close sequence
      const overlay = menuOverlayRef.current;

      // Bottom line
      if (bottomLineRef.current) {
        bottomLineRef.current.style.transform = "scaleX(0)";
      }

      // Contact info
      if (contactInfoRef.current) {
        contactInfoRef.current.style.opacity = "0";
        contactInfoRef.current.style.transform = "translateY(20px)";
      }

      // Social icons
      socialRef.current.forEach((icon) => {
        if (icon) {
          icon.style.opacity = "0";
          icon.style.transform = "translateY(30px) scale(0.8)";
        }
      });

      // Menu items
      menuItemsRef.current.forEach((item) => {
        if (item) {
          item.style.opacity = "0";
          item.style.transform = "translateX(-80px) rotateY(-15deg)";
        }
      });

      // Overlay fade out
      setTimeout(() => {
        overlay.style.opacity = "0";
        setTimeout(() => {
          overlay.style.display = "none";
          overlay.style.pointerEvents = "none";
        }, 400);
      }, 100);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>

      {/* Header */}
      <header
        className="fixed top-4 left-4 right-4 z-[100] transition-all duration-500"
        style={{
          transform: (isVisible || isMenuOpen) && !isModalOpen ? "translateY(0)" : "translateY(calc(-100% - 1rem))",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <nav className={`mx-auto max-w-7xl pl-8 pr-4 md:px-8 py-3 md:py-6 flex items-center justify-between rounded-full border ${
          isScrolled && !isMenuOpen
            ? "bg-[#1A0005]/80 backdrop-blur-md border-[#FFECD1]/30"
            : "bg-[#1A0005]/40 backdrop-blur-sm border-[#FFECD1]/20"
        }`}>
          {/* Logo - centré verticalement dans la nav */}
          <div className="header-item flex items-center">
            <a
              href="#"
              className="flex items-center justify-center text-2xl md:text-2xl font-bold text-[#FFECD1] transition-all duration-300 hover:scale-105 py-1"
              style={{ 
                animation: "fadeInLeft 0.8s ease-out",
                fontFamily: "'Boldonse', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              AB
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 header-item">
            {menuItems.map((item, index) => (
              <a
                key={item}
                href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                onClick={(e) => smoothScrollTo(item === "Home" ? "#" : `#${item.toLowerCase()}`, e)}
                className="relative text-xl md:text-xl font-bold text-[#FFECD1]/80 hover:text-[#FFECD1] transition-colors duration-300 group"
                style={{
                  animation: `fadeInDown 0.6s ease-out ${0.5 + index * 0.1}s both`,
                  fontFamily: "'Boldonse', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                {item}
                <span className="absolute top-8 left-0 w-0 h-0.5 bg-[#FFECD1] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - Styled MENU Button */}
          <button
            className="md:hidden relative flex items-center gap-4 px-4 py-2 bg-transparent rounded-full border-2 border-[#FFECD1] z-[101] hover:border-[#FFECD1]/70 transition-all duration-300 group"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="text-[#FFECD1] font-bold text-sm uppercase tracking-wide">MENU</span>
            <div className={`burger-toggle ${isMenuOpen ? "burger-open" : ""}`}>
              <span className="burger-bar burger-bar-top" />
              <span className="burger-bar burger-bar-middle" />
              <span className="burger-bar burger-bar-bottom" />
            </div>
          </button>
        </nav>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 md:hidden z-[99] overflow-hidden"
        style={{
          display: "none",
          opacity: 0,
          pointerEvents: "none",
          background: "linear-gradient(135deg, #1A0005 0%, #1A0005 50%, #1A0005 100%)",
          transition: "opacity 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
        onClick={(e) => {
          if (e.target === menuOverlayRef.current) setIsMenuOpen(false);
        }}
      >
        {/* Background decorative elements */}
        <div
          className="absolute top-[-3rem] left-[-3rem] w-48 h-48 bg-indigo-500 rounded-full blur-[30px] opacity-10"
          style={{ animation: "float 20s infinite ease-in-out" }}
        />
        <div
          className="absolute bottom-[-3rem] right-[-3rem] w-44 h-44 bg-purple-500 rounded-full blur-[30px] opacity-10"
          style={{ animation: "float 25s infinite ease-in-out", animationDelay: "2s" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 40%, rgba(255, 248, 220, 0.16), transparent 38%), radial-gradient(circle at 80% 80%, rgba(255, 235, 180, 0.12), transparent 38%)",
          }}
        />

        {/* Menu Content */}
        <div className="relative flex flex-col items-start justify-center h-full px-8 md:px-16">
          <div className="flex flex-col gap-6 mb-16">
            {menuItems.map((item, index) => (
                <a
                  key={item}
                  ref={(el) => {
                    menuItemsRef.current[index] = el;
                  }}
                  href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                  onClick={(e) => smoothScrollTo(item === "Home" ? "#" : `#${item.toLowerCase()}`, e)}
                  className="menu-item-link"
                  style={{
                  opacity: 0,
                  transform: "translateX(-80px) rotateY(-15deg)",
                  transition: "all 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
                  willChange: "transform, opacity",
                }}
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-2xl md:text-3xl text-indigo-500" style={{ opacity: 0.6 }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-5xl md:text-7xl font-bold text-[#FFECD1]">{item}</span>
                </span>
              </a>
            ))}
          </div>

          <div className="flex gap-6 mb-8">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                  <a
                    key={social.label}
                    ref={(el) => {
                      socialRef.current[index] = el;
                    }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="social-icon text-[#FFECD1]/80 hover:text-[#FFECD1] transition-colors duration-300"
                    style={{
                    opacity: 0,
                    transform: "translateY(30px) scale(0.8)",
                    transition: "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    willChange: "transform, opacity",
                  }}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>

          <div
            ref={contactInfoRef}
            className="text-[#FFECD1]/60 text-sm"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease-out",
              willChange: "transform, opacity",
            }}
          >
            <p>aymeric.borges@protonmail.fr</p>
            <p>07 82 83 44 84</p>
          </div>

          
        </div>
      </div>
    </>
  );
}