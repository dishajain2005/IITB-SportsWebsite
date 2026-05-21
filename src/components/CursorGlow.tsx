'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

export default function CursorGlow() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const rafId = useRef<number | null>(null);

  const springConfig = { damping: 50, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const background = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(196, 98, 45, 0.12), transparent 80%)`;

  useEffect(() => {
    // Touch-primary devices (Android/iOS) never fire mousemove — skip entirely
    if (window.matchMedia('(hover: none)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        rafId.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9] overflow-hidden mix-blend-screen"
      style={{ background }}
    />
  );
}
