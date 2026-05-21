'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '@/components/SocialIcons';

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/iitbombaysports', icon: InstagramIcon },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/iit-bombay-sports/?originalSubdomain=in', icon: LinkedinIcon },
  { name: 'Facebook', href: 'https://www.facebook.com/iitbombaysports/', icon: FacebookIcon },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] pt-32 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative h-px w-full bg-white/05 mb-24 overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-condensed font-black text-4xl uppercase text-[#F5F0E8] mb-8 tracking-[0.1em]">
              IITB <span className="text-accent">SPORTS</span>
            </div>
            <p className="font-serif-display text-xl text-[#F5F0E8]/40 mb-10 max-w-[240px]">
              &quot;Until. Victory. Always.&quot;
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white/10 text-white/55 transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent"
                  >
                    <Icon size={22} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 lg:col-span-3 gap-12">
            <nav aria-labelledby="footer-main-directory">
              <h4 id="footer-main-directory" className="font-mono-custom text-accent text-[10px] uppercase tracking-[0.4em] mb-10 font-black">Main Directory</h4>
              <ul className="space-y-4 font-condensed font-black text-xl text-[#F5F0E8]/60 uppercase tracking-wider">
                {[
                  { label: 'Home', href: '/sports/home' },
                  { label: 'Sports', href: '/sports' },
                  { label: 'Court Status', href: '/courts' },
                  { label: 'GC', href: '/gc' },
                ].map(({ label, href }) => (
                  <li key={label} className="hover:text-white transition-colors">
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-resources">
              <h4 id="footer-resources" className="font-mono-custom text-accent text-[10px] uppercase tracking-[0.4em] mb-10 font-black">Resources</h4>
              <ul className="space-y-4 font-condensed font-black text-xl text-[#F5F0E8]/60 uppercase tracking-wider">
                {[
                  { label: 'Yearbook', href: '/yearbook' },
                  { label: 'Blogs', href: '/blogs' },
                  { label: 'Events', href: '/events' },
                  { label: 'Booking', href: 'https://court-booking-assignment.vercel.app' },
                ].map(({ label, href }) => (
                  <li key={label} className="hover:text-white transition-colors">
                    <Link href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-information">
              <h4 id="footer-information" className="font-mono-custom text-accent text-[10px] uppercase tracking-[0.4em] mb-10 font-black">Information</h4>
              <ul className="space-y-4 font-condensed font-black text-xl text-[#F5F0E8]/60 uppercase tracking-wider">
                {[
                  { label: 'Contact', href: '/contact' },
                  { label: 'Feedback', href: '/feedback' },
                  { label: 'Terms', href: '/terms' },
                  { label: 'Privacy', href: '/terms' },
                ].map(({ label, href }) => (
                  <li key={label} className="hover:text-white transition-colors">
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="pt-12 border-t border-white/05 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <span className="font-mono-custom text-[11px] text-white/45 uppercase tracking-[0.28em] font-bold">© 2025 IIT BOMBAY SPORTS</span>
            <div className="w-1.5 h-1.5 bg-white/25 rounded-full" />
            <span className="font-mono-custom text-[11px] text-white/35 uppercase tracking-[0.28em] font-bold">ALL RIGHTS RESERVED</span>
          </div>
          <span className="font-condensed font-black text-xs text-white/05 tracking-[0.5em] uppercase">Built for Champions</span>
        </div>
      </div>
    </footer>
  );
}
