'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export interface SportEntry {
  id: string;
  name: string;
  color: string;
  label: string;
  year: string;
  achievement: string;
  description: string;
}

interface Props {
  sports: SportEntry[];
}

export default function SplitPanelExplorer({ sports }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = sports[activeIndex];

  if (!sports.length || !active) return null;

  return (
    <section className="w-full bg-[#111111]" style={{ minHeight: '80vh' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-24">
        {/* Desktop: side-by-side. Mobile: stacked */}
        <div className="flex flex-col lg:flex-row gap-0 border border-white/[0.06] rounded-2xl overflow-hidden" style={{ minHeight: '600px' }}>

          {/* LEFT — Sport index list */}
          <div className="lg:w-[280px] shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col">
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/[0.06]">
              <span className="font-mono-custom text-[9px] font-black uppercase tracking-[0.45em] text-white/20">
                — SPORTS DIRECTORY
              </span>
            </div>

            {/* Sport list */}
            <nav className="flex flex-col flex-1 py-3">
              {sports.map((sport, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={sport.id}
                    onClick={() => setActiveIndex(i)}
                    aria-pressed={isActive}
                    className="group relative flex items-center gap-4 px-6 py-3.5 text-left transition-colors duration-200 hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40 focus-visible:outline-offset-[-2px]"
                  >
                    {/* Active left border */}
                    {isActive && (
                      <motion.div
                        layoutId="active-bar"
                        className="absolute left-0 top-0 bottom-0 w-[2px]"
                        style={{ background: sport.color }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}

                    {/* Number */}
                    <span className="font-mono-custom text-[9px] font-black tracking-[0.2em] w-6 shrink-0"
                      style={{ color: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Name */}
                    <span
                      className="font-condensed font-black text-[13px] uppercase tracking-[0.12em] transition-colors duration-200"
                      style={{ color: isActive ? '#F5F0E8' : 'rgba(245,240,232,0.35)' }}
                    >
                      {sport.name}
                    </span>

                    {/* Arrow on active */}
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-auto text-xs"
                        style={{ color: sport.color }}
                        aria-hidden="true"
                      >
                        →
                      </motion.span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* RIGHT — Active sport panel */}
          <div className="relative flex-1 overflow-hidden" style={{ minHeight: '400px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="absolute inset-0 flex flex-col justify-end p-8 md:p-12"
                style={{ background: active.color }}
              >
                {/* Ghost letter background */}
                <div
                  className="absolute top-0 right-0 font-serif-display font-black leading-none select-none pointer-events-none"
                  style={{
                    fontSize: 'clamp(160px, 22vw, 280px)',
                    color: 'rgba(255,255,255,0.04)',
                    fontStyle: 'italic',
                    lineHeight: 1,
                    top: '-0.1em',
                    right: '-0.05em',
                  }}
                >
                  {active.name[0]}
                </div>

                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />

                {/* Bottom gradient for readability */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.4 }}
                    className="flex flex-wrap gap-3 mb-5"
                  >
                    <span className="rounded-full border px-4 py-1.5 font-mono-custom text-[9px] font-black uppercase tracking-[0.35em]"
                      style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#F5F0E8', background: 'rgba(255,255,255,0.08)' }}>
                      {active.year}
                    </span>
                    <span className="rounded-full border px-4 py-1.5 font-mono-custom text-[9px] font-black uppercase tracking-[0.35em]"
                      style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(245,240,232,0.55)', background: 'rgba(255,255,255,0.04)' }}>
                      {active.label}
                    </span>
                  </motion.div>

                  {/* Sport name */}
                  <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.4 }}
                    className="font-serif-display uppercase leading-[0.9] tracking-[-0.04em] text-[#F5F0E8] mb-5"
                    style={{ fontSize: 'clamp(52px, 7vw, 96px)', fontStyle: 'italic' }}
                  >
                    {active.name}
                  </motion.h2>

                  {/* Bottom row: description + CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.4 }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
                  >
                    <p className="text-sm leading-[1.7] max-w-xs"
                      style={{ color: 'rgba(245,240,232,0.5)' }}>
                      {active.description}
                    </p>

                    <Link
                      href={`/sports/${active.id}`}
                      className="inline-flex items-center gap-3 shrink-0 group/cta"
                    >
                      <span className="font-mono-custom text-[10px] font-black uppercase tracking-[0.3em] text-[#F5F0E8]/70 group-hover/cta:text-[#F5F0E8] transition-colors border-b border-white/20 group-hover/cta:border-white/60 pb-1">
                        EXPLORE
                      </span>
                      <div className="w-10 h-10 rounded-full border border-white/20 group-hover/cta:border-white/60 flex items-center justify-center transition-colors">
                        <span className="text-[#F5F0E8] text-sm" aria-hidden="true">→</span>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
