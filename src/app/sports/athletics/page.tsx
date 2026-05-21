'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Medal, Timer, Trophy, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const STATS = [
  { n: '400m', l: 'Standard Track', icon: Timer },
  { n: '12+', l: 'Track & Field Events', icon: Trophy },
  { n: '100+', l: 'Active Athletes', icon: Users },
  { n: '3', l: 'Specialised Coaches', icon: Medal },
];

const FACILITIES = [
  {
    num: '01',
    title: 'Main Athletic Track',
    body: 'A well-maintained 400m synthetic track suitable for sprinting, middle-distance, and long-distance training. Floodlights available for evening sessions.',
  },
  {
    num: '02',
    title: 'Jump Pits',
    body: 'Dedicated pits for Long Jump and Triple Jump with standard sand quality, approach runways, and take-off boards.',
  },
  {
    num: '03',
    title: 'Throwing Circles',
    body: 'Professional setups for Shot Put, Discus Throw, and Javelin Throw training under expert supervision.',
  },
  {
    num: '04',
    title: 'Conditioning Area',
    body: 'Open space for drills, plyometrics, and functional strength training essential for explosive athletic performance.',
  },
];

const SCHEDULE = [
  { session: 'Morning Drills', type: 'Fitness & Technique', time: '6:00 AM – 8:00 AM' },
  { session: 'Evening Track', type: 'Intervals & Sprints', time: '5:30 PM – 7:30 PM' },
  { session: 'Field Events', type: 'Throws & Jumps', time: '5:00 PM – 7:00 PM' },
  { session: 'NSO Athletics', type: 'Student Training', time: '5:45 PM – 7:00 PM' },
];

const EVENTS = [
  { title: 'Cross Country', tag: 'Annual Campus Run', wide: false },
  { title: 'Athletics GC', tag: 'Inter-Hostel Championship', wide: false },
  { title: 'Freshie Open', tag: 'New Talent Identification', wide: false },
  { title: 'Inter-IIT Sports Meet', tag: 'The Ultimate Battle for Supremacy', wide: true },
];

const TIMELINE = [
  {
    year: '2023 · Inter-IIT Sports Meet',
    event: 'Overall Athletics Championship',
    rows: [
      { medal: 'g', text: '1st place — Overall Men\u2019s Athletics' },
      { medal: 's', text: '2nd place — 4×100m Relay' },
    ],
  },
  {
    year: '2023 · Individual Standouts',
    event: 'New Meet Records',
    rows: [
      { medal: 'g', text: '100m Dash — Praveen Kumar' },
      { medal: 'g', text: 'Long Jump — Institute Record' },
    ],
  },
  {
    year: '2024 · Invitational Meets',
    event: 'State Level Competitions',
    rows: [
      { medal: 'b', text: 'Bronze in 800m — Mumbai Open' },
    ],
  },
];

const MEDAL_BG: Record<string, string> = {
  g: 'bg-accent',
  s: 'bg-[#9EA3A8]',
  b: 'bg-[#A0674A]',
};

export default function AthleticsPage() {
  return (
    <div className="min-h-screen bg-cream text-[#111111] selection:bg-accent selection:text-[#F5F0E8]">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[92vh] w-full overflow-hidden bg-[#0D0D0D] text-[#F5F0E8]">
        <div className="absolute inset-0">
          <Image
            src="/Sally-Pearson-100-meter-hurdles-2012-Olympics.webp"
            alt="IIT Bombay athletes on the track"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#0D0D0D]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(196,98,45,0.18),transparent_55%)]" />
        </div>

        {/* Ghost letters */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 bottom-[-4vw] z-0 select-none font-serif-display text-[28vw] leading-none tracking-[-0.05em] text-accent/10"
        >
          ATH
        </div>

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-36 md:px-12 lg:px-24 lg:pt-44">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="font-serif-display text-[clamp(84px,16vw,220px)] font-black uppercase leading-[0.84] tracking-[-0.05em] text-[#F5F0E8]"
          >
            Athletics
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 grid max-w-[1100px] gap-10 md:grid-cols-12 md:items-end"
          >
            <p className="border-l-2 border-accent/60 pl-6 text-lg leading-[1.7] text-[#F5F0E8]/75 md:col-span-7 md:text-xl">
              Experience the raw power and precision of track and field. IIT Bombay Athletics is a community of
              sprinters, distance runners, and field athletes training for Inter-IIT glory — one session, one
              second, one metre at a time.
            </p>

            <div className="flex flex-wrap gap-2 md:col-span-5 md:justify-end">
              {['Sprints', 'Middle Distance', 'Long Jump', 'Shot Put', 'Javelin'].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[#F5F0E8]/20 bg-white/5 px-4 py-2 font-mono-custom text-[11px] font-black uppercase tracking-[0.2em] text-[#F5F0E8]/80 backdrop-blur-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* accent bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 h-[6px] bg-accent" />
      </section>

      {/* ABOUT */}
      <section className="relative overflow-hidden px-6 py-28 md:px-12 lg:px-24">
        <div className="pointer-events-none absolute -left-6 -top-10 select-none font-serif-display text-[22vw] font-black leading-none tracking-[-0.04em] text-[#111111]/[0.04]">
          01
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <h2 className="mb-16 font-serif-display text-[clamp(48px,7vw,96px)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#111111]">
            About<br />the Club
          </h2>

          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <p className="mb-6 text-xl leading-[1.75] text-[#111111]/80 md:text-2xl md:leading-[1.6]">
                The Athletics Club at IIT Bombay is one of the most dedicated groups on campus. From early morning
                track sessions to intense field practice, our athletes push their limits daily.
              </p>
              <p className="text-lg leading-[1.85] text-[#111111]/60">
                Whether you&apos;re looking to beat your personal best or represent the institute at the Inter-IIT
                Sports Meet, the club provides the coaching and environment to succeed. Our legacy is built on
                sweat, discipline, and the pursuit of speed — and we welcome everyone from beginners to seasoned
                competitors.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px border border-[#111111]/10 bg-[#111111]/10">
                {STATS.map(({ n, l, icon: Icon }) => (
                  <div key={l} className="bg-[#F5F0E8] p-8">
                    <Icon aria-hidden className="mb-4 h-5 w-5 text-accent" strokeWidth={2} />
                    <div className="font-serif-display text-5xl font-black leading-none tracking-[-0.02em] text-accent">
                      {n}
                    </div>
                    <div className="mt-3 font-mono-custom text-[10px] font-black uppercase tracking-[0.2em] text-[#111111]/55">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* accent divider */}
      <div className="mx-6 h-px bg-accent/15 md:mx-12 lg:mx-24" />

      {/* FACILITIES */}
      <section className="relative overflow-hidden px-6 py-28 md:px-12 lg:px-24">
        <div className="pointer-events-none absolute -right-6 -top-10 select-none font-serif-display text-[22vw] font-black leading-none tracking-[-0.04em] text-[#111111]/[0.04]">
          02
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <h2 className="mb-16 font-serif-display text-[clamp(48px,7vw,96px)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#111111]">
            Facilities
          </h2>

          <div className="grid gap-px border border-[#111111]/10 bg-[#111111]/10 md:grid-cols-2">
            {FACILITIES.map((f) => (
              <div
                key={f.num}
                className="group relative bg-[#F5F0E8] p-10 transition-colors hover:bg-[#F5F0E8]/60"
              >
                <div className="mb-6 font-serif-display text-6xl font-black leading-none text-accent/25 transition-colors group-hover:text-accent/60">
                  {f.num}
                </div>
                <h3 className="mb-4 font-condensed text-2xl font-black uppercase tracking-[0.01em] text-[#111111]">
                  {f.title}
                </h3>
                <p className="max-w-md text-base leading-[1.75] text-[#111111]/65">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE — dark */}
      <section className="relative overflow-hidden bg-[#0D0D0D] px-6 py-28 text-[#F5F0E8] md:px-12 lg:px-24">
        <div className="pointer-events-none absolute -left-6 -top-10 select-none font-serif-display text-[22vw] font-black leading-none tracking-[-0.04em] text-accent/[0.05]">
          03
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <h2 className="mb-16 font-serif-display text-[clamp(48px,7vw,96px)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#F5F0E8]">
            Practice<br />Schedule
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-accent">
                  <th className="pb-5 text-left font-mono-custom text-[11px] font-black uppercase tracking-[0.25em] text-[#F5F0E8]/45">
                    Session
                  </th>
                  <th className="pb-5 text-left font-mono-custom text-[11px] font-black uppercase tracking-[0.25em] text-[#F5F0E8]/45">
                    Type
                  </th>
                  <th className="pb-5 text-right font-mono-custom text-[11px] font-black uppercase tracking-[0.25em] text-[#F5F0E8]/45">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((s) => (
                  <tr key={s.session} className="border-b border-[#F5F0E8]/10 transition-colors hover:bg-white/[0.02]">
                    <td className="py-6 font-condensed text-lg font-black uppercase tracking-[0.02em] text-[#F5F0E8]">
                      {s.session}
                    </td>
                    <td className="py-6 text-base text-[#F5F0E8]/60">{s.type}</td>
                    <td className="py-6 text-right font-mono-custom text-sm font-black tracking-wider text-accent">
                      {s.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="relative overflow-hidden px-6 py-28 md:px-12 lg:px-24">
        <div className="pointer-events-none absolute -right-6 -top-10 select-none font-serif-display text-[22vw] font-black leading-none tracking-[-0.04em] text-[#111111]/[0.04]">
          04
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <h2 className="mb-16 font-serif-display text-[clamp(48px,7vw,96px)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#111111]">
            Key Events
          </h2>

          <div className="grid gap-px border border-[#111111]/10 bg-[#111111]/10 md:grid-cols-3">
            {EVENTS.map((e) => (
              <div
                key={e.title}
                className={`group relative cursor-pointer bg-[#F5F0E8] p-10 transition-colors hover:bg-accent/5 ${
                  e.wide ? 'md:col-span-2' : ''
                }`}
              >
                <h3 className="mb-3 font-condensed text-2xl font-black uppercase tracking-[0.02em] text-[#111111]">
                  {e.title}
                </h3>
                <p className="font-mono-custom text-[11px] font-black uppercase tracking-[0.22em] text-[#111111]/45">
                  {e.tag}
                </p>
                <span className="mt-8 block text-2xl text-accent transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS — dark */}
      <section className="relative overflow-hidden bg-[#0D0D0D] px-6 py-28 text-[#F5F0E8] md:px-12 lg:px-24">
        <div className="pointer-events-none absolute -left-6 -top-10 select-none font-serif-display text-[22vw] font-black leading-none tracking-[-0.04em] text-accent/[0.05]">
          05
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <h2 className="mb-16 font-serif-display text-[clamp(48px,7vw,96px)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#F5F0E8]">
            Achievements
          </h2>

          <div className="relative border-l border-[#F5F0E8]/15 pl-10">
            {TIMELINE.map((t, i) => (
              <div key={i} className={`relative ${i === TIMELINE.length - 1 ? '' : 'pb-14'}`}>
                <span
                  aria-hidden
                  className="absolute -left-[46px] top-2 h-3 w-3 rounded-full border-2 border-accent bg-[#0D0D0D]"
                />
                <div className="mb-2 font-mono-custom text-[11px] font-black uppercase tracking-[0.25em] text-accent">
                  {t.year}
                </div>
                <h3 className="mb-5 font-condensed text-xl font-black uppercase tracking-[0.02em] text-[#F5F0E8]">
                  {t.event}
                </h3>
                <ul className="flex flex-col gap-3">
                  {t.rows.map((r, j) => (
                    <li key={j} className="flex items-center gap-3 text-base text-[#F5F0E8]/70">
                      <span className={`h-3 w-3 flex-shrink-0 rounded-full ${MEDAL_BG[r.medal]}`} />
                      {r.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative overflow-hidden px-6 py-28 md:px-12 lg:px-24">
        <div className="pointer-events-none absolute -right-6 -top-10 select-none font-serif-display text-[22vw] font-black leading-none tracking-[-0.04em] text-[#111111]/[0.04]">
          06
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <h2 className="mb-16 font-serif-display text-[clamp(48px,7vw,96px)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#111111]">
            Contact
          </h2>

          <div className="grid gap-px border border-[#111111]/10 bg-[#111111]/10 md:grid-cols-2">
            <div className="bg-[#F5F0E8] p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-serif-display text-lg font-black text-accent">
                PK
              </div>
              <div className="mb-1 font-condensed text-xl font-black uppercase tracking-[0.02em] text-[#111111]">
                Praveen Kumar
              </div>
              <div className="mb-4 font-mono-custom text-[11px] font-black uppercase tracking-[0.22em] text-[#111111]/50">
                Institute Athletics Secretary
              </div>
              <a
                href="tel:+918958434190"
                className="font-mono-custom text-sm font-black tracking-wider text-accent"
              >
                +91 89584 34190
              </a>
            </div>

            <div className="bg-[#F5F0E8] p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-serif-display text-lg font-black text-accent">
                SC
              </div>
              <div className="mb-1 font-condensed text-xl font-black uppercase tracking-[0.02em] text-[#111111]">
                Sports Council
              </div>
              <div className="font-mono-custom text-[11px] font-black uppercase tracking-[0.22em] text-[#111111]/50">
                Athletics Team
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
