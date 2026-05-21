'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Droplets, Medal, Timer, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const STATS = [
  { n: '50m', l: 'Pool Length', icon: Timer },
  { n: '25m', l: 'Pool Width', icon: Droplets },
  { n: '2', l: 'Coaches', icon: Users },
  { n: '6+', l: 'Annual Events', icon: Medal },
];

const FACILITIES = [
  {
    num: '01',
    title: 'Swimming Pool',
    body: '50m × 25m Olympic-sized pool with all modern equipment — kickboards, flippers, pull buoys, paddles. Regular camps for beginners and intermediate swimmers throughout the year.',
  },
  {
    num: '02',
    title: 'Baby Pool',
    body: '15m × 10m pool for leisure and learners. Expansion to 25m × 10m planned to accommodate growing enthusiasm. Ideal for those just starting out.',
  },
  {
    num: '03',
    title: 'Water Polo Setup',
    body: 'All necessary equipment for Water Polo training. Dedicated lanes and goal setups for structured practice sessions and inter-hostel competitions.',
  },
  {
    num: '04',
    title: 'Multistation Gym',
    body: 'Dumbbells and free rods available for dryland conditioning. Pool members can use the gym to warm up and strengthen before entering the water.',
  },
];

const TIMING = [
  { slot: 'General Morning', cat: 'Open to all', time: '7:15 AM – 10:15 AM' },
  { slot: 'General Evening', cat: 'Open to all', time: '6:15 PM – 9:00 PM' },
  { slot: 'Ladies Slots', cat: 'Ladies only · Restricted', time: '6:30–7:15 AM / 5:20–6:15 PM' },
  { slot: 'Campus Kids', cat: 'Training', time: '4:00 – 5:15 PM' },
  { slot: 'NSO · Mon & Wed', cat: 'NSO', time: '5:45 – 7:00 PM' },
  { slot: 'Inter-IIT Practice', cat: 'Team', time: '7:30 – 9:00 PM' },
];

const EVENTS = [
  { title: 'Camps', tag: 'Beginners · Intermediate', wide: false },
  { title: 'NSO', tag: 'Mon & Wed sessions', wide: false },
  { title: 'Swimmathon', tag: 'Annual endurance event', wide: false },
  {
    title: 'Swimming GC · Triathlon GC · Water Polo GC',
    tag: 'Inter-hostel championship events',
    wide: true,
  },
];

const TIMELINE = [
  {
    year: '2022–23 · Inter-IIT Aquatics Meet',
    event: 'Mens Swimming · Mens Water Polo · Best Swimmer Award',
    rows: [
      { medal: 's', text: '2nd place — Mens Swimming' },
      { medal: 'o', text: '4th place — Mens Water Polo' },
      { medal: 'g', text: 'Best Swimmer — Kaushal Khunteta' },
    ],
  },
  {
    year: '2022–23 · Individual Medals',
    event: 'Multiple Gold & Silver Medals',
    rows: [
      { medal: 'g', text: '200m, 100m, 50m Breaststroke (M) — Kushal Khunteta' },
      { medal: 'g', text: '100m, 50m Butterfly (M) — Vaishnav Rao' },
      { medal: 'g', text: '100m Freestyle (W) — Mansi Khedekar' },
    ],
  },
  {
    year: '2023 · Inter-IIT Aquatics Meet',
    event: 'Mens Water Polo',
    rows: [
      { medal: 's', text: '2nd place — Mens Water Polo' },
      { medal: 'g', text: 'Top Scorer — Suyash Bhandare' },
    ],
  },
  {
    year: '2024 · Individual Medals',
    event: 'Freestyle & Breaststroke',
    rows: [
      { medal: 'b', text: '100m Freestyle (M) — Suyash Bhandare' },
      { medal: 's', text: '200m Breaststroke (M) — Kartik Akappa' },
    ],
  },
];

const MEDAL_BG: Record<string, string> = {
  g: 'bg-accent',
  s: 'bg-[#9EA3A8]',
  b: 'bg-[#A0674A]',
  o: 'border border-[#F5F0E8]/25 bg-transparent',
};

const RULES_CONTENT: Record<string, { title: string; items: string[] }[]> = {
  General: [
    {
      title: 'Membership & Access',
      items: [
        'Students Gymkhana / Coach have the right to use any slot for students camp, inter-hostel, Inter-IIT camp or any program approved by Chairman (Sports) / Dean (SA).',
        'Pool slots are strictly implemented during summer months; other periods, if swimmers fewer than 30, may swim without encroaching ladies slots.',
      ],
    },
    {
      title: 'Membership Card',
      items: [
        'A membership card is a must for swimming. The card is not transferable — violation leads to cancellation.',
        'Members must make entry in the register and keep cards in the glass board.',
      ],
    },
    {
      title: 'Conduct',
      items: [
        'During ladies slot, no male member is permitted to swim.',
        'Members are advised not to distract life guards during pool hours.',
        'All viewers should remain in gallery only.',
      ],
    },
  ],
  Safety: [
    {
      title: 'Core Safety Rules',
      items: [
        'Swimming is strictly prohibited in the absence of a life guard.',
        'Swimming or diving cannot be done alone.',
        'Beginners should remain at the shallow end and always wear a red cap. Beginners below 12 years must be accompanied by parents.',
        'Diving only in presence of coach or life guard; ensure diving area is clear of swimmers.',
        'Drinking, smoking and eating in the pool or paved area is prohibited.',
        'Never push anyone into the pool; horse play is not permitted.',
        'Photography in pool premises is not allowed unless prior permission is obtained.',
        'Never swim with metallic objects like ring, watch, neck chain etc.',
        'Don\u2019t bring valuables to the pool — the club / gymkhana is not responsible for loss of belongings.',
        'Life guards are prohibited from teaching or training members during general slots.',
      ],
    },
  ],
  Guest: [
    {
      title: 'Guest Policy',
      items: [
        'Guest charges are Rs 20/- per dip. Only for Institute Staff.',
        'No guest permitted during peak hours if 30 or more members are in the pool.',
        'Guest cannot be a regular visitor to the pool.',
        'Only the primary member is allowed to bring the guest. No dependents / school children eligible.',
        'Guest allowed only once / twice in a week.',
        'Primary member must fill the guest form each time; entry in both guest and main entry book at counter.',
        'Guest must always be accompanied by the primary member.',
      ],
    },
  ],
  Hygiene: [
    {
      title: 'Attire & Appearance',
      items: [
        'Swimming costume is mandatory. Costumes must be non-transparent and not white in colour.',
        'Anyone with long hair must wear a swimming cap; long hair must be tied securely before entering the pool.',
      ],
    },
    {
      title: 'Health & Cleanliness',
      items: [
        'Persons with open cuts, wounds, eye infections or any communicable disease are not permitted to enter the pool.',
        'Persons under the influence of alcohol, drugs or other intoxicants are prohibited from entering the pool premises.',
        'Please leave possessions and footwear in the cloak room; the club / gymkhana is not responsible for loss of personal belongings.',
        'All members must shower and rinse thoroughly before entering the pool. Use soap to remove oils from hair and skin.',
      ],
    },
  ],
};

export default function AquaticsPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof RULES_CONTENT>('General');

  return (
    <div className="min-h-screen bg-cream text-[#111111] selection:bg-accent selection:text-[#F5F0E8]">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[92vh] w-full overflow-hidden bg-[#0D0D0D] text-[#F5F0E8]">
        <div className="absolute inset-0">
          <Image
            src="/swimming.jpeg"
            alt="IIT Bombay swimmers in the Olympic pool"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#0D0D0D]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(196,98,45,0.22),transparent_55%)]" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 bottom-[-4vw] z-0 select-none font-serif-display text-[28vw] leading-none tracking-[-0.05em] text-accent/10"
        >
          AQ
        </div>

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-36 md:px-12 lg:px-24 lg:pt-44">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="font-serif-display text-[clamp(84px,16vw,220px)] font-black uppercase leading-[0.84] tracking-[-0.05em] text-[#F5F0E8]"
          >
            Aquatics
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 grid max-w-[1100px] gap-10 md:grid-cols-12 md:items-end"
          >
            <p className="border-l-2 border-accent/60 pl-6 text-lg leading-[1.7] text-[#F5F0E8]/75 md:col-span-7 md:text-xl">
              Comprising Swimming and Water Polo, Aquatics is one of the most widely practiced sports at IIT Bombay
              — home to an Olympic-sized pool, elite coaching, and a legacy of Inter-IIT excellence.
            </p>

            <div className="flex flex-wrap gap-2 md:col-span-5 md:justify-end">
              {['Swimming', 'Water Polo', 'Triathlon', 'Olympic Pool'].map((chip) => (
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
                Coached by Reddy Sir (Retd.) and Ritesh Sir, IITB Aquatics has witnessed tremendous growth over the
                years.
              </p>
              <p className="text-lg leading-[1.85] text-[#111111]/60">
                With exciting events spread throughout the year, the club caters to all levels — from beginners to
                competitive swimmers representing IITB at the Inter-IIT Aquatics Meet. Fueled by exceptional
                coaching and unwavering commitment, IITB&apos;s Swimming and Water Polo teams have built a legacy of
                excellence.
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

      {/* POOL TIMING — dark */}
      <section className="relative overflow-hidden bg-[#0D0D0D] px-6 py-28 text-[#F5F0E8] md:px-12 lg:px-24">
        <div className="pointer-events-none absolute -left-6 -top-10 select-none font-serif-display text-[22vw] font-black leading-none tracking-[-0.04em] text-accent/[0.05]">
          03
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <h2 className="mb-16 font-serif-display text-[clamp(48px,7vw,96px)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#F5F0E8]">
            Pool<br />Timing
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-accent">
                  <th className="pb-5 text-left font-mono-custom text-[11px] font-black uppercase tracking-[0.25em] text-[#F5F0E8]/45">
                    Slot
                  </th>
                  <th className="pb-5 text-left font-mono-custom text-[11px] font-black uppercase tracking-[0.25em] text-[#F5F0E8]/45">
                    Category
                  </th>
                  <th className="pb-5 text-right font-mono-custom text-[11px] font-black uppercase tracking-[0.25em] text-[#F5F0E8]/45">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {TIMING.map((s) => (
                  <tr
                    key={s.slot}
                    className="border-b border-[#F5F0E8]/10 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="py-6 font-condensed text-lg font-black uppercase tracking-[0.02em] text-[#F5F0E8]">
                      {s.slot}
                    </td>
                    <td className="py-6 text-base text-[#F5F0E8]/60">{s.cat}</td>
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
            Events
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
                RG
              </div>
              <div className="mb-1 font-condensed text-xl font-black uppercase tracking-[0.02em] text-[#111111]">
                Ritesh Guchhait
              </div>
              <div className="font-mono-custom text-[11px] font-black uppercase tracking-[0.22em] text-[#111111]/50">
                Coach, Sports Officer
              </div>
            </div>

            <div className="bg-[#F5F0E8] p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-serif-display text-lg font-black text-accent">
                MV
              </div>
              <div className="mb-1 font-condensed text-xl font-black uppercase tracking-[0.02em] text-[#111111]">
                Meet Vanja
              </div>
              <div className="mb-4 font-mono-custom text-[11px] font-black uppercase tracking-[0.22em] text-[#111111]/50">
                Institute Aquatics Secretary
              </div>
              <a
                href="tel:+919323587701"
                className="font-mono-custom text-sm font-black tracking-wider text-accent"
              >
                +91 93235 87701
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RULES */}
      <section className="relative overflow-hidden bg-[#0D0D0D] px-6 py-28 text-[#F5F0E8] md:px-12 lg:px-24">
        <div className="pointer-events-none absolute -right-6 -top-10 select-none font-serif-display text-[22vw] font-black leading-none tracking-[-0.04em] text-accent/[0.05]">
          07
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <h2 className="mb-12 font-serif-display text-[clamp(48px,7vw,96px)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#F5F0E8]">
            Pool Rules
          </h2>

          <div className="grid gap-12 lg:grid-cols-12">
            <nav className="flex flex-col gap-1 lg:col-span-3">
              {(Object.keys(RULES_CONTENT) as Array<keyof typeof RULES_CONTENT>).map((tab) => {
                const active = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`group flex items-center justify-between border-l-2 py-4 pl-6 pr-4 text-left font-condensed text-lg font-black uppercase tracking-[0.05em] transition-colors ${
                      active
                        ? 'border-accent bg-white/[0.03] text-[#F5F0E8]'
                        : 'border-[#F5F0E8]/10 text-[#F5F0E8]/50 hover:border-accent/40 hover:text-[#F5F0E8]/80'
                    }`}
                  >
                    <span>{tab}</span>
                    <span className={`text-accent transition-transform ${active ? 'translate-x-1' : ''}`}>
                      →
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="lg:col-span-9">
              <div className="flex flex-col gap-10">
                {RULES_CONTENT[activeTab].map((section, i) => (
                  <div key={i}>
                    <h3 className="mb-5 font-condensed text-2xl font-black uppercase tracking-[0.02em] text-[#F5F0E8]">
                      {section.title}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {section.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex gap-4 border-b border-[#F5F0E8]/8 pb-3 text-base leading-[1.7] text-[#F5F0E8]/70 last:border-b-0"
                        >
                          <span className="mt-[10px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
