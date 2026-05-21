'use client';

import CursorGlow from '@/components/CursorGlow';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Medal, Trophy, Waves } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const APP_FEATURES = [
  {
    number: '01',
    title: 'Event Registration',
    description: 'Join competitions and campus events without leaving the app.',
  },
  {
    number: '02',
    title: 'E-Certificate Generation',
    description: 'Access participant and winner certificates automatically.',
  },
  {
    number: '03',
    title: 'Real-Time Court Booking',
    description: 'Reserve facilities with live availability across venues.',
  },
  {
    number: '04',
    title: 'Live GC Scores',
    description: 'Track standings, brackets, schedules, and match momentum.',
  },
];

const HERO_EVENTS = [
  {
    title: 'GC Football',
    date: 'APRIL 20, 2024',
    image: '/france_v_united_states_mens_football_olympic_games_paris_2024_day_2_021cda8c42.jpg',
    label: 'Main Ground',
  },
  {
    title: 'GC Athletics',
    date: 'APRIL 26, 2024',
    image: '/Sally-Pearson-100-meter-hurdles-2012-Olympics.webp',
    label: 'Track & Field',
  },
  {
    title: 'GC Badminton',
    date: 'MAY 03, 2024',
    image: '/149487696.1535742278.webp',
    label: 'Indoor Arena',
  },
  {
    title: 'GC Cricket',
    date: 'MAY 10, 2024',
    image: '/hhl1cdernwjvt7cvwax2.avif',
    label: 'Cricket Oval',
  },
];

const HERO_STATS = [
  { label: 'INTER-IIT 2024', icon: Medal },
  { label: '40+ DISCIPLINES', icon: Trophy },
  { label: 'OLYMPIC POOL', icon: Waves },
];

export default function HomePage() {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const panelStackRef = useRef<HTMLElement | null>(null);
  const activeEvent = HERO_EVENTS[activeEventIndex];

  // Preload all carousel images on mount so swaps are instant
  useEffect(() => {
    HERO_EVENTS.forEach((e) => {
      const img = new window.Image();
      img.src = e.image;
    });
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveEventIndex((index) => (index + 1) % HERO_EVENTS.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const { scrollYProgress: panelProgress } = useScroll({
    target: panelStackRef,
    offset: ['start start', 'end end'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const panelTwoProgress = useTransform(panelProgress, [0.12, 0.34], [100, 0]);
  const panelThreeProgress = useTransform(panelProgress, [0.68, 0.90], [100, 0]);
  const panelTwoSpring = useSpring(panelTwoProgress, { stiffness: 120, damping: 28, mass: 0.8 });
  const panelThreeSpring = useSpring(panelThreeProgress, { stiffness: 110, damping: 30, mass: 0.9 });
  const panelTwoY = useTransform(panelTwoSpring, (value) => `${value}%`);
  const panelThreeY = useTransform(panelThreeSpring, (value) => `${value}%`);

  return (
    <div className="min-h-screen bg-[#1C1C1E] text-[#F5F0E8] selection:bg-accent selection:text-black">
      <motion.div
        className="fixed inset-0 z-[100] bg-black pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      <Navbar />
      <CursorGlow />

      {/* Grain Overlay */}
      <section ref={heroRef} className="relative h-[110vh] flex items-center pt-20 overflow-x-hidden px-6 md:px-12 lg:px-24">
        {/* Background Texture: Graph Paper Ruled Lines */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
             style={{ 
               backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
               backgroundSize: '100px 100px' 
             }} />
        
        <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content (7 columns) */}
          <motion.div 
            style={{ y: heroY }}
            className="lg:col-span-7 flex flex-col items-start z-10"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-serif-display text-[clamp(90px,16vw,220px)] leading-[0.82] tracking-[0.02em] uppercase mb-12"
            >
              UNTIL.<br />
              <span className="text-accent">VICTORY.</span><br />
              <span className="relative">
                ALWAYS.
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="absolute -bottom-4 left-0 h-4 bg-accent/20 -z-10" 
                />
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mb-16"
            >
              <p className="text-[#F5F0E8]/60 text-lg md:text-xl max-w-sm leading-relaxed border-l-2 border-accent/30 pl-6">
                10,000+ students. 40+ disciplines. One vibrant campus community.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="flex flex-wrap gap-4"
            >
              {HERO_STATS.map((stat) => {
                const StatIcon = stat.icon;

                return (
                  <div key={stat.label} className="flex items-center gap-3 bg-white text-[#111111] border border-[#111111]/05 px-6 py-3 rounded-full font-condensed font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-md transition-shadow">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <StatIcon aria-hidden="true" strokeWidth={2.5} className="h-3.5 w-3.5" />
                    </span>
                    {stat.label}
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Content (5 columns) */}
          <div className="lg:col-span-5 relative h-full min-h-[500px] flex items-center lg:translate-x-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] group"
            >
              <div className="absolute inset-0 bg-[#0a0a0a] z-0 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEvent.title}
                    initial={{ opacity: 0, scale: 1.08, x: 28 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 1.02, x: -28 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeEvent.image}
                      alt={`${activeEvent.title} event`}
                      fill
                      priority
                      sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 42vw, 92vw"
                      onError={(event) => {
                        event.currentTarget.src = '/swimming.jpeg';
                      }}
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10 z-10" />
                <div className="absolute left-8 top-8 z-20 rounded-full border border-white/20 bg-black/25 px-4 py-2 backdrop-blur-md">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeEvent.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="block font-mono-custom text-[10px] font-black uppercase tracking-[0.22em] text-white"
                    >
                      {activeEvent.label}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Floating Event Card */}
              <motion.div 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute bottom-8 left-8 right-8 z-20 bg-white p-8 shadow-2xl rounded-2xl overflow-hidden group/card"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                <div className="flex justify-between items-end">
                  <div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeEvent.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                      >
                        <h3 className="font-condensed font-black text-2xl uppercase leading-none mb-1 text-[#111111]">
                          {activeEvent.title}
                        </h3>
                        <p className="font-mono-custom text-xs text-[#666] tracking-widest">
                          {activeEvent.date}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <Link
                    href="/blogs"
                    aria-label="Go to blogs"
                    className="w-10 h-10 border border-[#111111]/10 rounded-full flex items-center justify-center group-hover/card:bg-accent group-hover/card:border-accent transition-colors duration-300"
                  >
                    <span className="text-[#111] group-hover/card:translate-x-0.5 transition-transform duration-300">→</span>
                  </Link>
                </div>
                <div className="mt-6 flex gap-2">
                  {HERO_EVENTS.map((event, index) => (
                    <button
                      key={event.title}
                      type="button"
                      aria-label={`Show ${event.title}`}
                      onClick={() => setActiveEventIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeEventIndex ? 'w-10 bg-accent' : 'w-4 bg-[#111111]/10 hover:bg-[#111111]/20'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/10 blur-[80px] -z-10 rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-accent/05 blur-[100px] -z-10 rounded-full" />
          </div>
        </div>
      </section>


      {/* Sections 3, 5, 6 — Sticky Overlapping Panels */}
      <section ref={panelStackRef} className="relative h-[360vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#F5F0E8]">
          {/* Panel 1 — About Us */}
          <section className="absolute inset-0 z-10 bg-[#F5F0E8] text-[#111111]">
            <div className="absolute top-0 left-0 right-0 h-px bg-[#111111]/10" />
            <div className="h-full px-6 pt-28 pb-14 md:px-12 lg:px-24">
              <div className="mx-auto grid h-full max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-20">
                <div className="relative flex flex-col justify-center lg:col-span-5">
                  <div className="relative w-full max-w-[360px]">
                    <Image
                      src="/assets/iit-bombay-sports-logo-nav.svg"
                      alt="IIT Bombay Sports logo"
                      width={360}
                      height={360}
                      priority={false}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center lg:col-span-7">
                  <h2 className="mb-10 font-serif-display text-[clamp(48px,6vw,80px)] leading-[1.02] text-[#111111]">
                    The Heartbeat of Excellence on Campus.
                  </h2>
                  <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                    <p className="text-lg leading-[1.8] text-[#555555]">
                      IIT Bombay boasts a vibrant sports scene that keeps students active throughout the year. The institute&apos;s calendar is packed with exciting events, ranging from the inter-hostel General Championships to the prestigious Inter-IIT competitions.
                    </p>
                    <p className="text-lg leading-[1.8] text-[#555555]">
                      To nurture this competitive spirit, IIT Bombay offers state-of-the-art sports facilities — from basketball and volleyball courts to a swimming pool, football ground, and cricket ground. This commitment extends beyond facilities, with students and faculty alike demonstrating dedication, discipline, and sportsmanship.
                    </p>
                  </div>
                  <div className="mt-12 flex flex-col gap-4 border-t border-[#111111]/10 pt-8 md:flex-row md:items-center md:justify-between">
                    <span className="font-condensed text-3xl font-black uppercase tracking-[0.12em] text-[#111111]">
                      Until.
                    </span>
                    <span className="font-condensed text-3xl font-black uppercase tracking-[0.12em] text-[#111111]">
                      Victory.
                    </span>
                    <span className="font-condensed text-3xl font-black uppercase tracking-[0.12em] text-[#111111]">
                      Always.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Panel 2 — Bombay BlackCats */}
          <motion.section style={{ y: panelTwoY }} className="absolute inset-0 z-20 bg-[#0D0D0D] text-[#F5F0E8]">
            <div className="absolute left-0 top-0 right-0 h-1 bg-accent" />
            <div className="absolute inset-y-0 right-0 hidden w-[72vw] overflow-hidden lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(201,168,76,0.12),transparent_42%)]" />
              <Image
                src="/assets/iit-bombay-black-cats.png"
                alt="IIT Bombay Black Cats logo"
                fill
                priority={false}
                sizes="72vw"
                className="object-contain object-right opacity-[0.28] contrast-125 brightness-110"
              />
            </div>
            <div className="absolute bottom-0 left-[23%] top-0 hidden w-[2px] bg-accent/20 lg:block" />
            <div className="relative z-10 flex h-full items-center px-6 pt-20 pb-10 md:px-12 lg:px-24">
              <div className="mx-auto grid w-full max-w-[1400px] gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7 lg:col-start-2">
                  <h2 className="mb-8 font-serif-display text-[clamp(72px,10vw,140px)] leading-[0.92] tracking-[-0.04em] text-[#F5F0E8]">
                    Bombay
                    <br />
                    <span>BlackCats</span>
                  </h2>
                  <div className="mb-6 h-[2px] w-20 bg-accent" />
                  <p className="max-w-[520px] text-lg leading-[1.7] text-[#F5F0E8]/65">
                    The BlackCats — IIT Bombay&apos;s Inter-IIT contingent — are a testament to the institute&apos;s unwavering dedication to athletic excellence. Since 1961, the Inter-IIT Sports Meet has stood as India&apos;s premier inter-collegiate sporting battleground, powered by athletes who train with ruthless consistency and pride.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3 font-condensed text-sm font-black uppercase tracking-[0.28em] text-accent">
                    <span>3500+ Athletes</span>
                    <span className="text-accent/40">·</span>
                    <span>Since 1961</span>
                    <span className="text-accent/40">·</span>
                    <span>India&apos;s Premier Meet</span>
                  </div>
                  <Link
                    href="/inter-iit"
                    className="mt-8 inline-flex items-center gap-3 border-b border-accent/40 pb-1 font-condensed text-sm font-black uppercase tracking-[0.2em] text-accent transition-colors hover:border-accent"
                  >
                    VIEW INTER-IIT RESULTS <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Panel 3 — Sports App */}
          <motion.section style={{ y: panelThreeY }} className="absolute inset-0 z-30 bg-white text-[#111111]">
            <div className="absolute left-0 top-0 right-0 h-1 bg-accent" />
            <div className="absolute bottom-0 right-10 top-0 hidden w-[2px] bg-accent md:block" />
            <div className="h-full px-6 pt-28 pb-14 md:px-12 lg:px-24">
              <div className="mx-auto flex h-full max-w-[1400px] flex-col justify-between">
                <div>
                  <div className="max-w-6xl">
                    <span className="block font-serif-display text-accent text-[clamp(64px,9vw,120px)] leading-[0.94]">
                      Your Season,
                    </span>
                    <span className="block font-condensed text-[clamp(64px,9vw,120px)] font-black uppercase leading-[0.94] tracking-[-0.04em]">
                      In Your Pocket.
                    </span>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                  {APP_FEATURES.map((feature) => (
                    <div key={feature.number} className="border-t border-[#111111]/10 pt-6">
                      <div className="mb-4 font-condensed text-6xl font-black leading-none tracking-[-0.05em] text-accent/20">
                        {feature.number}
                      </div>
                      <h3 className="font-condensed text-xl font-black uppercase tracking-[0.08em] text-[#111111]">
                        {feature.title}
                      </h3>
                      <p className="mt-3 max-w-[16rem] text-sm leading-7 text-[#555555]">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-6 border-t border-[#111111]/10 pt-8 md:flex-row md:items-end md:justify-between">
                  <span className="font-condensed text-4xl font-black uppercase tracking-[0.3em] text-[#111111]/20">
                    Launching Soon
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[#111111]/20 px-4 py-1.5 font-mono-custom text-[10px] font-black uppercase tracking-[0.22em] text-[#111111]/40">
                      Android
                    </span>
                    <span className="text-[#111111]/20">·</span>
                    <span className="rounded-full border border-[#111111]/20 px-4 py-1.5 font-mono-custom text-[10px] font-black uppercase tracking-[0.22em] text-[#111111]/40">
                      iOS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee 30s linear infinite reverse;
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
