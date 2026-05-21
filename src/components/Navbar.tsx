'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '/sports/home' },
  { name: 'Sports', href: '/sports' },
  { name: 'Court Status', href: '/courts' },
  { name: 'GC', href: '/gc' },
  { name: 'Yearbook', href: '/yearbook' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Events Timeline', href: '/events' },
  { name: 'Contact Us', href: '/contact' },
];

const COURT_BOOKING_URL = 'https://court-booking-assignment.vercel.app/login';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const HERO_THRESHOLD = window.innerHeight * 0.8;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 80);

      if (currentScrollY <= 10) {
        // at very top — hide
        setIsNavVisible(false);
      } else if (currentScrollY < lastScrollYRef.current) {
        // scrolling up anywhere — show
        setIsNavVisible(true);
      } else if (currentScrollY < HERO_THRESHOLD) {
        // scrolling down inside hero — hide
        setIsNavVisible(false);
      } else {
        // scrolling down past hero — hide
        setIsNavVisible(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-[transform,opacity] duration-500 px-6 md:px-12 h-20 flex items-center justify-between bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.08)] ${isNavVisible || mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Go to homepage">
          <div className="relative h-14 w-[178px] md:w-[190px]">
            <Image
              src="/assets/iit-bombay-sports-logo-nav.svg"
              alt="IIT Bombay Sports"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Nav Links - Center */}
        <div className="hidden xl:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[13px] font-medium relative py-1 group text-black/60 hover:text-black transition-colors duration-300
                  after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-accent after:transition-[width] after:duration-300
                  ${isActive ? 'text-black font-semibold after:w-full' : 'after:w-0 hover:after:w-full'}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA - Right */}
        <div className="flex items-center gap-6">
          <a
            href={COURT_BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden md:block bg-accent hover:bg-[#A3501F] text-black text-[12px] font-bold py-2.5 px-6 rounded-full transition-[background-color,box-shadow,transform] duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            BOOK A COURT
          </a>

          {/* Mobile Hamburger */}
          <button 
            className="xl:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className={`w-6 h-0.5 transition-colors ${isScrolled ? 'bg-black' : 'bg-[#111111]'}`} />
            <div className={`w-6 h-0.5 transition-colors ${isScrolled ? 'bg-black' : 'bg-[#111111]'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#111111] p-8 flex flex-col justify-between"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div>
              <div className="flex justify-between items-center mb-16">
                <span className="font-condensed font-black text-2xl text-white tracking-widest">IITB SPORTS</span>
                <button 
                  className="text-white text-4xl p-2"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  ×
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-condensed font-black text-5xl text-white/50 hover:text-accent transition-colors uppercase tracking-tight"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-end">
               <div className="flex flex-col gap-4">
                  <span className="font-mono-custom text-accent text-xs tracking-widest uppercase">Connect</span>
                  <div className="flex gap-6">
                    <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white">IG</div>
                    <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white">LN</div>
                  </div>
               </div>
               <a
                 href={COURT_BOOKING_URL}
                 target="_blank"
                 rel="noreferrer"
                 onClick={() => setMobileMenuOpen(false)}
                 className="bg-accent text-black font-bold py-4 px-8 rounded-full"
               >
                 BOOK A COURT
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
