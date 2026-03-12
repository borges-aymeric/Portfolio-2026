"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const scrollIndicator = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const primaryMaskRef = useRef<SVGRectElement>(null);
  const secondaryMaskRef = useRef<SVGRectElement>(null);

  useGSAP(() => {
    // Delay to start after loader completes
    // Loader: 5s loading + 0.3s delay + ~5s exit animation = ~10.3s
    const tl = gsap.timeline({
      delay: 10.5,
    });

    // Animate SVG text writing effect using two masks
    if (svgRef.current && primaryMaskRef.current) {
      const textElements = svgRef.current.querySelectorAll("text");

      // Primary line: AYMERIC BORGES
      const mainText = textElements[0] as SVGTextElement | undefined;
      if (mainText) {
        const bbox = mainText.getBBox();
        const textWidth = bbox.width + 200; // padding

        gsap.set(primaryMaskRef.current, {
          attr: { width: 0, x: bbox.x - 100 },
        });

        tl.to(primaryMaskRef.current, {
          attr: { width: textWidth },
          duration: 2.5,
          ease: "power2.inOut",
        });
      }

      // Secondary line: PORTFOLIO 🚀 2026
      if (secondaryMaskRef.current && textElements[1]) {
        const subText = textElements[1] as SVGTextElement;
        const bboxSub = subText.getBBox();
        const subTextWidth = bboxSub.width + 200;

        gsap.set(secondaryMaskRef.current, {
          attr: { width: 0, x: bboxSub.x - 100 },
        });

        tl.to(
          secondaryMaskRef.current,
          {
            attr: { width: subTextWidth },
            duration: 2,
            ease: "power2.inOut",
          },
          "-=1.2" // commence juste après la première ligne
        );
      }
    }

    // Show scroll indicator
    tl.to(scrollIndicator.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.5");

    // Animate scroll indicator bounce
    gsap.to(scrollIndicator.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 relative bg-[#1C0207]"
    >
      <div className="text-center w-full max-w-full px-4">
        {/* SVG Text - AYMERIC BORGES + PORTFOLIO 2026 */}
        <div className="flex justify-center items-center">
          <svg
            ref={svgRef}
            className="hero-name-svg"
            viewBox="0 0 1600 400"
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: 'clamp(90%, 90vw, 100%)',
              maxWidth: '1600px',
              height: 'auto',
              overflow: 'visible',
            }}
          >
            <defs>
              <mask id="text-mask-primary">
                <rect
                  ref={primaryMaskRef}
                  x="0"
                  y="0"
                  height="400"
                  fill="white"
                />
              </mask>
              <mask id="text-mask-secondary">
                <rect
                  ref={secondaryMaskRef}
                  x="0"
                  y="0"
                  height="400"
                  fill="white"
                />
              </mask>
            </defs>
            <text
              x="50%"
              y="32%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="font-black text-[#FFECD1]"
              mask="url(#text-mask-primary)"
              style={{
                fontFamily: 'var(--font-boldonse)',
                fontSize: '140px',
                fontWeight: 900,
                fill: '#FFECD1',
                letterSpacing: '0.02em',
              }}
            >
              AYMERIC BORGES
            </text>
            <text
              x="50%"
              y="80%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="font-black text-[#FFECD1]"
              mask="url(#text-mask-secondary)"
              style={{
                fontFamily: "var(--font-boldonse)",
                fontSize: "90px",
                fontWeight: 900,
                fill: "#FFECD1",
              }}
            >
              PORTFOLIO 🚀 2026
            </text>
          </svg>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicator}
        className="absolute bottom-10 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-sm text-[#FFECD1]/60 text-body">Scroll</span>
        <ChevronDown className="w-6 h-6 text-[#FFECD1]/60" />
      </div>
    </section>
  );
}