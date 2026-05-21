'use client';

import CursorGlow from '@/components/CursorGlow';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function GCPage() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 240]);

  const [activeGender, setActiveGender] = useState<'BOYS' | 'GIRLS'>('BOYS');
  const [activeSport, setActiveSport] = useState('Basketball');

  const SPORT_RESULTS: Record<string, { winner: string; runnerUp: string }> = {
    'Aquatics': { winner: 'H7', runnerUp: 'H1' },
    'Athletics': { winner: 'H2', runnerUp: 'H3' },
    'Basketball': { winner: activeGender === 'BOYS' ? 'H2' : 'H11', runnerUp: activeGender === 'BOYS' ? 'H13' : 'H10' },
    'Badminton': { winner: 'H15', runnerUp: 'H9' },
    'Cricket': { winner: 'H4', runnerUp: 'H12' },
    'Football': { winner: 'H8', runnerUp: 'H5' },
    'Hockey': { winner: 'H18', runnerUp: 'H2' },
    'Volleyball': { winner: 'H3', runnerUp: 'H14' },
    'Squash': { winner: 'H10', runnerUp: 'H6' },
    'Table Tennis': { winner: 'H5', runnerUp: 'H11' },
  };

  const currentResult = SPORT_RESULTS[activeSport] || SPORT_RESULTS['Basketball'];

  return (
    <div className="min-h-screen bg-cream-topo text-[#111111] selection:bg-accent selection:text-black">
      <Navbar />
      <CursorGlow />

      {/* Hero Section */}
      <section className="relative h-screen bg-[#111111] pt-48 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden flex items-center">
        {/* Hostel Image Grid Background */}
        <div className="absolute inset-0 z-0 grid grid-cols-12 grid-rows-6 gap-2 opacity-45">
          <div className="col-span-4 row-span-6 relative">
            <Image
              src="/hostel pics/174592244_573505810708871_1645670021528088598_n.jpg"
              alt="Hostel life" fill priority sizes="33vw" className="object-cover saturate-[0.2] hover:saturate-100 transition-all duration-1000"
            />
          </div>
          <div className="col-span-5 row-span-3 relative">
            <Image
              src="/hostel pics/36_big.jpg"
              alt="IITB Hostel" fill loading="lazy" sizes="42vw" className="object-cover saturate-[0.2] hover:saturate-100 transition-all duration-1000"
            />
          </div>
          <div className="col-span-3 row-span-4 relative">
            <Image
              src="/hostel pics/94319743_711701622900243_6699078729796310141_n.jpg"
              alt="Hostel building" fill loading="lazy" sizes="25vw" className="object-cover saturate-[0.2] hover:saturate-100 transition-all duration-1000"
            />
          </div>
          <div className="col-span-5 row-span-3 relative">
            <Image
              src="/hostel pics/IIT5.JPEGWNP4.jpg"
              alt="Hostel campus" fill loading="lazy" sizes="42vw" className="object-cover saturate-[0.2] hover:saturate-100 transition-all duration-1000"
            />
          </div>
          <div className="col-span-3 row-span-2 relative">
             <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
             <Image
              src="/hostel pics/36_big.jpg"
              alt="Hostel detail" fill loading="lazy" sizes="25vw" className="object-cover saturate-0 opacity-50"
            />
          </div>
        </div>

        {/* Dark Overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/60 z-1" />
             
        {/* Giant GC Text with Parallax */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute top-0 right-0 font-condensed font-black text-[360px] text-accent/5 leading-none pointer-events-none select-none translate-x-1/4 -translate-y-1/4 z-1"
        >
          GC
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif-display leading-[0.9] mb-12">
              <span className="block text-[clamp(64px,9vw,140px)] uppercase"
                style={{ letterSpacing:'0.15em', fontWeight:700, WebkitTextStroke:'2px #F5F0E8', WebkitTextFillColor:'transparent', color:'transparent' }}>
                GENERAL
              </span>
              <span className="block text-[clamp(90px,14vw,210px)] normal-case text-accent"
                style={{ letterSpacing:'-0.02em' }}>
                Championship
              </span>
            </h1>

            <div className="flex flex-wrap gap-12 md:gap-24 items-end">
              <div className="flex flex-col">
                <span className="font-condensed font-black text-6xl text-accent">16</span>
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mt-2">PARTICIPATING HOSTELS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-condensed font-black text-6xl text-accent">20+</span>
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mt-2">SPORTING EVENTS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-condensed font-black text-5xl text-[#F5F0E8]/40 mb-1">2024–25</span>
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">CURRENT SEASON</span>
              </div>
            </div>

            <div className="flex gap-6 mt-16">
              <button 
                onClick={() => setActiveGender('BOYS')}
                className={`font-mono-custom text-xs uppercase tracking-[0.2em] px-10 py-4 border-2 transition-all ${activeGender === 'BOYS' ? 'border-accent bg-accent/10 text-accent font-black' : 'border-white/10 text-white/40 hover:border-white/40'}`}
              >
                BOYS GC
              </button>
              <button 
                onClick={() => setActiveGender('GIRLS')}
                className={`font-mono-custom text-xs uppercase tracking-[0.2em] px-10 py-4 border-2 transition-all ${activeGender === 'GIRLS' ? 'border-accent bg-accent/10 text-accent font-black' : 'border-white/10 text-white/40 hover:border-white/40'}`}
              >
                GIRLS GC
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Podium Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute top-12 left-12 font-condensed font-black text-[240px] text-accent/5 pointer-events-none leading-none select-none">
          01
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
             <div>
                <h2 className="font-serif-display text-5xl md:text-7xl text-[#111111] leading-tight">
                  This Year&apos;s<br /><span>Top Three.</span>
                </h2>
             </div>
             <p className="text-[#111111]/50 text-lg max-w-sm leading-relaxed border-l border-[#111111]/10 pl-8">
               {activeGender === 'BOYS' 
                 ? "H2 maintains a dominant lead this season, but the race for second remains razor thin between H3 and H18."
                 : "H11 leads the way in the Girls' GC, showcasing exceptional talent across all technical and physical events."}
             </p>
          </div>

          <div className="flex items-end justify-center gap-1 md:gap-6 mt-32">
            {/* 2nd Place */}
            <motion.div 
              key={`${activeGender}-2nd`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center w-32 md:w-56 group"
            >
              <span className="font-condensed font-black text-6xl text-[#111111]/30 uppercase tracking-tighter group-hover:text-[#111111] transition-colors">
                {activeGender === 'BOYS' ? 'H3' : 'H10'}
              </span>
              <span className="font-mono-custom text-xs text-[#111111]/40 mt-2 font-bold tracking-widest">
                {activeGender === 'BOYS' ? '82.5 PTS' : '74.0 PTS'}
              </span>
              <div className="w-full h-32 bg-[#111111]/05 border-x border-t border-[#111111]/10 flex items-center justify-center mt-6 relative overflow-hidden">
                 <div className="absolute inset-0 bg-accent/05 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <span className="font-mono-custom text-xs text-[#111111]/40 uppercase tracking-[0.4em] font-black relative z-10">02ND</span>
              </div>
            </motion.div>
            
            {/* 1st Place */}
            <motion.div 
              key={`${activeGender}-1st`}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center w-40 md:w-72 group relative"
            >
              <div className="absolute -top-16 text-accent animate-bounce">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <span className="font-condensed font-black text-8xl md:text-9xl text-accent uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                {activeGender === 'BOYS' ? 'H2' : 'H11'}
              </span>
              <span className="font-mono-custom text-sm text-accent mt-2 font-black tracking-[0.3em]">
                {activeGender === 'BOYS' ? '99.5 PTS' : '88.5 PTS'}
              </span>
              <div className="w-full h-48 bg-accent flex flex-col items-center justify-center mt-6 shadow-[0_0_60px_rgba(201,168,76,0.2)]">
                 <span className="font-mono-custom text-[11px] text-black uppercase tracking-[0.5em] font-black">01ST PLACE</span>
                 <span className="font-serif-display text-black text-sm mt-1">
                   {activeGender === 'BOYS' ? 'Wild Ones' : 'The Phoenix'}
                 </span>
              </div>
            </motion.div>
            
            {/* 3rd Place */}
            <motion.div 
              key={`${activeGender}-3rd`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center w-28 md:w-48 group"
            >
              <span className="font-condensed font-black text-5xl text-[#111111]/25 uppercase tracking-tighter group-hover:text-[#111111] transition-colors">
                {activeGender === 'BOYS' ? 'H18' : 'H15'}
              </span>
              <span className="font-mono-custom text-[10px] text-[#111111]/30 mt-2 font-bold tracking-widest">
                {activeGender === 'BOYS' ? '65.5 PTS' : '62.0 PTS'}
              </span>
              <div className="w-full h-20 bg-accent/05 border-x border-t border-accent/20 flex items-center justify-center mt-6">
                 <span className="font-mono-custom text-[10px] text-accent/50 uppercase tracking-[0.4em] font-black">03RD</span>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
             <div className="inline-block h-px w-32 bg-[#111111]/10" />
             <p className="font-mono-custom text-[9px] text-[#111111]/30 uppercase tracking-[0.4em] font-black mt-4">{activeGender} GC STANDINGS · UPDATED APR 12</p>
          </div>
        </div>
      </section>

      {/* Standings Table */}
      <section className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute top-12 left-12 font-condensed font-black text-[240px] text-[#111111]/[0.03] leading-none pointer-events-none select-none">
          02
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
             <div>
                <h2 className="font-serif-display text-5xl md:text-7xl text-[#111]">Overall <span>Standings.</span></h2>
             </div>
             <div className="flex bg-white p-1 rounded-full border border-[#111111]/10">
                <button 
                  onClick={() => setActiveGender('BOYS')}
                  className={`${activeGender === 'BOYS' ? 'bg-[#111] text-white' : 'text-[#111]/40 hover:text-[#111]'} font-mono-custom text-[10px] uppercase tracking-widest px-6 py-2 rounded-full transition-colors`}
                >
                  BOYS
                </button>
                <button 
                  onClick={() => setActiveGender('GIRLS')}
                  className={`${activeGender === 'GIRLS' ? 'bg-[#111] text-white' : 'text-[#111]/40 hover:text-[#111]'} font-mono-custom text-[10px] uppercase tracking-widest px-6 py-2 rounded-full transition-colors`}
                >
                  GIRLS
                </button>
             </div>
          </div>

          <div className="bg-white border border-[#111111]/05 shadow-xl rounded-3xl overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#111111] text-white">
                  <th className="text-left font-mono-custom text-[10px] uppercase tracking-[0.3em] p-8 w-24">RANK</th>
                  <th className="text-left font-mono-custom text-[10px] uppercase tracking-[0.3em] p-8">HOSTEL</th>
                  <th className="text-right font-mono-custom text-[10px] uppercase tracking-[0.3em] p-8">POINTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#111111]/[0.05]">
                {(activeGender === 'BOYS' ? [
                  { rank: '01', name: 'H2', tag: 'Wild Ones', pts: '99.5', active: true },
                  { rank: '02', name: 'H3', tag: 'Aftershock', pts: '82.5' },
                  { rank: '03', name: 'H18', tag: 'Lycans', pts: '65.5' },
                  { rank: '04', name: 'H6', pts: '61.5' },
                  { rank: '05', name: 'H5', pts: '61.5' },
                  { rank: '06', name: 'H9', pts: '55' },
                ] : [
                  { rank: '01', name: 'H11', tag: 'The Phoenix', pts: '88.5', active: true },
                  { rank: '02', name: 'H10', tag: 'Valkyries', pts: '74.0' },
                  { rank: '03', name: 'H15', pts: '62.0' },
                  { rank: '04', name: 'H16', pts: '58.5' },
                  { rank: '05', name: 'H12', pts: '54.0' },
                  { rank: '06', name: 'H13', pts: '49.5' },
                ]).map((row) => (
                  <tr key={row.rank} className="group hover:bg-accent/05 transition-all duration-300">
                    <td className="p-8">
                      <span className={`font-condensed font-black text-3xl md:text-4xl ${row.active ? 'text-accent' : 'text-[#111111]/10 group-hover:text-[#111111]/20 transition-colors'}`}>
                        {row.rank}
                      </span>
                    </td>
                    <td className="p-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${row.active ? 'bg-accent shadow-[0_0_15px_rgba(201,168,76,0.6)]' : 'bg-[#111111]/10'}`} />
                        <div>
                           <span className="font-condensed font-black text-xl md:text-2xl uppercase tracking-tight">{row.name}</span>
                           {row.tag && (
                             <span className="ml-4 font-mono-custom text-[9px] text-[#111111]/40 bg-[#111111]/05 px-3 py-1 uppercase tracking-[0.2em] font-bold rounded-sm">
                               {row.tag}
                             </span>
                           )}
                        </div>
                      </div>
                    </td>
                    <td className="p-8 text-right">
                      <span className="font-mono-custom font-black text-lg md:text-xl">
                        {row.pts}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-8 bg-[#111111]/02 border-t border-[#111111]/05 text-center">
               <button className="font-mono-custom text-[10px] uppercase tracking-[0.3em] text-[#111111]/40 font-black hover:text-[#111111] transition-colors">
                 VIEW ALL {activeGender === 'BOYS' ? '16' : '10'} HOSTELS ↓
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sport Selector Grid */}
      <section className="bg-[#111111] py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute top-12 right-12 font-condensed font-black text-[240px] text-accent/5 pointer-events-none leading-none select-none">
          03
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="mb-20">
             <h2 className="font-serif-display text-5xl md:text-7xl text-[#F5F0E8] leading-[1.1]">
               Detailed <span>Breakdown.</span>
             </h2>
          </div>

          <div className="flex flex-wrap gap-3 mb-16 max-w-3xl">
            {['Aquatics', 'Athletics', 'Basketball', 'Badminton', 'Cricket', 'Football', 'Hockey', 'Volleyball', 'Squash', 'Table Tennis'].map((s) => (
              <button 
                key={s} 
                onClick={() => setActiveSport(s)}
                className={`px-6 py-3 border-2 font-mono-custom text-[11px] uppercase tracking-[0.2em] font-black transition-all ${activeSport === s ? 'border-accent bg-accent text-black' : 'border-white/10 text-white/30 hover:border-white/30 hover:text-white'}`}
              >
                {s}
              </button>
            ))}
          </div>

          <motion.div 
            key={`${activeSport}-${activeGender}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 bg-white/05 border border-white/10 rounded-3xl overflow-hidden"
          >
            <div className="md:col-span-12 bg-[#0a0a0a] p-6 font-condensed font-black text-sm uppercase tracking-[0.5em] text-white/20 text-center border-b border-white/05">
              {activeSport.toUpperCase()} CHAMPIONSHIP 2024 ({activeGender})
            </div>
            
            <div className="md:col-span-4 p-12 border-b md:border-b-0 md:border-r border-white/05 relative group">
              <div className="absolute inset-0 bg-accent/05 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="font-condensed font-black text-8xl text-accent mb-4 tracking-tighter">
                {currentResult.winner}
              </h3>
              <div className="flex items-center gap-4">
                 <div className="h-0.5 w-8 bg-accent" />
                 <span className="font-mono-custom text-xs text-white/40 uppercase tracking-widest">10 POINTS EARNED</span>
              </div>
            </div>
            
            <div className="md:col-span-4 p-12 border-b md:border-b-0 md:border-r border-white/05 group">
              <span className="font-mono-custom text-[10px] text-white/30 uppercase tracking-[0.3em] font-black mb-6 block">RUNNER-UP</span>
              <h3 className="font-condensed font-black text-7xl text-white/80 mb-4 tracking-tighter">
                {currentResult.runnerUp}
              </h3>
              <div className="flex items-center gap-4">
                 <div className="h-0.5 w-8 bg-white/20" />
                 <span className="font-mono-custom text-[10px] text-white/30 uppercase tracking-widest">06 POINTS EARNED</span>
              </div>
            </div>
            
            <div className="md:col-span-4 p-12 flex flex-col justify-center items-center text-center group">
               <span className="font-mono-custom text-[9px] text-white/20 uppercase tracking-[0.4em] font-black mb-8">EVENT DATA</span>
               <button className="w-full border-2 border-accent/20 text-accent font-mono-custom text-[11px] uppercase tracking-[0.3em] font-black py-5 px-8 hover:bg-accent hover:text-black transition-all group-hover:border-accent">
                 FULL EVENT RESULTS →
               </button>
               <p className="mt-6 font-serif-display text-white/20 text-sm">View bracket & match scores</p>
            </div>
          </motion.div>
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
        .pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
