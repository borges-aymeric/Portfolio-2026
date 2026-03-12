"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail } from "lucide-react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const container = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    gsap.from(".footer-content", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Magnetic button effect
    if (buttonRef.current) {
      const button = buttonRef.current;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, { scope: container });

  return (
    <footer
      id="contact"
      ref={container}
      className="min-h-screen py-32 px-6 container mx-auto flex flex-col items-center justify-center"
    >
      <h2 className="footer-content text-5xl md:text-7xl lg:text-8xl font-bold mb-12 text-center">
        CONTACT
      </h2>

      <a
        href="mailto:aymeric.borges@protonmail.fr"
        ref={buttonRef as any}
        className="footer-content relative inline-flex items-center gap-3 px-10 py-5 bg-[#1A0005] text-[#FFECD1] font-bold text-lg rounded-full hover:bg-[#1A0005]/80 transition-colors border-2 border-[#FFECD1]"
      >
        <Mail className="w-5 h-5" />
        <span>Get in touch</span>
      </a>

      <div className="footer-content flex gap-6 mt-16">
        <a
          href="https://github.com/borges-aymeric"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center border border-[#FFECD1]/30 rounded-full hover:border-[#FFECD1] transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/aymeric-borges-898825229/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center border border-[#FFECD1]/30 rounded-full hover:border-[#FFECD1] transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="mailto:aymeric.borges@protonmail.fr"
          className="w-12 h-12 flex items-center justify-center border border-[#FFECD1]/30 rounded-full hover:border-[#FFECD1] transition-colors"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>

      <p className="footer-content text-[#FFECD1]/60 mt-12 text-sm">
        © {new Date().getFullYear()} Borges Aymeric ❤️ Tout droits réservés.
      </p>
    </footer>
  );
}

