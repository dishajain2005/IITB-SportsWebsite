'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { FilterPill } from '@/components/ui/FilterPill';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MapPin, Clock, CheckCircle2, XCircle, AlertCircle, Search, ChevronRight, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { COURTS, STATUS_COLORS, CARDS_DATA } from '@/lib/data/courts';
import type { CourtStatus } from '@/lib/data/courts';

const STATUS_ICONS: Record<CourtStatus, React.ElementType> = {
  Available: CheckCircle2,
  Occupied: XCircle,
  Maintenance: AlertCircle,
  Reserved: Clock,
};

function CourtsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter = searchParams.get('sport') ?? 'All';
  const searchQuery = searchParams.get('q') ?? '';

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 240]);

  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 24) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollYRef.current) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [cardOrder, setCardOrder] = useState([0, 1, 2]);

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === '' || value === 'All') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  const sports = Array.from(new Set(COURTS.map(c => c.sport)));

  const filteredCourts = COURTS.filter(court => {
    const matchesFilter = filter === 'All' || court.sport === filter;
    const matchesSearch =
      court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      court.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
      court.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: COURTS.length,
    available: COURTS.filter(c => c.status === 'Available').length,
    occupied: COURTS.filter(c => c.status === 'Occupied').length,
    maintenance: COURTS.filter(c => c.status === 'Maintenance').length,
  };

  const bringToFront = (index: number) => {
    setCardOrder(prev => {
      if (prev[0] === index) {
        const [front, ...rest] = prev;
        return [...rest, front];
      }
      return [index, ...prev.filter(id => id !== index)];
    });
  };

  return (
    <div className="min-h-screen bg-cream text-[#111111] selection:bg-accent selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#111111] pt-48 pb-32 px-6 md:px-12 lg:px-24 overflow-hidden relative min-h-[85vh] flex items-center">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0"
        >
          <span className="font-condensed font-black text-[30vw] text-white/[0.02] leading-none uppercase tracking-tighter">
            COURTS
          </span>
        </motion.div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.05,
            backgroundImage: 'radial-gradient(circle at 2px 2px, #C4622D 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono-custom text-accent text-xs tracking-[0.4em] uppercase font-black mb-6 block">LIVE FACILITY TRACKER</span>
            <h1 className="font-serif-display text-[clamp(80px,12vw,180px)] text-[#F5F0E8] uppercase leading-[0.85] tracking-[-0.03em] mb-12">
              COURT<br />
              <span className="normal-case tracking-normal text-accent">Status.</span>
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              <div className="flex flex-col">
                <span className="font-condensed font-black text-6xl text-accent">{stats.available}</span>
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mt-2">AVAILABLE NOW</span>
              </div>
              <div className="flex flex-col">
                <span className="font-condensed font-black text-6xl text-[#F5F0E8]">{stats.occupied}</span>
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mt-2">IN USE</span>
              </div>
              <div className="flex flex-col">
                <span className="font-condensed font-black text-6xl text-white/20">{stats.maintenance}</span>
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mt-2">MAINTENANCE</span>
              </div>
            </div>
          </motion.div>

          {/* Layered Cards */}
          <div className="relative h-[500px] w-full max-w-[400px] flex items-center justify-center perspective-1000 group mx-auto lg:mx-0">
            {CARDS_DATA.map((card) => {
              const orderIndex = cardOrder.indexOf(card.id);
              const isFront = orderIndex === 0;
              const isMiddle = orderIndex === 1;

              return (
                <motion.div
                  key={card.id}
                  layout
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${card.label} status`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      bringToFront(card.id);
                    }
                  }}
                  onClick={() => bringToFront(card.id)}
                  animate={{
                    rotate: isFront ? 0 : isMiddle ? 6 : -4,
                    x: 0,
                    y: 0,
                    zIndex: (3 - orderIndex) * 10,
                    scale: isFront ? 1 : isMiddle ? 0.96 : 0.92,
                    filter: isFront ? 'grayscale(0%)' : 'grayscale(100%)',
                    boxShadow: isFront ? '0 30px 60px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.3)',
                  }}
                  whileHover={{
                    y: isFront ? -40 : -20,
                    rotate: isFront ? 0 : isMiddle ? 12 : -8,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute w-[280px] md:w-[320px] aspect-[3/4] bg-white p-3 pb-12 rounded-sm cursor-pointer origin-bottom transition-shadow"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image src={card.image} alt={card.label} fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                    <span className={`font-mono-custom text-[9px] font-black uppercase ${isFront ? 'text-accent' : 'text-[#111111]/40'}`}>
                      {card.label}
                    </span>
                    <span className="font-serif-display text-lg text-[#111111]">{card.number}</span>
                  </div>

                  {card.hasBadge && isFront && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-6 right-6 bg-accent text-white px-3 py-1 font-mono-custom text-[8px] font-black tracking-widest uppercase rounded-full shadow-lg z-50"
                    >
                      LIVE
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section
        style={{ willChange: 'transform' }}
        className={`sticky z-30 px-6 md:px-12 lg:px-24 py-4 md:py-6 bg-[#F5F0E8]/80 backdrop-blur-xl border-b border-[#111111]/05 transition-all duration-500 ${
          isNavVisible ? 'top-20' : 'top-0'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto">
            <FilterPill label="ALL FACILITIES" active={filter === 'All'} onClick={() => setParam('sport', 'All')} />
            {sports.map(sport => (
              <FilterPill key={sport} label={sport} active={filter === sport} onClick={() => setParam('sport', sport)} />
            ))}
          </div>

          <div className="relative w-full lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]/30 group-focus-within:text-accent transition-colors" />
            <input
              type="text"
              placeholder="Search by name or venue..."
              value={searchQuery}
              onChange={(e) => setParam('q', e.target.value)}
              className="w-full bg-white border border-[#111111]/10 rounded-full py-3 pl-12 pr-6 font-mono-custom text-[11px] tracking-wider focus:outline-none focus:border-accent transition-all"
            />
          </div>
        </div>
      </section>

      {/* Courts Grid */}
      <section className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-[1400px] mx-auto">
          {filteredCourts.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="sync">
                {filteredCourts.map((court) => {
                  const StatusIcon = STATUS_ICONS[court.status];
                  const color = STATUS_COLORS[court.status];

                  return (
                    <motion.div
                      layout
                      key={court.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="group relative bg-white border border-[#111111]/05 rounded-[24px] p-8 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: color }} />

                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                          <div className="flex flex-col gap-1">
                            <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] font-black text-accent">
                              {court.sport}
                            </span>
                            <h3 className="font-serif-display text-2xl text-[#111111] group-hover:text-accent transition-colors">
                              {court.name}
                            </h3>
                          </div>
                          <div
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full font-mono-custom text-[9px] uppercase tracking-[0.15em] font-black border"
                            style={{ color: color, borderColor: `${color}30`, backgroundColor: `${color}08` }}
                          >
                            <StatusIcon size={12} strokeWidth={3} />
                            {court.status}
                          </div>
                        </div>

                        <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-3 text-[#111111]/60">
                            <MapPin size={16} className="text-accent" />
                            <span className="font-mono-custom text-[11px] uppercase tracking-wider font-bold">{court.location}</span>
                          </div>
                          <div className="flex items-center gap-3 text-[#111111]/60">
                            <Clock size={16} className="text-accent" />
                            <span className="font-mono-custom text-[11px] uppercase tracking-wider font-bold">Updated {court.lastUpdated}</span>
                          </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-[#111111]/05 flex items-center justify-between">
                          {court.status === 'Available' ? (
                            <a
                              href="https://court-booking-assignment.vercel.app"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[0.2em] font-black text-accent hover:gap-3 transition-all"
                            >
                              BOOK NOW <ChevronRight size={14} />
                            </a>
                          ) : court.nextAvailable ? (
                            <div className="flex flex-col">
                              <span className="font-mono-custom text-[8px] uppercase tracking-widest text-[#111111]/40 font-bold">NEXT OPENING</span>
                              <span className="font-condensed font-black text-xl text-[#111111]">{court.nextAvailable}</span>
                            </div>
                          ) : (
                            <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] font-black text-[#111111]/30">
                              NO BOOKINGS TODAY
                            </span>
                          )}

                          {court.occupancy !== undefined && court.occupancy > 0 && (
                            <div className="flex flex-col items-end">
                              <span className="font-mono-custom text-[8px] uppercase tracking-widest text-[#111111]/40 font-bold">CAPACITY</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1 bg-[#111111]/05 rounded-full overflow-hidden">
                                  <div className="h-full bg-accent" style={{ width: `${court.occupancy}%` }} />
                                </div>
                                <span className="font-condensed font-black text-sm text-[#111111]">{court.occupancy}%</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="py-24 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#111111]/05 rounded-full mb-6">
                <Search className="w-8 h-8 text-[#111111]/20" />
              </div>
              <h3 className="font-serif-display text-2xl text-[#111111] mb-2">No facilities match your search</h3>
              <p className="font-mono-custom text-[11px] uppercase tracking-[0.2em] text-[#111111]/40 font-bold">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </section>

      {/* App Promo */}
      <section className="px-6 md:px-12 lg:px-24 py-24 bg-[#111111] relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-accent/05 blur-[120px] rounded-full" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <h2 className="font-serif-display text-[clamp(48px,6vw,84px)] text-[#F5F0E8] leading-[0.95] mb-8">
                Your Arena,<br />
                <span className="text-accent">Anywhere.</span>
              </h2>
              <p className="text-[#F5F0E8]/60 text-lg leading-relaxed mb-12 max-w-xl">
                Experience the future of sports management at IIT Bombay with our comprehensive mobile application.
                Get real-time court availability, instant booking, and live tournament updates right on your device.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 w-full max-w-2xl">
                <div className="bg-white/05 p-8 rounded-3xl border border-white/10">
                  <h4 className="font-condensed font-black text-accent text-xl uppercase mb-2">Real-Time Booking</h4>
                  <p className="text-white/40 text-xs leading-relaxed font-mono-custom tracking-wider">Reserve any facility in seconds with live status updates.</p>
                </div>
                <div className="bg-white/05 p-8 rounded-3xl border border-white/10">
                  <h4 className="font-condensed font-black text-accent text-xl uppercase mb-2">Live GC Scores</h4>
                  <p className="text-white/40 text-xs leading-relaxed font-mono-custom tracking-wider">Stay updated with tournament brackets and match schedules.</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/05 border border-white/10 px-8 py-4 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Smartphone size={20} className="text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] font-mono-custom font-bold text-white/40 uppercase tracking-widest leading-none mb-1">DOWNLOAD FOR</span>
                    <span className="text-white font-condensed font-black text-lg tracking-tight">iOS APP STORE</span>
                  </div>
                </div>
                <div className="bg-white/05 border border-white/10 px-8 py-4 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Smartphone size={20} className="text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] font-mono-custom font-bold text-white/40 uppercase tracking-widest leading-none mb-1">DOWNLOAD FOR</span>
                    <span className="text-white font-condensed font-black text-lg tracking-tight">GOOGLE PLAY</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function CourtStatusPage() {
  return (
    <Suspense>
      <CourtsContent />
    </Suspense>
  );
}
