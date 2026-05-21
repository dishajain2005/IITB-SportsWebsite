'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BASE_EVENTS, SPORT_CATEGORIES, MONTH_NAMES, DAY_NAMES } from '@/lib/data/events';

function getWeekNumber(d: Date) {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

function EventsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter = searchParams.get('sport') ?? 'All';
  const query = searchParams.get('q') ?? '';
  const weekOffset = parseInt(searchParams.get('week') ?? '0', 10);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 240]);

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === '' || value === 'All' || value === '0') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function setWeekOffset(next: number | ((prev: number) => number)) {
    const val = typeof next === 'function' ? next(weekOffset) : next;
    setParam('week', String(val));
  }

  const currentWeekDays = useMemo(() => {
    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay() + weekOffset * 7);
    sunday.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      const dayName = DAY_NAMES[d.getDay()];
      return {
        day: dayName,
        dayShort: dayName.substring(0, 3).toUpperCase(),
        date: d.getDate(),
        month: MONTH_NAMES[d.getMonth()].substring(0, 3).toUpperCase(),
        year: d.getFullYear(),
        isToday: d.toDateString() === new Date().toDateString(),
        events: BASE_EVENTS[i].events,
      };
    });
  }, [weekOffset]);

  const today = useMemo(() => currentWeekDays.find((d) => d.isToday), [currentWeekDays]);
  const todayRealDate = new Date();

  const filtered = useMemo(() => {
    return currentWeekDays.map((d) => ({
      ...d,
      events: d.events.filter((e) => {
        const sportOk = filter === 'All' || e.sport === filter;
        const q = query.trim().toLowerCase();
        const qOk =
          !q ||
          e.name.toLowerCase().includes(q) ||
          e.sport.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q);
        return sportOk && qOk;
      }),
    }));
  }, [filter, query, currentWeekDays]);

  const totalEvents = filtered.reduce((sum, d) => sum + d.events.length, 0);

  const weekRangeText = useMemo(() => {
    const first = currentWeekDays[0];
    const last = currentWeekDays[6];
    if (first.month === last.month) {
      return `${first.month} ${first.date}–${last.date} · ${first.year}`;
    }
    return `${first.month} ${first.date} – ${last.month} ${last.date} · ${first.year}`;
  }, [currentWeekDays]);

  const weekNum = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + weekOffset * 7);
    return getWeekNumber(d);
  }, [weekOffset]);

  return (
    <div className="min-h-screen bg-cream-topo text-[#111111] selection:bg-accent selection:text-black">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-0 overflow-hidden relative min-h-[110vh] flex flex-col">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0"
        >
          <span className="font-condensed font-black text-[30vw] text-white/[0.04] leading-none uppercase tracking-tighter">
            EVENTS
          </span>
        </motion.div>

        <video autoPlay muted loop playsInline preload="metadata" poster="/gymkhana.webp" className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ filter: 'saturate(0.7) contrast(1.05)' }}>
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#0d0d0d]/65 to-[#0d0d0d]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/60 via-transparent to-[#0d0d0d]/20" />

        {/* Calendar week grid */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 md:px-12 lg:px-24 pointer-events-none select-none overflow-hidden" style={{ height: '65%' }}>
          {currentWeekDays.map((d) => (
            <div key={d.date} className="flex flex-col items-center flex-1" style={{ opacity: d.isToday ? 1 : 0.07 }}>
              <span
                className="font-condensed font-black leading-none tracking-tighter"
                style={{ fontSize: 'clamp(60px, 10vw, 160px)', color: d.isToday ? '#C4622D' : '#F5F0E8' }}
              >
                {d.date}
              </span>
              <span
                className="font-mono-custom uppercase tracking-[0.3em] font-black mt-2"
                style={{ fontSize: d.isToday ? '13px' : '9px', color: d.isToday ? '#C4622D' : '#F5F0E8', marginBottom: '12px' }}
              >
                {d.dayShort}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/[0.04] pointer-events-none hidden lg:block" />

        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-24 relative z-10 flex-1 grid lg:grid-cols-2 gap-0">
          {/* Left — headline + stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col justify-center pb-24 lg:pr-16 border-r border-white/[0.04] overflow-hidden"
          >
            <span className="font-mono-custom text-[10px] uppercase tracking-[0.4em] text-accent font-black mb-8 flex items-center gap-3">
              <span className="w-6 h-px bg-accent" /> WK {weekNum} · {weekRangeText}
            </span>
            <h1 className="font-serif-display text-[clamp(64px,9vw,160px)] text-[#F5F0E8] uppercase leading-[0.85] tracking-[-0.04em] mb-14">
              EVENTS<br />
              <span className="text-accent normal-case tracking-normal">Timeline.</span>
            </h1>
            <div className="flex gap-10 items-end border-t border-white/[0.06] pt-8">
              <div>
                <span className="font-condensed font-black text-5xl text-accent block">{totalEvents}</span>
                <span className="font-mono-custom text-[9px] uppercase tracking-[0.25em] text-white/30 font-bold mt-1 block">Scheduled</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <span className="font-condensed font-black text-5xl text-accent block">14</span>
                <span className="font-mono-custom text-[9px] uppercase tracking-[0.25em] text-white/30 font-bold mt-1 block">Sports</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <span className="font-condensed font-black text-5xl text-[#F5F0E8]/40 block">7</span>
                <span className="font-mono-custom text-[9px] uppercase tracking-[0.25em] text-white/30 font-bold mt-1 block">Days</span>
              </div>
            </div>
          </motion.div>

          {/* Right — today's live ticker */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col justify-center pb-24 lg:pl-16 hidden lg:flex"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono-custom text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">
                Today · {DAY_NAMES[todayRealDate.getDay()]} {todayRealDate.getDate()} {todayRealDate.toLocaleString('en', { month: 'short' }).toUpperCase()}
              </span>
            </div>
            <div className="space-y-0 divide-y divide-white/[0.06]">
              {(today?.events ?? []).map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="py-5 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-1 h-8 rounded-full shrink-0" style={{ backgroundColor: e.color }} />
                    <div>
                      <p className="font-condensed font-black text-xl text-[#F5F0E8] uppercase leading-tight">{e.name}</p>
                      <p className="font-mono-custom text-[9px] uppercase tracking-[0.25em] text-white/30 mt-0.5">{e.venue}</p>
                    </div>
                  </div>
                  <span className="font-condensed font-black text-2xl text-white/20 group-hover:text-accent transition-colors">{e.time}</span>
                </motion.div>
              ))}
              {(today?.events ?? []).length === 0 && (
                <p className="font-mono-custom text-[11px] uppercase tracking-widest text-white/20 py-8">No events today</p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="px-6 md:px-12 lg:px-24 pt-14 pb-8 bg-[#F5F0E8] border-b border-[#111111]/10">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setWeekOffset(prev => prev - 1)}
              aria-label="Previous week"
              className="font-mono-custom text-[10px] uppercase tracking-[0.2em] font-black border border-[#111111]/15 px-5 py-2.5 rounded-full hover:border-accent hover:text-accent transition-all flex items-center gap-2 bg-white"
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              PREV
            </button>
            <button
              onClick={() => setWeekOffset(0)}
              aria-label="Current week"
              className={`font-mono-custom text-[10px] uppercase tracking-[0.2em] font-black px-6 py-2.5 rounded-full shadow-sm transition-all ${weekOffset === 0 ? 'bg-accent text-white' : 'bg-white border border-[#111111]/15 text-[#111111]/60 hover:border-accent hover:text-accent'}`}
            >
              THIS WEEK
            </button>
            <button
              onClick={() => setWeekOffset(prev => prev + 1)}
              aria-label="Next week"
              className="font-mono-custom text-[10px] uppercase tracking-[0.2em] font-black border border-[#111111]/15 px-5 py-2.5 rounded-full hover:border-accent hover:text-accent transition-all flex items-center gap-2 bg-white"
            >
              NEXT
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>

          <div className="flex items-center gap-3 flex-wrap w-full lg:w-auto">
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setParam('sport', e.target.value)}
                className="appearance-none font-mono-custom text-[11px] uppercase tracking-[0.15em] font-black bg-white border border-[#111111]/15 pl-4 pr-10 py-2.5 rounded-full text-[#111111] focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="All">All Sports</option>
                {SPORT_CATEGORIES.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>

            <div className="flex items-center gap-3 bg-white border border-[#111111]/15 rounded-full px-4 py-2.5 flex-1 lg:w-72 min-w-[220px]">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="#11111160" strokeWidth="1.5" />
                <path d="M10.5 10.5L14 14" stroke="#11111160" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(e) => setParam('q', e.target.value)}
                type="text"
                placeholder="Search events…"
                className="bg-transparent font-mono-custom text-[11px] tracking-[0.05em] text-[#111111] placeholder:text-[#111111]/40 focus:outline-none w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured: TODAY */}
      {today && today.events.length > 0 && (
        <section className="px-6 md:px-12 lg:px-24 pt-14 pb-4 bg-[#F5F0E8]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="font-serif-display text-3xl md:text-4xl text-[#111111] leading-tight">
                  {today.day}, <span className="text-accent">{today.month} {today.date}</span>
                </h2>
              </div>
              <span className="hidden md:block font-mono-custom text-[10px] uppercase tracking-[0.3em] text-[#111111]/40 font-black">
                {today.events.length} LIVE EVENTS
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-4"
            >
              {today.events.map((ev, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group relative bg-[#111111] rounded-2xl p-6 md:p-8 overflow-hidden cursor-pointer"
                  style={{ borderTop: `3px solid ${ev.color}` }}
                >
                  <div
                    className="absolute inset-0 opacity-60 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top right, ${ev.color}22, transparent 60%)` }}
                  />
                  <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono-custom text-[10px] uppercase tracking-[0.3em] font-black px-3 py-1.5 rounded-full"
                        style={{ color: ev.color, backgroundColor: `${ev.color}1F`, border: `1px solid ${ev.color}55` }}
                      >
                        {ev.sport}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono-custom text-accent text-[9px] uppercase tracking-[0.3em] font-black">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                        LIVE
                      </span>
                    </div>

                    <div className="font-serif-display text-3xl md:text-4xl text-[#F5F0E8] leading-tight group-hover:text-accent transition-colors">
                      {ev.name}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-5">
                        <div className="flex flex-col">
                          <span className="font-mono-custom text-[9px] uppercase tracking-[0.25em] text-white/40 font-bold">TIME</span>
                          <span className="font-condensed font-black text-2xl text-[#F5F0E8] tabular-nums">{ev.time}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-mono-custom text-[9px] uppercase tracking-[0.25em] text-white/40 font-bold">VENUE</span>
                          <span className="font-condensed font-black text-base text-[#F5F0E8]/90">{ev.venue}</span>
                        </div>
                      </div>
                      <svg className="text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all" width="22" height="22" viewBox="0 0 20 20" fill="none">
                        <path d="M5 10h10M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Week Agenda */}
      <section className="px-6 md:px-12 lg:px-24 pt-14 pb-24 bg-[#F5F0E8]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif-display text-3xl md:text-4xl text-[#111111] leading-tight">
              Full <span className="text-accent">agenda.</span>
            </h2>
            <span className="hidden md:block font-mono-custom text-[10px] uppercase tracking-[0.3em] text-[#111111]/50 font-black">
              {weekRangeText}
            </span>
          </div>

          {totalEvents === 0 && (
            <div className="bg-white border border-[#111111]/10 rounded-2xl px-6 py-16 text-center">
              <span className="font-mono-custom text-[11px] uppercase tracking-[0.3em] text-[#111111]/40 font-black">
                No events match your filter
              </span>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {filtered.map((day) => {
              const isEmpty = day.events.length === 0;
              const isToday = day.isToday;
              return (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45 }}
                  className={`grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] rounded-2xl border transition-all bg-white ${
                    isToday ? 'border-accent/40 ring-1 ring-accent/20' : 'border-[#111111]/10 hover:border-[#111111]/25'
                  }`}
                >
                  <div className={`py-6 px-5 md:px-7 flex flex-col justify-between rounded-l-2xl ${isToday ? 'bg-accent/10' : 'bg-[#F5F0E8]/60'}`}>
                    <div>
                      <div className={`font-mono-custom text-[10px] uppercase tracking-[0.25em] font-black mb-2 ${isToday ? 'text-accent' : 'text-[#111111]/50'}`}>
                        {day.dayShort}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <div className={`font-condensed font-black text-5xl md:text-6xl leading-none ${isToday ? 'text-accent' : 'text-[#111111]'}`}>
                          {day.date}
                        </div>
                        <div className={`font-mono-custom text-[10px] uppercase tracking-[0.2em] font-black ${isToday ? 'text-accent/70' : 'text-[#111111]/40'}`}>
                          {day.month}
                        </div>
                      </div>
                    </div>
                    <div className={`mt-6 font-mono-custom text-[9px] uppercase tracking-[0.25em] font-bold ${isToday ? 'text-accent' : 'text-[#111111]/40'}`}>
                      {isToday ? 'TODAY' : isEmpty ? 'REST DAY' : `${day.events.length} EVENT${day.events.length !== 1 ? 'S' : ''}`}
                    </div>
                  </div>

                  <div className="p-3 md:p-4 flex flex-col">
                    {isEmpty ? (
                      <div className="flex-1 flex items-center px-4 py-8">
                        <span className="font-mono-custom text-[10px] uppercase tracking-[0.25em] text-[#111111]/30 font-black">
                          No events scheduled
                        </span>
                      </div>
                    ) : (
                      <ul className="flex flex-col divide-y divide-[#111111]/10">
                        {day.events.map((ev, i) => (
                          <li
                            key={i}
                            className="group relative flex flex-col md:flex-row md:items-center gap-3 md:gap-6 px-3 md:px-4 py-4 rounded-xl hover:bg-[#F5F0E8]/70 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-4 md:w-28 shrink-0">
                              <span aria-hidden className="w-1 h-10 rounded-full shrink-0" style={{ backgroundColor: ev.color }} />
                              <div className="font-condensed font-black text-xl md:text-2xl text-[#111111] tabular-nums leading-none">
                                {ev.time}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="font-serif-display text-lg md:text-xl text-[#111111] leading-tight group-hover:text-accent transition-colors">
                                {ev.name}
                              </div>
                              <div className="flex items-center gap-2 mt-1.5">
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="text-[#111111]/40 shrink-0">
                                  <path d="M6 1.5c-1.93 0-3.5 1.57-3.5 3.5 0 2.6 3.5 5.5 3.5 5.5s3.5-2.9 3.5-5.5c0-1.93-1.57-3.5-3.5-3.5z" stroke="currentColor" strokeWidth="1" />
                                  <circle cx="6" cy="5" r="1.2" stroke="currentColor" strokeWidth="1" />
                                </svg>
                                <span className="font-mono-custom text-[10px] uppercase tracking-[0.15em] text-[#111111]/50 font-bold">
                                  {ev.venue}
                                </span>
                              </div>
                            </div>

                            <span
                              className="font-mono-custom text-[9px] uppercase tracking-[0.25em] font-black px-3 py-1.5 rounded-full self-start md:self-center shrink-0"
                              style={{ color: ev.color, backgroundColor: `${ev.color}18`, border: `1px solid ${ev.color}40` }}
                            >
                              {ev.sport}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sport Categories */}
      <section className="bg-[#111111] py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.05, backgroundImage: 'radial-gradient(circle at 2px 2px, #C4622D 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-serif-display text-3xl md:text-4xl text-[#F5F0E8] leading-tight">
              Sport <span className="text-accent">categories.</span>
            </h2>
            <span className="hidden md:block font-mono-custom text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">
              14 DISCIPLINES · CLICK TO FILTER
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {SPORT_CATEGORIES.map((sport) => {
              const active = filter === sport.name;
              return (
                <motion.button
                  key={sport.name}
                  onClick={() => setParam('sport', active ? 'All' : sport.name)}
                  whileHover={{ y: -2 }}
                  className={`group flex flex-col items-start gap-3 border px-4 py-4 rounded-xl cursor-pointer transition-all text-left min-h-[92px] ${
                    active ? 'bg-accent/10 border-accent/60' : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                  }`}
                  style={active ? { boxShadow: `0 0 0 1px ${sport.color}40 inset` } : undefined}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: sport.color, boxShadow: `0 0 12px ${sport.color}80` }}
                  />
                  <span className={`font-serif-display text-base leading-tight ${active ? 'text-accent' : 'text-[#F5F0E8] group-hover:text-white'}`}>
                    {sport.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {filter !== 'All' && (
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => setParam('sport', 'All')}
                className="font-mono-custom text-[10px] uppercase tracking-[0.25em] font-black text-accent border border-accent/40 px-4 py-2 rounded-full hover:bg-accent hover:text-black transition-all"
              >
                CLEAR FILTER · {filter}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense>
      <EventsContent />
    </Suspense>
  );
}
