"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const textStyle = { fontFamily: "var(--font-barlow-condensed), sans-serif", fontWeight: 900 };

export default function Marquee() {
  const container = useRef<HTMLDivElement>(null);
  const marquee1 = useRef<HTMLDivElement>(null);
  const marquee2 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (marquee1.current) {
      const width = marquee1.current.offsetWidth;
      gsap.to(marquee1.current, {
        x: -width / 2,
        ease: "none",
        duration: 45,
        repeat: -1,
      });
    }

    if (marquee2.current) {
      const width = marquee2.current.offsetWidth;
      gsap.set(marquee2.current, { x: -width / 3 });
      gsap.to(marquee2.current, {
        x: 0,
        ease: "none",
        duration: 50,
        repeat: -1,
      });
    }
  }, { scope: container });

  const renderSpans = (text: string, count: number) => {
    return Array.from({ length: count * 2 }).map((_, i) => (
      <span key={i} className="px-8 md:px-12" style={textStyle}>
        {text}
      </span>
    ));
  };

  return (
    <section ref={container} className="py-20 overflow-hidden">
      <div className="relative">
        <div className="flex whitespace-nowrap overflow-hidden origin-left" style={{ transform: 'rotate(2.1deg)' }}>
          <div ref={marquee1} className="flex text-7xl md:text-9xl font-black text-[#FFECD1] select-none will-change-transform">
            {renderSpans("AYMERIC BORGES", 8)}
          </div>
        </div>

        <div className="flex whitespace-nowrap overflow-hidden mt-4 origin-right" style={{ transform: 'rotate(-2deg)' }}>
          <div ref={marquee2} className="flex text-7xl md:text-9xl font-black text-[#FFECD1] select-none will-change-transform">
            {renderSpans("DÉVELOPPEUR WEB & DESIGNER", 12)}
          </div>
        </div>
      </div>
    </section>
  );
}
