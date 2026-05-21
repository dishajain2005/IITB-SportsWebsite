'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { InstagramIcon, LinkedinIcon, FacebookIcon } from '@/components/SocialIcons';
import Link from 'next/link';
import CursorGlow from '@/components/CursorGlow';
import { useRouter } from 'next/navigation';

const CYCLING_WORDS = [
  'CRICKET',
  'FOOTBALL',
  'BADMINTON',
  'SQUASH',
  'ATHLETICS',
  'SWIMMING',
  'BASKETBALL',
  'VOLLEYBALL',
  'SPORTS',
];

export default function LandingPage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [hasStartedCycling, setHasStartedCycling] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();
  const triggeredRef = useRef(false);

  const triggerExit = () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    setIsExiting(true);
    setTimeout(() => router.push('/sports/home'), 700);
  };

  // Navigate to sports/home when user scrolls down past hero
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 40) triggerExit();
    };
    const handleTouch = (() => {
      let startY = 0;
      return {
        start: (e: TouchEvent) => { startY = e.touches[0].clientY; },
        end: (e: TouchEvent) => {
          if (startY - e.changedTouches[0].clientY > 50) triggerExit();
        },
      };
    })();
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouch.start, { passive: true });
    window.addEventListener('touchend', handleTouch.end, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouch.start);
      window.removeEventListener('touchend', handleTouch.end);
    };
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const startTimer = setTimeout(() => {
      setHasStartedCycling(true);
      interval = setInterval(() => {
        setWordIndex((prev) => {
          if (prev === CYCLING_WORDS.length - 1) {
            setIsFinished(true);
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 540);
    }, 1200);
    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white selection:bg-accent selection:text-black">
      <CursorGlow />

      {/* Exit fade overlay */}
      <motion.div
        className="absolute inset-0 z-50 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 1 : 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
      />

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image src="/gymkhana.webp" alt="IITB Gymkhana grounds" fill priority className="object-cover object-center"
          style={{ filter: 'saturate(0.7) contrast(1.05)' }} />
        {/* Cinematic letterbox gradient — heavy bottom, lighter top */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.75) 100%)' }} />
        {/* Vignette edges */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(0,0,0,0.7) 100%)' }} />
        {/* Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:'160px 160px' }} />
      </div>

      {/* Logo — top left */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="absolute top-5 left-6 md:top-7 md:left-8 z-20 flex items-center gap-4 px-5 py-2.5 bg-black/10 backdrop-blur-md rounded-xl"
      >
        <div className="relative h-11 w-11">
          <Image src="/assets/iit-bombay-sports-logo-nav.svg" alt="IIT Bombay Sports" fill priority className="object-contain" />
        </div>
        <div className="flex flex-col leading-none border-l border-white/10 pl-4">
          <span className="text-[11px] md:text-[13px] font-black tracking-[0.3em] text-white uppercase">IIT Bombay</span>
        </div>
      </motion.div>

      {/* Legal — top right */}
      <nav className="absolute top-8 right-8 z-30 flex gap-8 text-[11px] font-medium tracking-[0.25em]">
        <Link href="/terms" className="opacity-40 hover:opacity-80 transition-opacity">TERMS</Link>
        <Link href="/terms" className="opacity-40 hover:opacity-80 transition-opacity">PRIVACY</Link>
      </nav>

      {/* Main content — vertically centered */}
      <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-16">

        {/* WELCOME TO IIT BOMBAY — white/60, slightly smaller */}
        <div className="overflow-hidden mb-0">
          <motion.span
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="block font-condensed font-black uppercase leading-[0.92]"
            style={{ fontSize: 'clamp(72px, 13vw, 200px)', letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.55)' }}
          >
            WELCOME TO
          </motion.span>
        </div>
        <div className="overflow-hidden mb-2">
          <motion.span
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="block font-condensed font-black uppercase leading-[0.92]"
            style={{ fontSize: 'clamp(72px, 13vw, 200px)', letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.55)' }}
          >
            IIT BOMBAY
          </motion.span>
        </div>

        {/* Cycling sport word — solid white, slightly larger */}
        <div className="relative overflow-hidden" style={{ height: 'clamp(80px, 14.5vw, 220px)' }}>
          <AnimatePresence initial={false}>
            {hasStartedCycling && (
              <motion.span
                key={CYCLING_WORDS[wordIndex]}
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: 'inset(0 0 0% 0)' }}
                exit={{ clipPath: 'inset(100% 0 0% 0)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 block whitespace-nowrap font-condensed font-black uppercase text-white"
                style={{ fontSize: 'clamp(80px, 14.5vw, 220px)', lineHeight: 0.92, letterSpacing: '-0.02em' }}
              >
                {CYCLING_WORDS[wordIndex]}{isFinished && <span className="text-accent">*</span>}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Tagline + socials — always in DOM, opacity transition only — NO layout shift */}
        <div className="mt-0.5 flex flex-col gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isFinished ? 1 : 0 }}
            transition={{ duration: 0.9 }}
            className="-translate-y-4 md:-translate-y-5 font-serif-italic text-3xl md:text-4xl text-white/60 italic leading-snug"
          >
            *Until victory always.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="flex items-center gap-6"
          >
            <Link href="https://www.instagram.com/iitbombaysports" target="_blank" className="opacity-50 hover:opacity-100 hover:text-accent transition-all"><InstagramIcon size={32} /></Link>
            <Link href="https://www.linkedin.com/company/iit-bombay-sports/?originalSubdomain=in" target="_blank" className="opacity-50 hover:opacity-100 hover:text-accent transition-all"><LinkedinIcon size={32} /></Link>
            <Link href="https://www.facebook.com/iitbombaysports/" target="_blank" className="opacity-50 hover:opacity-100 hover:text-accent transition-all"><FacebookIcon size={32} /></Link>
          </motion.div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={triggerExit}
        initial={{ opacity: 0 }}
        animate={{ opacity: isFinished ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
        aria-label="Enter site"
      >
        <span className="font-mono-custom text-[9px] tracking-[0.3em] uppercase text-white/40 group-hover:text-white/70 transition-colors">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.button>
    </main>
  );
}
