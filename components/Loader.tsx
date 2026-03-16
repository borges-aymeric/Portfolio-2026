"use client";

import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const letterARef = useRef<HTMLDivElement>(null);
  const letterBRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const totalDuration = 5000;
    const interval = 50;
    const increment = (100 / totalDuration) * interval;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + increment + (Math.random() * 0.5), 100);
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsComplete(true);
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(progressInterval);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    if (letterARef.current && letterBRef.current) {
      gsap.to(letterARef.current, {
        y: -40,
        rotation: -15,
        scale: 1.1,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(letterBRef.current, {
        y: 40,
        rotation: 15,
        scale: 1.1,
        duration: 1.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });

      gsap.to(letterARef.current, {
        x: -20,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(letterBRef.current, {
        x: 20,
        duration: 2.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.6,
      });

      gsap.to(letterARef.current, {
        y: "+=30",
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(letterBRef.current, {
        y: "-=30",
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.5,
      });
    }

    if (isComplete) {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (letterARef.current) {
        gsap.killTweensOf(letterARef.current);
      }
      if (letterBRef.current) {
        gsap.killTweensOf(letterBRef.current);
      }

      tl.to(percentageRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.inOut",
      });

      tl.to([letterARef.current, letterBRef.current], {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.6)",
      }, "-=0.2");

      if (bubbleRef.current) {
        gsap.set(bubbleRef.current, {
          scaleX: 0,
          scaleY: 0,
          y: 300,
          opacity: 1,
          display: "block",
        });

        tl.to(bubbleRef.current, {
          scaleY: 1.3,
          scaleX: 0.9,
          y: -40,
          duration: 0.4,
          ease: "power2.out",
        }, "-=0.3");

        tl.to(bubbleRef.current, {
          scaleY: 0.7,
          scaleX: 1.2,
          y: 5,
          duration: 0.3,
          ease: "power2.in",
        });

        tl.to(bubbleRef.current, {
          scaleY: 1.2,
          scaleX: 0.95,
          y: -25,
          duration: 0.35,
          ease: "power2.out",
        });

        tl.to(bubbleRef.current, {
          scaleY: 0.8,
          scaleX: 1.15,
          y: 3,
          duration: 0.25,
          ease: "power2.in",
        });

        tl.to(bubbleRef.current, {
          scaleY: 1.1,
          scaleX: 0.98,
          y: -15,
          duration: 0.3,
          ease: "power2.out",
        });

        tl.to(bubbleRef.current, {
          scaleY: 0.85,
          scaleX: 1.1,
          y: 1,
          duration: 0.2,
          ease: "power2.in",
        });

        tl.to(bubbleRef.current, {
          scaleY: 1,
          scaleX: 1,
          y: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.6)",
        });

        tl.to(bubbleRef.current, {
          scaleX: 2500,
          scaleY: 2500,
          duration: 2.5,
          ease: "power3.inOut",
        }, "-=0.1");

        tl.to(containerRef.current, {
          backgroundColor: "#FFECD1",
          duration: 2.3,
          ease: "power2.inOut",
        }, "-=2.4");

        tl.to([letterARef.current, letterBRef.current, progressBarRef.current], {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        }, "-=2");

        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = "none";
            }
          },
        }, "-=0.5");
      }
    }
  }, [isComplete]);

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#FFECD1] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex items-center justify-center mb-20">
        <span
          ref={letterARef}
          className="text-9xl md:text-[12rem] font-black text-[#1A0005] inline-block"
        >
          A
        </span>
        <span
          ref={letterBRef}
          className="text-9xl md:text-[12rem] font-black text-[#1A0005] inline-block"
        >
          B
        </span>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-[#1A0005]/20 overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-[#1A0005] transition-all"
          style={{ width: "0%" }}
        />
      </div>

      <div
        ref={percentageRef}
        className="absolute bottom-8 right-8 text-6xl md:text-8xl font-black text-[#1A0005]"
      >
        {Math.round(progress)}%
      </div>

      <div
        ref={bubbleRef}
        className="absolute bottom-0 left-1/2 w-32 h-32 bg-[#1A0005] rounded-full opacity-0"
        style={{ 
          transform: "translateX(-50%)",
          transformOrigin: "50% 100%"
        }}
      />
    </div>
  );
}

