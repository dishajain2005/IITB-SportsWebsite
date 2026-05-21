'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SplitPanelExplorer from '@/components/SplitPanelExplorer';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const SPORTS = [
  {
    id: 'aquatics',
    name: 'Aquatics',
    color: '#1a4a6e',
    label: 'Main Pool · 50×25m',
    year: '3 GOLDS',
    achievement: 'Inter-IIT Champions',
    description: 'Olympic-size 50×25m pool with competitive lanes open year-round for training and inter-IIT competition.',
  },
  {
    id: 'athletics',
    name: 'Athletics',
    color: '#4a1a1a',
    label: 'Main Track · 400m',
    year: '1ST PLACE',
    achievement: 'Overall Champions',
    description: 'Full 400m synthetic track with field event zones — sprints, throws, and jumps all in one venue.',
  },
  {
    id: 'cricket',
    name: 'Cricket',
    color: '#2d5a27',
    label: 'GC Season · 2024',
    year: 'EST. 1958',
    achievement: 'Historical Legacy',
    description: 'One of the oldest sports at IITB. Multiple grounds, net practice facilities, and a fierce GC season.',
  },
  {
    id: 'football',
    name: 'Football',
    color: '#1a3a1a',
    label: 'Turf A · Astroturf',
    year: 'PRO LEVEL',
    achievement: 'Daily Sessions',
    description: 'Professional astroturf pitch with floodlights — matches run from morning drills to midnight kickabouts.',
  },
  {
    id: 'badminton',
    name: 'Badminton',
    color: '#3a1a4a',
    label: 'SAC · Court 1–6',
    year: '500+ DAILY',
    achievement: 'Active Community',
    description: 'Six indoor courts at SAC — one of the highest participation sports on campus with daily open play.',
  },
  {
    id: 'basketball',
    name: 'Basketball',
    color: '#6e2d1a',
    label: 'Indoor Arena',
    year: '24/7 LIGHTS',
    achievement: 'Midnight Ball',
    description: 'Lit indoor arena that never sleeps — casual pickup games at midnight are a campus institution.',
  },
  {
    id: 'hockey',
    name: 'Hockey',
    color: '#1a3a5c',
    label: 'Pro Astroturf',
    year: 'INTER-IIT',
    achievement: 'Tactical Play',
    description: 'Dedicated astroturf pitch for field hockey — regular inter-IIT contenders with a disciplined coaching setup.',
  },
  {
    id: 'tabletennis',
    name: 'Table Tennis',
    color: '#5c3a1a',
    label: 'SAC Facilities',
    year: '12 TABLES',
    achievement: 'Precision Sport',
    description: '12 competition tables at SAC with year-round GC league play and open practice hours every evening.',
  },
];

export default function SportsDirectoryPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="min-h-screen bg-cream text-[#111111] selection:bg-accent selection:text-black overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <header className="pt-48 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden relative min-h-[100vh] flex items-center">
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
            style={{ filter: 'saturate(0.65) contrast(1.1)' }}
          >
            <source src="/sports-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: 'rgba(10,7,4,0.58)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 30%, rgba(4,3,2,0.88) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat', backgroundSize: '160px 160px',
            }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="lg:col-span-8"
            >
              <h1 className="font-serif-display text-[clamp(80px,12vw,180px)] uppercase leading-[0.9] tracking-[-0.04em] text-[#F5F0E8]">
                EVERY<br />
                <span className="normal-case text-accent">Sport.</span><br />
                <span style={{ WebkitTextStroke: '2px #F5F0E8', WebkitTextFillColor: 'transparent', color: 'transparent' }}>
                  ONE CAMPUS.
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="lg:col-span-4 lg:text-right"
            >
              <p className="text-xl leading-[1.7] text-[#F5F0E8]/50 max-w-sm ml-auto">
                From the Olympic pool to the cricket crease — explore every team and facility at IIT Bombay.
              </p>
            </motion.div>
          </div>

          <div className="mt-24 h-px w-full bg-white/[0.08] flex items-center justify-center">
            <div className="px-8 py-2 font-mono-custom text-[9px] uppercase tracking-[0.5em] text-white/20 font-black">SCROLL TO EXPLORE</div>
          </div>
        </div>
      </header>

      <SplitPanelExplorer sports={SPORTS} />

      {/* More Sports Grid */}
      <section className="bg-[#111111] py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
           <div className="mb-20">
              <h2 className="font-serif-display text-5xl md:text-7xl text-[#F5F0E8] leading-[1.1]">
                Also at <span className="underline decoration-accent decoration-4 underline-offset-[16px]">IIT Bombay.</span>
              </h2>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
             {['Squash', 'Lawn Tennis', 'Athletics', 'Weightlifting', 'Volleyball', 'Indian Games', 'Board Games', 'Adventure Club', 'Chess Club', 'Yogastha'].map(s => {
               const href = s.toLowerCase() === 'athletics' ? '/sports/athletics' : (s.toLowerCase() === 'aquatics' ? '/sports/aquatics' : '#');
               return (
                 <motion.a
                   key={s}
                   href={href}
                   whileHover={{ scale: 1.02, backgroundColor: '#C4622D', color: '#111111' }}
                   className="flex items-center justify-between border-2 border-white/10 px-8 py-8 rounded-2xl group transition-all"
                 >
                   <span className="font-condensed font-black text-xl md:text-2xl uppercase tracking-wider text-[#F5F0E8]">{s}</span>
                   <span className="font-mono-custom text-[10px] text-[#F5F0E8] opacity-0 group-hover:opacity-60 transition-opacity">↗</span>
                 </motion.a>
               );
             })}
           </div>
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
      `}</style>
    </div>
  );
}
